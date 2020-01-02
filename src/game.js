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

    this.state = GAMESTATE.MENU;

    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.iHandler = new InputHandler(this);

    this.gameObjects = [];
    this.lives = 3;

    this.drawMenu();
  }

  start() {
    if (this.state !== GAMESTATE.MENU) {
      return;
    }

    let bricks = buildLevel(this, level1);

    this.gameObjects = [this.paddle, this.ball, ...bricks];

    this.state = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    this.iHandler.handlekeys();

    if (this.lives === 0 && this.state !== GAMESTATE.GAMEOVER) {
      this.state = GAMESTATE.GAMEOVER;
      this.gameObjects = [];
      this.drawGameOver();
      return;
    }

    if (this.state !== GAMESTATE.RUNNING) return;

    this.gameObjects.forEach(object => object.update(deltaTime));
    this.gameObjects = this.gameObjects.filter(object => !object.remove);
  }

  draw() {
    if (this.state !== GAMESTATE.RUNNING) return;

    this.ctx.fillStyle = "#040F22";
    this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
    this.gameObjects.forEach(object => object.draw(this.ctx));
  }

  drawPauseScreen() {
    // Transparent black overlay
    this.ctx.fillStyle = "rgba(0,0,0,0.5)";
    this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
    // Pause text
    this.drawCenterText("PAUSED");
  }

  drawMenu() {
    // Solid black overlay
    this.ctx.fillStyle = "rgba(0,0,0,1)";
    this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
    // Menu text
    this.drawCenterText("Press SPACE to Begin");
  }

  drawGameOver() {
    // Solid black overlay
    this.ctx.fillStyle = "rgba(0,0,0,1)";
    this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
    // Game over text
    this.drawCenterText("GAME OVER");
  }

  drawCenterText(text) {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "#ccc";
    this.ctx.textAlign = "center";
    this.ctx.fillText(text, this.gameWidth / 2, this.gameHeight / 2);
  }

  togglePause() {
    if (this.state === GAMESTATE.PAUSED) {
      this.state = GAMESTATE.RUNNING;
    } else {
      this.drawPauseScreen();
      this.state = GAMESTATE.PAUSED;
    }
  }
}
