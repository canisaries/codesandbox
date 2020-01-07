import Paddle from "/src/paddle";
import Ball from "/src/ball";
import InputHandler from "/src/input";

import { buildLevel, levelpack } from "/src/levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  WIN: 5
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
    this.levels = levelpack;
    this.currentlevel = 0; // index in level array

    this.drawMenu();
  }

  start() {
    if (this.state === GAMESTATE.RUNNING || this.state === GAMESTATE.PAUSED) {
      return;
    }

    // If starting new game, reset game progress
    if (this.state === GAMESTATE.WIN || this.state === GAMESTATE.GAMEOVER) {
      this.currentlevel = 0;
      this.lives = 3;
    }

    this.bricks = buildLevel(this, this.levels[this.currentlevel]);
    this.ball.reset();
    this.gameObjects = [this.paddle, this.ball];

    this.state = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    this.iHandler.handlekeys();

    // Do not update static screens
    if (this.state === GAMESTATE.GAMEOVER || this.state === GAMESTATE.WIN) {
      return;
    }

    if (this.lives === 0 && this.state !== GAMESTATE.GAMEOVER) {
      this.gameOver();
      return;
    }

    if (this.state !== GAMESTATE.RUNNING) return;

    if (this.bricks.length === 0) {
      this.currentlevel++;

      // if last level cleared, end game
      if (this.currentlevel >= this.levels.length) {
        this.state = GAMESTATE.WIN;
        this.gameWin();
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

    // Status Text
    this.drawStatusText();
  }

  drawPauseScreen() {
    // Transparent black overlay
    this.fillBlack(0.5);
    // Pause text
    this.drawCenterText("PAUSED");
  }

  fillBlack(opacity = 1) {
    this.ctx.fillStyle = "rgba(0,0,0," + opacity + ")";
    this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
  }

  drawMenu() {
    // Solid black overlay
    this.fillBlack();
    // Menu text
    this.drawCenterText("WELCOME TO NOT BREAKOUT");
    this.drawSubCenterText("Press SPACE to begin!");
  }

  drawGameOver() {
    // Solid black overlay
    this.fillBlack();
    // Game over text
    this.drawCenterText("GAME OVER");
    this.drawSubCenterText("Press SPACE to play again!");
  }

  drawWinScreen() {
    // Solid black overlay
    this.fillBlack();
    // Game over text
    this.drawCenterText("YOU WIN!");
    this.drawSubCenterText("Press SPACE to play again!");
  }

  drawCenterText(text) {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "#ccc";
    this.ctx.textAlign = "center";
    this.ctx.fillText(text, this.gameWidth / 2, this.gameHeight / 2);
  }

  drawSubCenterText(text) {
    this.ctx.font = "18px Arial";
    this.ctx.fillStyle = "#ccc";
    this.ctx.textAlign = "center";
    this.ctx.fillText(text, this.gameWidth / 2, this.gameHeight / 2 + 30);
  }

  drawStatusText() {
    this.ctx.font = "15px Arial";
    this.ctx.fillStyle = "#ccc";
    this.ctx.textAlign = "center";
    let leveltext = "Level: " + (this.currentlevel + 1);
    let livestext = "Lives: " + this.lives;
    this.ctx.fillText(leveltext, 35, 20);
    this.ctx.fillText(livestext, 35, 40);
  }

  togglePause() {
    if (this.state === GAMESTATE.PAUSED) {
      this.state = GAMESTATE.RUNNING;
    } else {
      this.drawPauseScreen();
      this.state = GAMESTATE.PAUSED;
    }
  }

  gameWin() {
    this.state = GAMESTATE.WIN;
    this.gameObjects = [];
    this.drawWinScreen();
  }

  gameOver() {
    this.state = GAMESTATE.GAMEOVER;
    this.gameObjects = [];
    this.drawGameOver();
  }
}
