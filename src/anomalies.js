import { FLOOR_Y } from './config.js';
import { pick } from './util.js';
import { Stalker, Flood, Figure, Drip } from './entities.js';

// tier 1: subtle. tier 2: noticeable if you look. tier 3: impossible to miss (and often lethal).
// Each `apply` mutates a fresh world. `hint` is shown on the run summary only.
export const ANOMALIES = [
  {
    id: 'roomNumber', tier: 1, hint: 'A room number was wrong.',
    apply(w, rng) {
      const i = 1 + Math.floor(rng() * (w.doors.length - 1));
      w.doors[i].number = w.doors[i - 1].number;
    },
  },
  {
    id: 'roomNumberOff', tier: 1, hint: 'A door had a number that does not belong on this floor.',
    apply(w, rng) {
      const d = pick(rng, w.doors);
      d.number = 300 + (d.number % 100);
    },
  },
  {
    id: 'paintingSwap', tier: 2, hint: 'A painting showed a different scene.',
    apply(w, rng) {
      const p = pick(rng, [w.paintings[0], w.paintings[2]]);
      p.img = pick(rng, ['paintingGraveyard', 'paintingHouse']);
    },
  },
  {
    id: 'paintingTilt', tier: 1, hint: 'A painting hung crooked.',
    apply(w, rng) {
      const p = pick(rng, w.paintings);
      p.tilt = (rng() < 0.5 ? -1 : 1) * 0.11;
    },
  },
  {
    id: 'paintingFlip', tier: 2, hint: 'A painting hung upside down.',
    apply(w, rng) {
      pick(rng, w.paintings).flip = true;
    },
  },
  {
    id: 'sconceOut', tier: 1, hint: 'Two wall lamps were dark.',
    apply(w, rng) {
      const i = Math.floor(rng() * (w.sconces.length - 1));
      w.sconces[i].on = false;
      w.sconces[i + 1].on = false;
    },
  },
  {
    id: 'flicker', tier: 2, hint: 'The lights flickered.',
    apply(w) {
      w.flags.flicker = true;
      for (const s of w.sconces) s.flicker = true;
    },
  },
  {
    id: 'blackout', tier: 3, hint: 'The power was out.',
    apply(w) {
      w.flags.blackout = true;
      for (const s of w.sconces) s.on = false;
    },
  },
  {
    id: 'clockReverse', tier: 2, hint: 'The clock ran backwards.',
    apply(w) {
      w.clock.reverse = true;
    },
  },
  {
    id: 'clockStopped', tier: 1, hint: 'The clock had stopped.',
    apply(w) {
      w.clock.stopped = true;
    },
  },
  {
    id: 'plantDead', tier: 1, hint: 'The plant by the lift was dead.',
    apply(w) {
      w.plant.dead = true;
    },
  },
  {
    id: 'extraDoor', tier: 2, hint: 'There was a door that is not usually there.',
    apply(w) {
      w.extraDoor = { x: 4800, number: 409, ajar: 0, knocking: false, light: false };
    },
  },
  {
    id: 'doorAjar', tier: 2, hint: 'A room door was open, with the light on inside.',
    apply(w, rng) {
      const d = pick(rng, w.doors);
      d.ajar = 0.35;
      d.light = true;
    },
  },
  {
    id: 'doorKnock', tier: 2, hint: 'Someone knocked from inside a room.',
    apply(w, rng) {
      pick(rng, w.doors).knocking = true;
    },
  },
  {
    id: 'carpetStain', tier: 1, hint: 'There was a stain on the carpet.',
    apply(w, rng) {
      const d = pick(rng, w.doors);
      w.stains.push({ x: d.x + 48, w: 170, dir: rng() < 0.5 ? -1 : 1 });
    },
  },
  {
    id: 'handprints', tier: 2, hint: 'There were handprints on the wall.',
    apply(w, rng) {
      const d = pick(rng, w.doors);
      for (let i = 0; i < 3; i++) {
        // Reaching up the wallpaper above a door.
        w.handprints.push({
          x: d.x + 8 + i * 40 + rng() * 16,
          y: 250 + rng() * 70,
          s: 1 + rng() * 0.5,
          r: (rng() - 0.5) * 0.9,
        });
      }
    },
  },
  {
    id: 'exitRed', tier: 1, hint: 'The exit sign was red.',
    apply(w) {
      w.exitSign.color = 'red';
    },
  },
  {
    id: 'exitMirrored', tier: 1, hint: 'The exit sign was written backwards.',
    apply(w) {
      w.exitSign.mirrored = true;
    },
  },
  {
    id: 'exitArrow', tier: 1, hint: 'The exit sign pointed back towards the lift.',
    apply(w) {
      w.exitSign.arrowLeft = true;
    },
  },
  {
    id: 'mirrorEmpty', tier: 2, hint: 'The mirror did not show you.',
    apply(w) {
      w.mirror.mode = 'empty';
    },
  },
  {
    id: 'mirrorShade', tier: 2, hint: 'Something else was in the mirror.',
    apply(w) {
      w.mirror.mode = 'shade';
    },
  },
  {
    id: 'tvStatic', tier: 2, hint: 'The television was on.',
    apply(w) {
      w.tv.static = true;
    },
  },
  {
    id: 'bookshelf', tier: 1, hint: 'The bookshelf had more books than before.',
    apply(w) {
      w.bookshelf.extraRow = true;
    },
  },
  {
    id: 'vendingRed', tier: 1, hint: 'The vending machine glowed red.',
    apply(w) {
      w.vending.red = true;
    },
  },
  {
    id: 'phone', tier: 2, hint: 'The payphone was ringing.',
    apply(w) {
      w.phone.ringing = true;
    },
  },
  {
    id: 'windowMoon', tier: 1, hint: 'The rain had stopped and there was a moon.',
    apply(w) {
      w.window.moon = true;
    },
  },
  {
    id: 'drip', tier: 2, hint: 'Water dripped from the ceiling.',
    apply(w) {
      w.entities.push(new Drip(3320));
    },
  },
  {
    id: 'doll', tier: 2, hint: 'A doll sat on the bench. It watched you.',
    apply(w) {
      w.doll.present = true;
    },
  },
  {
    id: 'benchMoved', tier: 1, hint: 'The bench was on the other side of the painting.',
    apply(w) {
      const b = w.props.find((p) => p.type === 'bench');
      b.x = 1180;
      b.solid.x = 1180;
      w.doll.x = 1220;
    },
  },
  {
    id: 'armchairExtra', tier: 1, hint: 'There was an extra armchair in the lounge.',
    apply(w) {
      w.props.push({ type: 'armchair', x: 1990, solid: { x: 1996, y: FLOOR_Y - 58, w: 86, h: 58 } });
    },
  },
  {
    id: 'elevatorFloor', tier: 1, hint: 'The lift said it was on another floor.',
    apply(w, rng) {
      w.elevator.indicator = pick(rng, ['3', '5', '0', '13']);
    },
  },
  {
    id: 'footsteps', tier: 1, hint: 'Footsteps kept going after you stopped.',
    apply(w) {
      w.flags.footstepsBehind = true;
    },
  },
  {
    id: 'figure', tier: 3, hint: 'Someone was waiting at the stairs.',
    apply(w) {
      w.entities.push(new Figure());
    },
  },
  {
    id: 'stalker', tier: 3, hint: 'Something came out of the stairwell.',
    apply(w) {
      w.entities.push(new Stalker());
    },
  },
  {
    id: 'flood', tier: 3, hint: 'The stairwell flooded.',
    apply(w) {
      w.entities.push(new Flood());
    },
  },
];

// Picks an anomaly (or null) for a given loop. Loop 0 is always clean so the
// player learns the baseline. Later loops lean on subtler anomalies.
export function chooseAnomaly(rng, loopIndex, used) {
  if (loopIndex === 0) return null;
  const noneChance = loopIndex === 1 ? 0 : 0.42;
  if (rng() < noneChance) return null;

  let tiers;
  if (loopIndex <= 2) tiers = [2, 3];
  else if (loopIndex <= 5) tiers = [1, 2, 3];
  else tiers = [1, 1, 2];

  let pool = ANOMALIES.filter((a) => tiers.includes(a.tier) && !used.has(a.id));
  if (pool.length === 0) pool = ANOMALIES.filter((a) => !used.has(a.id));
  if (pool.length === 0) pool = ANOMALIES;
  // Weighted: tiers listed twice are twice as likely.
  const weights = pool.map((a) => tiers.filter((t) => t === a.tier).length || 1);
  const total = weights.reduce((s, v) => s + v, 0);
  let r = rng() * total;
  for (let i = 0; i < pool.length; i++) {
    r -= weights[i];
    if (r <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}
