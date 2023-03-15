const filter= () => {
	const nameField = document.getElementById('name-token');
	const emailField = document.getElementById('email-token');

	if (nameField.value.trim().length === 0 && emailField.value.trim().length === 0) {
		nameField.style.border= "1px red solid";
		emailField.style.border= "1px red solid";
		return;
	}

	if (nameField.value.trim().length === 0) {
		window.open(`./?email=${emailField.value.trim()}`, '_self')
		return;
	}

	if (emailField.value.trim().length === 0) {
		window.open(`./?name=${nameField.value.trim()}`, '_self');
		return;
	}
		window.open(`./?email=${nameField.value.trim()}&name=${nameField.value.trim()}`, '_self')
}

const clearFilteration= () => {
		console.log(window.location.href)
	if (!window.location.href.includes('?')) {
		return;
	}

	window.open(window.location.href.split('?')[0], '_self')
}

const showBanList= ()=> {
	
}