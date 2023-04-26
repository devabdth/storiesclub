const closeDialogs = ()=> {
	const overlay= document.getElementById('overlay');
	const addDialog= document.getElementById('add-dialog');
	const deleteDialog= document.getElementById('delete-dialog');

	overlay.style.display= "none";
	deleteDialog.style.display= "none";
	addDialog.style.display= "none";
}

const showAddDialog= ()=> {
	const overlay= document.getElementById('overlay');
	const addDialog =document.getElementById('add-dialog');

	overlay.style.display= "flex";
	addDialog.style.display= "flex";
}

let currentCover;


const pickCategoryCover =  async () => {
	const input = document.createElement("input");
	input.setAttribute("type", "file");
	input.setAttribute("accept", "image/*");
	input.onchange = e => {
		if (e.target.files.length === 0) {
			return;
		}
		currentCover = e.target.files[0]
		const p = document.getElementById("picked-file-name");
		if(currentCover.name.length > 25) {
			p.innerHTML = `Cover: ${currentCover.name.substring(0, 25)}...${currentCover.name.split('.')[1]}`;

		} else {
			p.innerHTML = `Cover: ${currentCover.name}`;
		}

	}

	input.click();
}


const publishCategory= async ()=> {
	const enNameField= document.getElementById('en-name-field');
	const enNameContainer= document.getElementById('en-name');
	const arNameField= document.getElementById('ar-name-field');
	const arNameContainer= document.getElementById('ar-name');
	const enDescField= document.getElementById('en-desc-field');
	const enDescContainer= document.getElementById('en-desc');
	const arDescField= document.getElementById('ar-desc-field');
	const arDescContainer= document.getElementById('ar-desc');
	const filePickContainer= document.getElementById('file');

	if (enNameField.value.trim().length < 8 || enNameField.value.trim() > 32) {
		enNameContainer.style.border= "1px red solid";
		return;
	}
	enNameContainer.style.border= "none";

	if (arNameField.value.trim().length < 8 || arNameField.value.trim() > 32) {
		arNameContainer.style.border= "1px red solid";
		return;
	}
	arNameContainer.style.border= "none";

	if (enDescField.value.trim().length < 8 || enDescField.value.trim() > 150) {
		enDescContainer.style.border= "1px red solid";
		return;
	}
	enDescContainer.style.border= "none";

	if (arDescField.value.trim().length < 8 || arDescField.value.trim() > 150) {
		arDescContainer.style.border= "1px red solid";
		return;
	}
	arDescContainer.style.border= "none";

	if (!currentCover) {
		filePickContainer.style.border= "1px red solid";
		return

	}
	filePickContainer.style.border= "none";

	await uploadCategory({
		payload: {
			enName: enNameField.value.trim(),
			arName: arNameField.value.trim(),
			enDesc: enDescField.value.trim(),
			arDesc: arDescField.value.trim(),
		}
	});
}



const uploadCategory = async (props) => {
	// document.getElementById('publish-category').style.display= "none";
	const status= document.getElementById('status');
	status.style.display="flex";
	try {
		let currentCategoryId;
		const res = fetch("//webapp/adminstration/categories/?mode=0", {
			method: "POST",
			body: JSON.stringify(props.payload),
			headers: { "Content-Type": "application/json" },
			}
		)
		.then(response => {
			status.innerHTML= "Uploading Cover..."
			status.innerText= "Uploading Cover..."
			return response.json();
		})
		.then((data) => {
			currentCategoryId = data._id;
		}).then(_ => {
				var coverData = new FormData()
				coverData.append('cover', currentCover);
				coverData.append('categoryId', currentCategoryId);

				const coverXhr = new XMLHttpRequest();
				coverXhr.onload = () => {
					if (coverXhr.status !== 201) {
						status.innerHTML= "Failed, Please try again later!"
						status.innerText= "Failed, Please try again later!"

						return;
					} else {
						window.open('./', '_self');
					}
				}

				coverXhr.open('post', `//webapp/adminstration/categories/?mode=1&category=${currentCategoryId}`);
				coverXhr.send(coverData);
			}
		);

	} catch (e) {
		console.log(e);
		return;
	}

}


const deleteCategory= (category) => {
	const dialog= document.getElementById('delete-dialog');
	const overlay= document.getElementById('overlay');
	document.getElementById('delete-dialog-msg').innerHTML= `Are you sure you want to delete (${category['name']['en']})`;

	document.getElementById('delete-dialog-confirmation').onclick= ()=> {
		fetch(`./?category=${category['id']}`, { method: 'delete' }).then( r => {
			if (r.status == 200) {
				window.open('./', '_self');
			} else {
				document.getElementById('delete-dialog-confirmation').innerHTML= "Failed!"
				setTimeout(()=> {

					document.getElementById('delete-dialog-confirmation').innerHTML= "Delete";
				}, 3000);
			}
		});
	}

	dialog.style.display= "flex";
	overlay.style.display= "flex";
}