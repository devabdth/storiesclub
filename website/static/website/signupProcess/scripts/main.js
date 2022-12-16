window.onload = () => {
  sendCodeAgain();

inputElements = [...document.querySelectorAll('input.code-input')]

inputElements.forEach((ele,index)=>{
  ele.addEventListener('keydown',(e)=>{
    if(e.keyCode === 8 && e.target.value==='') inputElements[Math.max(0,index-1)].focus()
  })
  ele.addEventListener('input',(e)=>{
    const [first,...rest] = e.target.value
    e.target.value = first ?? '' // first will be undefined when backspace was entered, so set the input to ""
    const lastInputBox = index===inputElements.length-1
    const didInsertContent = first!==undefined
    if(didInsertContent && !lastInputBox) {
      // continue to input the rest of the string
      inputElements[index+1].focus()
      inputElements[index+1].value = rest.join('')
      inputElements[index+1].dispatchEvent(new Event('input'))
    }
  })
})

}

const StageOneSubmit = async () => {
  const digits = ['one', 'two', 'three', 'four'].map((t) => document.getElementById(`digit-${t}`));
    digits.map((digit) => {
    if(digit.value.trim().length === 0) {
      digit.style.border = "1px red solid";
    } else {
      digit.style.border = "none";
    }
  });

  const code = `${digits[0].value.trim()}${digits[1].value.trim()}${digits[2].value.trim()}${digits[3].value.trim()}`;
  if (code.length !== 4) {
    digits.map((digit) => {
        digit.style.border = "1px red solid";
    });
    return;
  }

  const res = await fetch(`./confrimCode/?code=${code}`, {
    method: 'get'
  });

  if(res.status == 200) {
    const confirmCode = document.getElementById('confirm-email');
    const completeProfile = document.getElementById('complete-profile');
    confirmCode.style.display = "none";
    completeProfile.style.display = "flex";
    return;
  }

  digits.map((digit) => {
    digit.style.border = "1px red solid";
  });
}

const sendCodeAgain = async (toastContent, lang) => {
  const res = await fetch('../sendCodeAgain/', {
    method: 'get'
  });

  if (res.status === 200) {
    const digits = ['one', 'two', 'three', 'four'].map((t) => document.getElementById(`digit-${t}`));
    digits.map((digit) => {
      digit.value = "";
    });

    toast({
      msg: toastContent[lang]["codeSentSuccessfully!"],
      borderColor: 'green',
      toastColor: 'green',
      lang: lang
    });
  }

}

const changeEmail = async () => {
  const res = await fetch('../changeEmail', {
    method: "get"
  })
  window.location.replace('./');
  window.open('../signup', '_self');
}

let currentCover;
let currentAsset;

const pickCover = () => {
  const cover = document.getElementById('import-cover');
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.onchange = e => {
    if (e.target.files.length === 0) {
      return;
    }
    cover.innerHTML = "";
    cover.innerText = "";
    currentCover = e.target.files[0];
    cover.style.backgroundImage = `url(${URL.createObjectURL(currentCover)})`;

  }

  input.click();

}


const pickAsset = () => {
  const asset = document.getElementById('import-asset');
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.onchange = e => {
    if (e.target.files.length === 0) {
      return;
    }
    currentAsset = e.target.files[0];
    asset.innerHTML = "";
    asset.innerText = "";
    asset.style.backgroundImage = `url(${URL.createObjectURL(currentAsset)})`;

  }

  input.click();

}


let currentCity;

const toggleCitiesDropdown = () => {
  document.getElementById(`cities-dropdown`).classList.toggle("show");
}

