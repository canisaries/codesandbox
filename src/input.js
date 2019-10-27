var left = "LEFT";
var right = "RIGHT";

export default class InputHandler {
	constructor(game) {
		this.leftpressed = false;
		this.rightpressed = false;
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
					console.log("ESC PRESS DETECTED");
					// Ignore all esc presses after first one until esc released again
					if (this.escheld === false) {
						this.escpending = true;
						this.escheld = true;
					}
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
					console.log("ESC RELEASE DETECTED AND ACCEPTED");
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
			console.log("CALLING TOGGLEPAUSE");
			this.game.togglePause();
			this.escpending = false;
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
