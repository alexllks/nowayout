import { W, H, C, FONT_SERIF, TOTAL_LOOPS } from '../config.js';
import { images } from '../assets.js';
import { input, mouse } from '../input.js';
import { audio } from '../audio.js';
import { Menu, text, paragraph, dim, keycap, hotelRule } from '../ui.js';
import { getSave, save } from '../save.js';

const HOWTO = [
  'You are on the fourth floor. The lift is at one end of the corridor, the fire stairs at the other.',
  'Walk the corridor and look at everything: the doors, the lamps, the paintings, the furniture, the sounds. The first time, nothing is wrong. Remember it.',
  'Every time after that, something may have changed. If ANYTHING is different, go back to the LIFT. If nothing is different, go on through the STAIRS.',
  'A correct choice counts a corridor. A wrong one sends you back to the beginning. Some changes are dangerous: if something is coming for you, run.',
  `Nine corridors in a row and you are out.`,
];

export class TitleScene {
  constructor(game) {
    this.game = game;
    this.t = 0;
    this.state = 'press'; // press | menu | howto | options | credits
    this.menu = new Menu(
      [
        { label: 'Check in', action: 'play' },
        { label: 'How to play', action: 'howto' },
        { label: 'Options', action: 'options' },
        { label: 'Credits', action: 'credits' },
      ],
      { y: 440, gap: 50, size: 28, width: 300 },
    );
    this.options = new Menu(
      [
        {
          label: 'Volume',
          value: () => `${'▮'.repeat(Math.round(audio.volume * 10))}${'▯'.repeat(10 - Math.round(audio.volume * 10))}`,
          adjust: (d) => {
            audio.setVolume(Math.round((audio.volume + d * 0.1) * 10) / 10);
            save({ volume: audio.volume });
          },
        },
        { label: 'Fullscreen', action: 'fullscreen' },
        { label: 'Reset progress', action: 'reset' },
        { label: 'Back', action: 'back' },
      ],
      { y: 380, gap: 54, size: 26, width: 560 },
    );
  }

  enter() {
    this.t = 0;
    this.state = audio.ctx ? 'menu' : 'press';
    if (audio.ctx) audio.startLoop('menu', { bus: 'music', volume: 0.5 });
  }

  exit() {
    audio.stopLoop('menu', 0.8);
  }

  update(dt) {
    this.t += dt;
    if (this.state === 'press') {
      if (input.anyPressed()) {
        this.state = 'menu';
        audio.init().then(() => {
          audio.setVolume(getSave().volume);
          audio.startLoop('menu', { bus: 'music', volume: 0.5 });
        });
      }
      return;
    }
    if (this.state === 'menu') {
      const action = this.menu.update();
      if (action === 'play') this.game.transition('intro');
      else if (action) this.state = action;
      return;
    }
    if (this.state === 'options') {
      const action = this.options.update();
      if (action === 'fullscreen') toggleFullscreen();
      else if (action === 'reset') {
        save({ bestLoops: 0, escapes: 0, runs: 0, seenIntro: false });
        audio.glitch();
      } else if (action === 'back' || input.pressed('back')) this.state = 'menu';
      return;
    }
    if (input.pressed('back') || input.pressed('confirm') || mouse.clicked) this.state = 'menu';
  }

