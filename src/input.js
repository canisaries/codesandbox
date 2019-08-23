export default class InputHandler {
	constructor() {
		document.onkeydown = function(event) {
			switch (event.keyCode) {
				case 37:
					alert("Left key pressed");
					break;
				case 38:
					alert("Up key pressed");
					break;
				case 39:
					alert("Right key pressed");
					break;
				case 40:
					alert("Down key pressed");
					break;
				default:
					break;
			}
		};
	}
}
