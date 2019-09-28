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

	let prevballcoords = {
		x: ball.x + radius - ball.speed.x,
		y: ball.y + radius - ball.speed.y
	};

	// If ball is currently inside hitbox
	if (
		ballcoords.y < objHitbox.bottom &&
		ballcoords.y > objHitbox.top &&
		ballcoords.x > objHitbox.left &&
		prevballcoords.x < objHitbox.right
	) {
		if (
			prevballcoords.y > objHitbox.bottom ||
			prevballcoords.y < objHitbox.top
		) {
			return HITDATA.VERTICAL;
		} else {
			return HITDATA.HORIZONTAL;
		}
		// Hit, but vertically or horizontally?
	}

	/*
	// If both past and present ball were vertically outside object on the same side, no hit
	if (
		(ballcoords.y > objHitbox.bottom && prevballcoords.y > objHitbox.bottom) ||
		(ballcoords.y < objHitbox.top && prevballcoords.y < objHitbox.top)
	) {
		return HITDATA.NONE;
	}

	// If the ball entered the vertical hitbox between frames, vertical hit likely
	if (
		(ballcoords.y < objHitbox.bottom && prevballcoords.y > objHitbox.bottom) ||
		(ballcoords.y > objHitbox.top && prevballcoords.y < objHitbox.top)
	) {
		enteredvertical = true;
	}

	// If the ball was in the vertical hitbox between frames but entered the horizontal hitbox,
	// horizontal hit
	if (
		(ballcoords.x > objHitbox.left && prevballcoords.x < objHitbox.left) ||
		(ballcoords.x < objHitbox.right && prevballcoords.x > objHitbox.right)
	) {
		enteredhorizontal = true;
	}
	*/

	/*

  // CHECK Y

  let yhit = false;
  let center_x_of_ball = ball.x + ball.diameter / 2;

	let bottom_of_ball = ball.y + ball.diameter;
	let top_of_ball = ball.y;
	// If bottom of ball was above object top last frame
	// but now is below or on it AND the ball is moving down, it has hit
	if (
		bottom_of_ball >= gameObject.y &&
		bottom_of_ball - ball.speed.y < gameObject.y &&
		ball.speed.y > 0
	) {
		yhit = true;
	}
	// If top of ball was below object bottom last frame
	// but now is above or on it AND the ball is moving up, it has hit
	else if (
		top_of_ball <= gameObject.y + gameObject.height &&
		top_of_ball - ball.speed.y > gameObject.y + gameObject.height &&
		ball.speed.y < 0
	) {
		yhit = true;
  }

  if (yhit && center_x_of_ball > gameObject.x && center_x_of_ball < gameObject.x + gameObject.width) {
    return true;
  }
  
  // CHECK X

  let xhit = false;
  let center_y_of_ball = ball.x + ball.diameter / 2;

	let left_of_ball = ball.x + ball.diameter;
	let right_of_ball = ball.x;
	// If right edge of ball was left of object last frame
	// but now is past or inside the left edge AND the ball is moving right, it has hit
	if (
		right_of_ball >= gameObject.x && // THIS FRAME
		right_of_ball - ball.speed.x < gameObject.x && // LAST FRAME
		ball.speed.x > 0 // SPEED
	) {
		xhit = true;
	}
	// If left edge of ball was right of object last frame
	// but now is past or inside the right edge AND the ball is moving left, it has hit
	else if (
		left_of_ball <= gameObject.x + gameObject.width &&
		left_of_ball - ball.speed.x > gameObject.x + gameObject.width &&
		ball.speed.x < 0
	) {
		xhit = true;
  }
  
  if (xhit && center_y_of_ball > gameObject.y && center_y_of_ball < gameObject.y + gameObject.height) {
    return true;
    // TODO: MAKE BALL MIRROR X SPEED, NOT Y SPEED
  }

	/* OLD X CHECK
	let center_of_ball = ball.x + ball.diameter / 2;
	// If ball is not within object's horizontal coordinates, no hit
	if (
		center_of_ball < gameObject.x ||
		center_of_ball > gameObject.x + gameObject.width
	) {
		return false;
  }
  /
  */

	return HITDATA.NONE;
}
