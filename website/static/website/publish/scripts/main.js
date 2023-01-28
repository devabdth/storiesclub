let perviousPublishMode;
let currentPublishMode;

const initializePublishMode = (mode) => {
	currentPublishMode = mode;
	changeFragmentMode(currentPublishMode);
}

const navToFragment = (base, mode) => {
	if (mode === perviousPublishMode) {
		return;
	}

	if(mode === 0){
		open(`${base}/publish/?mode=books`, '_self');
		return;
	}

	if(mode === 1){
		open(`${base}/publish/?mode=audios`, '_self');
		return;
	}

	if(mode === 2){
		open(`${base}/publish/?mode=videos`, '_self');
		return;
	}


}

const changeFragmentMode = (mode) => {

	const activeBgColor = "#6b469c92";
	const bgColor = "#fefbe3";
	const primaryColor = "6b469c";

	const bookBtn = document.getElementById("books-fragment-btn");
	const booksFragment = document.getElementById("books-fragment");

	const audioBtn = document.getElementById("audios-fragment-btn");
	const audiosFragment = document.getElementById("audios-fragment");

	const videoBtn = document.getElementById("videos-fragment-btn");
	const videosFragment = document.getElementById("videos-fragment");

	if(currentPublishMode === 0) {
		booksFragment.style.display="block";
		bookBtn.style.color = "white";
		bookBtn.style.backgroundColor = activeBgColor;

		audiosFragment.style.display="none";
		audioBtn.style.color = primaryColor;
		audioBtn.style.backgroundColor = bgColor;

		videosFragment.style.display="none";
		videoBtn.style.color = primaryColor;
		videoBtn.style.backgroundColor = bgColor;

		perviousPublishMode = 0;
		return;

	}

	if(currentPublishMode === 1) {
		booksFragment.style.display="none";
		bookBtn.style.color = primaryColor;
		bookBtn.style.backgroundColor = bgColor;

		audiosFragment.style.display="block";
		audioBtn.style.color = "white";
		audioBtn.style.backgroundColor = activeBgColor;

		videosFragment.style.display="none";
		videoBtn.style.color = primaryColor;
		videoBtn.style.backgroundColor = bgColor;

		perviousPublishMode = 1;
		return;

	}

	if(currentPublishMode === 2) {
	booksFragment.style.display="none";
		bookBtn.style.color = primaryColor;
		bookBtn.style.backgroundColor = bgColor;

		audiosFragment.style.display="none";
		audioBtn.style.color = primaryColor;
		audioBtn.style.backgroundColor = bgColor;

		videosFragment.style.display="block";
		videoBtn.style.color = "white";
		videoBtn.style.backgroundColor = activeBgColor;

		perviousPublishMode = 1;
		return;

	}

}


let currentCover;
let currentAsset;


const pickBookCover =  async () => {
	const input = document.createElement("input");
	input.setAttribute("type", "file");
	input.setAttribute("accept", "image/*");
	input.onchange = e => {
		if (e.target.files.length === 0) {
			return;
		}
		currentCover = e.target.files[0]
		const p = document.getElementById("books-picked-cover-name");
		if(currentCover.name.length > 25) {
			p.innerHTML = `${currentCover.name.substring(0, 25)}...${currentCover.name.split('.')[1]}`;

		} else {
			p.innerHTML = currentCover.name;
		}

	}

	input.click();
}

const pickAudioCover =  async () => {
	const input = document.createElement("input");
	input.setAttribute("type", "file");
	input.setAttribute("accept", "image/*");
	input.onchange = e => {
		if (e.target.files.length === 0) {
			return;
		}
		currentCover = e.target.files[0]
		const p = document.getElementById("audios-picked-cover-name");
		if(currentCover.name.length > 25) {
			p.innerHTML = `${currentCover.name.substring(0, 25)}...${currentCover.name.split('.')[1]}`;

		} else {
			p.innerHTML = currentCover.name;
		}

	}

	input.click();
}

