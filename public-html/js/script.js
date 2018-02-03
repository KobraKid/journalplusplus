function init() {

}

function switchToLogin() {
	document.getElementById("register").style.display = "none";
	document.getElementById("switch-to-login").style.display = "none";
	document.getElementById("login").style.display = "block";
	document.getElementById("cancelLogin").style.display = "block";
}

function switchToRegister() {
	document.getElementById("register").style.display = "block";
	document.getElementById("switch-to-login").style.display = "block";
	document.getElementById("login").style.display = "none";
	document.getElementById("cancelLogin").style.display = "none";
}

init();