var title = "BuJo++";
var profile_visible = false;
var profileOptions;

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

init();