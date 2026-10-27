import { W, H, C, CEILING_Y, WALL_BOTTOM, FLOOR_Y } from '../config.js';
import { DOOR_W } from '../world.js';
import {
  drawSconce, sconceLevel, drawDoor, drawElevator, drawStairsDoor, drawExitSign, drawMirror,
  drawWindow, drawPainting, drawBookshelf, drawClock, drawVending, drawPhone, drawTV,
  drawHandprint, drawStain, drawProp, drawPlant, drawDoll,
} from './props.js';

let wallpaperPattern = null;
let carpetPattern = null;
let overlay = null;

function ensurePatterns(ctx) {
  if (wallpaperPattern) return;
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const g = c.getContext('2d');
  g.fillStyle = C.wallpaper;
  g.fillRect(0, 0, 64, 64);
  g.strokeStyle = C.wallpaperPattern;
  g.lineWidth = 1.5;
  // damask-ish diamonds
  for (const [ox, oy] of [[32, 0], [0, 32], [64, 32], [32, 64]]) {
    g.beginPath();
    g.moveTo(ox, oy - 18);
    g.lineTo(ox + 12, oy);
    g.lineTo(ox, oy + 18);
    g.lineTo(ox - 12, oy);
    g.closePath();
    g.stroke();
  }
  g.beginPath();
  g.arc(32, 32, 5, 0, Math.PI * 2);
  g.stroke();
  wallpaperPattern = ctx.createPattern(c, 'repeat');

  const k = document.createElement('canvas');
  k.width = 80;
  k.height = 40;
  const kg = k.getContext('2d');
  kg.fillStyle = C.carpet;
  kg.fillRect(0, 0, 80, 40);
  kg.fillStyle = C.carpetPattern;
  kg.beginPath();
  kg.moveTo(40, 4);
  kg.lineTo(60, 20);
  kg.lineTo(40, 36);
  kg.lineTo(20, 20);
  kg.closePath();
  kg.fill();
  kg.fillStyle = 'rgba(255, 210, 120, 0.08)';
  kg.fillRect(0, 19, 80, 2);
  carpetPattern = ctx.createPattern(k, 'repeat');

  overlay = document.createElement('canvas');
  overlay.width = W;
  overlay.height = H;
}