const pickVideoCover =  async () => {
	const input = document.createElement("input");
	input.setAttribute("type", "file");
	input.setAttribute("accept", "image/*");
	input.onchange = e => {
		if (e.target.files.length === 0) {
			return;
		}
		currentCover = e.target.files[0]
		const p = document.getElementById("videos-picked-cover-name");
		if(currentCover.name.length > 25) {
			p.innerHTML = `${currentCover.name.substring(0, 25)}...${currentCover.name.split('.')[1]}`;

		} else {
			p.innerHTML = currentCover.name;
		}

	}

	input.click();
}

const pickBookAsset =  async () => {
	const input = document.createElement("input");
	input.setAttribute("type", "file");
	input.setAttribute("accept", ".pdf");
	input.onchange = e => {
		if (e.target.files.length === 0) {
			return;
		}
		currentAsset = e.target.files[0]
		const p = document.getElementById("books-picked-asset-name");
		if(currentAsset.name.length > 25) {
			p.innerHTML = `${currentAsset.name.substring(0, 25)}...${currentAsset.name.split('.')[1]}`;

		} else {
			p.innerHTML = currentAsset.name;
		}

	}

	input.click();
}

const pickAudioAsset =  async () => {
	const input = document.createElement("input");
	input.setAttribute("type", "file");
	input.setAttribute("accept", ".mp3");
	input.onchange = e => {
		if (e.target.files.length === 0) {
			return;
		}
		currentAsset = e.target.files[0]
		const p = document.getElementById("audios-picked-asset-name");
		if(currentAsset.name.length > 25) {
			p.innerHTML = `${currentAsset.name.substring(0, 25)}...${currentAsset.name.split('.')[1]}`;

		} else {
			p.innerHTML = currentAsset.name;
		}

	}

	input.click();
}

const pickVideoAsset =  async () => {
	const input = document.createElement("input");
	input.setAttribute("type", "file");
	input.setAttribute("accept", ".mp4");
	input.onchange = e => {
		if (e.target.files.length === 0) {
			return;
		}
		currentAsset = e.target.files[0]
		const p = document.getElementById("videos-picked-asset-name");
		if(currentAsset.name.length > 25) {
			p.innerHTML = `${currentAsset.name.substring(0, 25)}...${currentAsset.name.split('.')[1]}`;

		} else {
			p.innerHTML = currentAsset.name;
		}

	}

	input.click();
}

let currentCategory;

