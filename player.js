const container=document.querySelector(".container"),
imgarea=container.querySelector(".imgarea img"),
songname=container.querySelector(".sdetails .name"),
artist=container.querySelector(".sdetails .artist"),
mainAudio=container.querySelector("#audio"),
playBtn=container.querySelector(".play"),
prevBtn=container.querySelector("#back"),
nxtBtn=container.querySelector("#forward"),
progressBar=container.querySelector(".pbar"),
progressArea=container.querySelector(".pbararea"),
musiclist=container.querySelector(".musiclist"),
showBtn=container.querySelector("#menu"),
closeBtn=musiclist.querySelector(".close");
doneBtn=musiclist.querySelector("#done");
repeatBtn=container.querySelector("#repeat");
favourBtn=container.querySelector("#heart");










let musicIndex=Math.floor((Math.random()*allMusic.length)+1);

function loadMusic(musicIndex){
  songname.innerText=allMusic[musicIndex-1].name;
  artist.innerText=allMusic[musicIndex-1].artist;
  imgarea.src=`/player/${allMusic[musicIndex-1].img}.jpg`;
  mainAudio.src=`/player/${allMusic[musicIndex-1].src}.mp3`;

};





function playMusic(){
  container.classList.add("played");
  playBtn.querySelector("i").innerText="pause";
  mainAudio.play();
};




function pauseMusic(){
  container.classList.remove("played");
  playBtn.querySelector("i").innerText="play_arrow";
  mainAudio.pause();
  
};

function prevMusic(){
  musicIndex--;
  musicIndex < 1 ? musicIndex=allMusic.length : musicIndex=musicIndex;
  loadMusic(musicIndex);
  mainAudio.play();
  /*playBtn.querySelector("i").innerText=="pause" ? mainAudio.play() : mainAudio.pause();*/
  /*if (playBtn.querySelector("i").innerText=="pause"){
    mainAudio.play();
  }*/
playBtn.querySelector("i").innerText="pause";
  
  playingSong();
  favourBtn.setAttribute("name","heart-outline");

   /* if (playBtn.querySelector("i").innerText=="pause"){
       mainAudio.currentTime=0;
       mainAudio.play()
  }else{
    widthadj();
  }*/
  
};



function nextMusic(){
  musicIndex++;
  musicIndex > allMusic.length ? musicIndex=1 : musicIndex=musicIndex;
  loadMusic(musicIndex);
  mainAudio.play();
/*playBtn.querySelector("i").innerText=="pause" ? mainAudio.play() : mainAudio.pause();*/
  playingSong();
  playBtn.querySelector("i").innerText="pause";
  favourBtn.setAttribute("name","heart-outline");
  
  /*if (playBtn.querySelector("i").innerText=="pause"){
       mainAudio.currentTime=0;
       mainAudio.play()
  }else{
  widthadj();
  
}*/
};



window.addEventListener("load",()=>{
  loadMusic(musicIndex);
  playingSong();
});


playBtn.addEventListener("click",()=>{
  const ismpaused = container.classList.contains("played");
  ismpaused ? pauseMusic() : playMusic();
});


prevBtn.addEventListener("click",()=>{
  prevMusic();
});

nxtBtn.addEventListener("click",()=>{
  nextMusic();
});


mainAudio.addEventListener("timeupdate",(e)=>{
  const currtime=e.target.currentTime;
  const tduration=e.target.duration;
 let progwidth=(currtime/tduration)*100;
  progressBar.style.width=`${progwidth}%`;
  
  
  let curTime=container.querySelector("#ctime"),
totTime=container.querySelector("#ttime");
  
  
  
  mainAudio.addEventListener("loadeddata",()=>{
let mduration=mainAudio.duration;
let tmin=Math.floor(mduration / 60);
let tsec=Math.floor(mduration % 60);
tsec < 10 ? tsec=`0${tsec}` : tsec=tsec;
smin=`0${tmin}`;
totTime.innerText=`${smin}:${tsec}`;

});
  
  
 
    let qtime=mainAudio.currentTime;
let cmin=Math.floor(qtime / 60);
let csec=Math.floor(qtime % 60);
csec < 10 ? csec=`0${csec}` : csec=csec;
showmin=`0${cmin}`;
curTime.innerText=`${showmin}:${csec}`;

  
});