export function drawBackground(ctx, world, cam) {
  ensurePatterns(ctx);
  const x0 = cam.x;
  // ceiling
  ctx.fillStyle = C.ceiling;
  ctx.fillRect(x0, 0, W, CEILING_Y);
  ctx.fillStyle = C.cornice;
  ctx.fillRect(x0, CEILING_Y - 18, W, 18);
  ctx.fillStyle = C.corniceLight;
  ctx.fillRect(x0, CEILING_Y - 6, W, 3);
  // ceiling tiles
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  for (let x = Math.floor(x0 / 120) * 120; x < x0 + W; x += 120) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, CEILING_Y - 18);
    ctx.stroke();
  }
  // wallpaper
  ctx.save();
  ctx.translate(0, 0);
  ctx.fillStyle = wallpaperPattern;
  ctx.fillRect(x0, CEILING_Y, W, 400 - CEILING_Y);
  ctx.restore();
  // chair rail + wainscot
  ctx.fillStyle = C.chairRail;
  ctx.fillRect(x0, 400, W, 10);
  ctx.fillStyle = C.wainscot;
  ctx.fillRect(x0, 410, W, WALL_BOTTOM - 410);
  ctx.fillStyle = C.wainscotPanel;
  for (let x = Math.floor(x0 / 160) * 160; x < x0 + W; x += 160) {
    ctx.fillRect(x + 16, 424, 128, WALL_BOTTOM - 440);
  }
  ctx.strokeStyle = 'rgba(0,0,0,0.35)';
  for (let x = Math.floor(x0 / 160) * 160; x < x0 + W; x += 160) {
    ctx.strokeRect(x + 16.5, 424.5, 128, WALL_BOTTOM - 440);
  }
  ctx.fillStyle = C.skirting;
  ctx.fillRect(x0, WALL_BOTTOM - 14, W, 14);
  // floor: carpet runner with borders, dark boards at the near edge
  ctx.fillStyle = '#120c08';
  ctx.fillRect(x0, WALL_BOTTOM, W, H - WALL_BOTTOM);
  ctx.fillStyle = carpetPattern;
  ctx.fillRect(x0, WALL_BOTTOM + 8, W, H - WALL_BOTTOM - 30);
  ctx.fillStyle = C.carpetBorder;
  ctx.fillRect(x0, WALL_BOTTOM + 8, W, 2);
  ctx.fillRect(x0, WALL_BOTTOM + 14, W, 1);
  ctx.fillRect(x0, H - 22, W, 2);
  ctx.fillRect(x0, H - 28, W, 1);
  // ambient darkening of the floor's far edge
  const g = ctx.createLinearGradient(0, WALL_BOTTOM, 0, WALL_BOTTOM + 60);
  g.addColorStop(0, 'rgba(0,0,0,0.5)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(x0, WALL_BOTTOM, W, 60);
  // end wall on the far right
  if (x0 + W > world.width - 60) {
    ctx.fillStyle = C.wainscot;
    ctx.fillRect(world.width - 40, 0, 60, H);
    ctx.fillStyle = C.chairRail;
    ctx.fillRect(world.width - 46, 0, 6, H);
  }
  if (x0 < 40) {
    ctx.fillStyle = C.wainscot;
    ctx.fillRect(-20, 0, 60, H);
    ctx.fillStyle = C.chairRail;
    ctx.fillRect(40, 0, 6, H);
  }
}

const visible = (cam, x, pad = 320) => x > cam.x - pad && x < cam.x + W + pad;

export function drawWallLayer(ctx, world, cam, t, player, runTime) {
  for (const s of world.stains) if (visible(cam, s.x)) drawStain(ctx, s);
  if (visible(cam, world.elevator.x)) drawElevator(ctx, world.elevator, t);
  if (visible(cam, world.mirror.x)) drawMirror(ctx, world.mirror, player, t);
  for (const d of world.doors) if (visible(cam, d.x)) drawDoor(ctx, d, t);
  if (world.extraDoor && visible(cam, world.extraDoor.x)) drawDoor(ctx, world.extraDoor, t);
  for (const p of world.paintings) if (visible(cam, p.x)) drawPainting(ctx, p, t);
  if (visible(cam, world.window.x)) drawWindow(ctx, world.window, t);
  if (visible(cam, world.bookshelf.x)) drawBookshelf(ctx, world.bookshelf, t);
  if (visible(cam, world.clock.x)) drawClock(ctx, world.clock, t, runTime);
  if (visible(cam, world.vending.x)) drawVending(ctx, world.vending, t);
  if (visible(cam, world.phone.x)) drawPhone(ctx, world.phone, t);
  if (visible(cam, world.stairsDoor.x)) drawStairsDoor(ctx, world.stairsDoor, t);
  if (visible(cam, world.exitSign.x)) drawExitSign(ctx, world.exitSign, t);
  for (const s of world.sconces) if (visible(cam, s.x)) drawSconce(ctx, s, t);
  for (const h of world.handprints) if (visible(cam, h.x)) drawHandprint(ctx, h);
}

export function drawFloorLayer(ctx, world, cam, t, player) {
  if (visible(cam, world.tv.x)) drawTV(ctx, world.tv, t);
  const props = world.props.filter((p) => visible(cam, p.x));
  for (const p of props) drawProp(ctx, p, t);
  if (visible(cam, world.plant.x)) drawPlant(ctx, world.plant, t);
  if (visible(cam, world.doll.x)) drawDoll(ctx, world.doll, player, t);
}

