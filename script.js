// ==============================
// DARK MODE
// ==============================
//function to toggle dark mode

const themeToggle = document.getElementById('theme-btn');
const themeIcon = document.querySelector('.moon-icon');
const themeText = themeToggle.querySelector('span');

let DarkMode=false;

themeToggle.addEventListener('click', () => {

    DarkMode = !DarkMode;

  document.body.classList.toggle('dark-mode', DarkMode);

  if (DarkMode) { 
    themeIcon.src="favcion/Theme icon (1).png";
    themeText.textContent = "LIGHT";
  } else {
    themeIcon.src="favcion/Theme icon.png";
    themeText.textContent = "DARK";
  }
});
