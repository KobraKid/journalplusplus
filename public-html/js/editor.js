var c; // canvas
var ctx; // context
var cursorPos = {"x": 0, "y": 0};
var text = ""; // typed text
var numberRowOffset = {
	"1": -0x10,
	"2": 0xE,
	"3": -0x10,
	"4": -0x10,
	"5": -0x10,
	"6": 0x28,
	"7": -0x11,
	"8": -0xE,
	"9": -0x11,
	"0": -0x7
}; // Used to handle offsets when shift is held down while typing numbers

class TextBox {
	constructor(xPos, yPos) {
		this.xPos = xPos;
		this.yPos = yPos;
		this._height = 0;
		this._text = "";
	}

	get x() { return this.xPos; }
	get y() { return this.yPos; }
	
	get width() { return (ctx != undefined ? ctx.measureText(this.text) : 0); }
	get height() { return this._height; }
	get text() { return this._text; }

	set x(xPos) { this.xPos = xPos; }
	set y(yPos) { this.yPos = yPos; }
	set height(h) { this._height = h; }
	set text(t) { this._text = t; }
}

var textBox = new TextBox(10, 50);
textBox.text = text;

function init() {
	// document.title = title + " | Editor";
	c = document.getElementById("journal-canvas");
	c.setAttribute("tabindex", 0);
	ctx = c.getContext("2d");

	c.addEventListener('click', setCursorPosition);
	c.addEventListener('keydown', keyDown, false);
}

function redrawText() {
    textBox.x = cursorPos.x;
    textBox.y = cursorPos.y;
	if (ctx != undefined) {
		ctx.clearRect(0, 0, 1500, 750);
		/*ctx.fillStyle = "rgb(0, 256, 0)";
		ctx.strokeRect(10, 10, 16, 50);*/
		ctx.fillStyle = "rgb(0, 0, 0)";
		ctx.font = "30px Arial";
		ctx.fillText(text, textBox.x, textBox.y);
	}
}

function setCursorPosition(event) {
	var rect = c.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    cursorPos.x = x;
    cursorPos.y = y;
    redrawText();
}

function keyDown(event) {
	var keyCode = event.which || event.keyCode || 0;
	if (keyCode >= 0x41 && keyCode <= 0x5A) { // Uppercase letters

		// Make sure to shift to lowercase only if shift key is not pressed,
		// or caps-lock key is not pressed, but not both
		text = text + String.fromCharCode(keyCode + (event.shiftKey ^ event.getModifierState('CapsLock') ? 0 : 0x20));

	} else if (keyCode >= 0x30 && keyCode <= 0x39) { // Numbers

		// add "number row" offset if shift key is being pressed
		text = text + String.fromCharCode(keyCode + (event.shiftKey ? numberRowOffset[String.fromCharCode(keyCode)] : 0));

	} else if (keyCode >= 96 && keyCode <= 105) { // NumPad keys

		text = text + (keyCode - 96);

	} else {

		// Handle special characters (space, newline, backspace)
		// and weird cases where JS keycodes do not match with UNICODE
		switch (keyCode) {
			case 8: text = (text.length >= 1 ? text.substr(0, text.length - 1) : ""); break;
			case 13: text = text + "\n"; break;
			case 32: text = text + " "; break;
			case 106: text = text = text + "*"; break;
			case 107: text = text = text + "+"; break;
			case 109: text = text = text + "-"; break;
			case 110: text = text = text + "."; break;
			case 111: text = text = text + "/"; break;
			case 186: text = text = text + (event.shiftKey ? ":" : ";"); break;
			case 187: text = text = text + (event.shiftKey ? "+" : "="); break;
			case 188: text = text = text + (event.shiftKey ? "<" : ","); break;
			case 189: text = text = text + (event.shiftKey ? "_" : "-"); break;
			case 190: text = text = text + (event.shiftKey ? ">" : "."); break;
			case 191: text = text = text + (event.shiftKey ? "?" : "/"); break;
			case 192: text = text = text + (event.shiftKey ? "~" : "`"); break;
			case 219: text = text = text + (event.shiftKey ? "{" : "["); break;
			case 220: text = text = text + (event.shiftKey ? "|" : "\\"); break;
			case 221: text = text = text + (event.shiftKey ? "}" : "]"); break;
			case 222: text = text = text + (event.shiftKey ? "\"" : "'"); break;
			default: break; // The key is not recognized, or is not meant for character input
		}

	}
	textBox.text = text;
	redrawText();
}

init();
