import { W, H, C, FLOOR_Y, WALL_BOTTOM, TOTAL_LOOPS, FONT_MONO, FONT_SERIF } from '../config.js';
import { buildWorld, getSolids } from '../world.js';
import { chooseAnomaly, ANOMALIES } from '../anomalies.js';
import { Player } from '../player.js';
import { Flood } from '../entities.js';
import { input, mouse } from '../input.js';
import { audio } from '../audio.js';
import { mulberry32, clamp, lerp, roundRect, formatTime } from '../util.js';
import { drawBackground, drawWallLayer, drawFloorLayer, drawLighting } from '../render/corridor.js';
import { drawGuest } from '../render/character.js';
import { Menu, text, paragraph, dim, keycap, hotelRule } from '../ui.js';
import { getSave, save } from '../save.js';

const CARD_MIN = 1.4;
const CARD_AUTO = 4.5;

export class PlayScene {
  constructor(game) {
    this.game = game;
    this.pauseMenu = new Menu(
      [
        { label: 'Resume', action: 'resume' },
        {
          label: 'Volume',
          value: () => `${'▮'.repeat(Math.round(audio.volume * 10))}${'▯'.repeat(10 - Math.round(audio.volume * 10))}`,
          adjust: (d) => {
            audio.setVolume(Math.round((audio.volume + d * 0.1) * 10) / 10);
            save({ volume: audio.volume });
          },
        },
        { label: 'Restart run', action: 'restart' },
        { label: 'Back to the lobby', action: 'quit' },
      ],
      { y: 330, gap: 52, size: 26, width: 520 },
    );
  }

  enter({ newRun = true } = {}) {
    this.t = 0;
    this.paused = false;
    if (newRun || !this.run) this.newRun();
    audio.startLoop('ambience', { bus: 'music', volume: 0.5 });
    audio.startSynth('rain', { freq: 1300, volume: 0 });
    this.startLoop(true);
  }

  exit() {
    audio.stopAll(0.8);
  }

