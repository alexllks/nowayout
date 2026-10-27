export const GUEST_SCALE = 1.3;

// The guest: a tired figure in a long coat. Drawn from the feet (x, y).
export function drawGuest(ctx, x, y, facing, walkPhase, airborne, opts = {}) {
  const { shadow = true, tint = null, alpha = 1 } = opts;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  ctx.scale(facing * GUEST_SCALE, GUEST_SCALE);

  if (shadow) {
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath();
    ctx.ellipse(0, 2, 20, 5, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const swing = airborne ? 0.6 : Math.sin(walkPhase) * 0.8;
  const bob = airborne ? -4 : Math.abs(Math.sin(walkPhase)) * -2;
  ctx.translate(0, bob);

  const coat = tint || '#2b2630';
  const coatDark = tint || '#1b171f';
  const skin = '#d9b89a';
  const trousers = '#1a1a22';

  // legs
  ctx.strokeStyle = trousers;
  ctx.lineWidth = 9;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-3, -26);
  ctx.lineTo(-3 - swing * 10, -2);
  ctx.moveTo(3, -26);
  ctx.lineTo(3 + swing * 10, -2);
  ctx.stroke();
  // shoes
  ctx.fillStyle = '#0d0d10';
  ctx.beginPath();
  ctx.ellipse(-3 - swing * 10 + 2, -1, 7, 3, 0, 0, Math.PI * 2);
  ctx.ellipse(3 + swing * 10 + 2, -1, 7, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // coat
  ctx.fillStyle = coat;
  ctx.beginPath();
  ctx.moveTo(-13, -60);
  ctx.lineTo(13, -60);
  ctx.lineTo(16, -24);
  ctx.lineTo(-16, -24);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = coatDark;
  ctx.fillRect(-1, -58, 2, 34); // lapel line

  // arms
  ctx.strokeStyle = coat;
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(-11, -55);
  ctx.lineTo(-13 + swing * 8, -34);
  ctx.moveTo(11, -55);
  ctx.lineTo(13 - swing * 8, -34);
  ctx.stroke();
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.arc(-13 + swing * 8, -32, 3.5, 0, Math.PI * 2);
  ctx.arc(13 - swing * 8, -32, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // head
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.arc(0, -68, 9, 0, Math.PI * 2);
  ctx.fill();
  // hair
  ctx.fillStyle = '#2a1d14';
  ctx.beginPath();
  ctx.arc(0, -70, 9.5, Math.PI, Math.PI * 2);
  ctx.fill();
  // eye (facing side)
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(3, -69, 2, 2);

  ctx.restore();
}

// The thing that follows you. Same silhouette, wrong proportions.
export function drawShade(ctx, x, y, facing, t, alpha = 0.9) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  ctx.scale(facing * GUEST_SCALE, GUEST_SCALE);
  const sway = Math.sin(t * 6) * 3;
  ctx.fillStyle = '#050406';
  ctx.beginPath();
  ctx.moveTo(-14, 0);
  ctx.quadraticCurveTo(-20 + sway, -60, -8, -92);
  ctx.quadraticCurveTo(0, -112, 8, -92);
  ctx.quadraticCurveTo(20 + sway, -60, 14, 0);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.fillRect(1, -96, 3, 3);
  ctx.fillRect(7, -96, 3, 3);
  ctx.restore();
}
