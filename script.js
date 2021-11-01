const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevbtn = document.getElementById('prev');
const playbtn = document.getElementById('play');
const nextbtn = document.getElementById('next');


const songs = [
    {
        name:"jacinto-1",
        title:"Electric Chill Machine",
        artist:"Jacinto Design",
    },
    {
        name:"jacinto-2",
        title:"Seven National Army",
        artist:"Jacinto Design",
    },
    {
        name:"jacinto-3",
        title:"Goodnight, Disco Queen",
        artist:"Jacinto Design",
    },
    {
        name:"metric-1",
        title:"Front Row",
        artist:"Jacinto Design",
    }
]
let songIndex=0;
let isPlaying = false;

function playSong(){
    isPlaying =true;
    playbtn.classList.replace('fa-play','fa-pause');
    playbtn.setAttribute('title','Pause');
    music.play();

}

function pauseSong(){
    isPlaying=false;
    playbtn.classList.replace('fa-pause','fa-play');
    playbtn.setAttribute('title','Play');
    music.pause();
}


playbtn.addEventListener('click',()=>(isPlaying?pauseSong():playSong()))

function loadSong(song){
    title.textContent=song.title;
    artist.textContent=song.artist;
    music.src=`music/${song.name}.mp3`;
    image.src =`img/${song.name}.jpg`;
}

function prevSong(){
    songIndex--;
    if(songIndex<0)songIndex=songs.length-1;
    loadSong(songs[songIndex]);
    playSong();
}


function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1)songIndex=0;
    loadSong(songs[songIndex]);
    playSong();
}


loadSong(songs[songIndex]);

function updateProgressBar(e){
    if(isPlaying){
        const {duration,currentTime} = e.srcElement;
        const progressPercent = (currentTime/duration)*100;
        
        progress.style.width = `${progressPercent}%`
   
        const durationMinues = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);
        if(durationSeconds <10){
            durationSeconds = `0${durationSeconds}`; 
        }
        if(durationSeconds){
            durationEl.textContent = `${durationMinues}:${durationSeconds}`
     
        }

        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);
        if(currentSeconds <10){
            currentSeconds = `0${currentSeconds}`; 
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

function setProgressBar(e){
     const width = this.clientWidth;
  
     const clickX = e.offsetX;
    const {duration} = music;
   music.currentTime = (clickX/width)*duration;

}

prevbtn.addEventListener('click',prevSong);
nextbtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate',updateProgressBar)
music.addEventListener('ended',nextSong);
progressContainer.addEventListener('click',setProgressBar);