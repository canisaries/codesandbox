var left = "LEFT";
var right = "RIGHT";

export default class InputHandler {
	constructor(paddle) {
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
	}
}
