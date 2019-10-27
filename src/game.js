import Paddle from "/src/paddle";
import Ball from "/src/ball";
import InputHandler from "/src/input";
// import Brick from "/src/brick";

import { buildLevel, level1 } from "/src/levels";

const GAMESTATE = {
	PAUSED: 0,
	RUNNING: 1,
	MENU: 2,
	GAMEOVER: 3
};

export default class Game {
	constructor(gameWidth, gameHeight, ctx) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.ctx = ctx;
	}

	start() {
		this.state = GAMESTATE.RUNNING;

		this.paddle = new Paddle(this);
		this.ball = new Ball(this);
		this.iHandler = new InputHandler(this);

		let bricks = buildLevel(this, level1);

		this.gameObjects = [this.paddle, this.ball, ...bricks];
	}

	update(deltaTime) {
		this.iHandler.handlekeys();

		if (this.state === GAMESTATE.PAUSED) return;

		this.gameObjects.forEach(object => object.update(deltaTime));
		this.gameObjects = this.gameObjects.filter(object => !object.remove);
	}

	draw() {
		if (this.state === GAMESTATE.PAUSED) return;

		this.ctx.fillStyle = "#040F22";
		this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
		this.gameObjects.forEach(object => object.draw(this.ctx));
	}

	drawPauseText() {
		this.ctx.font = "30px Arial";
		this.ctx.fillStyle = "#ccc";
		this.ctx.fillText("PAUSED", 24, 42);
	}

	togglePause() {
		if (this.state === GAMESTATE.PAUSED) {
			this.state = GAMESTATE.RUNNING;
		} else {
			this.drawPauseText();
			this.state = GAMESTATE.PAUSED;
		}
	}
}
