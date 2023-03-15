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


const chooseCategory = (category, lang, fragment, withToggle) => {
	const btn = document.getElementById(`${fragment}-dropbtn`);
	currentCategory = category["id"]
	btn.innerHTML = category["name"][lang];
	btn.innerText = category["name"][lang];
	btn.textContent = category["name"][lang];

  if (withToggle ?? true ){
  	toggleCategoriesDropdown(fragment);
  }

}


const videosFiltration= () => {
  const nameField = document.getElementById('name-token');
  const idField = document.getElementById('id-token');
  const categoryBtn = document.getElementById(`videos-dropbtn`);

  if (nameField.value.trim().length === 0 && idField.value.trim().length === 0 && currentCategory === undefined) {
    nameField.style.border= "1px red solid";
    idField.style.border= "1px red solid";
    categoryBtn.style.border= "1px red solid";
    return;
  }

    window.open(`./?id=${idField.value.trim() ?? ""}&name=${nameField.value.trim() ?? ""}&category=${currentCategory??""}`, '_self')
}

const clearFilteration= () => {
    console.log(window.location.href)
  if (!window.location.href.includes('?')) {
    return;
  }

  window.open(window.location.href.split('?')[0], '_self')
}

const showDeleteDialog= (video, url)=> {
  const deleteDialog= document.getElementById('delete-dialog');
  const deleteDialogOverlay= document.getElementById('delete-dialog-overlay');

  const confirmDeleteDialogButton= document.getElementById('confirm-delete');
  const cancelDeleteDialogButton= document.getElementById('cancel-delete');
  const deleteStatus= document.getElementById('delete-status');

  deleteDialog.style.display= "flex"
  deleteDialogOverlay.style.display= "flex"

  confirmDeleteDialogButton.onclick= async()=> {
    try {
      confirmDeleteDialogButton.style.display= "none";
      cancelDeleteDialogButton.style.display= "none";
      deleteStatus.style.display= "block";
      deleteStatus.innerHTML= "Loading..."
      deleteStatus.innerText= "Loading..."

      const res = await fetch(
        `${url}/videos/?id=${video['_id']}`,
        {
          method: "DELETE"
        }
      );

      if (res.status === 200) {
        window.open('./', '_self');
        return;
      }

      confirmDeleteDialogButton.style.display= "block";
      cancelDeleteDialogButton.style.display= "block";
      deleteStatus.innerText= "Please, Try Again!";
      deleteStatus.innerHTML= "Please, Try Again!";
      deleteStatus.style.color= "red";
    } catch (e) {
      console.log(e)
      confirmDeleteDialogButton.style.display= "block";
      cancelDeleteDialogButton.style.display= "block";
      deleteStatus.innerText= "Please, Try Again!";
      deleteStatus.innerHTML= "Please, Try Again!";
      deleteStatus.style.color= "red";
    }

  }

}