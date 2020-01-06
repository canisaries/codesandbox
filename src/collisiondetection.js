export const HITDATA = {
  NONE: 0,
  VERTICAL: 1,
  HORIZONTAL: 2
};

export function detectCollision(ball, gameObject) {
  let radius = ball.diameter / 2;

  let objHitbox = {
    left: gameObject.x - radius,
    right: gameObject.x + gameObject.width + radius,
    top: gameObject.y - radius,
    bottom: gameObject.y + gameObject.height + radius
  };

  let ballcoords = {
    x: ball.x + radius,
    y: ball.y + radius
  };

  // If ball is not inside hitbox, return
  if (
    ballcoords.y > objHitbox.bottom ||
    ballcoords.y < objHitbox.top ||
    ballcoords.x < objHitbox.left ||
    ballcoords.x > objHitbox.right
  )
    return;

  //  Determine hit axis

  // Formula of line: y = kx + b
  let k = ball.speed.y / ball.speed.x;
  let b = k * ball.x - ball.y;

  // Intersection x/y for different edges
  let ver_intersect = 0;
  let hor_intersect = 0;

  // At what point does line intersect with hitbox top/bottom edge
  if (ball.speed.y > 0) {
    // If ball is moving down, check intersection with top
    ver_intersect = (b + objHitbox.top) / k;
  } else {
    // If ball is moving up, check intersection with bottom
    ver_intersect = (b + objHitbox.bottom) / k;
  }

  // At what point does line intersect with hitbox left/right edge
  // TODO something is up here, getting very large negatives

  if (ball.speed.x > 0) {
    // If ball is moving right, check intersection with left side
    hor_intersect = k * objHitbox.left + b;
  } else {
    // If ball is moving left, check intersection with right side
    hor_intersect = k * objHitbox.right + b;
  }

  let horhit = false;
  let verhit = false;

  // Check if vertical collision was between left and right edges
  // (-> vertical hit) or horizontal collision was between top and bottom
  // (-> horizontal hit). Diagonal hits are considered vertical.

  if (ver_intersect < objHitbox.right && ver_intersect > objHitbox.left) {
    verhit = true;
  }

  if (hor_intersect < objHitbox.bottom && hor_intersect > objHitbox.top) {
    horhit = true;
  }

  if (horhit && !verhit) return HITDATA.HORIZONTAL;
  if (!horhit && verhit) return HITDATA.VERTICAL;
  if (!horhit && !verhit) {
    console.log("NEITHER");
    console.log("R VER L");
    console.log(objHitbox.right);
    console.log(ver_intersect);
    console.log(objHitbox.left);
    console.log("TOP HOR BOTTOM");
    console.log(objHitbox.top);
    console.log(hor_intersect);
    console.log(objHitbox.bottom);
  } else {
    console.log("both");
  }

  // DEBUGGING +++
  return HITDATA.NONE;
  // TODO +++
}
