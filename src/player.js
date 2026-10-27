import { FLOOR_Y, PHYSICS } from './config.js';
import { audio } from './audio.js';

export class Player {
  constructor(x) {
    this.w = 40;
    this.h = 94;
    this.x = x; // centre of the feet
    this.y = FLOOR_Y; // feet
    this.vx = 0;
    this.vy = 0;
    this.facing = 1;
    this.onGround = true;
    this.walkPhase = 0;
    this.stepTimer = 0;
    this.frozen = false;
    this.dead = false;
  }

  get box() {
    return { x: this.x - this.w / 2, y: this.y - this.h, w: this.w, h: this.h };
  }

  update(dt, input, world, solids) {
    if (this.frozen || this.dead) {
      this.vx = 0;
      return;
    }
    let move = 0;
    if (input.isDown('left')) move -= 1;
    if (input.isDown('right')) move += 1;
    this.vx = move * PHYSICS.walkSpeed;
    if (move !== 0) this.facing = move;

    if (input.pressed('jump') && this.onGround) {
      this.vy = -PHYSICS.jumpVelocity;
      this.onGround = false;
      audio.play('jump', { volume: 0.35, rate: 1.1 });
    }

    // Horizontal move + resolve.
    this.x += this.vx * dt;
    if (this.x < 70) this.x = 70;
    if (this.x > world.width - 80) this.x = world.width - 80;
    for (const s of solids) {
      const b = this.box;
      if (overlap(b, s)) {
        if (this.vx > 0) this.x = s.x - this.w / 2;
        else if (this.vx < 0) this.x = s.x + s.w + this.w / 2;
      }
    }

    // Vertical move + resolve.
    this.vy += PHYSICS.gravity * dt;
    const prevY = this.y;
    this.y += this.vy * dt;
    this.onGround = false;
    if (this.y >= FLOOR_Y) {
      if (prevY < FLOOR_Y - 2) audio.footstep(true);
      this.y = FLOOR_Y;
      this.vy = 0;
      this.onGround = true;
    }
    for (const s of solids) {
      const b = this.box;
      if (!overlap(b, s)) continue;
      if (this.vy > 0 && prevY <= s.y + 1) {
        // Landed on top.
        if (prevY < s.y - 2) audio.footstep(true);
        this.y = s.y;
        this.vy = 0;
        this.onGround = true;
      } else if (this.vy < 0 && prevY - this.h >= s.y + s.h - 1) {
        // Hit the underside.
        this.y = s.y + s.h + this.h;
        this.vy = 0;
      } else {
        // Side overlap left over from the horizontal pass: push out.
        if (this.x < s.x + s.w / 2) this.x = s.x - this.w / 2;
        else this.x = s.x + s.w + this.w / 2;
      }
    }

    // Walk animation + footsteps.
    if (this.onGround && move !== 0) {
      this.walkPhase += dt * 9;
      this.stepTimer -= dt;
      if (this.stepTimer <= 0) {
        audio.footstep(false);
        this.stepTimer = 0.34;
      }
    } else {
      this.walkPhase = this.onGround ? 0 : this.walkPhase;
      this.stepTimer = 0.1;
    }
  }
}

function overlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}
