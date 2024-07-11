console.log("Welcome to spotify")

//Variables initialization
let songIndex =0;
let progress =0;
let AudioElement = new Audio('songs/4.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs =[{songName: "Enna Sona", filePath: "songs/1.mp3" , coverPath:"covers/1-s.jpg"},
            {songName: "Kho Gaye hum kahan", filePath: "songs/2.mp3" , coverPath:"covers/2-s.jpg"},
            {songName: "Baarishein - Anuv Jain", filePath: "songs/3.mp3" , coverPath:"covers/3-s.jpg"},
            {songName: "Shiddat - Title track", filePath: "songs/4.mp3" , coverPath:"covers/4-s.jpg"},
             {songName: "Sooraj Dooba Hain Yaaro", filePath: "songs/5.mp3" , coverPath:"covers/5-s.jpg"},
             {songName: "Lose you to love me", filePath: "songs/6.mp3" , coverPath:"covers/6-s.jpg"},
             {songName: "Ghodey pe Sawaar", filePath: "songs/7.mp3" , coverPath:"covers/7-s.jpg"},
             {songName: "Baharla ha madhumas", filePath: "songs/8.mp3" , coverPath:"covers/8-s.webp"}
]

songItems.forEach((Element,i)=>{ 
    Element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    Element.getElementsByClassName("songName")[0].innerText = songs[i].songName;  
})

// AudioElement.play();

//Handle play and pause events
masterPlay.addEventListener('click',()=>{
    if(AudioElement.paused || AudioElement.currentTime<=0){
        AudioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-pause')
        gif.style.opacity = 1;
    }
    else{
        AudioElement.pause();
        masterPlay.classList.remove('fa-pause')
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity=0;
    }
})
//Listen to events
AudioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');

    //Update seekbar
    progress = parseInt((AudioElement.currentTime/AudioElement.duration)*100);
    // console.log(progress)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    AudioElement.currentTime=(myProgressBar.value *AudioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((Element)=>{
        Element.classList.remove('fa-pause');
        Element.classList.add('fa-circle-play');
    })

}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((Element)=>{
    Element.addEventListener('click',(e)=>{
        makeAllPlays();
        console.log(e.target);
        songIndex = parseInt(e.target.id);
        console.log(songIndex);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-pause');
        AudioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        AudioElement.currentTime=0;
        AudioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-pause')
    })
})


document.getElementById("next").addEventListener('click',()=>{
    if(songIndex>=8) songIndex=0;
    else songIndex+=1;
    AudioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    AudioElement.currentTime=0;
    AudioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-pause')
})

document.getElementById("previous").addEventListener('click',()=>{
    if(songIndex<=0) songIndex=0;
    else songIndex-=1;
    AudioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    AudioElement.currentTime=0;
    AudioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-pause')
})