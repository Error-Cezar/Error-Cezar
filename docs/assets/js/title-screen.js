let APP_READY = false;
let READY_CONNECT = new Event('AppReady');


document.addEventListener('DOMContentLoaded', function() {
  const videoOverlay = document.createElement('div');
  videoOverlay.id = 'video-overlay';
  document.getElementById('video-background').appendChild(videoOverlay);
  var terminalContainer = document.getElementById('terminal');
  var terminalText = document.getElementById('terminal-text');
  var videoBackground = document.getElementById('myVideo');
  var closeButton = document.getElementById('close-button');

  var terminalTextContent = [
      "User: Guest",
      "System: Loading...",
      "Bio Loaded",
      "Press Anywhere To Continue",
  ];
  var currentIndex = 1;

  videoBackground.pause();

  function typeWriter() {
      var line = terminalTextContent[currentIndex - 1];
      var i = 0;

      function typeChar() {
          if (i < line.length) {
              terminalText.textContent += line.charAt(i);
              i++;
              setTimeout(typeChar, currentIndex === 0 ? 10 : 50);
          } else {
              terminalText.textContent += "\n";
              currentIndex++;
              if (currentIndex < terminalTextContent.length + 1) {
                  typeWriter();
              }
          }
      }

      if (currentIndex === 0) {
          terminalText.style.transform = 'scale(5)';
          terminalText.style.opacity = '0';
          terminalText.style.transition = 'transform 1.5s ease-out, opacity 1.5s ease-out';
          void terminalText.offsetWidth;
          
          terminalText.style.transform = 'scale(1)';
          terminalText.style.opacity = '1';
      }

      typeChar();
  }

  function handleInput() {
    if(APP_READY) return;
      terminalContainer.style.display = 'none';
      document.getElementById('myVideo').play();
      document.getElementById('terminal-hide').setAttribute('meow', true)
      document.getElementById('blurred-box').style.display = 'block';
      document.getElementById('music-controls').style.display = 'flex';
      removeEventListeners();
      document.body.classList.add('video-normal');

      APP_READY = true;
      document.dispatchEvent(READY_CONNECT);
  }

  function addEventListeners() {
      document.addEventListener('keydown', handleKeyPress);
      terminalContainer.addEventListener('click', handleInput);
  }

  function removeEventListeners() {
      document.removeEventListener('keydown', handleKeyPress);
      terminalContainer.removeEventListener('click', handleInput);
  }

  function handleKeyPress(event) {
      if (event.key === 'Enter') {
          handleInput();
      }
  }

  document.addEventListener('click', function() {
      handleInput();
  });

function getOS() {
    let userAgent = navigator.userAgent;
    let os = "Unknown OS";

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

  
  let operatingSystem = getOS();
  terminalTextContent[1] = "System: " + operatingSystem;

  function centerTerminal() {
      var terminalWidth = terminalContainer.offsetWidth;
      var terminalHeight = terminalContainer.offsetHeight;
      var centerX = (window.innerWidth - terminalWidth) / 2;
      var centerY = (window.innerHeight - terminalHeight) / 2;

      terminalContainer.style.position = 'absolute';
      terminalContainer.style.left = centerX + 'px';
      terminalContainer.style.top = centerY + 'px';
  }

  centerTerminal();
  window.addEventListener('resize', centerTerminal);

  terminalText.style.textAlign = 'center';
  document.body.classList.remove('video-normal');
  videoOverlay.style.display = 'block'; 

  addEventListeners();
  typeWriter();
}); 