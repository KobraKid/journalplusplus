// For Textbox
var canType = false; // Toggles when the user can type
var text = ""; // typed text
var textSize = 30;
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
var textBoxes = []; // Will contain all textboxes
var textBox; // Will hold the active textbox
var textColor = "#000000";

/*
 * A TextBox is a way to keep track of the text entered in a journal.
 * param x : An integer describing the leftmost coordinate of the textbox
 * param y : An integer describing the topmost coordinate of the textbox
 */
class TextBox {
	constructor(xPos, yPos, size) {
		this.xPos = xPos;
		this.yPos = yPos;
		this._height = size;
		this._text = "";
		this._color = textColor;
	}

	get x() { return this.xPos; }
	get y() { return this.yPos; }

	get width() { return (ctx != undefined ? ctx.measureText(this.text).width : 0); }
	get height() { return this._height; }
	get text() { return this._text; }
	get color() { return this._color; }

	set x(xPos) { this.xPos = xPos; }
	set y(yPos) { this.yPos = yPos; }
	set height(h) { this._height = h; }
	set text(t) { this._text = t; }
	set color(c) { this._color = c; }
}

function enableText() {
	disableAll();
	canType = true;
	$("#journal-canvas").css('cursor','text');
}

/*
 * Redraws textboxes onto the canvas on text update.
 * Needs optimization - ideally should only redraw the active textbox boundary
 */
function redrawText() {
	for (var i = 0; i < textBoxes.length; i++) {
		if (!(textBoxes[i] === textBox) && textBoxes[i].text == "")
			textBoxes.splice(i, 1);
		ctx.font = textBoxes[i].height + "px Arial";
		ctx.fillStyle = textBoxes[i].color;
		ctx.fillText(textBoxes[i].text, textBoxes[i].x, textBoxes[i].y + textBoxes[i].height);
	}
}

function disableText() {
	canType = false;
}

/*
 * Gets a keypress. If it matches with one of the allowed keypresses,
 * a character will be added to the current textbox.
 */
function keyDown(event) {
	if (!canType) return;
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
			default: return; // The key is not recognized, or is not meant for character input
		}

	}
	textBox.text = text;
	redraw();
}