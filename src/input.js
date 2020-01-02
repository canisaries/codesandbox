var left = "LEFT";
var right = "RIGHT";

export default class InputHandler {
  constructor(game) {
    this.leftpressed = false;
    this.rightpressed = false;
    this.spacepressed = false;
    this.escpending = false;
    this.escheld = false;

    this.game = game;

    // Event listeners

    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          this.leftpressed = true;
          break;
        case 39:
          this.rightpressed = true;
          break;
        case 27:
          // Ignore all esc presses after first one until esc released again
          if (this.escheld === false) {
            this.escpending = true;
            this.escheld = true;
          }
          break;
        case 32:
          this.spacepressed = true;
          break;
        default:
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          this.leftpressed = false;
          break;
        case 39:
          this.rightpressed = false;
          break;
        case 27:
          this.escheld = false;
          break;
        case 32:
          this.spacepressed = false;
          break;
        default:
          break;
      }
    });
  }

  handlekeys() {
    if (this.leftpressed) {
      this.game.paddle.move(left);
    }
    if (this.rightpressed) {
      this.game.paddle.move(right);
    }
    if (this.escpending) {
      this.game.togglePause();
      this.escpending = false;
    }
    if (this.spacepressed) {
      this.game.start();
    }
  }
}

/* Old version
		document.onkeydown = function(event) {
			switch (event.keyCode) {
				case 37:
					paddle.move(left);
					break;
				case 39:
					paddle.move(right);
					break;
				default:
					break;
			}
		};
*/
