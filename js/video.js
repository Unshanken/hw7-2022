let video;

window.addEventListener("load", function () {
    console.log("Good job opening the window")
    //1.获取视频
    let video = document.getElementsByTagName('video')[0];
    let options = document.getElementsByClassName('options')[0];
    let slider = document.getElementById('slider');
    //2.获取音频
    let volume = document.getElementById('volume');
    //静音按钮 mute
    let mute = document.getElementById('mute');
    //获取oldSchool按钮
    let vintage = document.getElementById('vintage');
    //获取Original按钮
    let orig = document.getElementById('orig');
    //获取视频音量
    let volumeValue = video.volume * 100
	//判断按钮的文本内容、绑定事件
    options.onclick = function (e) {
        //获取按钮内的事件 因为这里产生了点击 所以有点击事件
        let text = e.target.innerText;
        if (text == 'Play Video') {
            video.play()
			//初始化音量信息
	    volume.innerText = volumeValue + '%'
	    if(volumeValue > 0){
		    mute.innerText = 'Unmute'
	    }
        }
        if (text == 'Pause Video') {
            video.pause()
        }
        if (text == 'Speed Up') {
            video.playbackRate /= 0.9
            video.play()
			console.log('video playbackRate'+video.playbackRate);
		}
        if (text == 'Slow Down') {
            video.playbackRate *= 0.9
            video.play()
			console.log('video playbackRate'+video.playbackRate);
		}
		if (text == 'Skip Ahead') {
			//向前跳过将当前视频提前10秒。如果超过了视频长度，请返回视频的开头，不再继续。记录视频的当前位置
			if (video.currentTime + 10 > video.duration){
				video.currentTime = 0
				video.play()
			}else{
				video.currentTime += 10
				video.play()
			}
			console.log('video currentTime='+video.currentTime)
		}
    }
    //静音和恢复
	mute.onclick = () => {
		let muteText = mute.innerText
		if (muteText === 'Mute') {
			//原来是静音状态，点击改为非静音状态，并把音量还原为未静音时的音量
			mute.innerText = 'Unmute'
			video.volume = volumeValue / 100;
			volume.innerText = volumeValue + '%'
			slider.value = volumeValue
		} else {
			//原来是非静音状态，点击改为静音状态，并把音量改为0,
			mute.innerText = 'Mute'
			video.volume = 0;
			volume.innerText = 0 + '%'
			slider.value = 0
		}
	}
	//音量控制
	slider.oninput = (e) => {
		volumeValue = slider.value
		volume.innerText = volumeValue + '%'
		video.volume = volumeValue / 100;
		video.play()
		if (video.volume === 0) {
			//显示静音
			mute.innerText = 'Mute'
		} else {
			mute.innerText = 'Unmute'
		}
	}
	//点击oldSchool
	vintage.onclick = () => {
		video.setAttribute("class","video oldSchool")
	}
	//点击Original
	orig.onclick = () => {
		video.setAttribute("class","video")
	}
});

// document.querySelector("#play").addEventListener("click", function() {
// 	console.log("Play Video");
// });

