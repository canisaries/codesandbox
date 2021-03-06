import { detectCollision, HITDATA } from "./collisiondetection.js";

export default class Ball {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("img_ball");
    this.diameter = 16;

    this.startstate = {
      x: game.gameWidth / 2,
      y: game.gameHeight / 2,
      dx: 4,
      dy: 4
    };
    this.x = this.startstate.x;
    this.y = this.startstate.y;
    this.speed = { x: this.startstate.dx, y: this.startstate.dy };

    this.screendims = { x: game.gameWidth, y: game.gameHeight };
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.diameter, this.diameter);
  }

  update(deltaTime) {
    this.x += this.speed.x;
    this.y += this.speed.y;

    // paddle check

    let paddlehit = detectCollision(this, this.game.paddle);

    if (paddlehit === HITDATA.VERTICAL) {
      this.speed.y *= -1;
    } else if (paddlehit === HITDATA.HORIZONTAL) {
      this.speed.x *= -1;
    }

    // edge checks

    // sides edges
    if (this.x + this.diameter > this.screendims.x || this.x < 0) {
      this.speed.x *= -1;
    }
    // top edge
    if (this.y < 0) {
      this.speed.y *= -1;
    }
    // bottom edge
    if (this.y + this.diameter > this.screendims.y) {
      // defeat, lose life and reset pos if not game over
      this.game.lives = this.game.lives - 1;
      if (this.game.lives !== 0) this.reset();
    }
  }

  reset() {
    this.x = this.startstate.x;
    this.y = this.startstate.y;
    this.speed = { x: this.startstate.dx, y: this.startstate.dy };
  }
}