  newRun() {
    const seed = (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
    this.run = { seed, rng: mulberry32(seed), loop: 0, used: new Set(), resets: 0, deaths: 0, corridors: 0, time: 0 };
    save({ runs: getSave().runs + 1 });
  }

  startLoop(first = false) {
    const { run } = this;
    this.world = buildWorld();
    // Debug: ?anomaly=<id> forces one (or "none"), handy when testing a specific change.
    const forced = new URLSearchParams(location.search).get('anomaly');
    const anomaly = forced ? ANOMALIES.find((a) => a.id === forced) || null : chooseAnomaly(run.rng, run.loop, run.used);
    if (anomaly) {
      run.used.add(anomaly.id);
      anomaly.apply(this.world, run.rng);
      this.world.anomaly = anomaly;
    }
    this.solids = getSolids(this.world);
    this.player = new Player(this.world.elevator.x + this.world.elevator.w / 2);
    this.player.frozen = true;
    this.cam = { x: 0 };
    this.loopTime = 0;
    this.phase = 'arrive';
    this.world.elevator.open = 1;
    this.prompt = null;
    this.card = null;
    this.flash = 0;
    this.ghostSteps = 0;
    this.wasMoving = false;
    this.knockTimer = 2.5;
    this.ringTimer = 1.5;
    this.tickAcc = 0;
    this.showControls = first && run.corridors === 0;
    audio.ding();
    audio.stopSynth('static', 0.2);
    audio.stopSynth('buzz', 0.2);
    audio.stopSynth('water', 0.5);
    audio.stopSynth('hum', 0.2);
    audio.startTone('hum', { freq: this.world.vending.red ? 38 : 52, volume: 0 });
    if (this.world.flags.flicker) audio.startTone('buzz', { freq: 110, type: 'square', volume: 0.012, lowpass: 900 });
  }

  // ---- game flow -----------------------------------------------------------

  choose(dir) {
    const hasAnomaly = !!this.world.anomaly;
    const correct = (dir === 'back') === hasAnomaly;
    this.phase = 'leaving';
    this.leaveDir = dir;
    this.leaveT = 0;
    this.pending = correct ? 'correct' : 'wrong';
    this.player.frozen = true;
    this.prompt = null;
    if (dir === 'back') audio.ding();
    else audio.play('door', { volume: 0.7 });
  }

  kill(reason) {
    if (this.phase !== 'play') return;
    this.phase = 'dead';
    this.deadT = 0;
    this.deathReason = reason;
    this.player.dead = true;
    this.player.frozen = true;
    this.flash = 1;
    audio.play('death', { volume: 0.8 });
    audio.stopSynth('water', 0.3);
  }

  showCard(kind) {
    const { run } = this;
    const a = this.world.anomaly;
    run.corridors++;
    if (kind === 'correct') {
      run.loop++;
      if (run.loop > getSave().bestLoops) save({ bestLoops: run.loop });
      if (run.loop >= TOTAL_LOOPS) {
        this.card = { kind: 'escape', title: 'THE STAIRS GO DOWN THIS TIME', sub: '', count: run.loop };
        audio.escapeChord();
      } else {
        this.card = { kind, title: `CORRIDOR ${run.loop}`, sub: run.loop === 1 ? 'Eight to go.' : `${TOTAL_LOOPS - run.loop} to go.`, count: run.loop };
        audio.tone(660, { dur: 0.6, volume: 0.12 });
      }
    } else if (kind === 'wrong') {
      run.resets++;
      run.loop = 0;
      this.card = {
        kind,
        title: 'WRONG',
        sub: a ? `There was something. ${a.hint}` : 'Nothing had changed.',
        count: 0,
      };
      audio.glitch();
    } else {
      run.deaths++;
      run.loop = 0;
      this.card = { kind: 'death', title: this.deathReason.toUpperCase(), sub: a ? a.hint : '', count: 0 };
      audio.glitch();
    }
    this.phase = 'card';
    this.cardT = 0;
    // The card screen is already black, so drop the fade instantly.
    this.game.fader.alpha = 0;
    this.game.fader.target = 0;
  }

  dismissCard() {
    if (this.card.kind === 'escape') {
      const { run } = this;
      this.game.transition('ending', { stats: { time: run.time, corridors: run.corridors, resets: run.resets, deaths: run.deaths } }, 1.2);
      this.phase = 'done';
      return;
    }
    this.startLoop(false);
    this.game.fader.alpha = 1;
    this.game.fader.to(0, 1.8);
  }

  // ---- update ----------------------------------------------------------------

  update(dt) {
    this.t += dt;
    if (this.paused) {
      const action = this.pauseMenu.update();
      if (action === 'resume' || input.pressed('pause')) this.paused = false;
      else if (action === 'restart') {
        this.paused = false;
        this.newRun();
        this.game.fader.to(1, 3, () => {
          this.startLoop(false);
          this.game.fader.to(0, 2);
        });
      } else if (action === 'quit') {
        this.paused = false;
        this.game.transition('title');
      }
      return;
    }
    if (input.pressed('pause') && (this.phase === 'play' || this.phase === 'arrive')) {
      this.paused = true;
      this.pauseMenu.index = 0;
      return;
    }

    this.run.time += dt;
    this.loopTime += dt;
    this.flash = Math.max(0, this.flash - dt * 1.5);
    const { world, player } = this;

    switch (this.phase) {
      case 'arrive': {
        world.elevator.open = clamp(1 - (this.loopTime - 0.4) / 0.8, 0, 1);
        if (this.loopTime > 1.3) {
          this.phase = 'play';
          player.frozen = false;
        }
        break;
      }
      case 'play': {
        player.update(dt, input, world, this.solids);
        for (const e of world.entities) e.update(dt, this);
        this.updateAmbient(dt);
        this.updateInteraction();
        break;
      }
      case 'leaving': {
        this.leaveT += dt;
        const door = this.leaveDir === 'back' ? world.elevator : world.stairsDoor;
        door.open = clamp(this.leaveT / 0.6, 0, 1);
        if (this.leaveT > 0.4) {
          const target = this.leaveDir === 'back' ? world.elevator.x + world.elevator.w / 2 : world.stairsDoor.x + 70;
          player.x = lerp(player.x, target, dt * 3);
          player.walkPhase += dt * 9;
          player.facing = Math.sign(target - player.x) || player.facing;
        }
        if (this.leaveT > 1.3 && !this.fadingOut) {
          this.fadingOut = true;
          this.game.fader.to(1, 2.2, () => {
            this.fadingOut = false;
            this.showCard(this.pending);
          });
        }
        break;
      }
      case 'dead': {
        this.deadT += dt;
        for (const e of world.entities) if (e instanceof Flood) e.update(dt, this);
        if (this.deadT > 1.5 && !this.fadingOut) {
          this.fadingOut = true;
          this.game.fader.to(1, 1.6, () => {
            this.fadingOut = false;
            this.showCard('death');
          });
        }
        break;
      }
      case 'card': {
        this.cardT += dt;
        if (this.cardT > CARD_MIN && (input.anyPressed() || mouse.clicked || this.cardT > CARD_AUTO)) this.dismissCard();
        break;
      }
      default:
        break;
    }

    // camera: lead a little in the facing direction
    const lead = this.phase === 'play' ? player.facing * 90 : 0;
    const target = clamp(player.x - W / 2 + lead, 0, world.width - W);
    this.cam.x = lerp(this.cam.x, target, 1 - Math.pow(0.001, dt));
  }

  updateInteraction() {
    const { world, player } = this;
    const e = world.elevator;
    const s = world.stairsDoor;
    this.prompt = null;
    if (player.x < e.x + e.w + 10 && player.onGround) this.prompt = 'back';
    else if (player.x > s.x - 30 && player.onGround) this.prompt = 'forward';
    if (this.prompt && input.pressed('interact')) this.choose(this.prompt);
  }

  updateAmbient(dt) {
    const { world, player } = this;
    const dist = (x) => Math.abs(player.x - x);
    // rain through the window
    const rainLevel = world.window.moon ? 0 : 0.03 + 0.26 * clamp(1 - dist(world.window.x + 80) / 900, 0, 1);
    audio.setSynth('rain', rainLevel);
    // vending machine hum
    audio.setSynth('hum', 0.05 * clamp(1 - dist(world.vending.x) / 520, 0, 1));
    // television
    if (world.tv.static) {
      const v = 0.3 * clamp(1 - dist(world.tv.x + 55) / 520, 0, 1);
      if (v > 0.01 && !audio.synthLoops?.static) audio.startSynth('static', { type: 'highpass', freq: 1800, volume: 0 });
      audio.setSynth('static', v);
    }
    // knocking from inside a room
    const knocker = world.doors.find((d) => d.knocking);
    if (knocker) {
      knocker.knockPhase = this.loopTime < (knocker.knockUntil || 0) ? this.loopTime : 0;
      if (dist(knocker.x + 48) < 460) {
        this.knockTimer -= dt;
        if (this.knockTimer <= 0) {
          this.knockTimer = 3.5 + Math.random() * 3;
          knocker.knockUntil = this.loopTime + 0.7;
          [0, 180, 360].forEach((ms) => setTimeout(() => audio.knock(), ms));
        }
      }
    }
    // payphone
    if (world.phone.ringing && dist(world.phone.x) < 900) {
      this.ringTimer -= dt;
      if (this.ringTimer <= 0) {
        this.ringTimer = 2.4;
        audio.phoneRing();
      }
    }
    // clock ticking
    if (!world.clock.stopped && dist(world.clock.x + 32) < 420) {
      this.tickAcc += dt;
      if (this.tickAcc >= 1) {
        this.tickAcc -= 1;
        audio.tick(world.clock.reverse);
      }
    }
    // footsteps that continue after you stop
    const moving = player.vx !== 0 && player.onGround;
    if (world.flags.footstepsBehind && this.wasMoving && !moving) {
      this.ghostSteps = 3;
      this.ghostTimer = 0.25;
    }
    this.wasMoving = moving;
    if (this.ghostSteps > 0) {
      this.ghostTimer -= dt;
      if (this.ghostTimer <= 0) {
        audio.burst({ dur: 0.09, volume: 0.1, freq: 350, brown: true });
        this.ghostSteps--;
        this.ghostTimer = 0.32;
      }
    }
  }

  // ---- draw ------------------------------------------------------------------

  draw(ctx) {
    const { world, player, cam, t } = this;
    if (this.phase === 'card' || this.phase === 'done') {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);
      this.drawCard(ctx);
      return;
    }
    ctx.save();
    ctx.translate(-Math.round(cam.x), 0);
    drawBackground(ctx, world, cam);
    drawWallLayer(ctx, world, cam, t, player, this.run.time);
    drawFloorLayer(ctx, world, cam, t, player);
    for (const e of world.entities) if (!(e instanceof Flood)) e.draw(ctx, t);
    if (this.phase === 'dead') {
      ctx.save();
      ctx.translate(player.x, player.y);
      ctx.rotate(Math.min(1, this.deadT * 2) * (Math.PI / 2) * player.facing);
      drawGuest(ctx, 0, 0, player.facing, 0, true, { shadow: false });
      ctx.restore();
    } else {
      drawGuest(ctx, player.x, player.y, player.facing, player.walkPhase, !player.onGround);
    }
    for (const e of world.entities) if (e instanceof Flood) e.draw(ctx, t);
    ctx.restore();

    drawLighting(ctx, world, cam, t, player);

    if (this.flash > 0) dim(ctx, this.flash * 0.7, '120,0,0');
    this.drawHud(ctx);
    if (this.paused) this.drawPause(ctx);
  }

