const follow = async (toastContent, lang, userId) => {
	toast({
		msg: toastContent[lang]["loading"],
		toastColor: '6b469c',
		borderColor: '6b469c',
		lang: lang
	});

	const res = await fetch(
		`../users/follow/?uid=${userId}`,
		{
			method: "patch",
			body: JSON.stringify({}),
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	if (res.status === 401) {
		window.open('../login/', '_self');
		return;
	}

	if (res.status !== 200) {
		toast({
			msg: toastContent[lang]["tryAgainLater"],
			toastColor: 'red',
			borderColor: 'red',
			lang: lang,
		});

		return;
	}

	window.open('.', '_self');
}

const unfollow = async (toastContent, lang, userId) => {
	toast({
		msg: toastContent[lang]["loading"],
		toastColor: '6b469c',
		borderColor: '6b469c',
		lang: lang
	});

	const res = await fetch(
		`../users/follow/?uid=${userId}`,
		{
			method: "patch",
			body: JSON.stringify({}),
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	if (res.status === 401) {
		window.open('../login/', '_self');
		return;
	}

	if (res.status !== 200) {
		toast({
			msg: toastContent[lang]["tryAgainLater"],
			toastColor: 'red',
			borderColor: 'red',
			lang: lang,
		});

		return;
	}

	window.open('.', '_self');
}
const closeRead = () => {
	const dialog = document.getElementById('read');
	const dialogOverlay = document.getElementById('read-overlay');
	dialog.style.display = 'none';
	dialogOverlay.style.display = 'none';
}

let readerState;

const setupReader = (state) => {
	readerState = state;
	console.log(readerState);
}

const read = () => {
	const bookContainer = document.getElementById('book-container');
	const pageField = document.getElementById('go-to-page');
	pageField.value = readerState.page;
	pageField.onchange = () => { searchPage(pageField); }

	const nextPage = document.getElementById('book-action-next-page');
	nextPage.onclick = () => { nextPageListener(pageField); }

	const nextTenPage = document.getElementById('book-action-next-ten-pages');
	nextTenPage.onclick = () => { nextTenPagesListener(pageField); }

	const perviousPage = document.getElementById('book-action-pervious-page');
	perviousPage.onclick = () => { perviousPageListener(pageField); }

	const perviousTenPage = document.getElementById('book-action-pervious-ten-pages');
	perviousTenPage.onclick = () => { perviousTenPagesListener(pageField); }

	const zoomIn = document.getElementById('book-action-zoom-in');
	zoomIn.onclick = () => { zoomInLisenter(); }

	const zoomOut = document.getElementById('book-action-zoom-out');
	zoomOut.onclick = () => { zoomOutLisenter(); }


	const dialog = document.getElementById('read');
	const dialogOverlay = document.getElementById('read-overlay');

	render();
	dialog.style.display = 'flex';
	dialogOverlay.style.display = 'flex';

}


const nextPageListener = (pageField) => {
	if(readerState.page == readerState.pdf._pdfInfo.numPages) return;
	readerState.page += 1;
	pageField.value = readerState.page;
	render();
}
const nextTenPagesListener = (pageField) => {
	if(readerState.page == readerState.pdf._pdfInfo.numPages) return;

	if ((readerState.page + 10) >= readerState.pdf._pdfInfo.numPages){
		readerState.page = readerState.pdf._pdfInfo.numPages;
	} else {
		readerState.page += 10;
	}

	pageField.value = readerState.page;
	render();
}

const perviousPageListener = (pageField) => {
	if(readerState.page == 1) return;
	readerState.page -= 1;
	pageField.value = readerState.page;
	render();

}

const perviousTenPagesListener = (pageField) => {
	if(readerState.page == 1) return;

	if ((readerState.page - 10) <= 1){
		readerState.page = 1;
	} else {
		readerState.page -= 10;
	}

	pageField.value = readerState.page;
	render();
}

const zoomInLisenter = () => {
	if (readerState.zoom == 2) return;
	readerState.zoom += 0.5;
	render();
}


const zoomOutLisenter = () => {
	if (readerState.zoom == 0) return;
	readerState.zoom -= 0.5;
	render();
}

const searchPage = (searchField) => {
	if( Number.parseInt(searchField.value.trim()) > 0 && Number.parseInt(searchField.value.trim()) < readerState.pdf._pdfInfo.numPages) {
		readerState.page = Number.parseInt(searchField.value.trim());
		render();
	}

	if ( Number.parseInt(searchField.value.trim()) <= 1 ) {
		readerState.page = 1;
		searchField.value = `${1}`
		render();
	}

	if ( Number.parseInt(searchField.value.trim()) >= readerState.pdf._pdfInfo.numPages ) {
		readerState.page = readerState.pdf._pdfInfo.numPages;
		searchField.value = `${readerState.pdf._pdfInfo.numPages}`
		render();
	}

}


const render = () => {
    readerState.pdf.getPage(readerState.page).then((page) => {
    var canvas = document.getElementById("book-render");
    var ctx = canvas.getContext('2d');

    var viewport = page.getViewport(readerState.zoom);

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    page.render({
        canvasContext: ctx,
        viewport: viewport
    });
});
}

