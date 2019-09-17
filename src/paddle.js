export default class Paddle {
	constructor(gameWidth, gameHeight) {
		this.width = 150;
		this.height = 20;

		this.maxSpeed = 20;
		this.speed = 0;

		this.leftedge = 0;
		this.rightedge = gameWidth - this.width;

		this.position = {
			x: gameWidth / 2 - this.width / 2,
			y: gameHeight - this.height - 10
		};
	}

	draw(ctx) {
		ctx.fillStyle = "#036";
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update() {
		if (Math.abs(this.speed) > this.maxSpeed) {
			this.speed = this.maxSpeed * Math.sign(this.speed);
		}

		// Move paddle according to speed
		this.position.x += this.speed;

		// Do not allow motion past edges of game area
		if (this.position.x <= this.leftedge) {
			this.position.x = this.leftedge;
			this.speed = this.speed * -1;
		} else if (this.position.x >= this.rightedge) {
			this.position.x = this.rightedge;
			this.speed = this.speed * -1;
		}

		// Decrease absolute speed (deceleration)
		if (this.speed < 0) {
			this.speed += 2;
		} else if (this.speed > 0) {
			this.speed -= 2;
		}

		// anything else here???
	}

	move(dir) {
		if (dir === "LEFT" && this.position.x > this.leftedge) {
			this.speed -= 5;
		} else if (dir === "RIGHT" && this.position.x < this.rightedge) {
			this.speed += 5;
		}
	}
}
