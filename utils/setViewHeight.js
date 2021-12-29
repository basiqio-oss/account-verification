// SET VIEW HEIGHT
// This function fixes bug in mobile browsers when using `100vh` for the layout to fill height of viewport
// More info: https://www.markusantonwolf.com/blog/solution-to-the-mobile-viewport-height-issue-with-tailwind-css/
export function setViewHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
