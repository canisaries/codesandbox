import Paddle from "/src/paddle";
import Ball from "/src/ball";
import InputHandler from "/src/input";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
let ball = new Ball(GAME_WIDTH, GAME_HEIGHT);

let iHandler = new InputHandler(paddle);

let lastTime = 0;

function gameLoop(timestamp) {
	let deltaTime = timestamp - lastTime;
	lastTime = timestamp;

	iHandler.handlekeys();

	if (deltaTime) {
		ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
		paddle.update();
		paddle.draw(ctx);
		ball.draw(ctx);
	}

	requestAnimationFrame(gameLoop);
}

gameLoop();
