let index = 0;
function bleh() {
  document.title = GLOBAL_SETTINGS.Titles[index];
  index = (index + 1) % GLOBAL_SETTINGS.Titles.length;
}

bleh();
if (GLOBAL_SETTINGS.Titles.length > 1 && !IsMobile) {
  setInterval(bleh, GLOBAL_SETTINGS.Title_Interval);
}
