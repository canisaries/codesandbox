export default class InputHandler {
	constructor() {
		document.addEventListener("keydown", event => {
			switch (event.keycode) {
				case 37:
					alert("move left");
					break;
				case 39:
					alert("move right");
					break;
				default:
					alert("henlo");
					break;
			}
		});
	}
}
