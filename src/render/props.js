import { C, FLOOR_Y, WALL_BOTTOM, FONT_SERIF, FONT_MONO } from '../config.js';
import { DOOR_W, DOOR_H, DOOR_Y } from '../world.js';
import { roundRect, noise1 } from '../util.js';
import { images } from '../assets.js';
import { drawGuest, drawShade } from './character.js';

// ---------- wall fixtures ----------------------------------------------------

export function drawSconce(ctx, s, t) {
  const y = 250;
  const lit = sconceLevel(s, t);
  ctx.save();
  // back plate + arm
  ctx.fillStyle = C.brassDark;
  roundRect(ctx, s.x - 6, y - 14, 12, 34, 3);
  ctx.fill();
  ctx.fillStyle = C.brass;
  ctx.fillRect(s.x - 2, y - 8, 4, 16);
  // shade (frosted glass, opens upward)
  ctx.beginPath();
  ctx.moveTo(s.x - 22, y - 10);
  ctx.lineTo(s.x + 22, y - 10);
  ctx.lineTo(s.x + 12, y + 14);
  ctx.lineTo(s.x - 12, y + 14);
  ctx.closePath();
  ctx.fillStyle = lit > 0.3 ? `rgba(255, 228, 180, ${0.55 + lit * 0.4})` : 'rgba(120, 110, 95, 0.9)';
  ctx.fill();
  ctx.strokeStyle = C.brass;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();
}

export function sconceLevel(s, t) {
  if (!s.on) return 0;
  if (!s.flicker) return 1;
  const n = noise1(t * 28 + s.x * 0.37);
  return n > 0.62 ? 0.25 : n > 0.35 ? 1 : 0.7;
}