progressArea.addEventListener("click",(e)=>{
  let pbarwidth=progressArea.clientWidth;
  let woffset=e.offsetX;
  let totduration=mainAudio.duration;
  
  mainAudio.currentTime=(woffset / pbarwidth) * totduration;
  playMusic();
  
  
});

/*function widthadj(){
  mainAudio.addEventListener("loadeddata",()=>{
  let tduration = mainAudio.duration;
  let pbarwidth=progressArea.clientWidth;
  let cwidth=progressBar.style.width;
  cwidth = cwidth.replace("%", "");
  fwidth = Number(cwidth) / 100 * (pbarwidth);
  mainAudio.currentTime=(fwidth / pbarwidth) * tduration;
  })
 
};*/



showBtn.addEventListener("click",()=>{
  musiclist.classList.toggle("show");
});

closeBtn.addEventListener("click",()=>{
  showBtn.click();
})

doneBtn.addEventListener("click",()=>{
  showBtn.click();
})


favourBtn.addEventListener("click",()=>{
  favourBtn.setAttribute("name","heart");
})

repeatBtn.addEventListener("click",()=>{
 let getText=repeatBtn.innerText;
 switch(getText){
   case "repeat":
     repeatBtn.innerText="repeat_one";
     break;
   
   case "repeat_one":
     repeatBtn.innerText="shuffle";
     break;
     
   case "shuffle":
   repeatBtn.innerText = "repeat";
   break;
   
 }
});


mainAudio.addEventListener("ended",()=>{
  let getText=repeatBtn.innerText;
 switch(getText){
   case "repeat":
     nextMusic();
     break;
   
   case "repeat_one":
      mainAudio.currentTime=0;
      loadMusic(musicIndex);
     playMusic();
     break;
     
   case "shuffle":
     let rindex=Math.floor((Math.random()*allMusic.length)+1);
     do{
let rindex=Math.floor((Math.random()*allMusic.length)+1);
     }while(musicIndex==rindex);
     musicIndex=rindex;
     loadMusic(musicIndex);
     playMusic();
  //   playingSong();
     break;
     
 }
 });








const ulTag = container.querySelector("ul");

// let create li tags according to array lenght for list

for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li li-index="${i + 1}">
    <div class="sdetails">
      <span class="name">${allMusic[i].name}</span>
      <p class="artist">${allMusic[i].artist}</p>
    </div>
    <audio class="${allMusic[i].src} " src="/subbu/${allMusic[i].src}.mp3"></audio>
    <span id="${allMusic[i].src}" class="duration">3:45</span>
    
  </li>
  <hr>`;
  


  ulTag.insertAdjacentHTML("beforeend", liTag);


 let liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
  
 

 liAudioTag.addEventListener("loadeddata", () => {
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if (totalSec < 10) { //if sec is less than 10 then add 0 before it
        totalSec = `0${totalSec}`;
    }

    liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;
    
    
    // adding t-duration attribute with total duration value
    liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });

}


// play particular song from the list on click of li tag

const allLiTags = ulTag.querySelectorAll("li");
function playingSong() {
    for (let j = 0; j < allLiTags.length; j++) {
   let audioTag = allLiTags[j].querySelector(".duration");
        // let remove playing class from all other li expect the last one which is clicked
        if(allLiTags[j].classList.contains("playing")){
            allLiTags[j].classList.remove("playing");
        //  let's get that audio duration value and pass to .audio-duration innertext
        let adDuration = audioTag.getAttribute("t-duration");
        audioTag.innerText = adDuration;
        }
    
        // if there is an li tag which li index is equal to musicIndex
        // then this music is playing now and we'll style it
    
        if(allLiTags[j].getAttribute("li-index") == musicIndex){
            allLiTags[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }
    
        // adding on click attribute in all li tags
        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}

// lets play song on click li 
function clicked(element){

    // getting li index of particular clicked li tag
    let getLiIndex = element.getAttribute("li-index");
    musicIndex =  getLiIndex; //passing that liindex to musicIndex
    loadMusic(musicIndex);
    playMusic(); 
    playingSong();
   
}


 








