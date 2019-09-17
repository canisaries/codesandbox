export default class Paddle {
	constructor(game) {
		this.width = 150;
		this.height = 20;

		this.maxSpeed = 20;
		this.speed = 0;

		this.leftedge = 0;
		this.rightedge = game.gameWidth - this.width;

		this.x = game.gameWidth / 2 - this.width / 2;
		this.y = game.gameHeight - this.height - 10;
	}

	draw(ctx) {
		ctx.fillStyle = "#036";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	update(deltaTime) {
		if (Math.abs(this.speed) > this.maxSpeed) {
			this.speed = this.maxSpeed * Math.sign(this.speed);
		}

		// Move paddle according to speed
		this.x += this.speed;

		// Do not allow motion past edges of game area
		if (this.x <= this.leftedge) {
			this.x = this.leftedge;
			this.speed = 0;
		} else if (this.x >= this.rightedge) {
			this.x = this.rightedge;
			this.speed = 0;
		}

		// Decrease absolute speed (deceleration)
		if (this.speed < 0) {
			this.speed += 1;
		} else if (this.speed > 0) {
			this.speed -= 1;
		}

		// anything else here???
	}

	move(dir) {
		if (dir === "LEFT" && this.x > this.leftedge) {
			this.speed -= 5;
		} else if (dir === "RIGHT" && this.x < this.rightedge) {
			this.speed += 5;
		}
	}
}