export function drawDoor(ctx, door, t) {
  const x = door.x;
  const y = DOOR_Y;
  ctx.save();
  // frame
  ctx.fillStyle = C.woodLight;
  ctx.fillRect(x - 8, y - 8, DOOR_W + 16, DOOR_H + 8);
  // opening
  if (door.ajar > 0) {
    ctx.fillStyle = door.light ? 'rgba(255, 220, 160, 0.95)' : '#07070a';
    ctx.fillRect(x, y, DOOR_W, DOOR_H);
  }
  // door panel (hinged on the left, scaled to fake the swing)
  ctx.translate(x, y);
  ctx.scale(1 - door.ajar * 0.55, 1);
  const knock = door.knocking && door.knockPhase ? Math.sin(door.knockPhase * 40) * 1.2 : 0;
  ctx.translate(knock, 0);
  ctx.fillStyle = C.wood;
  ctx.fillRect(0, 0, DOOR_W, DOOR_H);
  ctx.fillStyle = C.woodDark;
  roundRect(ctx, 12, 34, DOOR_W - 24, 62, 2);
  ctx.fill();
  roundRect(ctx, 12, 112, DOOR_W - 24, 72, 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  ctx.strokeRect(14, 36, DOOR_W - 28, 58);
  ctx.strokeRect(14, 114, DOOR_W - 28, 68);
  // handle
  ctx.fillStyle = C.brass;
  roundRect(ctx, DOOR_W - 22, 104, 12, 5, 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(DOOR_W - 18, 106, 3.5, 0, Math.PI * 2);
  ctx.fill();
  // number plate
  ctx.fillStyle = C.brassDark;
  roundRect(ctx, DOOR_W / 2 - 22, 12, 44, 16, 2);
  ctx.fill();
  ctx.fillStyle = C.brass;
  roundRect(ctx, DOOR_W / 2 - 20, 14, 40, 12, 2);
  ctx.fill();
  ctx.fillStyle = '#2a1d0c';
  ctx.font = `bold 13px ${FONT_SERIF}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(door.number), DOOR_W / 2, 20.5);
  ctx.restore();
  // threshold shadow
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillRect(x - 8, WALL_BOTTOM - 4, DOOR_W + 16, 4);
}

export function drawElevator(ctx, e, t) {
  const x = e.x;
  const w = e.w;
  const top = WALL_BOTTOM - 240;
  ctx.save();
  // frame
  ctx.fillStyle = C.brassDark;
  ctx.fillRect(x - 12, top - 14, w + 24, 254);
  ctx.fillStyle = C.brass;
  ctx.fillRect(x - 8, top - 10, w + 16, 250);
  // inside (dark cab)
  ctx.fillStyle = '#0a0a0c';
  ctx.fillRect(x, top, w, 240);
  const gap = e.open * (w / 2 - 4);
  // doors
  ctx.fillStyle = '#6d5a35';
  ctx.fillRect(x, top, w / 2 - gap, 240);
  ctx.fillRect(x + w / 2 + gap, top, w / 2 - gap, 240);
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.fillRect(x + 6, top + 6, w / 2 - gap - 12, 228);
  ctx.fillRect(x + w / 2 + gap + 6, top + 6, w / 2 - gap - 12, 228);
  ctx.strokeStyle = '#2a2213';
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 0.5, top + 0.5, w / 2 - gap, 240);
  ctx.strokeRect(x + w / 2 + gap + 0.5, top + 0.5, w / 2 - gap, 240);
  // indicator
  ctx.fillStyle = '#121212';
  roundRect(ctx, x + w / 2 - 36, top - 54, 72, 32, 3);
  ctx.fill();
  ctx.fillStyle = e.arrowDown ? '#ff8a3a' : '#ff3a2a';
  ctx.font = `bold 20px ${FONT_MONO}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = ctx.fillStyle;
  ctx.shadowBlur = 10;
  ctx.fillText(e.indicator, x + w / 2, top - 37);
  ctx.shadowBlur = 0;
  // call button
  ctx.fillStyle = C.brass;
  roundRect(ctx, x + w + 22, top + 100, 14, 30, 3);
  ctx.fill();
  ctx.fillStyle = '#3a2a10';
  ctx.beginPath();
  ctx.arc(x + w + 29, top + 110, 3, 0, Math.PI * 2);
  ctx.arc(x + w + 29, top + 121, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function drawStairsDoor(ctx, d, t) {
  const x = d.x;
  const w = d.w;
  const h = 214;
  const y = WALL_BOTTOM - h;
  ctx.save();
  ctx.fillStyle = '#3a3a3a';
  ctx.fillRect(x - 8, y - 8, w + 16, h + 8);
  // dark stairwell behind
  ctx.fillStyle = '#050506';
  ctx.fillRect(x, y, w, h);
  if (d.open > 0.05) {
    // a few steps going down
    ctx.fillStyle = '#17171a';
    for (let i = 0; i < 5; i++) ctx.fillRect(x + 10 + i * 16, y + 120 + i * 18, w - 20 - i * 16, 8);
  }
  ctx.translate(x, y);
  ctx.scale(1 - d.open * 0.8, 1);
  ctx.fillStyle = '#6a6e6a';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#5a5e5a';
  ctx.fillRect(6, 6, w - 12, h - 12);
  // wired glass
  ctx.fillStyle = '#1a2226';
  ctx.fillRect(w / 2 - 16, 30, 32, 60);
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(w / 2 - 16, 30 + i * 10);
    ctx.lineTo(w / 2 + 16, 30 + i * 10);
    ctx.stroke();
  }
  // push bar
  ctx.fillStyle = '#b9bcb9';
  roundRect(ctx, 12, 118, w - 24, 10, 4);
  ctx.fill();
  ctx.fillStyle = '#c23b3b';
  roundRect(ctx, w / 2 - 34, 142, 68, 16, 2);
  ctx.fill();
  ctx.fillStyle = '#f2e9d8';
  ctx.font = `bold 10px ${FONT_SERIF}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('FIRE EXIT', w / 2, 150.5);
  ctx.restore();
}

export function drawExitSign(ctx, s, t) {
  const w = 112;
  const h = 36;
  const col = s.color === 'red' ? C.exitRed : C.exitGreen;
  ctx.save();
  ctx.fillStyle = '#1c1c1c';
  roundRect(ctx, s.x - 2, s.y - 2, w + 4, h + 4, 3);
  ctx.fill();
  ctx.fillStyle = '#0a0f0b';
  ctx.fillRect(s.x, s.y, w, h);
  ctx.shadowColor = col;
  ctx.shadowBlur = 18;
  ctx.fillStyle = col;
  ctx.font = `bold 22px ${FONT_SERIF}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.save();
  ctx.translate(s.x + w / 2 - 10, s.y + h / 2 + 1);
  if (s.mirrored) ctx.scale(-1, 1);
  ctx.fillText('EXIT', 0, 0);
  ctx.restore();
  // arrow
  ctx.translate(s.x + w - 16, s.y + h / 2);
  if (s.arrowLeft) ctx.scale(-1, 1);
  ctx.beginPath();
  ctx.moveTo(-8, -7);
  ctx.lineTo(4, 0);
  ctx.lineTo(-8, 7);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function drawMirror(ctx, m, player, t) {
  ctx.save();
  ctx.fillStyle = C.brassDark;
  roundRect(ctx, m.x - 6, m.y - 6, m.w + 12, m.h + 12, 10);
  ctx.fill();
  ctx.fillStyle = C.brass;
  roundRect(ctx, m.x - 3, m.y - 3, m.w + 6, m.h + 6, 8);
  ctx.fill();
  ctx.fillStyle = '#1b2528';
  roundRect(ctx, m.x, m.y, m.w, m.h, 6);
  ctx.fill();
  ctx.clip();
  // reflected corridor: a darker copy of the wall colour with a sheen
  const g = ctx.createLinearGradient(m.x, m.y, m.x + m.w, m.y + m.h);
  g.addColorStop(0, 'rgba(255,255,255,0.08)');
  g.addColorStop(0.5, 'rgba(255,255,255,0.0)');
  g.addColorStop(1, 'rgba(255,255,255,0.05)');
  ctx.fillStyle = g;
  ctx.fillRect(m.x, m.y, m.w, m.h);
  const dist = player.x - (m.x + m.w / 2);
  if (Math.abs(dist) < 220) {
    const rx = m.x + m.w / 2 - dist * 0.35;
    const ry = m.y + m.h - 6;
    ctx.save();
    ctx.scale(0.72, 0.72);
    ctx.translate(rx / 0.72 - rx, ry / 0.72 - ry);
    if (m.mode === 'normal') drawGuest(ctx, rx, ry, -player.facing, player.walkPhase, !player.onGround, { shadow: false, alpha: 0.85 });
    else if (m.mode === 'shade') drawShade(ctx, rx, ry, -player.facing, t, 0.9);
    ctx.restore();
  }
  ctx.restore();
}

let lightning = 0;
export function drawWindow(ctx, w, t) {
  ctx.save();
  ctx.fillStyle = C.woodLight;
  ctx.fillRect(w.x - 10, w.y - 10, w.w + 20, w.h + 20);
  ctx.fillStyle = C.woodDark;
  ctx.fillRect(w.x - 10, w.y + w.h + 6, w.w + 20, 8);
  // sky
  if (Math.random() < 0.004 && !w.moon) lightning = 1;
  const flash = lightning > 0 ? lightning : 0;
  lightning = Math.max(0, lightning - 0.08);
  ctx.fillStyle = w.moon ? '#0c1322' : `rgb(${18 + flash * 160}, ${22 + flash * 160}, ${34 + flash * 160})`;
  ctx.fillRect(w.x, w.y, w.w, w.h);
  ctx.save();
  ctx.beginPath();
  ctx.rect(w.x, w.y, w.w, w.h);
  ctx.clip();
  if (w.moon) {
    ctx.fillStyle = '#e9e4cf';
    ctx.shadowColor = '#e9e4cf';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(w.x + w.w * 0.62, w.y + w.h * 0.3, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#d9d4bf';
    ctx.beginPath();
    ctx.arc(w.x + w.w * 0.58, w.y + w.h * 0.27, 6, 0, Math.PI * 2);
    ctx.arc(w.x + w.w * 0.68, w.y + w.h * 0.36, 4, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.strokeStyle = 'rgba(190, 210, 230, 0.35)';
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 40; i++) {
      const px = w.x + ((i * 53 + t * 40) % w.w);
      const py = w.y + ((i * 97 + t * 520 + i * 31) % (w.h + 30)) - 30;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px - 3, py + 16);
      ctx.stroke();
    }
    // city silhouette
    ctx.fillStyle = '#070a10';
    for (let i = 0; i < 8; i++) {
      const bw = 18 + ((i * 13) % 20);
      const bh = 40 + ((i * 29) % 60);
      ctx.fillRect(w.x + i * 22, w.y + w.h - bh, bw, bh);
    }
  }
  ctx.restore();
  // mullions
  ctx.fillStyle = C.wood;
  ctx.fillRect(w.x + w.w / 2 - 3, w.y, 6, w.h);
  ctx.fillRect(w.x, w.y + w.h / 2 - 3, w.w, 6);
  // glass sheen
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.fillRect(w.x, w.y, w.w / 2 - 3, w.h / 2 - 3);
  ctx.restore();
}

export function drawPainting(ctx, p, t) {
  ctx.save();
  ctx.translate(p.x + p.w / 2, p.y);
  ctx.rotate(p.tilt);
  ctx.translate(-p.w / 2, 0);
  ctx.fillStyle = C.brassDark;
  ctx.fillRect(-8, -8, p.w + 16, p.h + 16);
  ctx.fillStyle = C.brass;
  ctx.fillRect(-5, -5, p.w + 10, p.h + 10);
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, p.w, p.h);
  const img = images[p.img];
  if (img) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, p.w, p.h);
    ctx.clip();
    if (p.flip) {
      ctx.translate(p.w / 2, p.h / 2);
      ctx.rotate(Math.PI);
      ctx.translate(-p.w / 2, -p.h / 2);
    }
    // cover-fit
    const s = Math.max(p.w / img.width, p.h / img.height);
    const dw = img.width * s;
    const dh = img.height * s;
    ctx.drawImage(img, (p.w - dw) / 2, (p.h - dh) / 2, dw, dh);
    ctx.restore();
  }
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, p.w, p.h);
  // picture lamp
  ctx.fillStyle = C.brass;
  roundRect(ctx, p.w / 2 - 20, -16, 40, 6, 3);
  ctx.fill();
  ctx.restore();
}

