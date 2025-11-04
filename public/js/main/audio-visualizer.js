document.addEventListener("Music_Ready", function () {
  if (!hasHWA) {
    console.warn("Audio Visualizer disabled: Hardware Acceleration is off.");
    return;
  }

  if (IsMobile) {
    console.warn("Audio Visualizer disabled: Mobile device detected.");
    return;
  }

  const canvas = document.getElementById("myCanvas");

  let wave = new Wave(window.MusicPlayer.getAudio(), canvas);

  wave.addAnimation(
    new wave.animations.Lines({
      frequencyBand: "base",
      count: 30,
      lineColor: "blue",
    }),
  );

  wave.addAnimation(
    new wave.animations.Lines({
      frequencyBand: "lows",
      count: 30,
      lineColor: "red",
    }),
  );

  wave.addAnimation(
    new wave.animations.Lines({
      lineColor: "black",
      lineWidth: 10,
      fillColor: { gradient: ["#000000"] },
      count: 60,
      mirroredX: true,
      rounded: true,
      frequencyBand: "mids",
    }),
  );

  wave.addAnimation(
    new wave.animations.Lines({
      lineColor: "pink",
      lineWidth: 10,
      count: 60,
      fillColor: { gradient: ["#FF00D4"] },
      mirroredX: true,
      rounded: true,
      frequencyBand: "highs",
    }),
  );

  // manually resize the canvas when the window is resized
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas, false);
  resizeCanvas();
});
