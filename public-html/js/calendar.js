var placeCalendar = false; // Toggles when the user is going to place a calendar
var calendars = [];
var calx;
var caly;

var calHeight = 270;
var calWidth = 320;
var monthFont = 16;
var dayFont = 8;
var months = [
	"January", "February", "March",
	"April", "May", "June",
	"July", "August", "September",
	"October", "November", "December"];

/*
 * A Calendar is a blank calendar template that can be drawn on the journal
 */
class Calendar {
 	constructor(xPos, yPos) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.w = calWidth;
		this.h = calHeight;
		this.mo = new Date().getMonth();
		this.yr = new Date().getFullYear();
	}

	get x() { return this.xPos; }
	get y() { return this.yPos; }
	get width() { return this.w; }
	get height() { return this.h; }
	get month() { return this.mo; }
	get year() { return this.yr; }
}

function enableCalendar() {
	disableAll();
	$("body").css('cursor','none');
	$("#journal-canvas").css('cursor','none');
	placeCalendar = true;
	$("#calendar-img").css("display", "inherit");
	$(document).mousemove(
		function(e){
	 		$("#calendar-img").css({left:e.pageX + 1, top:e.pageY + 1});
		}
	);
}

function redrawCalendar() {
	for (var i = 0; i < calendars.length; i++)
		draw_calendar(calendars[i]);

}

function disableCalendar() {
	placeCalendar = false;
	$("#calendar-img").css("display", "none");
}

/*
 * Each calendar is drawn on the screen with the upper-left corner,
 * starting at the point the mouse clicked. The calendar will draw the
 * current month and year. 
 */
function draw_calendar(calendar) {
	var x = calendar.x;
	var y = calendar.y;
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(x, y + (calHeight / 6) - 18); // top left
	ctx.lineTo(x, y + calHeight); // bottom left
	ctx.lineTo(x + calWidth, y + calHeight); // bottom right
	ctx.lineTo(x + calWidth, y + (calHeight / 6) - 18); // top right
	ctx.lineTo(x, y + (calHeight / 6) - 18);
	for (var i = 1; i <= 6; i++) { // Rows
		ctx.moveTo(x, y + (i * (calHeight / 6)));
		ctx.lineTo(x + calWidth, y + (i * (calHeight / 6)));
	}
	for (var i = 1; i <= 7; i++) { // Columns
		ctx.moveTo(x + (i * (calWidth / 7)), y + (calHeight / 6) - 18);
		ctx.lineTo(x + (i * (calWidth / 7)), y + calHeight);
	}
	ctx.stroke();
	ctx.font = monthFont + "px Arial";
	ctx.fillStyle = "#000000";
	ctx.fillText(months[calendar.month] + " " + calendar.year, x + 2, y + 16);
	ctx.font = dayFont + "px Arial";
	ctx.fillText("Sunday        Monday       Tuesday     Wednesday   Thursday        Friday        Saturday", x + 9, y + 38);
}