export function drawBookshelf(ctx, b, t) {
  const x = b.x;
  const w = 130;
  const h = 270;
  const y = WALL_BOTTOM - h;
  ctx.save();
  ctx.fillStyle = C.woodDark;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = C.wood;
  ctx.fillRect(x + 6, y + 6, w - 12, h - 12);
  const shelves = 4;
  const sh = (h - 12) / shelves;
  const palette = ['#7a2a2a', '#2a4a6a', '#5a5a2a', '#3a2a5a', '#6a3a1a', '#2a5a3a', '#8a7a4a', '#4a2a2a'];
  for (let i = 0; i < shelves; i++) {
    const sy = y + 6 + i * sh;
    ctx.fillStyle = '#120b06';
    ctx.fillRect(x + 6, sy, w - 12, sh);
    ctx.fillStyle = C.woodLight;
    ctx.fillRect(x + 6, sy + sh - 5, w - 12, 5);
    const rows = i < shelves - 1 || b.extraRow;
    if (!rows) continue;
    let bx = x + 10;
    let k = 0;
    while (bx < x + w - 16) {
      const bw = 8 + ((i * 7 + k * 5) % 9);
      const bh = sh - 14 - ((k * 11 + i * 3) % 12);
      ctx.fillStyle = palette[(i * 3 + k) % palette.length];
      ctx.fillRect(bx, sy + sh - 5 - bh, bw, bh);
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(bx + 1, sy + sh - 5 - bh + 3, bw - 2, 1);
      bx += bw + 2;
      k++;
    }
  }
  ctx.restore();
}