const toggleCategoriesDropdown = (fragment) => {
  document.getElementById(`${fragment}-categories-dropdown`).classList.toggle("show");
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


const chooseCategory = (category, lang, fragment) => {
	const btn = document.getElementById(`${fragment}-dropbtn`);
	currentCategory = category["id"]
	btn.innerHTML = category["name"][lang];
	btn.innerText = category["name"][lang];
	btn.textContent = category["name"][lang];

	toggleCategoriesDropdown(fragment);

}

const showToast = (props) => {
	const toastDiv = document.getElementById("toast");
	const toastText = document.getElementById("toast-text");

	toastDiv.style.borderColor = props.borderColor;
	toastText.innerHTML = props.msg;
	toastText.style.color = props.toastColor;
	toastText.style.fontFamily = "Raleway";
	toastDiv.style.display = "flex";

	setTimeout(() => {
		toastDiv.style.display = "none";
	}, 5000)

}


const booksFragmentSubmit = async (lang) => {
	const titleField = document.getElementById("books-title");
	const descField = document.getElementById("books-desc");
	const depositNumberField = document.getElementById("books-depositNumber");
	const isbnField = document.getElementById("books-isbn");
	const categoryDropdown = document.getElementById("books-dropbtn");
	const coverContainer = document.getElementById("books-cover-pick-container");
	const assetContainer = document.getElementById("books-asset-pick-container");

	if (titleField.value.trim().length < 8) {
		showToast({
			msg: toastContent[lang]["notValidBookTitle"],
			borderColor: 'red',
			toastColor: 'red',
			lang: lang
		}); 

		titleField.style.borderColor = "red";
		titleField.style.color = "red";
		return;
	}

	titleField.style.borderColor = "#111";
	titleField.style.color = "#6b469c";


	if (descField.value.trim().length < 50) {
		showToast({
			msg: toastContent[lang]["notValidBookDesc"],
			borderColor: 'red',
			toastColor: 'red',
			lang: lang
		});

		descField.style.borderColor = "red";
		descField.style.color = "red";
		return;
	}

	descField.style.borderColor = "#111";
	descField.style.color = "#6b469c";


	if(depositNumberField.value.length !== 0 && depositNumberField.value.length !== 8) {
		showToast({
			msg: toastContent[lang]["notValidBookDepositNumber"],
			borderColor: 'red',
			toastColor: 'red',
			lang: lang
		});

		depositNumberField.style.borderColor = "red";
		depositNumberField.style.color = "red";
		return;

	}
		depositNumberField.style.borderColor = "#111";
		depositNumberField.style.color = "#6b469c";


	if(isbnField.value.length !== 0 && isbnField.value.length !== 13) {
		showToast({
			msg: toastContent[lang]["notValidBookISBN"],
			borderColor: 'red',
			toastColor: 'red',
			lang: lang
		});

		isbnField.style.borderColor = "red";
		isbnField.style.color = "red";
		return;

	}
		isbnField.style.borderColor = "#111";
		isbnField.style.color = "#6b469c";


	if(currentCategory == undefined) {
		showToast({
			msg: toastContent[lang]["notValidBookCategory"],
			borderColor: 'red',
			toastColor: 'red',
			lang: lang
		});

		categoryDropdown.style.border = " 4px red solid";
		return;

	}
		categoryDropdown.style.border = "none";



	if(currentCover == undefined) {
		showToast({
			msg: toastContent[lang]["notValidBookCover"],
			borderColor: 'red',
			toastColor: 'red',
			lang: lang
		});

		coverContainer.style.border = " 4px red solid";
		return;

	}
		coverContainer.style.border = "none";



	if(currentAsset == undefined) {
		showToast({
			msg: toastContent[lang]["notValidBookAsset"],
			borderColor: 'red',
			toastColor: 'red',
			lang: lang
		});

		assetContainer.style.border = " 4px red solid";
		return;

	}
		assetContainer.style.border = "none";

		try {
			const payload = {
					title: titleField.value.trim(),
					desc: descField.value.trim(),
					depositNumber: depositNumberField.value.trim(),
					isbn: isbnField.value.trim(),
					category: currentCategory,
			};

			// titleField.value = "";
			// descField.value = "";
			// depositNumberField.value = "";
			// isbnField.value = "";
			// currentCategory = undefined;
			await uploadBook({
				payload: payload,
				cover: currentCover,
				asset: currentAsset,
				toastContent: toastContent[lang]
			})
		} catch (e) {
			console.log(e);
		}
}


const audiosFragmentSubmit = async (lang) => {
	const titleField = document.getElementById("audio-title");
	const descField = document.getElementById("audio-desc");
	const categoryDropdown = document.getElementById("audios-dropbtn");
	const coverContainer = document.getElementById("audios-cover-pick-container");
	const assetContainer = document.getElementById("audios-asset-pick-container");

	if (titleField.value.trim().length < 8) {
		showToast({
			msg: toastContent[lang]["notValidBookTitle"],
			borderColor: 'red',
			toastColor: 'red',
			lang: lang
		}); 

		titleField.style.borderColor = "red";
		titleField.style.color = "red";
		return;
	}

	titleField.style.borderColor = "#111";
	titleField.style.color = "#6b469c";


	if (descField.value.trim().length < 50) {
		showToast({
			msg: toastContent[lang]["notValidBookDesc"],
			borderColor: 'red',
			toastColor: 'red',
			lang: lang
		});

		descField.style.borderColor = "red";
		descField.style.color = "red";
		return;
	}

	descField.style.borderColor = "#111";
	descField.style.color = "#6b469c";

	if(currentCategory == undefined) {
		showToast({
			msg: toastContent[lang]["notValidBookCategory"],
			borderColor: 'red',
			toastColor: 'red',
			lang: lang
		});

		categoryDropdown.style.border = " 4px red solid";
		return;

	}
		categoryDropdown.style.border = "none";



	if(currentCover == undefined) {
		showToast({
			msg: toastContent[lang]["notValidBookCover"],
			borderColor: 'red',
			toastColor: 'red',
			lang: lang
		});

		coverContainer.style.border = " 4px red solid";
		return;

	}
		coverContainer.style.border = "none";



	if(currentAsset == undefined) {
		showToast({
			msg: toastContent[lang]["notValidBookAsset"],
			borderColor: 'red',
			toastColor: 'red',
			lang: lang
		});

		assetContainer.style.border = " 4px red solid";
		return;

	}
		assetContainer.style.border = "none";

		try {
			await uploadAudio({
				payload: {
					title: titleField.value.trim(),
					desc: descField.value.trim(),
					category: currentCategory,
				},
				cover: currentCover,
				asset: currentAsset,
				toastContent: toastContent[lang]
			})
		} catch (e) {
			console.log(e);
		}
}


const videosFragmentSubmit = async (lang) => {
	const titleField = document.getElementById("video-title");
	const descField = document.getElementById("video-desc");
	const categoryDropdown = document.getElementById("videos-dropbtn");
	const coverContainer = document.getElementById("videos-cover-pick-container");
	const assetContainer = document.getElementById("videos-asset-pick-container");

	if (titleField.value.trim().length < 8) {
		showToast({
			msg: toastContent[lang]["notValidBookTitle"],
			borderColor: 'red',
			toastColor: 'red',
			lang: lang
		}); 

		titleField.style.borderColor = "red";
		titleField.style.color = "red";
		return;
	}

	titleField.style.borderColor = "#111";
	titleField.style.color = "#6b469c";


	if (descField.value.trim().length < 50) {
		showToast({
			msg: toastContent[lang]["notValidBookDesc"],
			borderColor: 'red',
			toastColor: 'red',
			lang: lang
		});

		descField.style.borderColor = "red";
		descField.style.color = "red";
		return;
	}

	descField.style.borderColor = "#111";
	descField.style.color = "#6b469c";

	if(currentCategory == undefined) {
		showToast({
			msg: toastContent[lang]["notValidBookCategory"],
			borderColor: 'red',
			toastColor: 'red',
			lang: lang
		});

		categoryDropdown.style.border = " 4px red solid";
		return;

	}
		categoryDropdown.style.border = "none";



	if(currentCover == undefined) {
		showToast({
			msg: toastContent[lang]["notValidBookCover"],
			borderColor: 'red',
			toastColor: 'red',
			lang: lang
		});

		coverContainer.style.border = " 4px red solid";
		return;

	}
		coverContainer.style.border = "none";



	if(currentAsset == undefined) {
		showToast({
			msg: toastContent[lang]["notValidBookAsset"],
			borderColor: 'red',
			toastColor: 'red',
			lang: lang
		});

		assetContainer.style.border = " 4px red solid";
		return;

	}
		assetContainer.style.border = "none";

		try {
			await uploadVideo({
				payload: {
					title: titleField.value.trim(),
					desc: descField.value.trim(),
					category: currentCategory,
				},
				cover: currentCover,
				asset: currentAsset,
				toastContent: toastContent[lang]
			})
		} catch (e) {
			console.log(e);
		}
}


const uploadBook = async (props) => {
	const uploadDialog = document.getElementById("upload-dialog");
	const uploadDialogOverlay = document.getElementById("upload-dialog-overlay");
	const estimatedTimeTag = document.getElementById("upload-estimated-time");
	const uploadDialogStage = document.getElementById("upload-dialog-stage");
	const uploadDialogStageNumber = document.getElementById("upload-dialog-stage-number");
	const uploadProgressValue = document.getElementById("progress-value");

	uploadDialog.style.display = "flex";
	uploadDialogOverlay.style.display = "block";
	uploadDialogStageNumber.innerHTML = "1<span>/3</span>";
	uploadDialogStage.innerHTML = "Uploading Post";

	// TODO: Upload Book
	try {
		let currentBookId;
		const res = fetch("https://storiesclub.net/books/?mode=post", {
			method: "POST",
			body: JSON.stringify(props.payload),
				      mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin' ,
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          }



			}
		)
		.then(response => {
		if (response.status !== 201) {
			uploadDialog.style.display = "none";
			uploadDialogOverlay.style.display = "none";
			showToast({
				msg: props.toastContent["tryAgainLater"],
				toastColor: 'red',
				borderColor: 'red',
				lang: "en",
			});
			return;
		}
		return response.json();
		})
		.then((data) => {
			currentBookId = data._id;
		}).then(_ => {
				uploadProgressValue.style.width = "33%"
				uploadDialogStageNumber.innerHTML = "2<span>/3</span>";
				uploadDialogStage.innerHTML = "Uploading Cover";

				var coverData = new FormData()
				coverData.append('cover', currentCover);
				coverData.append('bookId', currentBookId);

				const coverXhr = new XMLHttpRequest();
				coverXhr.onload = () => {
					if (coverXhr.status !== 201) {
						uploadDialog.style.display = "none";
						uploadDialogOverlay.style.display = "none";
						showToast({
							msg: props.toastContent["tryAgainLater"],
							toastColor: 'red',
							borderColor: 'red',
							lang: "en",
						});
						return;
					}

					uploadProgressValue.style.width = "67%"
					uploadDialogStageNumber.innerHTML = "3<span>/3</span>";
					uploadDialogStage.innerHTML = "Uploading Book";

				}
				coverXhr.open("POST", `https://storiesclub.net/books/?mode=covers&book=${currentBookId}`);
				coverXhr.send(coverData);

				var assetData = new FormData()
				assetData.append('asset', currentAsset);
				assetData.append('bookId', currentBookId);

				const assetXhr = new XMLHttpRequest();
				assetXhr.onload = () => {
					if (assetXhr.status !== 201) {
						uploadDialog.style.display = "none";
						uploadDialogOverlay.style.display = "none";
						showToast({
							msg: props.toastContent["tryAgainLater"],
							toastColor: 'red',
							borderColor: 'red',
							lang: "en",
						});
						return;
					}

					uploadProgressValue.style.width = "100%"
					uploadDialogStageNumber.innerHTML = "";
					uploadDialogStage.innerHTML = "Finishing...";
					uploadDialogStageNumber.style.opacity = "0";

					setTimeout(() => {
						window.open(`../book/${currentBookId}`, '_self');
					})



				}
				assetXhr.open("POST", `https://storiesclub.net/books/?mode=assets&book=${currentBookId}`);
				assetXhr.send(assetData);
		});


	} catch (e) {
		console.log(e);
			uploadDialog.style.display = "none";
			uploadDialogOverlay.style.display = "none";
			showToast({
				msg: props.toastContent["tryAgainLater"],
				toastColor: 'red',
				borderColor: 'red',
				lang: "en",
			});
			return;
	}
		uploadProgressValue.style.width = "100%"
		uploadDialogStageNumber.innerHTML = "";
		uploadDialogStage.innerHTML = "Finishing...";
		uploadDialogStageNumber.style.opacity = "0";


}


