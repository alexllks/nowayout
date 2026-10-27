import { W, H, C, FONT_SERIF } from './config.js';
import { initInput, input, setViewport } from './input.js';
import { loadAssets } from './assets.js';
import { loadSave } from './save.js';
import { audio } from './audio.js';
import { Fader, text, hotelRule } from './ui.js';
import { TitleScene } from './scenes/title.js';
import { IntroScene } from './scenes/intro.js';
import { PlayScene } from './scenes/play.js';
import { EndingScene } from './scenes/ending.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d', { alpha: false });
const renderScale = Math.min(window.devicePixelRatio || 1, 2);
canvas.width = W * renderScale;
canvas.height = H * renderScale;

const game = {
  canvas,
  ctx,
  fader: new Fader(),
  scenes: {},
  scene: null,
  transitioning: false,
  setScene(name, params = {}) {
    this.scene?.exit?.();
    this.scene = this.scenes[name];
    this.scene.enter(params);
  },
  transition(name, params = {}, speed = 2.2) {
    if (this.transitioning) return;
    this.transitioning = true;
    this.fader.to(1, speed, () => {
      this.setScene(name, params);
      this.fader.to(0, speed, () => (this.transitioning = false));
    });
  },
};

game.scenes.title = new TitleScene(game);
game.scenes.intro = new IntroScene(game);
game.scenes.play = new PlayScene(game);
game.scenes.ending = new EndingScene(game);

function resize() {
  const scale = Math.min(window.innerWidth / W, window.innerHeight / H);
  const cw = Math.floor(W * scale);
  const ch = Math.floor(H * scale);
  canvas.style.width = `${cw}px`;
  canvas.style.height = `${ch}px`;
  const offX = Math.floor((window.innerWidth - cw) / 2);
  const offY = Math.floor((window.innerHeight - ch) / 2);
  canvas.style.left = `${offX}px`;
  canvas.style.top = `${offY}px`;
  setViewport(scale, offX, offY);
}
window.addEventListener('resize', resize);
resize();

let progress = 0;
let loaded = false;

function drawLoading(t) {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  text(ctx, 'NO WAY OUT', W / 2, H / 2 - 30, { size: 26, align: 'center', color: C.brass, letterSpacing: 10 });
  hotelRule(ctx, W / 2 - 120, W / 2 + 120, H / 2 - 8, 0.6);
  ctx.fillStyle = 'rgba(232,226,208,0.15)';
  ctx.fillRect(W / 2 - 120, H / 2 + 20, 240, 2);
  ctx.fillStyle = C.accent;
  ctx.fillRect(W / 2 - 120, H / 2 + 20, 240 * progress, 2);
  text(ctx, 'checking in…', W / 2, H / 2 + 54, { size: 14, align: 'center', color: C.textDim, alpha: 0.5 + Math.sin(t * 3) * 0.3 });
}

let last = performance.now();
let elapsed = 0;
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  elapsed += dt;
  ctx.setTransform(renderScale, 0, 0, renderScale, 0, 0);
  if (!loaded) {
    drawLoading(elapsed);
  } else {
    game.scene.update(dt);
    game.fader.update(dt);
    game.scene.draw(ctx);
    game.fader.draw(ctx);
  }
  input.endFrame();
  requestAnimationFrame(frame);
}

async function boot() {
  initInput();
  const s = loadSave();
  audio.volume = s.volume;
  requestAnimationFrame(frame);
  await loadAssets((p) => (progress = p));
  loaded = true;
  // Debug: ?skip jumps straight into the corridor (silent until a key is pressed).
  if (new URLSearchParams(location.search).has('skip')) game.setScene('play', { newRun: true });
  else game.setScene('title');
}

boot();

// Keep the game from swallowing focus problems on some browsers.
window.addEventListener('click', () => canvas.focus?.());

// Exposed for debugging in the console (e.g. __game.scene.player.x = 5300).
window.__game = game;

export { FONT_SERIF };
