const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const lyricsBtn = document.getElementById('lyrics-btn');
const audio = document.getElementById('audio-1');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const timestamp = document.getElementById('timestamp');
const durationstamp = document.getElementById('duration');
const volume = document.getElementById('volume');
const lyricsContainer = document.querySelector('.lyrics-container');
const title = document.getElementById('title');



function playSong() {
    musicContainer.classList.add('play');
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
}
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
}


function restartSong() {
    audio.pause();
    audio.currentTime = 0;
    playSong();
}

function stopSong() {
    audio.pause();
    audio.currentTime = 0;
    musicContainer.classList.remove('play');
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    lyricsContainer.classList.remove('visible');
    lyricsBtn.style.color = '#ff4371';
    lyricsBtn.style.borderColor = '#ff4371';
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Get minutes
    let mins = Math.floor(audio.currentTime / 60);
    if (mins < 10) {
        mins = String(mins);
    }
    // Get seconds
    let secs = Math.floor(audio.currentTime % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }
    timestamp.innerText = `${mins}:${secs}`;

}
// Set progress bar 
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function setVolume() {
    audio.volume = volume.value / 100;
}

function toggleLyrics() {
    lyricsContainer.classList.toggle('visible');
    if (lyricsContainer.classList.contains('visible')) {
        lyricsBtn.style.color = '#fff';
        lyricsBtn.style.borderColor = '#fff';
    } else {
        lyricsBtn.style.color = '#ff4371';
        lyricsBtn.style.borderColor = '#ff4371';
    }
}



// Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();

    } else {
        playSong();
    }
})

// This avoids audio duration to be NaN
audio.addEventListener('loadedmetadata', () => {
    let mins = Math.floor(audio.duration / 60);
    if (mins < 10) {
        mins = String(mins);
    }
    let secs = Math.floor(audio.duration % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }
    durationstamp.innerText = `${mins}:${secs}`;

});

// Update song time
audio.addEventListener('timeupdate', updateProgress);

// When visitor clicks on progress bar at a certain time
progressContainer.addEventListener('click', setProgress);

// Previous and next botton restart the song 
prevBtn.addEventListener('click', restartSong);
nextBtn.addEventListener('click', restartSong);

//  Displays the lyrics
lyricsBtn.addEventListener('click', toggleLyrics);


// After song is finished 
audio.addEventListener('ended', stopSong);

volume.addEventListener('change', setVolume);