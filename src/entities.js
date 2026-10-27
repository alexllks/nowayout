import { FLOOR_Y, WALL_BOTTOM, CEILING_Y, H, PHYSICS } from './config.js';
import { drawShade } from './render/character.js';
import { audio } from './audio.js';

// Entities get update(dt, scene) and draw(ctx, t). `scene` is the play scene:
// it exposes player, world, time and kill(reason).

// A shade steps out of the stairwell once you are deep in the corridor and
// walks you back towards the lift. Touch means death.
export class Stalker {
  constructor() {
    this.state = 'waiting';
    this.x = 5340;
    this.y = FLOOR_Y;
    this.t = 0;
    this.heart = 0;
  }
  update(dt, scene) {
    const { player, world } = scene;
    this.t += dt;
    if (this.state === 'waiting') {
      if (player.x > 2500) {
        this.state = 'emerging';
        this.emerge = 0;
        audio.play('door', { volume: 0.6, rate: 0.7 });
        audio.sting();
      }
      return;
    }
    if (this.state === 'emerging') {
      this.emerge += dt;
      world.stairsDoor.open = Math.min(1, this.emerge / 0.8);
      if (this.emerge > 1) {
        this.state = 'hunting';
        world.stairsDoor.open = 0;
      }
      return;
    }
    // hunting
    const dir = Math.sign(player.x - this.x) || -1;
    this.x += dir * PHYSICS.stalkerSpeed * dt;
    const d = Math.abs(player.x - this.x);
    this.heart -= dt;
    if (this.heart <= 0) {
      audio.heartbeat();
      this.heart = d < 300 ? 0.45 : d < 700 ? 0.7 : 1.1;
    }
    if (d < 26 && !player.dead) scene.kill('It found you.');
  }
  draw(ctx, t) {
    if (this.state === 'waiting') return;
    const alpha = this.state === 'emerging' ? Math.min(1, this.emerge) : 0.95;
    drawShade(ctx, this.x, this.y, -1, t, alpha);
  }
}

// Water comes up the stairwell and takes the corridor from the far end.
export class Flood {
  constructor() {
    this.active = false;
    this.edge = 5600;
    this.level = 0; // 0..1 rise
  }
  update(dt, scene) {
    const { player } = scene;
    if (!this.active) {
      if (player.x > 2500) {
        this.active = true;
        audio.whoosh();
        audio.startSynth('water', { brown: true, freq: 420, volume: 0.0 });
      }
      return;
    }
    this.level = Math.min(1, this.level + dt * 0.5);
    this.edge -= 250 * dt;
    const d = Math.abs(player.x - this.edge);
    audio.setSynth('water', Math.max(0.05, 0.5 - d / 1800));
    if (player.x > this.edge - 10 && !player.dead) scene.kill('The water took you.');
  }
  draw(ctx, t) {
    if (!this.active) return;
    const top = FLOOR_Y - 20 - 100 * this.level;
    ctx.save();
    ctx.fillStyle = 'rgba(28, 64, 98, 0.72)';
    ctx.beginPath();
    ctx.moveTo(this.edge, H);
    for (let x = this.edge; x <= this.edge + 700; x += 20) {
      const wave = Math.sin(x * 0.03 + t * 5) * 6 + Math.sin(x * 0.011 - t * 3) * 4;
      ctx.lineTo(x, top + wave);
    }
    ctx.lineTo(this.edge + 700, H);
    ctx.closePath();
    ctx.fill();
    // foam at the leading edge
    ctx.fillStyle = 'rgba(220, 235, 245, 0.55)';
    for (let i = 0; i < 12; i++) {
      const fx = this.edge + Math.sin(t * 7 + i) * 14 + i * 4;
      const fy = top + 8 + ((i * 37) % 60);
      ctx.fillRect(fx, fy, 3, 3);
    }
    ctx.restore();
  }
}

// A figure at the far end of the corridor. It leaves when you get close.
export class Figure {
  constructor() {
    this.x = 5180;
    this.y = FLOOR_Y;
    this.state = 'standing';
    this.t = 0;
  }
  update(dt, scene) {
    const { player, world } = scene;
    this.t += dt;
    if (this.state === 'standing' && player.x > this.x - 620) {
      this.state = 'leaving';
      audio.play('door', { volume: 0.4, rate: 0.85 });
    }
    if (this.state === 'leaving') {
      this.x += 140 * dt;
      world.stairsDoor.open = Math.min(1, world.stairsDoor.open + dt * 1.2);
      if (this.x > world.stairsDoor.x + 60) {
        this.state = 'gone';
      }
    }
    if (this.state === 'gone') {
      world.stairsDoor.open = Math.max(0, world.stairsDoor.open - dt * 1.5);
    }
  }
  draw(ctx, t) {
    if (this.state === 'gone') return;
    drawShade(ctx, this.x, this.y, this.state === 'leaving' ? 1 : -1, t * 0.4, 0.85);
  }
}

// Water drips from a ceiling tile and pools on the carpet.
export class Drip {
  constructor(x) {
    this.x = x;
    this.drops = [];
    this.timer = 0.4;
    this.pool = 0;
  }
  update(dt, scene) {
    this.timer -= dt;
    if (this.timer <= 0) {
      this.drops.push({ y: CEILING_Y + 6, vy: 0 });
      this.timer = 0.9 + Math.random() * 0.8;
    }
    for (const d of this.drops) {
      d.vy += 1800 * dt;
      d.y += d.vy * dt;
      if (d.y >= FLOOR_Y - 4) {
        d.dead = true;
        this.pool = Math.min(1, this.pool + 0.08);
        if (Math.abs(scene.player.x - this.x) < 500) audio.drip();
      }
    }
    this.drops = this.drops.filter((d) => !d.dead);
  }
  draw(ctx) {
    ctx.save();
    // stained tile
    ctx.fillStyle = 'rgba(60, 50, 30, 0.6)';
    ctx.beginPath();
    ctx.ellipse(this.x, CEILING_Y - 20, 40, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(150, 190, 220, 0.8)';
    for (const d of this.drops) ctx.fillRect(this.x - 1, d.y, 3, 8);
    ctx.fillStyle = `rgba(90, 120, 150, ${0.35 * this.pool})`;
    ctx.beginPath();
    ctx.ellipse(this.x, FLOOR_Y - 2, 26 + 30 * this.pool, 6 + 4 * this.pool, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export { WALL_BOTTOM };
