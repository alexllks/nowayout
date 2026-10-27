import { SAVE_KEY } from './config.js';

const defaults = {
  volume: 0.7,
  bestLoops: 0,
  escapes: 0,
  runs: 0,
  seenIntro: false,
};

let state = { ...defaults };

export function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) state = { ...defaults, ...JSON.parse(raw) };
  } catch {
    state = { ...defaults };
  }
  return state;
}

export function save(patch) {
  state = { ...state, ...patch };
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch {
    // Storage may be unavailable (private mode). The game still works.
  }
  return state;
}

export function getSave() {
  return state;
}
