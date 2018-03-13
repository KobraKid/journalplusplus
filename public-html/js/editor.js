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
	if ((event.which || event.keyCode || 0) == 27)
		disableAll();
}

/*
 * Sets x and y to the last clicked position in the canvas.
 */
function setCursorPosition(event) {
	$(document).off("mousemove");
	$("body").css('cursor','unset');
	var rect = c.getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;
	if (placeCalendar) {
		disableAll();
		calendars.push(new Calendar(x, y));
	} else if (canType) {
		textPos.x = x;
		textPos.y = y;
		text = "";
		textBox = new TextBox(x, y);
		textBoxes.push(textBox);
	} else if (paint) {

	} else {

	}
	redraw();
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
	}
}

init();