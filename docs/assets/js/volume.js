document.addEventListener("Music_Ready", () => {
    let slider = document.getElementById("volume-slider");
    let audio = window.MusicPlayer.getAudio()

    slider.addEventListener("input", (e) => {
        const volume = e.target.value;
        audio.volume = volume;
    });

    slider.value = audio.volume * 100; // Khởi tạo giá trị ban đầu của slider
})