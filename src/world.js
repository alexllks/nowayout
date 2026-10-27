import { WORLD_W, WALL_BOTTOM, FLOOR_Y } from './config.js';

export const DOOR_W = 96;
export const DOOR_H = 200;
export const DOOR_Y = WALL_BOTTOM - DOOR_H;

// The baseline corridor. Every loop starts from a fresh copy of this and an
// anomaly (if any) mutates it. Renderers only read from the world object,
// so an anomaly never needs its own drawing code for a change of state.
export function buildWorld() {
  const doors = [
    [560, 401], [760, 402], [960, 403], [1160, 404],
    [3000, 405], [3200, 406], [3400, 407], [3600, 408],
  ].map(([x, number]) => ({ x, number, ajar: 0, knocking: false, light: false }));

  const sconces = [
    470, 660, 860, 1060, 1260, 1480, 1720, 2060, 2420, 2900,
    3100, 3300, 3500, 3700, 3900, 4200, 4450, 4700, 4960, 5200,
  ].map((x) => ({ x, on: true, flicker: false }));

  const paintings = [
    { id: 'corridor', x: 1330, y: 215, w: 110, h: 140, img: 'paintingCorridor', tilt: 0, flip: false },
    { id: 'ballroom', x: 2130, y: 170, w: 230, h: 150, img: 'paintingHall', tilt: 0, flip: false },
    { id: 'stairs', x: 3830, y: 215, w: 120, h: 130, img: 'paintingStairs', tilt: 0, flip: false },
  ];

  // Floor props. `solid` boxes are what the player collides with; the top of
  // a solid is a platform. y is the top of the box (FLOOR_Y is the floor).
  const props = [
    { type: 'sideTable', x: 370, solid: { x: 345, y: FLOOR_Y - 60, w: 70, h: 60 } },
    { type: 'bench', x: 1420, solid: { x: 1420, y: FLOOR_Y - 44, w: 150, h: 44 } },
    { type: 'luggageCart', x: 1640, solid: { x: 1646, y: FLOOR_Y - 76, w: 118, h: 76 } },
    { type: 'sofa', x: 2120, solid: { x: 2120, y: FLOOR_Y - 62, w: 220, h: 62 } },
    { type: 'coffeeTable', x: 2380, solid: { x: 2380, y: FLOOR_Y - 36, w: 110, h: 36 } },
    { type: 'tvStand', x: 2520 },
    { type: 'armchair', x: 2660, solid: { x: 2666, y: FLOOR_Y - 58, w: 86, h: 58 } },
    { type: 'housekeepingCart', x: 4300, solid: { x: 4304, y: FLOOR_Y - 86, w: 118, h: 86 } },
    { type: 'luggagePile', x: 4560, solid: { x: 4560, y: FLOOR_Y - 52, w: 90, h: 52 } },
    { type: 'luggagePile2', x: 4650, solid: { x: 4650, y: FLOOR_Y - 104, w: 90, h: 104 } },
  ];

  return {
    width: WORLD_W,
    doors,
    sconces,
    paintings,
    props,
    elevator: { x: 110, w: 180, open: 0, indicator: '4', arrowDown: false },
    stairsDoor: { x: 5300, w: 110, open: 0 },
    exitSign: { x: 5295, y: 110, color: 'green', mirrored: false, arrowLeft: false },
    mirror: { x: 310, y: 200, w: 80, h: 150, mode: 'normal' },
    plant: { x: 380, dead: false },
    window: { x: 1880, y: 180, w: 160, h: 210, moon: false },
    tv: { x: 2520, static: false },
    bookshelf: { x: 2760, extraRow: false },
    clock: { x: 2900, reverse: false, stopped: false },
    vending: { x: 3980, red: false },
    phone: { x: 4140, ringing: false },
    doll: { present: false, x: 1460, headTurn: 0 },
    stains: [],
    handprints: [],
    drips: [],
    extraDoor: null,
    flags: { blackout: false, flicker: false, footstepsBehind: false, chandelierSwing: false },
    entities: [],
    anomaly: null,
  };
}

export function getSolids(world) {
  const solids = [];
  for (const p of world.props) if (p.solid) solids.push(p.solid);
  return solids;
}

export function doorRect(door) {
  return { x: door.x, y: DOOR_Y, w: DOOR_W, h: DOOR_H };
}
