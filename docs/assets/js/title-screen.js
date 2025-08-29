let APP_READY = false;
let READY_CONNECT = new Event("AppReady");

document.addEventListener("DOMContentLoaded", function () {
  const videoOverlay = document.createElement("div");
  videoOverlay.id = "video-overlay";
  document.getElementById("video-background").appendChild(videoOverlay);

  var terminalText = document.getElementById("terminal-text");
  var videoBackground = document.getElementById("myVideo");

  videoBackground.pause();

  function handleInput() {
    if (APP_READY) return;
    terminalText.style.display = "none";
    document.getElementById("myVideo").play();
    document.getElementById("terminal-hide").setAttribute("meow", true);
    document.getElementById("blurred-box").style.display = "block";
    document.getElementById("music-controls").style.display = "flex";
    removeEventListeners();
    document.body.classList.add("video-normal");

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

  function getOS() {
    let userAgent = navigator.userAgent;
    let os = "Things";

    if (userAgent.indexOf("Win") !== -1) {
      os = "Windows";
    } else if (userAgent.indexOf("Mac") !== -1) {
      os = "MacOS";
    } else if (userAgent.indexOf("Linux") !== -1) {
      os = "Linux";
    } else if (/Android/.test(userAgent)) {
      os = "Android";
    } else if (/iPhone|iPad|iPod/.test(userAgent)) {
      os = "iOS";
    }

    return os;
  }

  document.body.classList.remove("video-normal");
  videoOverlay.style.display = "block";

  addEventListeners();

  new Typewriter("#terminal-text", {
    strings: ["Click me", `Awesome ${getOS()}`],
    autoStart: true,
    loop: true,
  });
});
