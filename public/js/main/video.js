let video = document.getElementById("myVideo");
let meow = document.getElementById("terminal-hide");

window.onfocus = function () {
    if (!APP_READY || IsMobile) return;
    meow.removeAttribute("focus");
};

window.onblur = function () {
    if (!APP_READY || IsMobile) return;
    meow.setAttribute("focus", true);
};

if (IsMobile) {
    video.setAttribute("src", "/backgrounds/mobile/car.mp4");
}