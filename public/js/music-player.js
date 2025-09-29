(async () => {
  const ME = new Event("Music_Ready");

  function waitForEvent() {
    return new Promise((resolve) => {
      document.addEventListener("AppReady", () => {
        resolve();
      }); // Ensures the listener is removed after the first call
    });
  }

  // if APP_READY is false, wait for it to become true
  if (!APP_READY) {
    await waitForEvent();
  }

  let currentSongIndex = 0;
  const song = new Audio();
  let playing = false;
  song.volume = 0.5;

  function initMusicPlayer() {
    loadSong(currentSongIndex);
    song.addEventListener("ended", nextSong);
  }

  function startMusicAfterTerminal() {
    song.play().catch((error) => {
      console.error("Music playback error:", error);
      setTimeout(() => {
        song.play();
      }, 1000);
    });
  }

  const musicName = document.querySelector(".song-name");
  const playBtn = document.getElementById("play");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  let currentSong = 0;

  document.addEventListener("Music_Ready", () => {
    loadSong(currentSong);

    song.addEventListener("ended", nextSong);

    song.addEventListener("play", () => {
      playing = true;
      playBtn.classList.add("fa-pause");
      playBtn.classList.remove("fa-play");
    });

    song.addEventListener("pause", () => {
      playing = false;
      playBtn.classList.remove("fa-pause");
      playBtn.classList.add("fa-play");
    });

    prevBtn.addEventListener("click", prevSong);
    nextBtn.addEventListener("click", nextSong);
    playBtn.addEventListener("click", togglePlayPause);

    musicName.textContent = GLOBAL_SETTINGS.Songs[currentSong].name;
  });

  function loadSong(index) {
    const { name, src } = GLOBAL_SETTINGS.Songs[index];
    musicName.innerText = name;

    const url = new URL('/music/' + src, import.meta.url).href
    song.src = url; 
  }

  function togglePlayPause() {
    if (playing) {
      song.pause();
    } else {
      song.play();
    }
  }

  function nextSong() {
    currentSong = (currentSong + 1) % GLOBAL_SETTINGS.Songs.length;
    playMusic();
  }

  function prevSong() {
    currentSong =
      (currentSong - 1 + GLOBAL_SETTINGS.Songs.length) %
      GLOBAL_SETTINGS.Songs.length;
    playMusic();
  }

  function playMusic() {
    loadSong(currentSong);
    song.play();
    playBtn.classList.add("fa-pause");
    playBtn.classList.remove("fa-play");
  }

  if (!GLOBAL_SETTINGS.music) {
    return;
  }

  initMusicPlayer();

  window.MusicPlayer = {
    start: startMusicAfterTerminal,
    getAudio: () => song,
  };

  document.dispatchEvent(ME);

  window.MusicPlayer.start();
})();