const uploadAudio = async (props) => {
	const uploadDialog = document.getElementById("upload-dialog");
	const uploadDialogOverlay = document.getElementById("upload-dialog-overlay");
	const estimatedTimeTag = document.getElementById("upload-estimated-time");
	const uploadDialogStage = document.getElementById("upload-dialog-stage");
	const uploadDialogStageNumber = document.getElementById("upload-dialog-stage-number");
	const uploadProgressValue = document.getElementById("progress-value");
	uploadDialog.style.display = "flex";
	uploadDialogOverlay.style.display = "block";
	uploadDialogStageNumber.innerHTML = "1<span>/3</span>";
	uploadDialogStage.innerHTML = "Uploading Post";

	// TODO: Upload Book
	try {
		let currentAudioId;
		const res = fetch("https://storiesclub.net/audios/?mode=post", {
			method: "POST",
			body: JSON.stringify(props.payload),
				      mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin' ,
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          }



			}
		)
		.then(response => {
		if (response.status !== 201) {
			uploadDialog.style.display = "none";
			uploadDialogOverlay.style.display = "none";
			showToast({
				msg: props.toastContent["tryAgainLater"],
				toastColor: 'red',
				borderColor: 'red',
				lang: "en",
			});
			return;
		}
		return response.json();
		})
		.then((data) => {
			currentAudioId = data._id;
		}).then(_ => {
				uploadProgressValue.style.width = "33%"
				uploadDialogStageNumber.innerHTML = "2<span>/3</span>";
				uploadDialogStage.innerHTML = "Uploading Cover";

				var coverData = new FormData()
				coverData.append('cover', currentCover);
				coverData.append('bookId', currentAudioId);

				const coverXhr = new XMLHttpRequest();
				coverXhr.onload = () => {
					if (coverXhr.status !== 201) {
						uploadDialog.style.display = "none";
						uploadDialogOverlay.style.display = "none";
						showToast({
							msg: props.toastContent["tryAgainLater"],
							toastColor: 'red',
							borderColor: 'red',
							lang: "en",
						});
						return;
					}

					uploadProgressValue.style.width = "67%"
					uploadDialogStageNumber.innerHTML = "3<span>/3</span>";
					uploadDialogStage.innerHTML = "Uploading Book";

				}
				coverXhr.open("POST", `https://storiesclub.net/audios/?mode=covers&audio=${currentAudioId}`);
				coverXhr.send(coverData);

				var assetData = new FormData()
				assetData.append('asset', currentAsset);
				assetData.append('bookId', currentAudioId);

				const assetXhr = new XMLHttpRequest();
				assetXhr.onload = () => {
					if (assetXhr.status !== 201) {
						uploadDialog.style.display = "none";
						uploadDialogOverlay.style.display = "none";
						showToast({
							msg: props.toastContent["tryAgainLater"],
							toastColor: 'red',
							borderColor: 'red',
							lang: "en",
						});
						return;
					}

					uploadProgressValue.style.width = "100%"
					uploadDialogStageNumber.innerHTML = "";
					uploadDialogStage.innerHTML = "Finishing...";
					uploadDialogStageNumber.style.opacity = "0";

					setTimeout(() => {
						window.open(`../audio/${currentAudioId}`, '_self');
					})



				}
				assetXhr.open("POST", `https://storiesclub.net/audios/?mode=assets&audio=${currentAudioId}`);
				assetXhr.send(assetData);
		});


	} catch (e) {
		console.log(e);
			uploadDialog.style.display = "none";
			uploadDialogOverlay.style.display = "none";
			showToast({
				msg: props.toastContent["tryAgainLater"],
				toastColor: 'red',
				borderColor: 'red',
				lang: "en",
			});
			return;
	}
		uploadProgressValue.style.width = "100%"
		uploadDialogStageNumber.innerHTML = "";
		uploadDialogStage.innerHTML = "Finishing...";
		uploadDialogStageNumber.style.opacity = "0";

}

