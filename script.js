console.log('Cadence - Music that suits you');

// Variables
let songIndex = 0;
let audioElement = new Audio();
let playButton = document.getElementById('playButton');
let myPlay = document.getElementById('myPlay');
let songNameInfo = document.getElementById('songNameInfo');
let songIcon = document.querySelector('.songIcon img');
let songItems = Array.from(document.getElementsByClassName('songItem'));

const rewindButton = document.getElementById('rewind');
const forwardButton = document.getElementById('forward');

let songs = [
    {Name: 'Shape of You - Ed Sheeran', filePath: 'Songs/Shape of You.mp3', coverPath: 'Covers/SoY Cover.jpeg', songLen: '03:52'},
    {Name: 'Despacito - Luis Fonsi (ft.Daddy Yankee)', filePath: 'Songs/Despacito.mp3', coverPath: 'Covers/Despacito Cover.jpeg', songLen: '04:40'},
    {Name: 'See You Again - Wiz Khalifa (ft.Charlie Puth)', filePath: 'Songs/See You Again.mp3', coverPath: 'Covers/SYA Cover.jpeg', songLen: '03:57'},
    {Name: 'Roar - Katy Perry', filePath: 'Songs/Roar.mp3', coverPath: 'Covers/Roar Cover.jpeg', songLen: '03:50'},
    {Name: 'Sorry - Justin Bieber', filePath: 'Songs/Sorry.mp3', coverPath: 'Covers/Sorry Cover.jpeg', songLen: '03:18'},
    {Name: 'Waka Waka - Shakira', filePath: 'Songs/Waka Waka.mp3', coverPath: 'Covers/Waka Waka Cover.jpeg', songLen: '03:30'},
    {Name: 'Perfect - Ed Sheeran', filePath: 'Songs/Perfect.mp3', coverPath: 'Covers/Perfect Cover.jpeg', songLen: '04:20'},
    {Name: 'Sugar - Maroon 5', filePath: 'Songs/Sugar.mp3', coverPath: 'Covers/Sugar Cover.jpeg', songLen: '03:51'},
    {Name: 'We Don\'t Talk Anymore - Charlie Puth (ft.Selena Gomez)', filePath: 'Songs/We Don\'t Talk Anymore.mp3', coverPath: 'Covers/WDTA Cover.jpeg', songLen: '03:38'},
    {Name: 'One Love - Blue', filePath: 'Songs/One Love.mp3', coverPath: 'Covers/One Love Cover.jpeg', songLen: '03:30'}
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("Name")[0].innerText = songs[i].Name;

    let durationElement = element.getElementsByClassName("duration")[0];
    durationElement.innerHTML = `${songs[i].songLen} <i class="fa-solid indPlay fa-play" id="${i}"></i>`;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('indPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
};

Array.from(document.getElementsByClassName('indPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id);

        if (clickedIndex === songIndex && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');
            playButton.classList.remove('fa-pause');
            playButton.classList.add('fa-play');
        } 
        else {
            makeAllPlays();

            songIndex = clickedIndex;
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            audioElement.src = songs[songIndex].filePath;
            songNameInfo.innerText = songs[songIndex].Name;
            songIcon.src = songs[songIndex].coverPath;
            audioElement.play().then(() => {
                playButton.classList.remove('fa-play');
                playButton.classList.add('fa-pause');
            });
        }
    });
});


// Play/Pause button functionality
playButton.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play().then(() => {
            playButton.classList.remove('fa-play');
            playButton.classList.add('fa-pause');
        });
    } else {
        audioElement.pause();
        playButton.classList.remove('fa-pause');
        playButton.classList.add('fa-play');
    }
});

// Update seek bar
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
        let seek = ((audioElement.currentTime / audioElement.duration) * 100);
        myPlay.value = seek;
    }
});

// Seek functionality
myPlay.addEventListener('change', () => {
    if (audioElement.duration) {
        audioElement.currentTime = ((myPlay.value * audioElement.duration) / 100);
    }
});

rewindButton.addEventListener('click', () => {
    if (audioElement.currentTime >= 10) {
        audioElement.currentTime -= 10;
    } else {
        audioElement.currentTime = 0;
    }
});

forwardButton.addEventListener('click', () => {
    if (audioElement.currentTime + 10 <= audioElement.duration) {
        audioElement.currentTime += 10;
    } else {
        audioElement.currentTime = audioElement.duration;
    }
});


document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0; 
    } else {
        songIndex += 1;
    }
    playSong();
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 9; 
    } else {
        songIndex -= 1;
    }
   
    playSong();
});


audioElement.addEventListener('ended', () => {
    if (songIndex >= 9) {
        songIndex = 0; 
    } else {
        songIndex += 1;
    }
    playSong();
});


function playSong() {
    audioElement.src = songs[songIndex].filePath;
    songNameInfo.innerText = songs[songIndex].Name;
    songIcon.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play().then(() => {
        playButton.classList.remove('fa-play');
        playButton.classList.add('fa-pause');
    });
}