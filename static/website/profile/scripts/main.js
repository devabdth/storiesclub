let booksSectionToggled = true;
let videosSectionToggled = true;
let audiosSectionToggled = true;
const postsSectionToggle = (sectionName) => {
	const btn = document.getElementById(`${sectionName}-posts-section-toggle`);
	const section = document.getElementById(sectionName);
	const table = document.getElementById(`${sectionName}-table`);
	switch (sectionName){
		case 'books':
			if(booksSectionToggled) {
				btn.style.transform = "rotate(0deg)";
				booksSectionToggled = !booksSectionToggled;
				table.style.display = "none";
				return;
			}
			btn.style.transform = "rotate(90deg)";
			booksSectionToggled = !booksSectionToggled;
			table.style.display = "block";
			break;
		case 'audios':
			if(audiosSectionToggled) {
				btn.style.transform = "rotate(0deg)";
				audiosSectionToggled = !audiosSectionToggled;
				table.style.display = "none";
				return;
			}
			btn.style.transform = "rotate(90deg)";
			audiosSectionToggled = !audiosSectionToggled;
			table.style.display = "block";
			break;
		case 'videos':
		if(videosSectionToggled) {
				btn.style.transform = "rotate(0deg)";
				videosSectionToggled = !videosSectionToggled;
				table.style.display = "none";
				return;
			}
			btn.style.transform = "rotate(90deg)";
			videosSectionToggled = !videosSectionToggled;
			table.style.display = "block";
			break;
		default:
			return;
	}

}

const booksFragment = () => {
	const booksFragment = document.getElementById('books-fragment');
	const videosFragment = document.getElementById('videos-fragment');
	const audiosFragment = document.getElementById('audios-fragment');
	const booksFragmentController = document.getElementById('books-fragment-controller');
	const videosFragmentController = document.getElementById('videos-fragment-controller');
	const audiosFragmentController = document.getElementById('audios-fragment-controller');
	booksFragmentController.classList.add('active-fragment-controller');
	audiosFragmentController.classList.remove('active-fragment-controller');
	videosFragmentController.classList.remove('active-fragment-controller');
	booksFragment.classList.add('active-fragment');
	audiosFragment.classList.remove('active-fragment');
	videosFragment.classList.remove('active-fragment');
}

const audiosFragment = () => {
	const booksFragment = document.getElementById('books-fragment');
	const videosFragment = document.getElementById('videos-fragment');
	const audiosFragment = document.getElementById('audios-fragment');
	const booksFragmentController = document.getElementById('books-fragment-controller');
	const videosFragmentController = document.getElementById('videos-fragment-controller');
	const audiosFragmentController = document.getElementById('audios-fragment-controller');
	audiosFragmentController.classList.add('active-fragment-controller');
	booksFragmentController.classList.remove('active-fragment-controller');
	videosFragmentController.classList.remove('active-fragment-controller');
	audiosFragment.classList.add('active-fragment');
	booksFragment.classList.remove('active-fragment');
	videosFragment.classList.remove('active-fragment');
}

const videosFragment = () => {
	const booksFragment = document.getElementById('books-fragment');
	const videosFragment = document.getElementById('videos-fragment');
	const audiosFragment = document.getElementById('audios-fragment');
	const booksFragmentController = document.getElementById('books-fragment-controller');
	const videosFragmentController = document.getElementById('videos-fragment-controller');
	const audiosFragmentController = document.getElementById('audios-fragment-controller');
	videosFragmentController.classList.add('active-fragment-controller');
	audiosFragmentController.classList.remove('active-fragment-controller');
	booksFragmentController.classList.remove('active-fragment-controller');
	videosFragment.classList.add('active-fragment');
	booksFragment.classList.remove('active-fragment');
	audiosFragment.classList.remove('active-fragment');
}