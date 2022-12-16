window.onload = () => {

	let currentTime = 0;

	const currentTimeDisplay = document.getElementById('current-time');
	setInterval(() => {
		currentTime += 1;
		currentTimeDisplay.innerHTML =  new Date(currentTime * 1000).toISOString().substring(11, 19);
		currentTimeDisplay.innerText =  new Date(currentTime * 1000).toISOString().substring(11, 19);
	}, 1000);

}
const closeToolTip = () => {
	const dialog = document.getElementById('better-exp-tip');
	dialog.style.display = 'none';
}