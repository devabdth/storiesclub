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
			method: "PATCH",
			body: JSON.stringify({}),
			mode: 'no-cors',
      		cache: 'no-cache',
    	  	credentials: 'same-origin' ,
	      	headers: {'Content-Type': 'application/json'}
			
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
			method: "PATCH",
			body: JSON.stringify({}),
			mode: 'no-cors',
      		cache: 'no-cache',
    	  	credentials: 'same-origin' ,
	      	headers: {'Content-Type': 'application/json'}
			
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

const togglePlay = (video) => {
	if (!video.paused) {
		document.getElementById("video-player-play").style.display = "block";
		document.getElementById("video-player-pause").style.display = "none";
		video.pause();
	} else {
		document.getElementById("video-player-play").style.display = "none";
		document.getElementById("video-player-pause").style.display = "block";
		video.play();
	}
}

const toggleFullScreen = (video) => {
	if (video.requestFullscreen) {
	  video.requestFullscreen();
	} else if (video.mozRequestFullScreen) {
	  video.mozRequestFullScreen();
	} else if (video.webkitRequestFullscreen) {
	  video.webkitRequestFullscreen();
	} else if (video.msRequestFullscreen) { 
	  video.msRequestFullscreen();
	}

}

const backwards = (video, videoCurrentTime, videoTime) => {
	if (video.currentTime > 10) {
		video.currentTime = video.currentTime - 10;
	} else {
		video.currentTime = 0;
	}
	if (video.currentTime == 0) {
		document.getElementById("video-player-play").style.display = "block";
		document.getElementById("video-player-pause").style.display = "none";
		video.pause();
	}
	var minutes = Math.floor(video.currentTime / 60);
	var secs = (video.currentTime - Math.floor(video.currentTime / 60) * 60).toString().split('.')[0];

	if (minutes < 10) {
		minutes = `0${minutes}`
	}
	if (secs < 10) {
		secs = `0${secs}`
	}
	videoCurrentTime.innerHTML = `${minutes}:${secs}`;
	videoCurrentTime.innerText = `${minutes}:${secs}`;
	const progress = (video.currentTime / video.duration) * 100;
	videoTime.style.width = `${progress}%`;
}

const afterwards = (video, videoCurrentTime, videoTime) => {
	if (video.duration - video.currentTime > 10) {
		video.currentTime = video.currentTime + 10;
	} else {
		video.currentTime = video.duration;
	}
	if (video.currentTime == video.duration) {
		document.getElementById("video-player-play").style.display = "block";
		document.getElementById("video-player-pause").style.display = "none";
		video.pause();
	}
	var minutes = Math.floor(video.currentTime / 60);
	var secs = (video.currentTime - Math.floor(video.currentTime / 60) * 60).toString().split('.')[0];

	if (minutes < 10) {
		minutes = `0${minutes}`
	}
	if (secs < 10) {
		secs = `0${secs}`
	}
	videoCurrentTime.innerHTML = `${minutes}:${secs}`;
	videoCurrentTime.innerText = `${minutes}:${secs}`;
	const progress = (video.currentTime / video.duration) * 100;
	videoTime.style.width = `${progress}%`;

}

const videoLoop = (video, videoPlayerLoop) => {
	if(video.loop) {
		video.loop = false;
		videoPlayerLoop.style.opacity = "0.5";
		return;
	} else {
		video.loop = true;
		videoPlayerLoop.style.opacity = "1";
	}
}

const videoStop = (video, videoTime, videoCurrentTime) => {
	document.getElementById("video-player-play").style.display = "block";
	document.getElementById("video-player-pause").style.display = "none";
	
	video.pause();
	video.currentTime = 0;

	videoTime.style.width = '0%';
	
	videoCurrentTime.innerText = "00:00";
	videoCurrentTime.innerHTML = "00:00";
}

