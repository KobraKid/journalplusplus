var title = "BuJo++";

function init() {
	document.title = title + " | Register";
}

function switchToLogin() {
	document.title = title + " | Login";
	document.getElementById("register").style.display = "none";
	document.getElementById("switch-to-login").style.display = "none";
	document.getElementById("login").style.display = "block";
	document.getElementById("cancelLogin").style.display = "block";
}

function switchToRegister() {
	document.title = title + " | Register";
	document.getElementById("register").style.display = "block";
	document.getElementById("switch-to-login").style.display = "block";
	document.getElementById("login").style.display = "none";
	document.getElementById("cancelLogin").style.display = "none";
}

init();
