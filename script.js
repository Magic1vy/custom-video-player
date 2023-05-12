const player =  document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenButton = player.querySelector('.fullscreen-button'); 
const volumeTooltip = player.querySelector('.volume-tooltip');
const playbackRateTooltip = player.querySelector('.playback-rate-tooltip');


function togglePlay(){
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon; 
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function showVolumeTooltip() {
    const volumePercentage = Math.round(video.volume * 100);
    volumeTooltip.textContent = `${volumePercentage}%`;
}

function showPlaybackRateTooltip() {
    const playbackRateMultiplier = video.playbackRate.toFixed(2);
    playbackRateTooltip.textContent = `x${playbackRateMultiplier}`;
}

function handleRangeUpdate(){
    video[this.name] = this.value;
    if (this.name === 'volume') {
        showVolumeTooltip();
    } else if (this.name === 'playbackRate') {
        showPlaybackRateTooltip();
    }
}

function handleProgress(){
    const percent = (video.currentTime / video.duration ) * 100;
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth ) * video.duration;
    video.currentTime = scrubTime;
}

function toggleFullscreen() {
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

video.addEventListener( "click", togglePlay);
video.addEventListener( "play", updateButton);
video.addEventListener( "pause", updateButton);
video.addEventListener( "timeupdate", handleProgress);

toggle.addEventListener( "click", togglePlay);

skipButtons.forEach( button => button.addEventListener("click", skip));

ranges.forEach(range => range.addEventListener("input", handleProgress));
ranges.forEach(range => range.addEventListener("change", handleProgress));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove ", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);

fullscreenButton.addEventListener('click', toggleFullscreen); 

video.addEventListener('play', handlePlay);
