var edit_menu;
var edit_menu_visible = false;

function init() {
	edit_menu = [
					document.getElementById("page-elements"),
					document.getElementById("pen"),
					document.getElementById("shape"),
					document.getElementById("text"),
				];
	console.log(edit_menu);
}

function toggleMenu(menuToToggle) {
	console.log(menuToToggle);
	if (menuToToggle == 'edit-menu') {
		edit_menu_visible = !edit_menu_visible;
		for (var item in edit_menu) {
			edit_menu[item].style.display = (edit_menu_visible ? "flex" : "none");
		}
	}
}

init();