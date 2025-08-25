let index = 0;
function bleh() {
    document.title = GLOBAL_SETTINGS.Titles[index];
    index = (index + 1) % GLOBAL_SETTINGS.Titles.length;
}

if (GLOBAL_SETTINGS.Titles.length === 1) {
    document.title = GLOBAL_SETTINGS.Titles[0];
} else {
  bleh();
  setInterval(bleh, GLOBAL_SETTINGS.Title_Interval);
}