const filter = () => {
  var input, filter, ul, li, a, i;
  input = document.getElementById("city-search");
  filter = input.value.toUpperCase();
  div = document.getElementById("cities-dropdown");
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


const chooseCity = (cityText, city, lang) => {
  const btn = document.getElementById(`cities-dropbtn`);
  currentCity = city;
  btn.innerHTML = cityText;
  btn.innerText = cityText;
  btn.textContent = cityText;

  toggleCitiesDropdown();

}

let currentGender;

const toggleGendersDropdown = () => {
  document.getElementById(`genders-dropdown`).classList.toggle("show");
}

const gendersFilter = () => {
  var input, filter, ul, li, a, i;
  input = document.getElementById("gender-search");
  filter = input.value.toUpperCase();
  div = document.getElementById("genders-dropdown");
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


const chooseGender = (genderText, gender, lang) => {
  const btn = document.getElementById(`genders-dropbtn`);
  currentGender = gender;
  btn.innerHTML = genderText;
  btn.innerText = genderText;
  btn.textContent = genderText;

  toggleGendersDropdown();

}


const compleProfileSubmit = async (toastContent, lang) => {
  const nameField = document.getElementById('name');
  const bioField = document.getElementById('bio');
  const citiesBtn = document.getElementById('cities-dropbtn');
  const gendersBtn = document.getElementById('genders-dropbtn');

  if(nameField.value.trim() < 8 || nameField.value.trim() > 32) {
    toast({
      msg: toastContent[lang]["notValidName"],
      toastColor: 'red',
      borderColor: 'red',
      lang
    });
    nameField.style.borderColor = 'red';
    nameField.style.color = 'red';
    return;
  }

  nameField.style.borderColor = '#888';
  nameField.style.color = '#6b469c';

  if(bioField.value.trim() < 8) {
    toast({
      msg: toastContent[lang]["notValidBio"],
      toastColor: 'red',
      borderColor: 'red',
      lang: lang,
    });
    bioField.style.borderColor = 'red';
    bioField.style.color = 'red';
    return;
  }
  
  bioField.style.borderColor = '#888';
  bioField.style.color = '#6b469c';

  if (currentCity === undefined) {
    citiesBtn.style.border = '2px red solid';
    toast({
      msg: toastContent[lang]["notValidCity"],
      toastColor: 'red',
      borderColor: 'red',
      lang: lang,
    });
    return;
  }
  citiesBtn.style.border = 'none';

  if (currentGender === undefined) {
    gendersBtn.style.border = '2px red solid';
    toast({
      msg: toastContent[lang]["notValidCity"],
      toastColor: 'red',
      borderColor: 'red',
      lang: lang,
    });
    return;
  }
  gendersBtn.style.border = 'none';


  const payload = {
    name: nameField.value.trim(),
    bio: bioField.value.trim(),
    currentGender: currentGender,
    currentCity: currentCity,
  }

  const res = fetch(
    '../confirmSignUp/', {
      method: 'post',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
  }).then(response => {
    if (response.status !== 201) {
      nameField.style.borderColor = 'red';
      bioField.style.borderColor = 'red';
      citiesBtn.style.border = '2px red solid';
      gendersBtn.style.border = '2px red solid';
      toast({
        msg: toastContent[lang]['tryAgainLater'],
        borderColor: 'red',
        toastColor: 'red',
        lang: lang,
      });
      return;
    }
    return response;
  }).then(_ => {
    var coverData = new FormData();
    coverData.append('cover', currentCover);
    const coverXhr = new XMLHttpRequest();
    coverXhr.onload = () => {
      if (coverXhr.status !== 201) {
        nameField.style.borderColor = 'red';
        bioField.style.borderColor = 'red';
        citiesBtn.style.border = '2px red solid';
        gendersBtn.style.border = '2px red solid';
        toast({
          msg: toastContent[lang]['tryAgainLater'],
          borderColor: 'red',
          toastColor: 'red',
          lang: lang,
        });
        return;
      }
    }

    coverXhr.open('post', `http://127.0.0.1:5000/users/?mode=covers`)
    coverXhr.send(coverData);


    var assetData = new FormData();
    assetData.append('asset', currentAsset);

    const assetXhr = new XMLHttpRequest();
    assetXhr.onload = () => {
      if (assetXhr.status !== 201) {
        nameField.style.borderColor = 'red';
        bioField.style.borderColor = 'red';
        citiesBtn.style.border = '2px red solid';
        gendersBtn.style.border = '2px red solid';
        toast({
          msg: toastContent[lang]['tryAgainLater'], 
          borderColor: 'red',
          toastColor: 'red',
          lang: lang,
        });
        return;
      }
      window.open('../', '_self');
    }
    assetXhr.open('post', `http://127.0.0.1:5000/users/?mode=assets`)
    assetXhr.send(assetData);
  });
}