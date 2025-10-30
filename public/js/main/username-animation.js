document.addEventListener("AppReady", function () {
  const usernameElement = document.getElementById("username-container");

  const typewriter = new Typewriter(usernameElement, {
    loop: true,
    delay: 75,
  });

  for (const element of GLOBAL_SETTINGS.usernameVariants) {
    typewriter.typeString(element);
    typewriter.pauseFor(GLOBAL_SETTINGS.usernameInterval);
    typewriter.deleteChars(element.length);
  }

  typewriter.start();
});
