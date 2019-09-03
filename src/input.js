var left = "LEFT";
var right = "RIGHT";


export default class InputHandler {

	constructor(paddle) {
		this.keypressed = 0;
		this.paddle = paddle;
		document.addEventListener("keydown", event => {
			this.keypressed = event.keyCode;
		});
		document.addEventListener("keyup", event => {
			this.keypressed = 0;
		});
	}

	handlekey() {
		switch (this.keypressed) {
				case 0:
					break;
				case 37:
					this.paddle.move(left);
					break;
				case 39:
					this.paddle.move(right);
					break;
				default:
					break;
		};
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