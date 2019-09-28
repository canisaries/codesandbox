import Paddle from "/src/paddle";
import Ball from "/src/ball";
import InputHandler from "/src/input";
import Brick from "/src/brick";

export default class Game {
	constructor(gameWidth, gameHeight) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
	}

	start() {
		this.paddle = new Paddle(this);
		this.ball = new Ball(this);
		this.iHandler = new InputHandler(this.paddle);

		let bricks = [];

		for(let i=0; i<10; i++){
			bricks.push(new Brick(this, 25 + i*75, 20))
		}

		this.gameObjects = [this.paddle, this.ball, ...bricks];
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