const toggleApperances = (videoPlayerHeader, videoPlayerControllers) => {
	videoPlayerHeader.style.opacity = "1";
	videoPlayerControllers.style.opacity = "1";

	setTimeout(() => {
		videoPlayerControllers.style.opacity = "0";
		videoPlayerHeader.style.opacity = "0";

	}, 10000)
}

const watch = (src) => {
	const dialog = document.getElementById('watch');
	const dialogOverlay = document.getElementById('watch-overlay');
	const dialogClose = document.getElementById('watch-close');
	const video = document.getElementById('video-player');
	const videoPlayerPause = document.getElementById('video-player-pause');
	const videoPlayerPlay = document.getElementById('video-player-play');
	const videoPlayerLoop = document.getElementById('video-player-loop');
	const videoPlayerStop = document.getElementById('video-player-stop');
	const videoPlayerFullscreen = document.getElementById('video-player-fullscreen');
	const videoPlayerSeekBack = document.getElementById('video-player-seek-back');
	const videoPlayerSeekNext = document.getElementById('video-player-seek-next');
	const videoTime = document.getElementById('video-time');
	const videoCurrentTime = document.getElementById('video-track-current-time');
	const videoFullTime = document.getElementById('video-track-full-time');
	const videoPlayerHeader = document.getElementById('watch-header');
	const videoPlayerControllers = document.getElementById('video-player-controllers');
	
	video.src = src;
	video.onended = () => {
		document.getElementById("video-player-play").style.display = "block";
		document.getElementById("video-player-pause").style.display = "none";
		video.pause();

	}
	video.load();
	video.play();
	togglePlay(video);

	dialog.style.display = "block";
	dialogOverlay.style.display = "block";

	dialogClose.onclick = () => {
		// videoStop(video, videoTime, videoCurrentTime);
		console.log('Close')
		dialog.style.display = "none";
		dialogOverlay.style.display = "none";
		videoStop(video, videoTime, videoCurrentTime);
	}

	videoPlayerPause.onclick = () => { togglePlay(video); }
	videoPlayerPlay.onclick = () => { togglePlay(video); }
	videoPlayerSeekBack.onclick = () => { backwards(video, videoCurrentTime, videoTime); }
	videoPlayerSeekNext.onclick = () => { afterwards(video, videoCurrentTime, videoTime); }
	videoPlayerLoop.onclick = () => { videoLoop(video, videoPlayerLoop); }
	videoPlayerStop.onclick = () => { videoStop(video, videoTime, videoCurrentTime); }
	videoPlayerFullscreen.onclick = () => { toggleFullScreen(video); }
	videoPlayerControllers.onmouseover = () => { toggleApperances(videoPlayerHeader, videoPlayerControllers); }
	videoPlayerHeader.onmouseover = () => { toggleApperances(videoPlayerHeader, videoPlayerControllers); }


	setInterval(() => {
		if(!video.paused) {
			var fullMinutes = Math.floor(video.duration / 60);
			var fullSecs = (video.duration - Math.floor(video.duration / 60) * 60).toString().split('.')[0];
	
			if (fullMinutes < 10) {
				fullMinutes = `0${fullMinutes}`
			}
			if (fullSecs < 10) {
				fullSecs = `0${fullSecs}`
			}
	
			var minutes = Math.floor(video.currentTime / 60);
			var secs = (video.currentTime - Math.floor(video.currentTime / 60) * 60).toString().split('.')[0];
	
			if (minutes < 10) {
				minutes = `0${minutes}`
			}
			if (secs < 10) {
				secs = `0${secs}`
			}
			videoCurrentTime.innerHTML = `${minutes}:${secs}`;
			videoCurrentTime.innerText = `${minutes}:${secs}`;
			videoFullTime.innerHTML = `${fullMinutes}:${fullSecs}`
			videoFullTime.innerText = `${fullMinutes}:${fullSecs}`
		}
	}, 1000);

	setInterval(() => {
		if (!video.paused) {
			const progress = (video.currentTime / video.duration) * 100;
			videoTime.style.width = `${progress}%`;
		}
	}, 1);

}