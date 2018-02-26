var edit_menu;
var edit_menu_visible = false;
var element_menu;
var element_menu_visible = false;
var pen_menu;
var pen_menu_visible = false;
var shape_menu;
var shape_menu_visible = false;
var text_menu;
var text_menu_visible = false;

function init() {
	edit_menu = ["page-elements", "pen", "shape", "text"];
	element_menu = ["image", "stickers", "calendar", "list"];
	pen_menu = ["color", "weight", "texture", "eraser"];
	shape_menu = ["square", "circle", "triangle", "star", "heart"];
	text_menu = ["font", "size", "color", "bold", "italic"];
}

function toggleMenu(menuToToggle) {
	if (menuToToggle == 'edit-menu') {
		edit_menu_visible = !edit_menu_visible;
		for (var item in edit_menu) {
			document.getElementById(edit_menu[item]).style.display = (edit_menu_visible ? "flex" : "none");
			$("#" + edit_menu[item]).fadeToggle();
		}
	}
	else if(menuToToggle == 'element-menu'){
		element_menu_visible = !element_menu_visible;
		for (var item in element_menu) {
			document.getElementById(element_menu[item]).style.display = (element_menu_visible ? "flex" : "none");
			$("#" + element_menu[item]).fadeToggle();
		}
	}
	else if(menuToToggle == 'shape-menu'){
		shape_menu_visible = !shape_menu_visible;
		for (var item in shape_menu) {
			document.getElementById(shape_menu[item]).style.display = (shape_menu_visible ? "flex" : "none");
			$("#" + shape_menu[item]).fadeToggle();
		}
	}
	else if(menuToToggle == 'text-menu'){
		text_menu_visible = !text_menu_visible;
		for (var item in text_menu) {
			document.getElementById(text_menu[item]).style.display = (text_menu_visible ? "flex" : "none");
			$("#" + text_menu[item]).fadeToggle();
		}
	}
	else if(menuToToggle == 'pen-menu'){
		pen_menu_visible = !pen_menu_visible;
		for (var item in pen_menu) {
			document.getElementById(pen_menu[item]).style.display = (pen_menu_visible ? "flex" : "none");
			$("#" + pen_menu[item]).fadeToggle();
		}
	}
}


init();
