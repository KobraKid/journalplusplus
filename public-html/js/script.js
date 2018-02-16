var title = "BuJo++";
var profileVisible = false;
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
	
	profileVisible = !profileVisible;
	if (profileVisible) {
		profileOptions.style.display = "flex";
	} else {
		profileOptions.style.display = "none";		
	}
}

init();