export function drawClock(ctx, c, t, timeOfRun) {
  const x = c.x;
  const w = 64;
  const h = 250;
  const y = WALL_BOTTOM - h;
  ctx.save();
  ctx.fillStyle = C.woodDark;
  roundRect(ctx, x, y, w, h, 4);
  ctx.fill();
  ctx.fillStyle = C.wood;
  roundRect(ctx, x + 5, y + 5, w - 10, h - 10, 3);
  ctx.fill();
  // crown
  ctx.fillStyle = C.woodLight;
  ctx.fillRect(x - 4, y - 6, w + 8, 10);
  // pendulum window
  ctx.fillStyle = '#0d0905';
  ctx.fillRect(x + 14, y + 100, w - 28, 120);
  const dir = c.reverse ? -1 : 1;
  const sw = c.stopped ? 0.18 : Math.sin(t * 3.1 * dir) * 0.35;
  ctx.strokeStyle = C.brass;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y + 100);
  ctx.lineTo(x + w / 2 + Math.sin(sw) * 70, y + 100 + Math.cos(sw) * 70);
  ctx.stroke();
  ctx.fillStyle = C.brass;
  ctx.beginPath();
  ctx.arc(x + w / 2 + Math.sin(sw) * 70, y + 100 + Math.cos(sw) * 70, 9, 0, Math.PI * 2);
  ctx.fill();
  // face
  ctx.fillStyle = '#e6dcc3';
  ctx.beginPath();
  ctx.arc(x + w / 2, y + 52, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = C.brassDark;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.strokeStyle = '#2a1d0c';
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(x + w / 2 + Math.cos(a) * 17, y + 52 + Math.sin(a) * 17);
    ctx.lineTo(x + w / 2 + Math.cos(a) * 20, y + 52 + Math.sin(a) * 20);
    ctx.stroke();
  }
  // hands: minute hand sweeps visibly (one turn per 60s of play), hour hand slow.
  const elapsed = c.stopped ? 0 : timeOfRun * dir;
  const minuteA = ((elapsed / 60) % 1) * Math.PI * 2 - Math.PI / 2 + Math.PI * 1.1;
  const hourA = ((elapsed / 720) % 1) * Math.PI * 2 - Math.PI / 2 + Math.PI * 0.55;
  const secA = ((elapsed % 60) / 60) * Math.PI * 2 - Math.PI / 2;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y + 52);
  ctx.lineTo(x + w / 2 + Math.cos(hourA) * 10, y + 52 + Math.sin(hourA) * 10);
  ctx.stroke();
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y + 52);
  ctx.lineTo(x + w / 2 + Math.cos(minuteA) * 15, y + 52 + Math.sin(minuteA) * 15);
  ctx.stroke();
  ctx.strokeStyle = '#a02020';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y + 52);
  ctx.lineTo(x + w / 2 + Math.cos(secA) * 17, y + 52 + Math.sin(secA) * 17);
  ctx.stroke();
  ctx.restore();
}

