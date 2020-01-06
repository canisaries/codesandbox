import Paddle from "/src/paddle";
import Ball from "/src/ball";
import InputHandler from "/src/input";
// import Brick from "/src/brick";

import { buildLevel, level1, level2 } from "/src/levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
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

    this.bricks = [];
    this.gameObjects = [];
    this.lives = 3;
    this.levels = [level1, level2];
    this.currentlevel = 0; // index in level array

    this.drawMenu();
  }

  start() {
    if (this.state !== GAMESTATE.MENU && this.state !== GAMESTATE.NEWLEVEL) {
      return;
    }

    this.bricks = buildLevel(this, this.levels[this.currentlevel]);
    this.ball.reset();
    this.gameObjects = [this.paddle, this.ball];

    this.state = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    this.iHandler.handlekeys();

    if (this.lives === 0 && this.state !== GAMESTATE.GAMEOVER) {
      this.endGame();
      return;
    }

    if (this.state !== GAMESTATE.RUNNING) return;

    if (this.bricks.length === 0) {
      this.currentlevel++;

      // if last level cleared, end game
      if (this.currentlevel >= this.levels.length) {
        this.endGame();
        return;
      }

      // otherwise next level
      this.state = GAMESTATE.NEWLEVEL;
      this.start();
    }

    [...this.gameObjects, ...this.bricks].forEach(object =>
      object.update(deltaTime)
    );

    this.bricks = this.bricks.filter(brick => !brick.remove);
  }

  draw() {
    if (this.state !== GAMESTATE.RUNNING) return;

    // Background
    this.ctx.fillStyle = "#040F22";
    this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

    // Objects
    [...this.gameObjects, ...this.bricks].forEach(object =>
      object.draw(this.ctx)
    );
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

  endGame() {
    this.state = GAMESTATE.GAMEOVER;
    this.gameObjects = [];
    this.drawGameOver();
  }
}
