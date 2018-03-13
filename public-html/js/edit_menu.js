var edit_menu;
var edit_menu_visible = true;
var element_menu;
var element_menu_visible = true;
var pen_menu;
var pen_menu_visible = true;
var shape_menu;
var shape_menu_visible = true;
var text_menu;
var text_menu_visible = true;

function init() {
	edit_menu = ["page-elements", "pen", "shape", "text"];
	element_menu = ["image", "stickers", "calendar", "list"];
	pen_menu = ["pen-color", "weight", "texture", "eraser"];
	shape_menu = ["square", "circle", "triangle", "star", "heart"];
	text_menu = ["font", "size", "text-color", "bold", "italic"];
	toggleMenu('edit-menu');
}

/*
 * When a menu loses focus, it should be hidden
 */
function turnOffMenus() {
	if (edit_menu_visible) toggleMenu('edit-menu');
	if (element_menu_visible) toggleMenu('element-menu');
	if (pen_menu_visible) toggleMenu('pen-menu');
	if (shape_menu_visible) toggleMenu('shape-menu');
	if (text_menu_visible) toggleMenu('text-menu');
	if (profile_visible) toggleProfile();
}

/*
 * Turn menus and sub menus on and off
 */
function toggleMenu(menuToToggle) {
	/* If turning off the edit menu, turn off all other menus */
	if (menuToToggle == 'edit-menu') {
		if (edit_menu_visible) {
			if (pen_menu_visible) toggleMenu('pen-menu');
			if (shape_menu_visible) toggleMenu('shape-menu');
			if (element_menu_visible) toggleMenu('element-menu');
			if (text_menu_visible) toggleMenu('text-menu');
		}
		edit_menu_visible = !edit_menu_visible;
		for (var item in edit_menu) {
			$("#" + edit_menu[item]).fadeToggle();
			if (edit_menu_visible)
				document.getElementById(edit_menu[item]).style.display = "flex";
		}
		if (edit_menu_visible) {
			$("#edit-root").css("display", "none");
			$("#return").css("display", "inline-block");
		} else {
			$("#edit-root").css("display", "inline-block");
			$("#return").css("display", "none");
		}
	}
	/* If turning on the element menu, turn off pen, shape and text menus */
	else if(menuToToggle == 'element-menu') {
		if (!element_menu_visible) {
			if (pen_menu_visible) toggleMenu('pen-menu');
			if (shape_menu_visible) toggleMenu('shape-menu');
			if (text_menu_visible) toggleMenu('text-menu');
		}
		element_menu_visible = !element_menu_visible;
		for (var item in element_menu) {
			$("#" + element_menu[item]).fadeToggle();
			if (element_menu_visible)
				document.getElementById(element_menu[item]).style.display = "flex";
		}
	}
	/* If turning on the shape menu, turn off pen, element, and text menus */
	else if(menuToToggle == 'shape-menu') {
		if (!shape_menu_visible) {
			if (pen_menu_visible) toggleMenu('pen-menu');
			if (element_menu_visible) toggleMenu('element-menu');
			if (text_menu_visible) toggleMenu('text-menu');
		}
		shape_menu_visible = !shape_menu_visible;
		for (var item in shape_menu) {
			$("#" + shape_menu[item]).fadeToggle();
			if (shape_menu_visible)
				document.getElementById(shape_menu[item]).style.display = "flex";
		}
	}
	/* If turning on the text menu, turn off pen, shape, and element menus */
	else if(menuToToggle == 'text-menu') {
		if (!text_menu_visible) {
			if (pen_menu_visible) toggleMenu('pen-menu');
			if (shape_menu_visible) toggleMenu('shape-menu');
			if (element_menu_visible) toggleMenu('element-menu');
		}
		text_menu_visible = !text_menu_visible;
		for (var item in text_menu) {
			$("#" + text_menu[item]).fadeToggle();
			if (text_menu_visible)
				document.getElementById(text_menu[item]).style.display = "flex";
		}
	}
	/* If turning on the pen menu, turn off element, shape, and text menus */
	else if(menuToToggle == 'pen-menu') {
		if (!pen_menu_visible) {
			if (element_menu_visible) toggleMenu('element-menu');
			if (shape_menu_visible) toggleMenu('shape-menu');
			if (text_menu_visible) toggleMenu('text-menu');
		}
		pen_menu_visible = !pen_menu_visible;
		for (var item in pen_menu) {
			$("#" + pen_menu[item]).fadeToggle();
			if (pen_menu_visible)
				document.getElementById(pen_menu[item]).style.display = "flex";
		}
	}
}


init();
