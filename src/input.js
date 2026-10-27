// Keyboard + mouse, mapped to game actions. Mouse coordinates are converted
// to logical canvas units by the viewport set from main.js.

const BINDINGS = {
  left: ['ArrowLeft', 'KeyA'],
  right: ['ArrowRight', 'KeyD'],
  jump: ['ArrowUp', 'KeyW', 'Space'],
  interact: ['KeyE', 'KeyF'],
  confirm: ['Enter', 'Space', 'KeyE'],
  back: ['Escape', 'Backspace'],
  pause: ['Escape', 'KeyP'],
  up: ['ArrowUp', 'KeyW'],
  down: ['ArrowDown', 'KeyS'],
};

const down = new Set();
const pressed = new Set();
const viewport = { scale: 1, offX: 0, offY: 0 };

export const mouse = { x: -1, y: -1, down: false, clicked: false, moved: false };

let anyInputThisFrame = false;

export function setViewport(scale, offX, offY) {
  viewport.scale = scale;
  viewport.offX = offX;
  viewport.offY = offY;
}

function toLogical(e) {
  mouse.x = (e.clientX - viewport.offX) / viewport.scale;
  mouse.y = (e.clientY - viewport.offY) / viewport.scale;
}

export function initInput() {
  window.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    down.add(e.code);
    pressed.add(e.code);
    anyInputThisFrame = true;
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
  });
  window.addEventListener('keyup', (e) => down.delete(e.code));
  window.addEventListener('blur', () => down.clear());
  window.addEventListener('mousemove', (e) => {
    toLogical(e);
    mouse.moved = true;
  });
  window.addEventListener('mousedown', (e) => {
    toLogical(e);
    mouse.down = true;
    mouse.clicked = true;
    anyInputThisFrame = true;
  });
  window.addEventListener('mouseup', () => (mouse.down = false));
  window.addEventListener('contextmenu', (e) => e.preventDefault());
}

export const input = {
  isDown(action) {
    return BINDINGS[action].some((c) => down.has(c));
  },
  pressed(action) {
    return BINDINGS[action].some((c) => pressed.has(c));
  },
  anyPressed() {
    return anyInputThisFrame;
  },
  // Call once at the end of each frame.
  endFrame() {
    pressed.clear();
    mouse.clicked = false;
    mouse.moved = false;
    anyInputThisFrame = false;
  },
};
