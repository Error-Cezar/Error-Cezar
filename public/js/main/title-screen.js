let APP_READY = false;
let READY_CONNECT = new Event("AppReady");

document.addEventListener("DOMContentLoaded", function () {
  let terminalText = document.getElementById("terminal-text");

  async function handleInput() {
    if (APP_READY) return;

    terminalText.remove();

    await loadFirePreset(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        preset: "fire",
      },
    });

    document.getElementById("terminal-hide").setAttribute("meow", true);
    document.getElementById("blurred-box").style.display = "block";
    document.getElementById("music-controls").style.display = "flex";

    $('#blurred-box').tilt({
      glare: true,
      maxGlare: .2,
      maxTilt: 5
    })

    console.warn("Welcome stalker :)");
    APP_READY = true;
    document.dispatchEvent(READY_CONNECT);
  }

  document.addEventListener("click", function () {
    handleInput();
  }, {once: true});

  new Typewriter("#terminal-text", {
    strings: ["Click me", `Awesome ${CurOS}`],
    autoStart: true,
    loop: true,
  });
});
