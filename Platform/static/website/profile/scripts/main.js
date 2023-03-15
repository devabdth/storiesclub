let booksSectionToggled = true;
let videosSectionToggled = true;
let audiosSectionToggled = true;
const postsSectionToggle = (sectionName) => {
	const btn = document.getElementById(`${sectionName}-posts-section-toggle`);
	const section = document.getElementById(sectionName);
	const table = document.getElementById(`${sectionName}-table`);
	switch (sectionName) {
		case 'books':
			if (booksSectionToggled) {
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
			if (audiosSectionToggled) {
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
			if (videosSectionToggled) {
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



let currentCategory;

const toggleCategoriesDropdown = () => {
	document.getElementById(`categories-dropdown`).classList.toggle("show");
}

const filter = () => {
	var input, filter, ul, li, a, i;
	input = document.getElementById("category-search");
	filter = input.value.toUpperCase();
	div = document.getElementById("categories-dropdown");
	button = div.getElementsByTagName("button");
	for (i = 0; i < button.length; i++) {
		txtValue = button[i].textContent || button[i].innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			button[i].style.display = "";
		} else {
			button[i].style.display = "none";
		}
	}
}


const chooseCategory = (category, lang, wtoggle) => {
	const btn = document.getElementById(`dropbtn`);
	currentCategory = category["id"]
	btn.innerHTML = category["name"][lang];
	btn.innerText = category["name"][lang];
	btn.textContent = category["name"][lang];

	if (wtoggle || false) {
		toggleCategoriesDropdown();
	}

}


const closeEditDialog = () => {
	document.getElementById('dialog-overlay').style.display = 'none';
	document.getElementById('dialog').style.display = 'none';
}

const openEditDialog = async (post, lang, mode) => {
	const dialogTitle = document.querySelector('div#dialog > div#header > h3');
	const dialogClose = document.querySelector('div#dialog > div#header > div');

	const titleField = document.getElementById('title-field');
	titleField.value = post['title'];
	const descField = document.getElementById('desc-field');
	descField.value = post['desc'];
	const statusMsg = document.getElementById('status-msg');
	statusMsg.innerHTML = lang == 'en' ? 'Loading...' : 'جاري التحميل';

	switch (mode) {
		case 'books':
			dialogTitle.innerHTML = lang == 'en' ? 'Edit Book' : 'تعديل كتاب';
			break;
		case 'audios':
			dialogTitle.innerHTML = lang == 'en' ? 'Edit Audio' : 'تعديل مقطع صوتي';
			break;
		case 'videos':
			dialogTitle.innerHTML = lang == 'en' ? 'Edit Book' : 'تعديل مقطع فيديو';
			break;

	}

	chooseCategory(post.category, lang, false);

	const submitButton = document.getElementById('edit-dialog-submit');
	const deleteButton = document.getElementById('edit-dialog-delete');
	const clearButton = document.getElementById('edit-dialog-clear');

	clearButton.onclick = () => {
		titleField.value = '';
		descField.value = '';
		currentCategory = undefined;
		closeEditDialog();
	}

	dialogClose.onclick = () => {
		titleField.value = '';
		descField.value = '';
		currentCategory = undefined;
		closeEditDialog();
	}

	deleteButton.onclick = async () => {
		switch (mode) {
			case 'books':
				console.log(post.id);
				statusMsg.innerHTML = lang == 'en' ? 'Loading...' : 'جاري التحميل';
				submitButton.disabled = true;
				dialogClose.disabled = true;
				clearButton.disabled = true;
				try {
					const result = await fetch(
						`/books/?id=${post.id}`, {
						method: "DELETE",
						header: {
							'Content-Type': 'application/json'
						}
					}
					);

					if (result.status === 200) {
						window.open('./', '_self');
						return;
					}
					statusMsg.innerHTML = lang == 'en' ? 'Try again later!' : 'أعد المحاولة لاحقاً';
					submitButton.disabled = false;
					clearButton.disabled = false;
					dialogClose.disabled = false;
					return;


				} catch (e) {
					console.log(e);
					statusMsg.innerHTML = lang == 'en' ? 'Try again later!' : 'أعد المحاولة لاحقاً';
					submitButton.disabled = false;
					clearButton.disabled = false;
					dialogClose.disabled = false;
				}
				break;
			case 'audios':
				console.log(post.id);
				statusMsg.innerHTML = lang == 'en' ? 'Loading...' : 'جاري التحميل';
				submitButton.disabled = true;
				dialogClose.disabled = true;
				clearButton.disabled = true;
				try {
					const result = await fetch(
						`/audios/?id=${post.id}`, {
						method: "DELETE",
						header: {
							'Content-Type': 'application/json'
						}
					}
					);

					if (result.status === 200) {
						window.open('./', '_self');
						return;
					}
					statusMsg.innerHTML = lang == 'en' ? 'Try again later!' : 'أعد المحاولة لاحقاً';
					submitButton.disabled = false;
					clearButton.disabled = false;
					dialogClose.disabled = false;
					return;


				} catch (e) {
					console.log(e);
					statusMsg.innerHTML = lang == 'en' ? 'Try again later!' : 'أعد المحاولة لاحقاً';
					submitButton.disabled = false;
					clearButton.disabled = false;
					dialogClose.disabled = false;
				}
				break;
			case 'videos':
				console.log(post.id);
				statusMsg.innerHTML = lang == 'en' ? 'Loading...' : 'جاري التحميل';
				submitButton.disabled = true;
				dialogClose.disabled = true;
				clearButton.disabled = true;
				try {
					const result = await fetch(
						`/videos/?id=${post.id}`, {
						method: "DELETE",
						header: {
							'Content-Type': 'application/json'
						}
					}
					);

					if (result.status === 200) {
						window.open('./', '_self');
						return;
					}
					statusMsg.innerHTML = lang == 'en' ? 'Try again later!' : 'أعد المحاولة لاحقاً';
					submitButton.disabled = false;
					clearButton.disabled = false;
					dialogClose.disabled = false;
					return;


				} catch (e) {
					console.log(e);
					statusMsg.innerHTML = lang == 'en' ? 'Try again later!' : 'أعد المحاولة لاحقاً';
					submitButton.disabled = false;
					clearButton.disabled = false;
					dialogClose.disabled = false;
				}
				break;
		}
	}

	submitButton.onclick = async () => {
		switch (mode) {
			case 'books':
				dialogTitle.innerHTML = lang == 'en' ? 'Edit Book' : 'تعديل كتاب';
				if (titleField.value.trim() == post.title && descField.value.trim() == post.desc && currentCategory == post.category["id"]) {
					statusMsg.innerHTML = lang == 'en' ? 'No updates found!' : 'أنتً لم تقم بأي تعديل';
					return;
				}
				if (titleField.value.trim().length < 8) {
					statusMsg.innerHTML = lang == 'en' ? 'Enter valid title' : 'أدخل عنواناً مناسباً';
					titleField.style.border = '2px red solid';
					return;
				}
				titleField.style.border = '2px #111 solid';
				statusMsg.innerHTML = lang == 'en' ? 'Loading...' : 'جاري التحميل'

				if (descField.value.trim().length < 32) {
					statusMsg.innerHTML = lang == 'en' ? 'Make your description more detailed!' : 'اجعل وصفك أكثر تفصيلاً';
					descField.style.border = '2px red solid';
					return;
				}
				descField.style.border = '2px #111 solid';
				statusMsg.innerHTML = lang == 'en' ? 'Loading...' : 'جاري التحميل'

				if (currentCategory === undefined) {
					document.getElementById('dropbtn').style.border = '2px red solid';
					statusMsg.innerHTML = lang == 'en' ? 'Pick category!' : 'إختر التصنيف';
				}
				document.getElementById('dropbtn').style.border = 'none'
				statusMsg.innerHTML = lang == 'en' ? 'Loading...' : 'جاري التحميل';

				post.title = titleField.value.trim();
				post.desc = descField.value.trim();
				post.category = currentCategory;

				submitButton.disabled = true;
				deleteButton.disabled = true;
				clearButton.disabled = true;
				dialogClose.disabled = true;
				try {
					const res = await fetch(
						'/book/', {
						method: 'PATCH',
						body: JSON.stringify(post),
						header: {
							'Content-Type': 'application/json',
						}
					}
					);

					if (res.status == 200) {
						window.open('./', '_self');
						return;
					} else {
						statusMsg.innerHTML = lang == 'en' ? 'Try again later!' : 'الرجاء المحاولة لاحقأً';
						submitButton.disabled = false;
						deleteButton.disabled = false;
						clearButton.disabled = false;
						dialogClose.disabled = false;
					}
				} catch (e) {
					console.log(e);
					submitButton.disabled = false;
					deleteButton.disabled = false;
					clearButton.disabled = false;
					dialogClose.disabled = false;
				}
				break;
			case 'audios':
				dialogTitle.innerHTML = lang == 'en' ? 'Edit Audio' : 'تعديل مقطع صوتي';
				if (titleField.value.trim() == post.title && descField.value.trim() == post.desc && currentCategory == post.category["id"]) {
					statusMsg.innerHTML = lang == 'en' ? 'No updates found!' : 'أنتً لم تقم بأي تعديل';
					return;
				}
				if (titleField.value.trim().length < 8) {
					statusMsg.innerHTML = lang == 'en' ? 'Enter valid title' : 'أدخل عنواناً مناسباً';
					titleField.style.border = '2px red solid';
					return;
				}
				titleField.style.border = '2px #111 solid';
				statusMsg.innerHTML = lang == 'en' ? 'Loading...' : 'جاري التحميل'

				if (descField.value.trim().length < 32) {
					statusMsg.innerHTML = lang == 'en' ? 'Make your description more detailed!' : 'اجعل وصفك أكثر تفصيلاً';
					descField.style.border = '2px red solid';
					return;
				}
				descField.style.border = '2px #111 solid';
				statusMsg.innerHTML = lang == 'en' ? 'Loading...' : 'جاري التحميل'

				if (currentCategory === undefined) {
					document.getElementById('dropbtn').style.border = '2px red solid';
					statusMsg.innerHTML = lang == 'en' ? 'Pick category!' : 'إختر التصنيف';
				}
				document.getElementById('dropbtn').style.border = 'none'
				statusMsg.innerHTML = lang == 'en' ? 'Loading...' : 'جاري التحميل';

				post.title = titleField.value.trim();
				post.desc = descField.value.trim();
				post.category = currentCategory;

				submitButton.disabled = true;
				deleteButton.disabled = true;
				clearButton.disabled = true;
				dialogClose.disabled = true;
				try {
					const res = await fetch(
						'/audio/', {
						method: 'PATCH',
						body: JSON.stringify(post),
						header: {
							'Content-Type': 'application/json',
						}
					}
					);

					if (res.status == 200) {
						window.open('./', '_self');
						return;
					} else {
						statusMsg.innerHTML = lang == 'en' ? 'Try again later!' : 'الرجاء المحاولة لاحقأً';
						submitButton.disabled = false;
						deleteButton.disabled = false;
						clearButton.disabled = false;
						dialogClose.disabled = false;
					}
				} catch (e) {
					console.log(e);
					submitButton.disabled = false;
					deleteButton.disabled = false;
					clearButton.disabled = false;
					dialogClose.disabled = false;
				}
				break;
			case 'videos':
				dialogTitle.innerHTML = lang == 'en' ? 'Edit Video' : 'تعديل مقطع فيديو';
				if (titleField.value.trim() == post.title && descField.value.trim() == post.desc && currentCategory == post.category["id"]) {
					statusMsg.innerHTML = lang == 'en' ? 'No updates found!' : 'أنتً لم تقم بأي تعديل';
					return;
				}
				if (titleField.value.trim().length < 8) {
					statusMsg.innerHTML = lang == 'en' ? 'Enter valid title' : 'أدخل عنواناً مناسباً';
					titleField.style.border = '2px red solid';
					return;
				}
				titleField.style.border = '2px #111 solid';
				statusMsg.innerHTML = lang == 'en' ? 'Loading...' : 'جاري التحميل'

				if (descField.value.trim().length < 32) {
					statusMsg.innerHTML = lang == 'en' ? 'Make your description more detailed!' : 'اجعل وصفك أكثر تفصيلاً';
					descField.style.border = '2px red solid';
					return;
				}
				descField.style.border = '2px #111 solid';
				statusMsg.innerHTML = lang == 'en' ? 'Loading...' : 'جاري التحميل'

				if (currentCategory === undefined) {
					document.getElementById('dropbtn').style.border = '2px red solid';
					statusMsg.innerHTML = lang == 'en' ? 'Pick category!' : 'إختر التصنيف';
				}
				document.getElementById('dropbtn').style.border = 'none'
				statusMsg.innerHTML = lang == 'en' ? 'Loading...' : 'جاري التحميل';

				post.title = titleField.value.trim();
				post.desc = descField.value.trim();
				post.category = currentCategory;

				submitButton.disabled = true;
				deleteButton.disabled = true;
				clearButton.disabled = true;
				dialogClose.disabled = true;
				try {
					const res = await fetch(
						'/video/', {
						method: 'PATCH',
						body: JSON.stringify(post),
						header: {
							'Content-Type': 'application/json',
						}
					}
					);

					if (res.status == 200) {
						window.open('./', '_self');
						return;
					} else {
						statusMsg.innerHTML = lang == 'en' ? 'Try again later!' : 'الرجاء المحاولة لاحقأً';
						submitButton.disabled = false;
						deleteButton.disabled = false;
						clearButton.disabled = false;
						dialogClose.disabled = false;
					}
				} catch (e) {
					console.log(e);
					submitButton.disabled = false;
					deleteButton.disabled = false;
					clearButton.disabled = false;
					dialogClose.disabled = false;
				}
				break;
		}

	}
	document.getElementById('dialog-overlay').style.display = 'flex';
	document.getElementById('dialog').style.display = 'flex';

}