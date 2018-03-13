var popupExists = false;
var popX = 0;
var popY = 0;
var popWidth = 320;
var popHeight = 480;
var popupOuterPadding = 15;
var popupInnerPadding = 10;
var popupTitleSize = 30;
var popupTextSize = 12;
var popupHeaderSize = 14;
var popupEventString = "This is a Test Event for you!";
var popupLocation = "1234 Sheridan Rd. Evanston, IL";
var popupStartTime = new Date(2018, 2, 14, 13, 59, 26, 53);
var popupEndTime = new Date(2018, 2, 15, 01, 11, 11, 11);

function openPopup(x, y) {
	popupExists = true;
	popX = x;
	popY = y;
}

function closePopup() {
	popupExists = false;
}

function redrawPopup() {
	if (popupExists) {
		// Blur background
		ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
		ctx.beginPath();
		ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.fill();

		// Drop shadow
		ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
		ctx.beginPath();
		ctx.rect(popX - (popWidth / 2) + 5, popY - (popHeight / 2) + 5, popWidth, popHeight);
		ctx.fill();

		// Popup
		ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
		ctx.beginPath();
		ctx.rect(popX - (popWidth / 2), popY - (popHeight / 2), popWidth, popHeight);
		ctx.fill();

		/*
		 * BEGIN Hardcoded data
		 */
		ctx.font = popupTitleSize + "px Arial";
		ctx.fillStyle = "#000000";
		ctx.strokeStyle = "#89909f";
		ctx.lineWidth = 1;
		
			/* title */
		ctx.fillText(new Date().toDateString(),
			popX - (popWidth / 2)
				+ popupOuterPadding,
			popY - (popHeight / 2)
				+ popupOuterPadding
				+ popupTitleSize);

			/* underline */
		ctx.beginPath();
		ctx.moveTo(popX - (popWidth / 2)
				+ popupOuterPadding,
			popY - (popHeight / 2)
				+ popupOuterPadding
				+ popupTitleSize
				+ popupInnerPadding);
		ctx.lineTo(popX + (popWidth / 2)
				- popupOuterPadding,
			popY - (popHeight / 2)
				+ popupOuterPadding
				+ popupTitleSize
				+ popupInnerPadding);
		ctx.stroke();

			/* Description */
		ctx.font = popupHeaderSize + "px Arial";
		ctx.fillStyle = "#89909f";
		ctx.fillText("Description:",
			popX- (popWidth / 2)
				+ popupOuterPadding,
			popY - (popHeight / 2)
				+ popupOuterPadding
				+ popupTitleSize
				+ popupInnerPadding
				+ (1 * (
					+ popupInnerPadding
					+ popupTextSize)));
		ctx.font = popupTextSize + "px Arial";
		ctx.fillText(popupEventString,
			popX- (popWidth / 2)
				+ popupOuterPadding,
			popY - (popHeight / 2)
				+ popupOuterPadding
				+ popupTitleSize
				+ popupInnerPadding
				+ (2 * (
					+ popupInnerPadding
					+ popupTextSize)));

			/* Details */
		ctx.font = popupHeaderSize + "px Arial";
		ctx.fillText("Location:",
			popX- (popWidth / 2)
				+ popupOuterPadding,
			popY - (popHeight / 2)
				+ popupOuterPadding
				+ popupTitleSize
				+ popupInnerPadding
				+ (4 * (
					+ popupInnerPadding
					+ popupTextSize)));
		ctx.font = popupTextSize + "px Arial";
		ctx.fillText(popupLocation,
			popX- (popWidth / 2)
				+ popupOuterPadding,
			popY - (popHeight / 2)
				+ popupOuterPadding
				+ popupTitleSize
				+ popupInnerPadding
				+ (5 * (
					+ popupInnerPadding
					+ popupTextSize)));

			/* Date/Time */
		ctx.font = popupHeaderSize + "px Arial";
		ctx.fillText("From:",
			popX- (popWidth / 2)
				+ popupOuterPadding,
			popY - (popHeight / 2)
				+ popupOuterPadding
				+ popupTitleSize
				+ popupInnerPadding
				+ (7 * (
					+ popupInnerPadding
					+ popupTextSize)));
		ctx.font = popupTextSize + "px Arial";
		ctx.fillText(popupStartTime.toDateString()
				+ " at "
				+ popupStartTime.getHours() % 12
				+ ":"
				+ popupStartTime.getMinutes(),
			popX- (popWidth / 2)
				+ popupOuterPadding,
			popY - (popHeight / 2)
				+ popupOuterPadding
				+ popupTitleSize
				+ popupInnerPadding
				+ (8 * (
					+ popupInnerPadding
					+ popupTextSize)));
		ctx.font = popupHeaderSize + "px Arial";
		ctx.fillText("To:",
			popX- (popWidth / 2)
				+ popupOuterPadding,
			popY - (popHeight / 2)
				+ popupOuterPadding
				+ popupTitleSize
				+ popupInnerPadding
				+ (10 * (
					+ popupInnerPadding
					+ popupTextSize)));
		ctx.font = popupTextSize + "px Arial";
		ctx.fillText(popupEndTime.toDateString()
				+ " at "
				+ popupEndTime.getHours() % 12
				+ ":"
				+ popupEndTime.getMinutes(),
			popX- (popWidth / 2)
				+ popupOuterPadding,
			popY - (popHeight / 2)
				+ popupOuterPadding
				+ popupTitleSize
				+ popupInnerPadding
				+ (11 * (
					+ popupInnerPadding
					+ popupTextSize)));
	}
}