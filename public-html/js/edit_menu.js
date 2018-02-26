var edit_menu;
var edit_menu_visible = false;

function init() {
	edit_menu = ["page-elements", "pen", "shape", "text"];
}

function toggleMenu(menuToToggle) {
	if (menuToToggle == 'edit-menu') {
		edit_menu_visible = !edit_menu_visible;
		for (var item in edit_menu) {
			document.getElementById(edit_menu[item]).style.display = (edit_menu_visible ? "flex" : "none");
			$("#" + edit_menu[item]).fadeToggle();
		}
	}
}

init();