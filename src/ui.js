import { W, H, C, FONT_SERIF, FONT_MONO } from './config.js';
import { roundRect, wrapText } from './util.js';
import { input, mouse } from './input.js';
import { audio } from './audio.js';

export function text(ctx, str, x, y, { size = 20, font = FONT_SERIF, color = C.text, align = 'left', baseline = 'alphabetic', weight = '', shadow = true, alpha = 1, letterSpacing = 0 } = {}) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = `${weight} ${size}px ${font}`.trim();
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${letterSpacing}px`;
  if (shadow) {
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;
  }
  ctx.fillStyle = color;
  ctx.fillText(str, x, y);
  ctx.restore();
}

export function paragraph(ctx, str, x, y, maxWidth, opts = {}) {
  const size = opts.size ?? 20;
  const lh = opts.lineHeight ?? size * 1.45;
  ctx.font = `${opts.weight ?? ''} ${size}px ${opts.font ?? FONT_SERIF}`.trim();
  const lines = wrapText(ctx, str, maxWidth);
  lines.forEach((l, i) => text(ctx, l, x, y + i * lh, opts));
  return y + lines.length * lh;
}

export function dim(ctx, alpha = 0.6, color = '0,0,0') {
  ctx.save();
  ctx.fillStyle = `rgba(${color},${alpha})`;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

// A vertical list of options navigated with keys or the mouse.
export class Menu {
  constructor(items, { x = W / 2, y = 360, gap = 54, size = 30, align = 'center', width = 360 } = {}) {
    this.items = items; // [{label, action, value?}]
    this.index = 0;
    this.x = x;
    this.y = y;
    this.gap = gap;
    this.size = size;
    this.align = align;
    this.width = width;
  }

  update() {
    if (input.pressed('down')) {
      this.index = (this.index + 1) % this.items.length;
      audio.tick();
    }
    if (input.pressed('up')) {
      this.index = (this.index - 1 + this.items.length) % this.items.length;
      audio.tick();
    }
    // mouse hover
    if (mouse.moved || mouse.clicked) {
      const i = this.hitTest(mouse.x, mouse.y);
      if (i >= 0 && i !== this.index) {
        this.index = i;
        audio.tick();
      }
    }
    const item = this.items[this.index];
    if (item.adjust && (input.pressed('left') || input.pressed('right'))) {
      item.adjust(input.pressed('right') ? 1 : -1);
      audio.tick();
      return null;
    }
    if (input.pressed('confirm') || (mouse.clicked && this.hitTest(mouse.x, mouse.y) === this.index)) {
      if (item.adjust) {
        item.adjust(1);
        audio.tick();
        return null;
      }
      audio.burst({ dur: 0.1, volume: 0.2, freq: 700 });
      return item.action;
    }
    return null;
  }

  hitTest(mx, my) {
    for (let i = 0; i < this.items.length; i++) {
      const cy = this.y + i * this.gap;
      const left = this.align === 'center' ? this.x - this.width / 2 : this.x - 20;
      if (mx >= left && mx <= left + this.width && my >= cy - this.size * 0.8 && my <= cy + this.size * 0.5) return i;
    }
    return -1;
  }

  draw(ctx, t) {
    this.items.forEach((item, i) => {
      const y = this.y + i * this.gap;
      const active = i === this.index;
      const label = item.value ? `${item.label}   ${item.value()}` : item.label;
      if (active) {
        ctx.save();
        ctx.fillStyle = 'rgba(211, 58, 58, 0.14)';
        const left = this.align === 'center' ? this.x - this.width / 2 : this.x - 20;
        roundRect(ctx, left, y - this.size * 0.85, this.width, this.size * 1.4, 4);
        ctx.fill();
        ctx.restore();
        const pulse = 0.75 + Math.sin(t * 5) * 0.25;
        text(ctx, '›', this.align === 'center' ? this.x - this.width / 2 + 14 : this.x - 10, y, { size: this.size, color: C.accent, alpha: pulse });
      }
      text(ctx, label, this.x, y, { size: this.size, align: this.align, color: active ? C.text : C.textDim, letterSpacing: 1 });
    });
  }
}

// Shared fade used between scenes and on the corridor transitions.
export class Fader {
  constructor() {
    this.alpha = 0;
    this.target = 0;
    this.speed = 1.6;
    this.onDone = null;
  }
  to(target, speed, onDone) {
    this.target = target;
    this.speed = speed ?? this.speed;
    this.onDone = onDone ?? null;
  }
  update(dt) {
    if (this.alpha === this.target) return;
    const dir = Math.sign(this.target - this.alpha);
    this.alpha += dir * this.speed * dt;
    if ((dir > 0 && this.alpha >= this.target) || (dir < 0 && this.alpha <= this.target)) {
      this.alpha = this.target;
      const cb = this.onDone;
      this.onDone = null;
      cb?.();
    }
  }
  draw(ctx) {
    if (this.alpha > 0) dim(ctx, this.alpha);
  }
}

export function keycap(ctx, x, y, label, size = 13) {
  ctx.save();
  ctx.font = `bold ${size}px ${FONT_MONO}`;
  const w = ctx.measureText(label).width + 14;
  ctx.fillStyle = 'rgba(232, 226, 208, 0.12)';
  roundRect(ctx, x, y - size, w, size + 8, 3);
  ctx.fill();
  ctx.strokeStyle = 'rgba(232, 226, 208, 0.5)';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = C.text;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, x + w / 2, y - size / 2 + 4);
  ctx.restore();
  return w;
}

export function hotelRule(ctx, x1, x2, y, alpha = 0.5) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = C.brass;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x2, y);
  ctx.stroke();
  ctx.fillStyle = C.brass;
  ctx.beginPath();
  ctx.moveTo((x1 + x2) / 2, y - 4);
  ctx.lineTo((x1 + x2) / 2 + 4, y);
  ctx.lineTo((x1 + x2) / 2, y + 4);
  ctx.lineTo((x1 + x2) / 2 - 4, y);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export { H };
