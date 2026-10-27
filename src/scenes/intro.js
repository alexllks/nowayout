import { W, H, C, FONT_MONO } from '../config.js';
import { input, mouse } from '../input.js';
import { audio } from '../audio.js';
import { text, paragraph, hotelRule } from '../ui.js';
import { roundRect } from '../util.js';

const LINES = [
  'You checked in on a Tuesday. You no longer remember which one.',
  'Fourth floor. The lift at one end. The fire stairs at the other.',
  'You have walked this corridor more times than you can count.',
  'It is never quite the same corridor.',
];

const CARD = [
  'If anything has changed, go back to the LIFT.',
  'If nothing has changed, go on through the STAIRS.',
  'Nine corridors. Then you may leave.',
];

export class IntroScene {
  constructor(game) {
    this.game = game;
  }

  enter() {
    this.t = 0;
    this.line = 0;
    this.chars = 0;
    this.phase = 'lines'; // lines | card | done
    this.cardT = 0;
    audio.startSynth('introRain', { freq: 900, volume: 0.07 });
  }

  exit() {
    audio.stopSynth('introRain', 1);
  }

  update(dt) {
    this.t += dt;
    if (this.phase === 'lines') {
      const target = LINES[this.line];
      if (this.chars < target.length) {
        const prev = this.chars;
        this.chars = Math.min(target.length, this.chars + dt * 34);
        if (Math.floor(this.chars) !== Math.floor(prev) && target[Math.floor(prev)] !== ' ') audio.tick();
      }
      if (input.anyPressed() || mouse.clicked) {
        if (this.chars < target.length) this.chars = target.length;
        else {
          this.line++;
          this.chars = 0;
          if (this.line >= LINES.length) {
            this.phase = 'card';
            audio.burst({ dur: 0.25, volume: 0.3, freq: 900, brown: true });
          }
        }
      }
      return;
    }
    if (this.phase === 'card') {
      this.cardT += dt;
      if (this.cardT > 0.8 && (input.anyPressed() || mouse.clicked)) {
        this.phase = 'done';
        this.game.transition('play', { newRun: true });
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#030304';
    ctx.fillRect(0, 0, W, H);
    // faint rain
    ctx.strokeStyle = 'rgba(160,170,190,0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 60; i++) {
      const x = (i * 97 + this.t * 60) % W;
      const y = (i * 53 + this.t * 700 + i * 31) % (H + 40) - 40;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 2, y + 22);
      ctx.stroke();
    }

    if (this.phase === 'lines') {
      for (let i = 0; i <= Math.min(this.line, LINES.length - 1); i++) {
        const full = i < this.line;
        const str = full ? LINES[i] : LINES[i].slice(0, Math.floor(this.chars));
        text(ctx, str, W / 2, 280 + i * 54, { size: 26, align: 'center', color: full ? C.textDim : C.text });
      }
      if (this.line < LINES.length && this.chars >= LINES[this.line].length) {
        const a = 0.4 + Math.sin(this.t * 4) * 0.3;
        text(ctx, '▸', W / 2 + 330, 280 + this.line * 54, { size: 22, color: C.accent, alpha: a });
      }
      text(ctx, 'any key', W - 36, H - 32, { size: 14, color: C.textDim, align: 'right' });
      return;
    }

    // the key card
    const a = Math.min(1, this.cardT / 0.6);
    const cx = W / 2;
    const cy = H / 2 + 10 - (1 - a) * 20;
    ctx.save();
    ctx.globalAlpha = a;
    ctx.translate(cx, cy);
    ctx.rotate(-0.03);
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 30;
    ctx.fillStyle = '#e6dcc3';
    roundRect(ctx, -300, -150, 600, 300, 10);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#2a1d0c';
    roundRect(ctx, -300, -150, 600, 34, 10);
    ctx.fill();
    ctx.fillRect(-300, -126, 600, 10);
    text(ctx, 'ROOM 4F  ·  KEY CARD', 0, -126, { size: 14, align: 'center', color: '#e6dcc3', font: FONT_MONO, shadow: false, letterSpacing: 3 });
    text(ctx, 'Written on the back, in your handwriting:', 0, -78, { size: 15, align: 'center', color: '#6a5a3a', shadow: false });
    CARD.forEach((l, i) => {
      text(ctx, l, 0, -30 + i * 44, { size: 22, align: 'center', color: i === 2 ? '#8a1c1c' : '#1a1208', shadow: false });
    });
    hotelRule(ctx, -120, 120, 108, 0.8);
    ctx.restore();
    if (this.cardT > 0.8) {
      const p = 0.4 + Math.sin(this.t * 3) * 0.3;
      text(ctx, 'press any key', W / 2, H - 60, { size: 15, align: 'center', color: C.textDim, alpha: p, letterSpacing: 3 });
    }
  }
}
