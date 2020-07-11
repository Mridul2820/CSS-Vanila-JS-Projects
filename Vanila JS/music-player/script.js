const musicContainer = document.getElementById('music-container');

const title = document.getElementById('title');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const audio = document.getElementById('audio');
const cover = document.getElementById('cover');

const prevButton = document.getElementById('prev');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');

// song titles 
const songs = [
    '3LAU feat. Carly Paige - Touch',
    'Anne-Marie - 2002',
    'Avicii - The Nights',
    'BLACKPINK - BOOMBAYAH',
    'Ed Sheeran - Galway Girl',
    'Ellie Goulding - Still Falling For You',
    'Imagine Dragons - Thunder',
    'Jai Wolf - Indian Summer',
    'Jai Wolf - Lost feat. Chelsea Jade',
    'Stay High - Tove Lo - Against The Current Cover',
    'The Chainsmokers & Coldplay - Something Just Like This',
    'Zedd, Elley Duhé - Happy Now'
]

// keep track of song 
let songIndex = 1;

// initially load song details in the DOM
loadSong(songs[songIndex]);

// update song details 
function loadSong(song) {
    title.innerText = song;
    audio.src = `assets/music/${song}.mp3`;
    cover.src = `assets/image/${song}.jpg`;
}

// play song
function playSong() {
    musicContainer.classList.add('play');
    playButton.querySelector('i.fas').classList.remove('fa-play');
    playButton.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playButton.querySelector('i.fas').classList.add('fa-play');
    playButton.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// previous song 
function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// next song 
function nextSong() {
    songIndex++;

    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// set progress 
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Update Progress 
function updateProgress(e) {
    const {duration,currentTime} = e.srcElement;
    const progessPercent = (currentTime / duration) * 100;
    progress.style.width = `${progessPercent}%`;
}

// event listeners
playButton.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
})

// change song 
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);

// Time/ SOng update 
audio.addEventListener('timeupdate', updateProgress);

// click on progress bar 
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);