export function drawVending(ctx, v, t) {
  const x = v.x;
  const w = 92;
  const h = 210;
  const y = WALL_BOTTOM - h;
  const glow = v.red ? 'rgba(255, 60, 40, 0.85)' : 'rgba(170, 220, 255, 0.85)';
  ctx.save();
  ctx.fillStyle = '#2b2f33';
  roundRect(ctx, x, y, w, h, 4);
  ctx.fill();
  ctx.fillStyle = '#1a1d20';
  ctx.fillRect(x + 8, y + 14, w - 16, 120);
  // shelves of cans
  for (let r = 0; r < 3; r++) {
    for (let k = 0; k < 4; k++) {
      ctx.fillStyle = ['#8a2a2a', '#2a5a8a', '#8a7a2a', '#3a7a3a'][(r + k) % 4];
      ctx.fillRect(x + 12 + k * 18, y + 24 + r * 38, 12, 24);
    }
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(x + 8, y + 50 + r * 38, w - 16, 2);
  }
  // lit panel
  ctx.fillStyle = glow;
  ctx.shadowColor = glow;
  ctx.shadowBlur = 14;
  ctx.fillRect(x + 10, y + 4, w - 20, 7);
  ctx.shadowBlur = 0;
  ctx.fillStyle = v.red ? '#ff5a4a' : '#bfe8ff';
  ctx.font = `bold 10px ${FONT_MONO}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('ICE · DRINKS', x + w / 2, y + 146);
  // tray
  ctx.fillStyle = '#0d0f11';
  ctx.fillRect(x + 12, y + 165, w - 24, 26);
  ctx.restore();
}

export function drawPhone(ctx, p, t) {
  const x = p.x;
  const y = 300;
  const shake = p.ringing ? Math.sin(t * 60) * (Math.sin(t * 1.5) > 0 ? 1.5 : 0) : 0;
  ctx.save();
  ctx.translate(shake, 0);
  ctx.fillStyle = '#2d3138';
  roundRect(ctx, x, y, 50, 90, 4);
  ctx.fill();
  ctx.fillStyle = '#3d4249';
  ctx.fillRect(x + 6, y + 8, 38, 34);
  ctx.fillStyle = '#111';
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) ctx.fillRect(x + 12 + c * 10, y + 12 + r * 7, 6, 4);
  // handset
  ctx.fillStyle = '#15171a';
  roundRect(ctx, x - 12, y + 10, 12, 70, 5);
  ctx.fill();
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 6, y + 80);
  ctx.quadraticCurveTo(x - 10, y + 110, x + 10, y + 96);
  ctx.stroke();
  ctx.restore();
}

export function drawTV(ctx, tv, t) {
  const x = tv.x;
  const y = FLOOR_Y;
  ctx.save();
  // stand
  ctx.fillStyle = C.woodDark;
  ctx.fillRect(x, y - 40, 110, 40);
  ctx.fillStyle = C.wood;
  ctx.fillRect(x + 4, y - 36, 102, 32);
  // crt
  ctx.fillStyle = '#2a2622';
  roundRect(ctx, x + 10, y - 118, 90, 78, 6);
  ctx.fill();
  ctx.fillStyle = tv.static ? '#9aa' : '#0a0c0e';
  roundRect(ctx, x + 18, y - 110, 68, 56, 8);
  ctx.fill();
  if (tv.static) {
    ctx.save();
    roundRect(ctx, x + 18, y - 110, 68, 56, 8);
    ctx.clip();
    for (let i = 0; i < 220; i++) {
      const v = Math.random() * 255;
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(x + 18 + Math.random() * 68, y - 110 + Math.random() * 56, 2, 2);
    }
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    const band = (t * 120) % 70;
    ctx.fillRect(x + 18, y - 110 + band, 68, 5);
    ctx.restore();
  } else {
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(x + 24, y - 104, 20, 10);
  }
  // knobs
  ctx.fillStyle = '#4a4440';
  ctx.beginPath();
  ctx.arc(x + 92, y - 95, 3, 0, Math.PI * 2);
  ctx.arc(x + 92, y - 82, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

let handprintTinted = null;
function tintedHandprint() {
  const img = images.handprint;
  if (!img) return null;
  if (handprintTinted) return handprintTinted;
  // Keep only the alpha of the source and fill it with dried blood.
  const c = document.createElement('canvas');
  c.width = img.width;
  c.height = img.height;
  const g = c.getContext('2d');
  g.drawImage(img, 0, 0);
  g.globalCompositeOperation = 'source-in';
  g.fillStyle = C.blood;
  g.fillRect(0, 0, c.width, c.height);
  handprintTinted = c;
  return c;
}

export function drawHandprint(ctx, h) {
  const img = tintedHandprint();
  if (!img) return;
  ctx.save();
  ctx.translate(h.x, h.y);
  ctx.rotate(h.r);
  ctx.globalAlpha = 0.9;
  ctx.drawImage(img, -30 * h.s, -30 * h.s, 60 * h.s, 60 * h.s);
  ctx.restore();
}

export function drawStain(ctx, s) {
  ctx.save();
  ctx.fillStyle = 'rgba(130, 16, 18, 0.85)';
  for (let i = 0; i < 9; i++) {
    const px = s.x + s.dir * i * (s.w / 9);
    const py = FLOOR_Y - 14 + ((i * 17) % 22);
    ctx.beginPath();
    ctx.ellipse(px, py, 16 - i, 5 - i * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// ---------- floor furniture --------------------------------------------------

export function drawProp(ctx, p, t) {
  const y = FLOOR_Y;
  const x = p.x;
  ctx.save();
  switch (p.type) {
    case 'sideTable': {
      ctx.fillStyle = C.wood;
      ctx.fillRect(x - 25, y - 60, 70, 8);
      ctx.fillStyle = C.woodDark;
      ctx.fillRect(x - 18, y - 52, 6, 52);
      ctx.fillRect(x + 32, y - 52, 6, 52);
      break;
    }
    case 'bench': {
      ctx.fillStyle = C.woodDark;
      ctx.fillRect(x + 10, y - 36, 8, 36);
      ctx.fillRect(x + 132, y - 36, 8, 36);
      ctx.fillStyle = '#3a4a3a';
      roundRect(ctx, x, y - 44, 150, 14, 4);
      ctx.fill();
      ctx.fillStyle = C.wood;
      ctx.fillRect(x, y - 30, 150, 5);
      break;
    }
    case 'luggageCart': {
      ctx.fillStyle = C.brass;
      ctx.fillRect(x + 6, y - 76, 4, 70);
      ctx.fillRect(x + 118, y - 76, 4, 70);
      ctx.fillRect(x + 6, y - 76, 116, 4);
      ctx.fillRect(x + 6, y - 10, 116, 4);
      ctx.fillStyle = '#111';
      ctx.beginPath();
      ctx.arc(x + 20, y - 4, 6, 0, Math.PI * 2);
      ctx.arc(x + 108, y - 4, 6, 0, Math.PI * 2);
      ctx.fill();
      suitcase(ctx, x + 18, y - 56, 46, 44, '#5a3a22');
      suitcase(ctx, x + 68, y - 48, 42, 36, '#2a3a4a');
      break;
    }
    case 'sofa': {
      ctx.fillStyle = '#1e3a30';
      roundRect(ctx, x, y - 62, 220, 62, 8);
      ctx.fill();
      ctx.fillStyle = '#25483b';
      roundRect(ctx, x + 14, y - 46, 92, 30, 6);
      ctx.fill();
      roundRect(ctx, x + 114, y - 46, 92, 30, 6);
      ctx.fill();
      ctx.fillStyle = '#17302a';
      roundRect(ctx, x - 6, y - 70, 24, 70, 8);
      ctx.fill();
      roundRect(ctx, x + 202, y - 70, 24, 70, 8);
      ctx.fill();
      ctx.fillStyle = C.woodDark;
      ctx.fillRect(x + 6, y - 6, 10, 6);
      ctx.fillRect(x + 204, y - 6, 10, 6);
      break;
    }
    case 'coffeeTable': {
      ctx.fillStyle = C.wood;
      roundRect(ctx, x, y - 36, 110, 8, 2);
      ctx.fill();
      ctx.fillStyle = C.woodDark;
      ctx.fillRect(x + 8, y - 28, 5, 28);
      ctx.fillRect(x + 97, y - 28, 5, 28);
      // ashtray + glass
      ctx.fillStyle = '#777';
      ctx.beginPath();
      ctx.ellipse(x + 40, y - 38, 10, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(200,220,230,0.5)';
      ctx.fillRect(x + 70, y - 52, 8, 16);
      break;
    }
    case 'armchair': {
      ctx.fillStyle = '#4a1f22';
      roundRect(ctx, x, y - 90, 86, 90, 10);
      ctx.fill();
      ctx.fillStyle = '#5c2a2e';
      roundRect(ctx, x + 12, y - 44, 62, 26, 6);
      ctx.fill();
      ctx.fillStyle = '#3c171a';
      roundRect(ctx, x - 4, y - 58, 18, 58, 8);
      ctx.fill();
      roundRect(ctx, x + 72, y - 58, 18, 58, 8);
      ctx.fill();
      break;
    }
    case 'housekeepingCart': {
      ctx.fillStyle = '#c9c4b8';
      ctx.fillRect(x + 4, y - 86, 118, 76);
      ctx.fillStyle = '#9d978a';
      ctx.fillRect(x + 4, y - 86, 118, 6);
      ctx.fillRect(x + 4, y - 48, 118, 4);
      ctx.fillStyle = '#eee';
      for (let i = 0; i < 4; i++) ctx.fillRect(x + 12 + i * 28, y - 78, 22, 24);
      ctx.fillStyle = '#5a7ab0';
      ctx.fillRect(x + 12, y - 40, 40, 26);
      ctx.fillStyle = '#111';
      ctx.beginPath();
      ctx.arc(x + 20, y - 4, 6, 0, Math.PI * 2);
      ctx.arc(x + 106, y - 4, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#444';
      ctx.fillRect(x + 118, y - 100, 4, 20);
      break;
    }
    case 'luggagePile': {
      suitcase(ctx, x, y - 52, 90, 52, '#4a2f1e');
      break;
    }
    case 'luggagePile2': {
      suitcase(ctx, x, y - 52, 90, 52, '#2f3a4a');
      suitcase(ctx, x + 4, y - 104, 82, 52, '#5a2a2a');
      break;
    }
    default:
      break;
  }
  ctx.restore();
}

function suitcase(ctx, x, y, w, h, col) {
  ctx.fillStyle = col;
  roundRect(ctx, x, y, w, h, 5);
  ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(x + 6, y + h * 0.4, w - 12, 2);
  ctx.fillStyle = C.brass;
  ctx.fillRect(x + w / 2 - 8, y - 5, 16, 5);
  ctx.fillRect(x + w / 2 - 4, y + h * 0.4 - 3, 8, 6);
}

export function drawPlant(ctx, p, t) {
  const x = p.x;
  const y = FLOOR_Y - 60; // sits on the side table
  ctx.save();
  ctx.fillStyle = '#5a3a2a';
  ctx.beginPath();
  ctx.moveTo(x - 12, y - 18);
  ctx.lineTo(x + 12, y - 18);
  ctx.lineTo(x + 9, y);
  ctx.lineTo(x - 9, y);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = p.dead ? '#3a2a1a' : '#2f6b3a';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  for (let i = 0; i < 6; i++) {
    const a = -Math.PI / 2 + (i - 2.5) * 0.35;
    const len = p.dead ? 26 : 38;
    const droop = p.dead ? 28 : Math.sin(t * 0.8 + i) * 1.5;
    ctx.beginPath();
    ctx.moveTo(x, y - 18);
    ctx.quadraticCurveTo(x + Math.cos(a) * len * 0.6, y - 18 + Math.sin(a) * len * 0.6, x + Math.cos(a) * len, y - 18 + Math.sin(a) * len + droop);
    ctx.stroke();
  }
  ctx.restore();
}

export function drawDoll(ctx, d, player, t) {
  if (!d.present) return;
  const x = d.x;
  const y = FLOOR_Y - 44; // on the bench seat
  const look = Math.max(-1, Math.min(1, (player.x - x) / 300));
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(1.5, 1.5);
  ctx.translate(-x, -y);
  // dress
  ctx.fillStyle = '#b8c4d6';
  ctx.beginPath();
  ctx.moveTo(x - 10, y);
  ctx.lineTo(x + 10, y);
  ctx.lineTo(x + 6, y - 22);
  ctx.lineTo(x - 6, y - 22);
  ctx.closePath();
  ctx.fill();
  // head (porcelain)
  ctx.fillStyle = '#efe6dc';
  ctx.beginPath();
  ctx.arc(x + look * 2, y - 30, 9, 0, Math.PI * 2);
  ctx.fill();
  // hair
  ctx.fillStyle = '#3a2416';
  ctx.beginPath();
  ctx.arc(x + look * 2, y - 32, 9.5, Math.PI, Math.PI * 2);
  ctx.fill();
  // eyes follow you
  ctx.fillStyle = '#111';
  ctx.fillRect(x + look * 4 - 4, y - 31, 2, 2);
  ctx.fillRect(x + look * 4 + 2, y - 31, 2, 2);
  ctx.fillStyle = '#a33';
  ctx.fillRect(x + look * 3 - 1, y - 26, 2, 1);
  ctx.restore();
}

export { DOOR_W, DOOR_H, DOOR_Y };