const uploadVideo = async (props) => {
	const uploadDialog = document.getElementById("upload-dialog");
	const uploadDialogOverlay = document.getElementById("upload-dialog-overlay");
	const estimatedTimeTag = document.getElementById("upload-estimated-time");
	const uploadDialogStage = document.getElementById("upload-dialog-stage");
	const uploadDialogStageNumber = document.getElementById("upload-dialog-stage-number");
	const uploadProgressValue = document.getElementById("progress-value");
	uploadDialog.style.display = "flex";
	uploadDialogOverlay.style.display = "block";
	uploadDialogStageNumber.style.opacity = "1"
	uploadDialogStageNumber.innerHTML = "1<span>/3</span>";
	uploadDialogStage.innerHTML = "Uploading Post";

	// TODO: Upload Book
	try {
		let currentVideoId;
		const res = fetch("https://storiesclub.net/videos/?mode=post", {
			method: "POST",
			body: JSON.stringify(props.payload),
				      mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin' ,
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          }



			}
		)
		.then(response => {
		if (response.status !== 201) {
			uploadDialog.style.display = "none";
			uploadDialogOverlay.style.display = "none";
			showToast({
				msg: props.toastContent["tryAgainLater"],
				toastColor: 'red',
				borderColor: 'red',
				lang: "en",
			});
			return;
		}
		return response.json();
		})
		.then((data) => {
			currentVideoId = data._id;
		}).then(_ => {
				uploadProgressValue.style.width = "33%"
				uploadDialogStageNumber.innerHTML = "2<span>/3</span>";
				uploadDialogStage.innerHTML = "Uploading Cover";

				var coverData = new FormData()
				coverData.append('cover', currentCover);
				coverData.append('bookId', currentVideoId);

				const coverXhr = new XMLHttpRequest();
				coverXhr.onload = () => {
					if (coverXhr.status !== 201) {
						uploadDialog.style.display = "none";
						uploadDialogOverlay.style.display = "none";
						showToast({
							msg: props.toastContent["tryAgainLater"],
							toastColor: 'red',
							borderColor: 'red',
							lang: "en",
						});
						return;
					}

					uploadProgressValue.style.width = "67%"
					uploadDialogStageNumber.innerHTML = "3<span>/3</span>";
					uploadDialogStage.innerHTML = "Uploading Book";

				}
				coverXhr.open("POST", `https://storiesclub.net/videos/?mode=covers&video=${currentVideoId}`);
				coverXhr.send(coverData);

				var assetData = new FormData()
				assetData.append('asset', currentAsset);
				assetData.append('bookId', currentVideoId);

				const assetXhr = new XMLHttpRequest();
				assetXhr.onload = () => {
					if (assetXhr.status !== 201) {
						uploadDialog.style.display = "none";
						uploadDialogOverlay.style.display = "none";
						showToast({
							msg: props.toastContent["tryAgainLater"],
							toastColor: 'red',
							borderColor: 'red',
							lang: "en",
						});
						return;
					}

					uploadProgressValue.style.width = "100%"
					uploadDialogStageNumber.innerHTML = "";
					uploadDialogStage.innerHTML = "Finishing...";
					uploadDialogStageNumber.style.opacity = "0";

					setTimeout(() => {
						window.open(`../video/${currentVideoId}`, '_self');
					})



				}
				assetXhr.open("POST", `https://storiesclub.net/videos/?mode=assets&video=${currentVideoId}`);
				assetXhr.send(assetData);
		});


	} catch (e) {
		console.log(e);
			uploadDialog.style.display = "none";
			uploadDialogOverlay.style.display = "none";
			showToast({
				msg: props.toastContent["tryAgainLater"],
				toastColor: 'red',
				borderColor: 'red',
				lang: "en",
			});
			return;
	}
		uploadProgressValue.style.width = "100%"
		uploadDialogStageNumber.innerHTML = "";
		uploadDialogStage.innerHTML = "Finishing...";
		uploadDialogStageNumber.style.opacity = "0";


}