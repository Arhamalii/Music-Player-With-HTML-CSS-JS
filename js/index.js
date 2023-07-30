let songIndex = 0;
const audio = new Audio("./assets/Songs/0.mp3");
const masterPlay = document.getElementById("masterPlay");
const progressBar = document.getElementById("range");
const durationText = document.getElementById("duration");
const songWrapper = Array.from(document.getElementsByClassName("songWrapper"));
const musicGif = document.getElementById("gif");
const totalDuration = document.getElementById("durationRight");

let songs = [
  {
    songName: " Nigh Changes",
    coverPath: "assets/covers/2.jpg",
  },
  {
    songName: "Perfect",
    coverPath: "assets/covers/1.jpg",
  },

  {
    songName: "Let Me Down Slowly",
    coverPath: "assets/covers/3.jpg",
  },
  {
    songName: "Sunshine ",
    coverPath: "assets/covers/4.jpg",
  },
  {
    songName: "Let Me Love You",
    coverPath: "assets/covers/5.jpg",
  },
];

songWrapper.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByTagName("h6")[0].textContent = songs[i].songName;
});

masterPlay.addEventListener("click", () => {
  if (audio.paused || audio.currentTime <= 0) {
    audio.play();
    musicGif.style.opacity = "1";

    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
  } else {
    audio.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    musicGif.style.opacity = "0";
  }
});

// -------------------- seekbar update -----------------------
audio.addEventListener("timeupdate", async () => {
  progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;

  // ----------------------------- current  duration display control ---------------------

  let currentDurationMinutes = Math.floor(audio.currentTime / 60);
  let currentDurationSeconds = Math.floor(
    audio.currentTime - currentDurationMinutes * 60
  );
  currentDurationMinutes =
    currentDurationMinutes <= 9
      ? "0" + currentDurationMinutes
      : currentDurationMinutes;
  currentDurationSeconds =
    currentDurationSeconds <= 9
      ? "0" + currentDurationSeconds
      : currentDurationSeconds;

  const currentDuration = currentDurationMinutes + ":" + currentDurationSeconds;
  durationText.textContent = currentDuration;

  // ----------------------------- total duration display control ---------------------
  if (audio.duration > 0) {
    let totalDurationMinutes = Math.floor(audio.duration / 60);
    let totalDurationSeconds = Math.floor(
      audio.duration - totalDurationMinutes * 60
    );
    totalDurationMinutes =
      totalDurationMinutes <= 9
        ? "0" + totalDurationMinutes
        : totalDurationMinutes;
    totalDurationSeconds =
      totalDurationSeconds <= 9
        ? "0" + totalDurationSeconds
        : totalDurationSeconds;

    const totalDurationFormat =
      totalDurationMinutes + ":" + totalDurationSeconds;
    totalDuration.textContent = totalDurationFormat;
  }
});

// --------------song duration update according seekbar--------------------
progressBar.addEventListener("change", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});
// ------------
// songPercent = parseInt(audio.currentTime / audio.duration) * 100;

// console.log(songPercent);
// if (audio.duration === 100) {
// }
// --------------------------main play button funtionality------------------

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.add("fa-play-circle");
      element.classList.remove("fa-pause-circle");
    }
  );
};

// --------------------------small button funtionality------------------
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audio.src = `assets/Songs/${songIndex}.mp3`;
      console.log(songIndex);
      audio.currentTime = 0;
      audio.play();
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
      musicGif.style.opacity = "1";
    });
  }
);

// ---------------next button functionality -------------------------

document.getElementById("nextBtn").addEventListener("click", (e) => {
  makeAllPlays();

  if (songIndex === 4) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  console.log(songIndex);

  audio.src = `assets/Songs/${songIndex}.mp3`;
  audio.currentTime = 0;
  audio.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
// ---------------previous button functionality -------------------------

document.getElementById("previousBtn").addEventListener("click", (e) => {
  makeAllPlays();

  if (songIndex === 0) {
    songIndex = 4;
  } else {
    songIndex -= 1;
  }
  console.log(songIndex);
  audio.src = `assets/Songs/${songIndex}.mp3`;
  audio.currentTime = 0;
  audio.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