// Darkness with holes punched where the lamps are. Drawn in screen space.
export function drawLighting(ctx, world, cam, t, player) {
  ensurePatterns(ctx);
  if (location.search.includes('nolight')) return;
  const o = overlay.getContext('2d');
  o.globalCompositeOperation = 'source-over';
  o.clearRect(0, 0, W, H);
  const blackout = world.flags.blackout;
  o.fillStyle = blackout ? 'rgba(2, 2, 4, 0.965)' : 'rgba(4, 4, 8, 0.58)';
  o.fillRect(0, 0, W, H);
  o.globalCompositeOperation = 'destination-out';

  const hole = (sx, sy, r, a, ry = r) => {
    const g = o.createRadialGradient(sx, sy, 0, sx, sy, r);
    g.addColorStop(0, `rgba(0,0,0,${a})`);
    g.addColorStop(0.55, `rgba(0,0,0,${a * 0.55})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    o.fillStyle = g;
    o.save();
    o.translate(sx, sy);
    o.scale(1, ry / r);
    o.beginPath();
    o.arc(0, 0, r, 0, Math.PI * 2);
    o.fill();
    o.restore();
  };

  for (const s of world.sconces) {
    if (!visible(cam, s.x)) continue;
    const lvl = sconceLevel(s, t);
    if (lvl <= 0) continue;
    hole(s.x - cam.x, 250, 290, 0.95 * lvl, 330);
  }
  // elevator indicator + vending + exit sign + window + ajar doors + tv
  hole(world.elevator.x + world.elevator.w / 2 - cam.x, 270, 120, 0.35);
  hole(world.vending.x + 46 - cam.x, WALL_BOTTOM - 100, 150, 0.45);
  hole(world.exitSign.x + 56 - cam.x, 130, 160, 0.5);
  hole(world.window.x + 80 - cam.x, 285, 170, world.window.moon ? 0.55 : 0.3);
  if (world.tv.static) hole(world.tv.x + 55 - cam.x, FLOOR_Y - 80, 170, 0.6);
  for (const d of [...world.doors, world.extraDoor].filter(Boolean)) {
    if (d.light && d.ajar > 0) hole(d.x + DOOR_W / 2 - cam.x, WALL_BOTTOM - 90, 200, 0.8);
  }
  // the player always carries a little light so the game stays readable
  const px = player.x - cam.x;
  const py = player.y - 36;
  if (blackout) {
    // flashlight cone
    const g = o.createRadialGradient(px, py, 10, px + player.facing * 170, py, 260);
    g.addColorStop(0, 'rgba(0,0,0,0.95)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    o.fillStyle = g;
    o.beginPath();
    o.moveTo(px, py);
    o.lineTo(px + player.facing * 420, py - 150);
    o.lineTo(px + player.facing * 420, py + 150);
    o.closePath();
    o.fill();
    hole(px, py, 70, 0.7);
  } else {
    hole(px, py, 150, 0.35);
  }

  ctx.save();
  ctx.drawImage(overlay, 0, 0);
  // warm bloom on lit lamps
  ctx.globalCompositeOperation = 'lighter';
  for (const s of world.sconces) {
    if (!visible(cam, s.x)) continue;
    const lvl = sconceLevel(s, t);
    if (lvl <= 0) continue;
    const g = ctx.createRadialGradient(s.x - cam.x, 240, 0, s.x - cam.x, 240, 120);
    g.addColorStop(0, `rgba(255, 190, 110, ${0.16 * lvl})`);
    g.addColorStop(1, 'rgba(255, 190, 110, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(s.x - cam.x - 120, 120, 240, 240);
  }
  ctx.globalCompositeOperation = 'source-over';
  // vignette
  const v = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 0.95);
  v.addColorStop(0, 'rgba(0,0,0,0)');
  v.addColorStop(1, 'rgba(0,0,0,0.6)');
  ctx.fillStyle = v;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}
