const follow = async (lang, userId) => {
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

		window.open(window.location.href, '_self');
}

const unfollow = async (lang, userId) => {
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

		window.open(window.location.href, '_self');
}

const togglePlay = (audio) => {
	if (!audio.paused) {
		document.getElementById("audio-player-play").style.display = "block";
		document.getElementById("audio-player-pause").style.display = "none";
		audio.pause();
	} else {
		document.getElementById("audio-player-play").style.display = "none";
		document.getElementById("audio-player-pause").style.display = "block";
		audio.play();
	}
}

const backwards = (audio, audioCurrentTime, audioTime) => {
	if (audio.currentTime > 10) {
		audio.currentTime = audio.currentTime - 10;
	} else {
		audio.currentTime = 0;
	}
	if (audio.currentTime == 0) {
		document.getElementById("audio-player-play").style.display = "block";
		document.getElementById("audio-player-pause").style.display = "none";
		audio.pause();
	}
	var minutes = Math.floor(audio.currentTime / 60);
	var secs = (audio.currentTime - Math.floor(audio.currentTime / 60) * 60).toString().split('.')[0];

	if (minutes < 10) {
		minutes = `0${minutes}`
	}
	if (secs < 10) {
		secs = `0${secs}`
	}
	audioCurrentTime.innerHTML = `${minutes}:${secs}`;
	audioCurrentTime.innerText = `${minutes}:${secs}`;
	const progress = (audio.currentTime / audio.duration) * 100;
	audioTime.style.width = `${progress}%`;
}

const afterwards = (audio, audioCurrentTime, audioTime) => {
	if (audio.duration - audio.currentTime > 10) {
		audio.currentTime = audio.currentTime + 10;
	} else {
		audio.currentTime = audio.duration;
	}
	if (audio.currentTime == audio.duration) {
		document.getElementById("audio-player-play").style.display = "block";
		document.getElementById("audio-player-pause").style.display = "none";
		audio.pause();
	}
	var minutes = Math.floor(audio.currentTime / 60);
	var secs = (audio.currentTime - Math.floor(audio.currentTime / 60) * 60).toString().split('.')[0];

	if (minutes < 10) {
		minutes = `0${minutes}`
	}
	if (secs < 10) {
		secs = `0${secs}`
	}
	audioCurrentTime.innerHTML = `${minutes}:${secs}`;
	audioCurrentTime.innerText = `${minutes}:${secs}`;
	const progress = (audio.currentTime / audio.duration) * 100;
	audioTime.style.width = `${progress}%`;

}

const audioLoop = (audio, audioPlayerLoop) => {
	if(audio.loop) {
		audio.loop = false;
		audioPlayerLoop.style.opacity = "0.5";
		return;
	} else {
		audio.loop = true;
		audioPlayerLoop.style.opacity = "1";
	}
}

const audioStop = (audio, audioTime, audioCurrentTime) => {
	document.getElementById("audio-player-play").style.display = "block";
	document.getElementById("audio-player-pause").style.display = "none";
	
	audio.pause();
	audio.currentTime = 0;

	audioTime.style.width = '0%';
	
	audioCurrentTime.innerText = "00:00";
	audioCurrentTime.innerHTML = "00:00";
}

const listen = (src) => {
	const dialog = document.getElementById('listen');
	const dialogOverlay = document.getElementById('listen-overlay');
	const dialogClose = document.getElementById('listen-close');
	const audio = document.getElementById('audio-player');
	const audioControllers = document.getElementById('audio-player-controllers');
	const audioPlayerPause = document.getElementById('audio-player-pause');
	const audioPlayerPlay = document.getElementById('audio-player-play');
	const audioPlayerLoop = document.getElementById('audio-player-loop');
	const audioPlayerStop = document.getElementById('audio-player-stop');
	const audioPlayerSeekBack = document.getElementById('audio-player-seek-back');
	const audioPlayerSeekNext = document.getElementById('audio-player-seek-next');
	const audioTime = document.getElementById('audio-time');
	const audioCurrentTime = document.getElementById('audio-track-current-time');
	const audioFullTime = document.getElementById('audio-track-full-time');
	
	audio.src = src;
	audio.onended = () => {
		document.getElementById("audio-player-play").style.display = "block";
		document.getElementById("audio-player-pause").style.display = "none";
		audio.pause();

	}
	audio.load();
	audio.play();
	audioControllers.style.display = 'flex';
	togglePlay(audio);

	dialog.style.display = "block";
	dialogOverlay.style.display = "block";

	dialogClose.onclick = () => {
		audioStop(audio, audioTime, audioCurrentTime);
		dialog.style.display = "none";
		dialogOverlay.style.display = "none";
	}

	audioPlayerPause.onclick = () => { togglePlay(audio); }
	audioPlayerPlay.onclick = () => { togglePlay(audio); }
	audioPlayerSeekBack.onclick = () => { backwards(audio, audioCurrentTime, audioTime); }
	audioPlayerSeekNext.onclick = () => { afterwards(audio, audioCurrentTime, audioTime); }
	audioPlayerLoop.onclick = () => { audioLoop(audio, audioPlayerLoop); }
	audioPlayerStop.onclick = () => { audioStop(audio, audioTime, audioCurrentTime); }


	setInterval(() => {
		if(!audio.paused) {
			var fullMinutes = Math.floor(audio.duration / 60);
			var fullSecs = (audio.duration - Math.floor(audio.duration / 60) * 60).toString().split('.')[0];
	
			if (fullMinutes < 10) {
				fullMinutes = `0${fullMinutes}`
			}
			if (fullSecs < 10) {
				fullSecs = `0${fullSecs}`
			}
	
			var minutes = Math.floor(audio.currentTime / 60);
			var secs = (audio.currentTime - Math.floor(audio.currentTime / 60) * 60).toString().split('.')[0];
	
			if (minutes < 10) {
				minutes = `0${minutes}`
			}
			if (secs < 10) {
				secs = `0${secs}`
			}
			audioCurrentTime.innerHTML = `${minutes}:${secs}`;
			audioCurrentTime.innerText = `${minutes}:${secs}`;
			audioFullTime.innerHTML = `${fullMinutes}:${fullSecs}`
			audioFullTime.innerText = `${fullMinutes}:${fullSecs}`
		}
	}, 1000);

	setInterval(() => {
		if (!audio.paused) {
			const progress = (audio.currentTime / audio.duration) * 100;
			audioTime.style.width = `${progress}%`;
		}
	}, 1);

}