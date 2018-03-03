var title = "BuJo++";
var profile_visible = false;
var profileOptions;
var knick_knacks = ["cactus", "fishbowl", "lavalamp", "vase", "rock", "cube", "bird"];
var k = 0;

function init() {
	document.title = title;
	if (document.getElementById("profile") !== null) {
		document.getElementById("profile").addEventListener('click', toggleProfile);;
		profileOptions = document.getElementById("profile-dropdown");
		profileOptions.style.display = "none";
		console.log(profileOptions);
	}
}

function notSupported() {
	alert('Sorry, this functionality is not yet supported.');
}

function toggleProfile() {
	if (profileOptions === null) return;
	
	profile_visible = !profile_visible;
	if (profile_visible) {
		profileOptions.style.display = "flex";
	} else {
		profileOptions.style.display = "none";		
	}
}

function getPageName() {
	var page = window.location.href;
	page = page.substring(page.indexOf("/") + 1);
	page = page.substring(page.indexOf("/") + 1);
	page = page.substring(page.indexOf("/") + 1);
	return page;
}

function goBack() {
	var page = getPageName();
	switch (page) {
		case "edit/index.html":
			window.location = window.location.href.substring(0, window.location.href.indexOf(page)) + "index.html";
			break;
		case "profile.html":
			window.location = window.location.href.substring(0, window.location.href.indexOf(page)) + "index.html";
			break;
	}
	console.log(page);
}

function toggleKnickKnack() {
	k = (k + 1) % knick_knacks.length;
	$("#knick-knack").attr("src", "images/" + knick_knacks[k] + ".png");
}

init();