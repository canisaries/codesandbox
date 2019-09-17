export default class Ball {
	constructor(gameWidth, gameHeight) {
		this.image = document.getElementById("img_ball");
		this.x = gameWidth / 2;
		this.y = gameHeight / 2;
		this.diameter = 16;
	}

	draw(ctx) {
		ctx.drawImage(this.image, this.x, this.y, this.diameter, this.diameter);
	}

	update() {
		// todo
	}
}