  draw(ctx) {
    const img = images.title;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    if (img) {
      // The artwork is square: fit its width and anchor near the top so the
      // neon title stays in frame; drift slowly.
      const s = Math.max(W / img.width, H / img.height) * 1.02;
      const dw = img.width * s;
      const dh = img.height * s;
      const ox = (W - dw) / 2 + Math.sin(this.t * 0.15) * 10;
      const oy = -dh * 0.04 + Math.cos(this.t * 0.11) * 6;
      ctx.drawImage(img, ox, oy, dw, dh);
    }
    // neon flicker on the artwork's title
    const fl = Math.sin(this.t * 23) * Math.sin(this.t * 3.7) > 0.93 ? 0.35 : 0;
    if (fl) dim(ctx, fl, '0,0,0');
    const g = ctx.createLinearGradient(0, H * 0.35, 0, H);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, 'rgba(0,0,0,0.92)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    if (this.state === 'press') {
      const a = 0.55 + Math.sin(this.t * 2.5) * 0.35;
      text(ctx, 'PRESS ANY KEY', W / 2, 500, { size: 20, align: 'center', color: C.text, alpha: a, letterSpacing: 6 });
      text(ctx, 'A hotel that keeps its guests.', W / 2, 560, { size: 18, align: 'center', color: C.textDim });
      return;
    }
    if (this.state === 'menu') {
      hotelRule(ctx, W / 2 - 160, W / 2 + 160, 395);
      this.menu.draw(ctx, this.t);
      const s = getSave();
      const best = s.bestLoops ? `Best  ${s.bestLoops} / ${TOTAL_LOOPS} corridors` : 'No record yet';
      text(ctx, best, 36, H - 56, { size: 16, color: C.textDim });
      if (s.escapes) text(ctx, `Escaped  ${s.escapes}×`, 36, H - 32, { size: 16, color: C.textDim });
      text(ctx, 'Keyboard: ↑ ↓ Enter  ·  Mouse', W - 36, H - 32, { size: 14, color: C.textDim, align: 'right' });
      return;
    }
    dim(ctx, 0.78);
    if (this.state === 'howto') {
      text(ctx, 'HOUSE RULES', W / 2, 120, { size: 30, align: 'center', letterSpacing: 6, color: C.brass });
      hotelRule(ctx, W / 2 - 120, W / 2 + 120, 142);
      let y = 196;
      HOWTO.forEach((p, i) => {
        text(ctx, String(i + 1), 250, y, { size: 22, color: C.accent, align: 'right' });
        y = paragraph(ctx, p, 272, y, 760, { size: 20, lineHeight: 29, color: C.text }) + 14;
      });
      let kx = 300;
      kx += keycap(ctx, kx, 606, '← →') + 8;
      text(ctx, 'move', kx, 606, { size: 15, color: C.textDim });
      kx += 70;
      kx += keycap(ctx, kx, 606, '↑ / SPACE') + 8;
      text(ctx, 'jump', kx, 606, { size: 15, color: C.textDim });
      kx += 70;
      kx += keycap(ctx, kx, 606, 'E') + 8;
      text(ctx, 'use a door', kx, 606, { size: 15, color: C.textDim });
      kx += 110;
      kx += keycap(ctx, kx, 606, 'ESC') + 8;
      text(ctx, 'pause', kx, 606, { size: 15, color: C.textDim });
      text(ctx, 'Press any key to go back', W / 2, 668, { size: 15, align: 'center', color: C.textDim });
    } else if (this.state === 'options') {
      text(ctx, 'OPTIONS', W / 2, 200, { size: 30, align: 'center', letterSpacing: 6, color: C.brass });
      hotelRule(ctx, W / 2 - 120, W / 2 + 120, 222);
      this.options.draw(ctx, this.t);
      text(ctx, 'Progress is saved in this browser only.', W / 2, 630, { size: 15, align: 'center', color: C.textDim });
    } else if (this.state === 'credits') {
      text(ctx, 'NO WAY OUT', W / 2, 200, { size: 30, align: 'center', letterSpacing: 8, color: C.brass });
      hotelRule(ctx, W / 2 - 120, W / 2 + 120, 222);
      const lines = [
        ['Design & code', 'Alexandros Loulakis'],
        ['Originally', 'a university project, rebuilt from the ground up'],
        ['Engine', 'HTML5 Canvas, Web Audio, no dependencies'],
        ['Paintings', 'generated artwork included with the original project'],
        ['Inspired by', 'the anomaly hunt genre, and hotels that go on too long'],
      ];
      lines.forEach(([k, v], i) => {
        text(ctx, k, W / 2 - 30, 290 + i * 46, { size: 18, align: 'right', color: C.textDim });
        text(ctx, v, W / 2 + 10, 290 + i * 46, { size: 18, color: C.text });
      });
      text(ctx, 'Press any key to go back', W / 2, 640, { size: 15, align: 'center', color: C.textDim });
    }
  }
}

function toggleFullscreen() {
  const el = document.documentElement;
  if (!document.fullscreenElement) el.requestFullscreen?.().catch(() => {});
  else document.exitFullscreen?.();
}

export { FONT_SERIF };
