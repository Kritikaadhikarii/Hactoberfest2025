// Select elements
const playButton = document.querySelector('.control-icon3'); // Play button
const progressBar = document.querySelector('.progress-bar'); // Progress bar
const currentTimeElem = document.querySelector('.curr-time'); // Current time display
const totalTimeElem = document.querySelector('.tot-time'); // Total time display
const volumeBar = document.querySelector('.progress-sound'); // Volume control
const shuffleButton = document.querySelector('.control-icon4'); // Shuffle button
const repeatButton = document.querySelector('.control-icon5'); // Repeat button
const nextButton = document.querySelector('.player-control-icon:nth-child(4)'); // Next button
const prevButton = document.querySelector('.player-control-icon:nth-child(2)'); // Previous button

// Playlist array with dummy audio files
const playlist = [
    './Assests (spotify)/song1.mp3', 
    './Assests (spotify)/song2.mp3', 
    './Assests (spotify)/song3.mp3'
];
let currentTrackIndex = 0;

// Shuffle and repeat flags
let isShuffle = false;
let isRepeat = false;

// Create audio element
let audio = new Audio(playlist[currentTrackIndex]);

// Function to format time in mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsPart = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secondsPart}`;
}

// Play/pause toggle
playButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playButton.src = './Assests (spotify)/pause_icon.png'; // Change to pause icon
    } else {
        audio.pause();
        playButton.src = './Assests (spotify)/play_icon.png'; // Change to play icon
    }
});

// Update progress bar and time display
audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration || 0;
    progressBar.value = (currentTime / duration) * 100 || 0;
    currentTimeElem.textContent = formatTime(currentTime);
    totalTimeElem.textContent = formatTime(duration);
});

// Seek functionality
progressBar.addEventListener('input', () => {
    const duration = audio.duration;
    const seekTime = (progressBar.value / 100) * duration;
    audio.currentTime = seekTime;
});

// Set total time on audio load
audio.addEventListener('loadedmetadata', () => {
    totalTimeElem.textContent = formatTime(audio.duration);
});

// Volume control
volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value / 100;
});

// Shuffle functionality
shuffleButton.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleButton.classList.toggle('active', isShuffle); // Toggle active class
});

// Repeat functionality
repeatButton.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatButton.classList.toggle('active', isRepeat); // Toggle active class
});

// Play next track
function playNextTrack() {
    if (isShuffle) {
        currentTrackIndex = Math.floor(Math.random() * playlist.length);
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    }
    audio.src = playlist[currentTrackIndex];
    audio.play();
}

// Play previous track
function playPrevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    audio.src = playlist[currentTrackIndex];
    audio.play();
}

// Next and previous track buttons
nextButton.addEventListener('click', playNextTrack);
prevButton.addEventListener('click', playPrevTrack);

// Auto-play next track when current track ends
audio.addEventListener('ended', () => {
    if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
    } else {
        playNextTrack();
    }
});
