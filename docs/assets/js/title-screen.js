let APP_READY = false;
let READY_CONNECT = new Event("AppReady");

document.addEventListener("DOMContentLoaded", function () {
  const videoOverlay = document.createElement("div");
  videoOverlay.id = "video-overlay";
  document.getElementById("video-background").appendChild(videoOverlay);

  let terminalText = document.getElementById("terminal-text");
  let videoBackground = document.getElementById("myVideo");

  videoBackground.pause();

  function handleInput() {
    if (APP_READY) return;
    terminalText.remove();
    document.getElementById("myVideo").play();
    document.getElementById("terminal-hide").setAttribute("meow", true);
    document.getElementById("blurred-box").style.display = "block";
    document.getElementById("music-controls").style.display = "flex";
    removeEventListeners();
    document.body.classList.add("video-normal");

    console.log("Welcome stalker :)");
    APP_READY = true;
    document.dispatchEvent(READY_CONNECT);
  }

  function addEventListeners() {
    document.addEventListener("keydown", handleKeyPress);
  }

  function removeEventListeners() {
    document.removeEventListener("keydown", handleKeyPress);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleInput();
    }
  }

  document.addEventListener("click", function () {
    handleInput();
  });

  document.body.classList.remove("video-normal");
  videoOverlay.style.display = "block";

  addEventListeners();

  new Typewriter("#terminal-text", {
    strings: ["Click me", `Awesome ${CurOS}`],
    autoStart: true,
    loop: true,
  });
});
