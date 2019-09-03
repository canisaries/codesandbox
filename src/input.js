var left = "LEFT";
var right = "RIGHT";

export default class InputHandler {
	constructor(paddle) {
		this.leftpressed = false;
		this.rightpressed = false;
		this.paddle = paddle;

		// Event listeners

		document.addEventListener("keydown", event => {
			switch (event.keyCode) {
				case 37:
					this.leftpressed = true;
					break;
				case 39:
					this.rightpressed = true;
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
				default:
					break;
			}
		});
	}

	handlekeys() {
		if (this.leftpressed) {
			this.paddle.move(left);
		}
		if (this.rightpressed) {
			this.paddle.move(right);
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
