import { detectCollision, HITDATA } from "./collisiondetection.js";

export default class Brick {
	constructor(game, x, y) {
		this.game = game;
		this.image = document.getElementById("img_brick");
		this.width = 75;
		this.height = 25;
		this.x = x;
		this.y = y;
		this.remove = false;
	}

	update(deltaTime) {
		let hit = detectCollision(this.game.ball, this);

		if (hit === HITDATA.VERTICAL) {
			this.game.ball.speed.y *= -1;
			this.remove = true;
		} else if (hit === HITDATA.HORIZONTAL) {
			this.game.ball.speed.x *= -1;
			this.remove = true;
		}
	}

	draw(ctx) {
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	}
}
