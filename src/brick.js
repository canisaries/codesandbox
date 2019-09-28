export default class Brick {
	constructor(game, x, y) {
    this.game = game;
		this.image = document.getElementById("img_brick");
		this.w = 75;
    this.h = 25;
    this.x = x;
    this.y = y;
  }

  update(deltaTime) {
    // check if hit and from where
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }
  
  }