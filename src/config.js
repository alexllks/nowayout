// Logical rendering size. The canvas is scaled to fit the window (letterboxed).
export const W = 1280;
export const H = 720;

// Vertical layout of the corridor (logical pixels).
export const CEILING_Y = 72;      // bottom edge of the cornice
export const WALL_BOTTOM = 556;   // far edge of the carpet (where the back wall meets the floor)
export const FLOOR_Y = 648;       // the line the player walks on

// How long the corridor is, in logical pixels.
export const WORLD_W = 5600;

export const TOTAL_LOOPS = 9;

export const PHYSICS = Object.freeze({
  gravity: 2600,
  jumpVelocity: 860,
  walkSpeed: 300,
  stalkerSpeed: 262,
});

// One palette for the whole hotel. Everything procedural reads from here.
export const C = Object.freeze({
  ceiling: '#0b0d0f',
  cornice: '#2a2219',
  corniceLight: '#4a3b2a',
  wallpaper: '#1d2a29',
  wallpaperPattern: 'rgba(120, 150, 130, 0.07)',
  chairRail: '#3b2a1b',
  wainscot: '#24170f',
  wainscotPanel: '#2d1d13',
  skirting: '#1a100a',
  carpet: '#4b171c',
  carpetDark: '#36101470',
  carpetBorder: '#8a6a2c',
  carpetPattern: 'rgba(0,0,0,0.18)',
  wood: '#3a2416',
  woodLight: '#5b3b23',
  woodDark: '#21140b',
  brass: '#c9a24a',
  brassDark: '#7a5c1f',
  bulb: '#ffd9a0',
  glow: 'rgba(255, 196, 120, 0.22)',
  exitGreen: '#3ddc84',
  exitRed: '#ff3b3b',
  text: '#e8e2d0',
  textDim: '#9c9484',
  accent: '#d33a3a',
  blood: '#6c0b0b',
  water: 'rgba(30, 70, 110, 0.78)',
});

export const FONT_SERIF = 'Georgia, "Times New Roman", Times, serif';
export const FONT_MONO = '"Courier New", Courier, monospace';

export const SAVE_KEY = 'nowayout.v2';
