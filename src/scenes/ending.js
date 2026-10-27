import { W, H, C, FONT_MONO } from '../config.js';
import { input, mouse } from '../input.js';
import { audio } from '../audio.js';
import { text, hotelRule, keycap } from '../ui.js';
import { drawGuest } from '../render/character.js';
import { formatTime, roundRect } from '../util.js';
import { save, getSave } from '../save.js';

export class EndingScene {
  constructor(game) {
    this.game = game;
  }

  enter({ stats }) {
    this.stats = stats;
    this.t = 0;
    this.walk = 0;
    this.signFlicker = 0;
    const s = getSave();
    save({ escapes: s.escapes + 1 });
    audio.stopAll(1.5);
    audio.startSynth('endRain', { freq: 1400, volume: 0.12 });
    audio.startSynth('endWind', { brown: true, freq: 300, volume: 0.08 });
    setTimeout(() => audio.escapeChord(), 1200);
  }

  exit() {
    audio.stopSynth('endRain', 1);
    audio.stopSynth('endWind', 1);
  }

  update(dt) {
    this.t += dt;
    this.walk += dt * 7;
    if (this.t > 6 && (input.pressed('confirm') || mouse.clicked)) this.game.transition('title');
  }

  draw(ctx) {
    const t = this.t;
    // night street
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#05070d');
    sky.addColorStop(1, '#0d1118');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);
    // hotel facade on the left
    ctx.fillStyle = '#0a0b0f';
    ctx.fillRect(0, 60, 520, H - 60);
    ctx.fillStyle = '#131722';
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const lit = (r * 7 + c * 3) % 4 === 0;
        ctx.fillStyle = lit ? 'rgba(255, 200, 120, 0.35)' : '#131722';
        ctx.fillRect(40 + c * 90, 100 + r * 80, 44, 54);
      }
    }
    // awning + door
    ctx.fillStyle = '#2a1416';
    ctx.fillRect(380, 420, 140, 30);
    ctx.fillStyle = '#1a1208';
    ctx.fillRect(420, 450, 70, 170);
    ctx.fillStyle = 'rgba(255, 220, 160, 0.18)';
    ctx.fillRect(425, 455, 60, 160);
    // neon sign: VACANCY flickers; the NO lights up over time
    const flick = Math.sin(t * 17) * Math.sin(t * 2.3) > 0.85;
    const noOn = t > 4 && !flick;
    ctx.save();
    ctx.font = `bold 34px ${FONT_MONO}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = 18;
    ctx.fillStyle = noOn ? '#ff3b3b' : 'rgba(120, 30, 30, 0.35)';
    ctx.shadowColor = ctx.fillStyle;
    ctx.fillText('NO', 60, 60 + 0);
    ctx.fillStyle = flick ? 'rgba(80, 200, 120, 0.25)' : '#3ddc84';
    ctx.shadowColor = ctx.fillStyle;
    ctx.fillText('VACANCY', 128, 60);
    ctx.restore();
    // pavement
    ctx.fillStyle = '#15161a';
    ctx.fillRect(0, 620, W, H - 620);
    ctx.fillStyle = '#0c0d10';
    ctx.fillRect(0, 660, W, H - 660);
    // reflections
    ctx.fillStyle = 'rgba(61, 220, 132, 0.06)';
    ctx.fillRect(60, 622, 260, 36);
    // rain
    ctx.strokeStyle = 'rgba(170,185,205,0.22)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 160; i++) {
      const x = (i * 89 + t * 120) % (W + 40) - 20;
      const y = (i * 53 + t * 900 + i * 31) % (H + 40) - 40;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 4, y + 26);
      ctx.stroke();
    }
    // the guest walks away and keeps walking
    const gx = Math.min(560 + t * 42, W + 60);
    drawGuest(ctx, gx, 640, 1, this.walk, false);

    // text
    const lines = [
      [1.0, 'You walked down nine flights.'],
      [2.6, 'The door at the bottom opened onto the street. It was raining.'],
      [4.4, 'Behind you the sign kept flickering. You did not turn around.'],
    ];
    lines.forEach(([at, l], i) => {
      const a = Math.max(0, Math.min(1, (t - at) / 0.8));
      if (a > 0) text(ctx, l, W / 2 + 120, 150 + i * 40, { size: 22, align: 'center', color: C.text, alpha: a });
    });
    if (t > 6) {
      const a = Math.min(1, (t - 6) / 0.8);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = 'rgba(8, 8, 10, 0.85)';
      roundRect(ctx, W / 2 + 120 - 230, 300, 460, 230, 6);
      ctx.fill();
      ctx.strokeStyle = C.brass;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
      text(ctx, 'CHECKED OUT', W / 2 + 120, 340, { size: 20, align: 'center', color: C.brass, letterSpacing: 6, alpha: a });
      hotelRule(ctx, W / 2 + 120 - 90, W / 2 + 120 + 90, 358, a * 0.6);
      const s = this.stats;
      const rows = [
        ['Time', formatTime(s.time)],
        ['Corridors walked', String(s.corridors)],
        ['Wrong turns', String(s.resets)],
        ['Deaths', String(s.deaths)],
      ];
      rows.forEach(([k, v], i) => {
        text(ctx, k, W / 2 + 120 - 20, 400 + i * 30, { size: 18, align: 'right', color: C.textDim, alpha: a });
        text(ctx, v, W / 2 + 120 + 20, 400 + i * 30, { size: 18, color: C.text, alpha: a, font: FONT_MONO });
      });
      const p = 0.5 + Math.sin(t * 3) * 0.3;
      text(ctx, 'ENTER  ·  back to the lobby', W / 2 + 120, 570, { size: 15, align: 'center', color: C.textDim, alpha: a * p, letterSpacing: 2 });
    }
  }
}

export { keycap };
