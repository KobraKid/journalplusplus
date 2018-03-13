// For Pen
var paint = false; // Toggles when the user can draw with the pen
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var clickColor = new Array();
var clickSize = new Array();
var penColor = "#FF0000";
var penSize = 5;

function enablePen() {
	disableAll();
	$("body").css('cursor','none');
	$("#journal-canvas").css('cursor','none');
	$("#cursor").css("display", "inherit");
	$("#cursor").css("background-color", penColor);
	$('#journal-canvas').mousedown(
		function(e){
			var mouseX = e.pageX - this.offsetLeft;
			var mouseY = e.pageY - this.offsetTop;
			paint = true;
			addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
			redraw();
		}
	);
	$('#journal-canvas').mousemove(
		function(e){
			$("#cursor").css({left:e.pageX + 1, top:e.pageY + 1});
			if(paint){
				addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
				redraw();
			}
		}
	);
	$('#journal-canvas').mouseup(
		function(e){
			paint = false;
		}
	);
}

function addClick(x, y, dragging) {
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(dragging);
	clickColor.push(penColor);
	clickSize.push(penSize);
}

function redrawPen() {
	ctx.lineJoin = "round";
			
	for(var i = 0; i < clickX.length; i++) {
		ctx.strokeStyle = clickColor[i];
		ctx.lineWidth = clickSize[i];
		ctx.beginPath();
		if (clickDrag[i] && i) {
			ctx.moveTo(clickX[i - 1], clickY[i - 1]);
		} else {
			ctx.moveTo(clickX[i] - 1, clickY[i]);
		}
		ctx.lineTo(clickX[i], clickY[i]);
		ctx.closePath();
		ctx.stroke();
	}
}

function disablePen() {
	paint = false;
	$("#cursor").css("display", "none");
	$('#journal-canvas').off("mousemove");
	$('#journal-canvas').off("mousedown");
	$('#journal-canvas').off("mouseup");
}