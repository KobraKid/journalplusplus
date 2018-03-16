// For Canvas
var c; // canvas
var ctx; // context
var backgroundPage = new Image(); // The journal in the background
var bgWidth = 800;
var bgHeight = 600;

/*
 * Sets the document title, sets up vars and event listeners.
 */
function init() {
	document.title = title + " | Editor";
	c = document.getElementById("journal-canvas");
	c.setAttribute("tabindex", 0);
	ctx = c.getContext("2d");
	ctx.canvas.width =	window.innerWidth;
	ctx.canvas.height =	window.innerHeight;
	c.addEventListener('click', setCursorPosition);
	c.addEventListener('keydown', keyDown, false);

	$("body").bind('keydown', esc);
	$('#edit').bind('click', '*', disableAll);
	$('#pen').bind('click', '*', enablePen);
	$('#pen-submenu').bind('click', '*', enablePen);
	$("#pen-color-picker").on("change", function() {
    	penColor = $("#pen-color-picker").val();
		$("#cursor").css("background-color", penColor);
	});
	$('#calendar').bind('click', '*', enableCalendar);
	$('#text').bind('click', '*', enableText);
	$('#text-submenu').bind('click', '*', enableText);
	$("#text-color-picker").on("change", function() {
    	textColor = $("#text-color-picker").val();
	});
	$('#size').bind('click', getFontSize);
	$('#bold').bind('click', toggleBold);
	$('#italic').bind('click', toggleItalic);

	backgroundPage.onload = function() {
		bgHeight = ctx.canvas.height * 0.98; // This controls the size of the journal
		bgWidth = bgHeight * 4 / 3; // Preserve image ratio
		ctx.drawImage(
						backgroundPage,
						(ctx.canvas.width - bgWidth) / 2,
						(ctx.canvas.height - bgHeight) / 2,
						bgWidth,
						bgHeight
					);
	};
	backgroundPage.src = "../images/bujo_transparent.png";

	// Default tool
	enablePen();
}

function esc(event) {
	if ((event.which || event.keyCode || 0) == 27) {
		if (popupExists) {
			closePopup();
			redraw();
		}
		disableAll();
	}
}

/*
 * Sets x and y to the last clicked position in the canvas.
 * Performs the relevant action for the current tool.
 */
function setCursorPosition(event) {
	$(document).off("mousemove");
	$("body").css('cursor','unset');
	var rect = c.getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;

	// Deal with placing a new object
	if (placeCalendar) { // make a new calendar
		disableAll();
		calendars.push(new Calendar(x, y));
	} else if (canType) { // make a new textbox
		text = "";
		textBox = new TextBox(x, y, textSize, isBold, isItalic);
		textBoxes.push(textBox);
	} else if (paint) { // this isn't meaninful for drawing/painting

	} else { // toggle the popup if no tool is active
		if (!popupExists) {
			console.log("Click was at: ", x, ", ", y);
			/* check to see if a calendar was clicked on */
			for (var cal in calendars) {
				if (isInBounds(x, y, calendars[cal])) {
					console.log("Click was in bounds of calendar: ", calendars[cal]);
					openPopup(x, y);
					disableAll();
					break;
				}
			}
			/* check to see if a textbox was clicked on */
			for (var t in textBoxes) {
				console.log(textBoxes[t]);
				if (isInBounds(x, y, textBoxes[t])) {
					console.log("Click was in bounds of textbox: ", textBoxes[t]);
					// TODO: re-enable editing of clicked textbox
					disableAll();
					break;
				}
			}
		} else {
			closePopup();
			disableAll();
		}
	}

	redraw();
}

function isInBounds(clickX, clickY, obj) {
	console.log(obj.x, obj.y, obj.width, obj.height);
	return (((clickX > obj.x) && (clickX < obj.x + obj.width))
		&& ((clickY > obj.y) && (clickY < obj.y + obj.height)));
}

function disableAll() {
	$("body").css('cursor','default');
	$("#journal-canvas").css('cursor','default');
	disableText();
	disableCalendar();
	disablePen();
}

function redraw() {
	if (ctx != undefined) {
		// Clear canvas
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		// Draw background
		ctx.drawImage(
					backgroundPage,
					(ctx.canvas.width - bgWidth) / 2,
					(ctx.canvas.height - bgHeight) / 2,
					bgWidth,
					bgHeight
				);
		// Draw Calendar
		redrawCalendar();
		// Draw Text
		redrawText();
		// Draw Pen
		redrawPen();
		// Draw Popup (on top of anything else)
		redrawPopup();
	}
}

init();