  drawHud(ctx) {
    const { run } = this;
    // key tag, top-left
    ctx.save();
    ctx.globalAlpha = 0.92;
    ctx.fillStyle = 'rgba(10, 8, 6, 0.75)';
    roundRect(ctx, 24, 22, 236, 54, 6);
    ctx.fill();
    ctx.strokeStyle = C.brassDark;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = C.brass;
    ctx.beginPath();
    ctx.arc(46, 49, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0a0806';
    ctx.beginPath();
    ctx.arc(46, 49, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    text(ctx, '4F', 66, 56, { size: 24, color: C.brass, weight: 'bold', shadow: false });
    text(ctx, 'CORRIDOR', 108, 41, { size: 11, color: C.textDim, letterSpacing: 3, font: FONT_MONO, shadow: false });
    for (let i = 0; i < TOTAL_LOOPS; i++) {
      const x = 110 + i * 16;
      const y = 58;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = i < run.loop ? C.accent : 'rgba(232,226,208,0.18)';
      ctx.fillRect(-4, -4, 8, 8);
      ctx.restore();
    }
    text(ctx, `${run.loop}/${TOTAL_LOOPS}`, 252, 59, { size: 13, color: C.textDim, align: 'right', font: FONT_MONO, shadow: false });

    // prompt
    if (this.prompt && this.phase === 'play') {
      const label = this.prompt === 'back' ? 'Take the lift back' : 'Take the stairs';
      ctx.save();
      ctx.font = `20px ${FONT_SERIF}`;
      const tw = ctx.measureText(label).width;
      const bw = tw + 90;
      const bx = W / 2 - bw / 2;
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      roundRect(ctx, bx, H - 96, bw, 44, 6);
      ctx.fill();
      ctx.restore();
      keycap(ctx, bx + 16, H - 68, 'E', 15);
      text(ctx, label, bx + 62, H - 66, { size: 20, color: C.text });
    }
    // controls hint on the very first corridor
    if (this.showControls && this.loopTime < 7 && this.phase !== 'card') {
      const a = clamp(Math.min(this.loopTime - 1, 7 - this.loopTime), 0, 1);
      if (a > 0) {
        ctx.save();
        ctx.globalAlpha = a;
        let kx = W / 2 - 230;
        kx += keycap(ctx, kx, H - 30, '← →') + 8;
        text(ctx, 'walk', kx, H - 30, { size: 15, color: C.textDim });
        kx += 60;
        kx += keycap(ctx, kx, H - 30, '↑ / SPACE') + 8;
        text(ctx, 'jump', kx, H - 30, { size: 15, color: C.textDim });
        kx += 62;
        kx += keycap(ctx, kx, H - 30, 'E') + 8;
        text(ctx, 'use a door', kx, H - 30, { size: 15, color: C.textDim });
        kx += 100;
        kx += keycap(ctx, kx, H - 30, 'ESC') + 8;
        text(ctx, 'pause', kx, H - 30, { size: 15, color: C.textDim });
        ctx.restore();
      }
    }
  }

  drawCard(ctx) {
    const c = this.card;
    if (!c) return;
    const a = clamp(this.cardT / 0.5, 0, 1);
    const col = c.kind === 'correct' || c.kind === 'escape' ? C.text : C.accent;
    if (c.kind !== 'correct' && c.kind !== 'escape' && this.cardT < 0.35) {
      // glitch bars
      ctx.fillStyle = 'rgba(211, 58, 58, 0.25)';
      for (let i = 0; i < 6; i++) ctx.fillRect(0, Math.random() * H, W, Math.random() * 30);
    }
    text(ctx, c.title, W / 2, H / 2 - 40, { size: c.kind === 'escape' ? 34 : 44, align: 'center', color: col, letterSpacing: 8, alpha: a });
    hotelRule(ctx, W / 2 - 110, W / 2 + 110, H / 2 - 12, a * 0.7);
    if (c.sub) paragraph(ctx, c.sub, W / 2, H / 2 + 28, 720, { size: 20, align: 'center', color: C.textDim, alpha: a });
    // the nine marks
    for (let i = 0; i < TOTAL_LOOPS; i++) {
      const x = W / 2 - (TOTAL_LOOPS - 1) * 14 + i * 28;
      ctx.save();
      ctx.globalAlpha = a;
      ctx.translate(x, H / 2 + 100);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = i < c.count ? C.accent : 'rgba(232,226,208,0.18)';
      ctx.fillRect(-5, -5, 10, 10);
      ctx.restore();
    }
    if (this.cardT > CARD_MIN) {
      const p = 0.4 + Math.sin(this.t * 3) * 0.3;
      text(ctx, 'any key', W / 2, H - 60, { size: 14, align: 'center', color: C.textDim, alpha: p, letterSpacing: 3 });
    }
  }

  drawPause(ctx) {
    dim(ctx, 0.72);
    text(ctx, 'PAUSED', W / 2, 240, { size: 30, align: 'center', color: C.brass, letterSpacing: 8 });
    hotelRule(ctx, W / 2 - 120, W / 2 + 120, 262);
    this.pauseMenu.draw(ctx, this.t);
    text(ctx, `Run time ${formatTime(this.run.time)}  ·  wrong turns ${this.run.resets}  ·  deaths ${this.run.deaths}`, W / 2, 600, { size: 15, align: 'center', color: C.textDim });
  }
}

export { FLOOR_Y, WALL_BOTTOM };
