import Paddle from "/src/paddle";
import Ball from "/src/ball";
import InputHandler from "/src/input";

export default class Game {
	constructor(gameWidth, gameHeight) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
	}

	start() {
		this.paddle = new Paddle(this);
		this.ball = new Ball(this);
		this.iHandler = new InputHandler(this.paddle);

		this.gameObjects = [this.paddle, this.ball];
	}

	update(deltaTime) {
		this.iHandler.handlekeys();
		this.gameObjects.forEach(object => object.update(deltaTime));
	}

	draw(ctx) {
		ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
		this.gameObjects.forEach(object => object.draw(ctx));
	}
}
