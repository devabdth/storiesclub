
const toast = (props) => {
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

const openDrawer = () => {
    const drawer = document.getElementById('drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    drawer.style.right = "0";
    drawerOverlay.style.display = "block";
}

const closeDrawer = () => {
    const drawer = document.getElementById('drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    drawer.style.right = "-70%";
    drawerOverlay.style.display = "none";
}

const onCategoryTabbed = (categoryId) => {
    try {
        const currentUrl = window.location.href.split('?')[0];

        let newUrl = currentUrl;
        newUrl = `${newUrl}?category=${categoryId}`;
        window.open(newUrl, '_self');
    } catch (e) {
        console.log(e);
    }
}

const postPageSearch = (toastContent, lang) => {
    const search = document.getElementById("search");

    if (search.value.trim().length === 0) {
        search.style.borderColor = "red";
        toast({
            msg: toastContent[lang]["fieldEmpty"],
            toastColor: "red",
            borderColor: "red",
            lang: lang
        })

        return;
    }

    search.style.borderColor = "#111";
    search.style.color = "#111";

    const parts = window.location.href.split('token=');

    let newUrl = parts[0];
    if (parts[1] !== undefined && parts[1].includes("&")) {
        for (let i = 1; i < parts[1].split("&").length; i++) {
            newUrl = `${newUrl}${parts[1].split("&")[i]}`
        }
    }

    if (newUrl.includes("?")) {
        newUrl = `${newUrl}&token=${search.value.trim()}`;
    } else {
        newUrl = `${newUrl}?token=${search.value.trim()}`;
    }
    newUrl = newUrl.replaceAll("&&", "&")
    window.open(newUrl, '_self');
}

const share = () => {
    const shareDialog = document.getElementById("share");
    const shareOverlay = document.getElementById("share-overlay");

    shareDialog.style.display = "flex";
    shareOverlay.style.display = "block";
}

const closeShare = () => {
    const shareDialog = document.getElementById("share");
    const shareOverlay = document.getElementById("share-overlay");

    shareDialog.style.display = "none";
    shareOverlay.style.display = "none";
}

const deletePost = (mode, post, baseUrl) => {
    console.log('Done')
    const deleteDialog = document.getElementById("delete");
    const deleteOverlay = document.getElementById("delete-overlay");
    const postNameSpan = document.getElementById("delete-post-name");

    const confirmBtn = document.getElementById("confirm-delete");
    confirmBtn.addEventListener('click', async () => {
        toast({
            msg: 'Loading...',
            borderColor: '#6b469c',
            toastColor: '#6b469c',
        });
        const res = await fetch(
            `../${mode}s/?id=${post['_id']}`,
            {
                method: 'delete',
            });

        if (res.status === 200) {
            window.open('.', '_self');
        }

    })

    deleteDialog.style.display = "flex";
    deleteOverlay.style.display = "block";
    postNameSpan.innerHTML = `"${post["title"]}"`;
    postNameSpan.innerText = `"${post["title"]}"`;
}

const closeDelete = () => {
    const deleteDialog = document.getElementById("delete");
    const deleteOverlay = document.getElementById("delete-overlay");

    deleteDialog.style.display = "none";
    deleteOverlay.style.display = "none";
}


const copyToClipboard = () => {
    const link = document.getElementById("link").innerHTML;
    navigator.clipboard.writeText(`:\n\n${link}`);
    toast({
        msg: "Copied to Clipboard",
        toastColor: "#6b469c",
        borderColor: "#6b469c",
        lang: 'en'
    })
}


const changeLang = async (url, newLang) => {
    console.log("Clicked");
    await fetch(`${url}/config/?lang=${newLang}`);
    location.reload();
}

const logout = async (url) => {
    const res = await fetch('../users/logout/', {
        method: 'patch'
    });

    if(res.status === 200) {
        window.open(`${url}/home/`, '_self');
    }
}


const toastContent = {
    "en": {
      "notValidUsername": "Please, Enter your email!",
      "notValidEmail": "Please, Enter a valid email!",
      "notValidPassword": "Please, Enter a valid password!",
      "loading": "Loading",
      "userNotFound": "No users were found. You may want to Sign Up",
      "userExists": "User already exists. You may want to Login!",
      "tryLater": "Please, Try again later!",
      "passwordMissmatched": "Please, Enter the right password!",
      "repasswordNotMatched": "Passwords not matched",
      "fieldEmpty": "This field can't be empty",
      "tryAgainLater": "Please, Try again Later!", 
      "noFilesSelected": "No files Selcted!",
      "fileSelcted": "File Selected Successfully!", 
      "notValidBookTitle": "Enter a valid book title!",
      "notValidBookDesc": "Enter a valid Book Description!",
      "notValidBookDepositNumber": "Enter a valid Book Deposit Number!",
      "notValidBookISBN": "Enter a valid Book ISBN!",
      "notValidBookCategory": "Enter a valid Category!",
      "notValidBookCover": "Please, Pick up a cover file!",
      "notValidBookAsset": "Please, Pick up the book you want to publih!",
      "notValidName": "Please, Enter a valid name!",
      "notValidBio": "Please, Tell us more about yourself!",
      "notValidPhoneNumber": "Please, Enter your phone number!",
      "notValidCity": "Please, Select your city!",
      "notValidGender": "Please, Select you gender!"
    },
    "ar": {
      "notValidUsername": "أدخل البريد الإلكتروني الخاص بك",
      "notValidEmail": "أدخل بريد إلكتروني صحيح",
      "notValidPassword": "أدخل كلمة مرور صحيح",
      "loading": "جاري التحميل",
      "userNotFound": "لا يوجد مستخدمين بنفس البيانات، ربما ترغب في تسجيل الإشتراك",
      "passwordMissmatched": "كلمة المرور غير صحيحة",
      "repasswordNotMatched": "كلمتي المرور غير متوافقين",
      "fieldEmpty": "هذا الحقل لا يجب أن يكون فارغاً",
      "tryAgainLater": "أعد المحاولة في وقت لاحق",
      "notValidBookTitle": "",
      "notValidBookDesc": "",
      "notValidBookDepositNumber": "Number!",
      "notValidBookISBN": "",
      "notValidBookCategory": "",
      "notValidBookCover": "",
      "notValidBookAsset": ""
    }
}