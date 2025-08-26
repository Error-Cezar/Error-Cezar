(async () => {


    const ME = new Event('Music_Ready');

    function waitForEvent() {
        return new Promise((resolve) => {
            document.addEventListener('AppReady', () => {
                resolve();
            }); // Ensures the listener is removed after the first call
        });
    }

    // if APP_READY is false, wait for it to become true
    if(!APP_READY) {
        await waitForEvent();
    }


    let currentSongIndex = 0;
    const song = new Audio();
    let playing = false;
    song.volume = .3

    function initMusicPlayer() {
        loadSong(currentSongIndex);
        song.addEventListener('ended', nextSong);
    }

    function startMusicAfterTerminal() {
        song.play()
            .catch(error => {
                console.error("Music playback error:", error);
                setTimeout(() => {
                    song.play()
                }, 1000);
            });
    }

    const musicName = document.querySelector(".song-name");
    const fillBar = document.querySelector(".fill-bar");
    const time = document.querySelector(".time");
    const cover = document.getElementById("cover");
    const playBtn = document.getElementById("play");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const prog = document.querySelector(".progress-bar");

    let currentSong = 0;

    document.addEventListener("Music_Ready", () => {
        loadSong(currentSong);

        song.addEventListener("timeupdate", updateProgress);
        song.addEventListener("ended", nextSong);

        song.addEventListener("play", () => {
            playing = true;
            playBtn.classList.add("fa-pause");
            playBtn.classList.remove("fa-play");
            cover.classList.add("active");
        });

        song.addEventListener("pause", () => {  
                playing = false;
                playBtn.classList.remove("fa-pause");
                playBtn.classList.add("fa-play");
                cover.classList.remove("active");
            });
        
        prevBtn.addEventListener("click", prevSong);
        nextBtn.addEventListener("click", nextSong);
        playBtn.addEventListener("click", togglePlayPause);
        prog.addEventListener("click", seek);

        musicName.textContent = GLOBAL_SETTINGS.Songs[currentSong].name;
        cover.src = GLOBAL_SETTINGS.Songs[currentSong].cover;
    });

    function loadSong(index) {
        const { name, src, cover: thumb } = GLOBAL_SETTINGS.Songs[index];
        musicName.innerText = name;

        song.src = "./assets/music/songs/" + src;

        cover.style.backgroundImage = `url(./assets/music/covers/${thumb || 'default.png'})`;
    }

    function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;
    }
    }

    function formatTime(totalSeconds) {
        const d = dayjs.duration(Math.max(0, Math.floor(Number(totalSeconds)) || 0), 'seconds');
        const minutes = String(Math.floor(d.asMinutes())).padStart(2, '0');
        const seconds = String(d.seconds()).padStart(2, '0');
        return `${minutes}:${seconds}`;
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
    currentSong = (currentSong - 1 + GLOBAL_SETTINGS.Songs.length) % GLOBAL_SETTINGS.Songs.length;
    playMusic();
    }

    function playMusic() {
    loadSong(currentSong);
    song.play();
    playBtn.classList.add("fa-pause");
    playBtn.classList.remove("fa-play");
    cover.classList.add("active");
    }

    function seek(e) {
        const pos = (e.offsetX / prog.clientWidth) * song.duration;
        song.currentTime = pos;
    }

    if (!GLOBAL_SETTINGS.music) {
        return;
    }
   initMusicPlayer();

    window.MusicPlayer = {
        start: startMusicAfterTerminal,
        getAudio: () => song
    };

    document.dispatchEvent(ME);

    window.MusicPlayer.start()

})()