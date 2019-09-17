export default class Ball {
	constructor(gameWidth, gameHeight) {
		this.image = document.getElementById("img_ball");
		this.x = gameWidth / 2;
		this.y = gameHeight / 2;
		this.diameter = 16;
		this.speed = { x: 2, y: 2 };
		this.screendims = { x: gameWidth, y: gameHeight };
	}

	draw(ctx) {
		ctx.drawImage(this.image, this.x, this.y, this.diameter, this.diameter);
	}

	update(deltaTime) {
		this.x += this.speed.x;
		this.y += this.speed.y;

		// edge checks

		if (this.x + this.diameter > this.screendims.x || this.x < 0) {
			this.speed.x *= -1;
		}
		if (this.y + this.diameter > this.screendims.y || this.y < 0) {
			this.speed.y *= -1;
		}

		// anythiing else?
	}
}
