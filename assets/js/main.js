const saluta = () => console.log('Hello Davide');

/**  MOBILE MENU REVEAL */
const menu = document.getElementById('nav-menu'),
  toggle = document.getElementById('nav-toggle'),
  close = document.getElementById('nav-close'),
  links = document.querySelectorAll('.nav_link');

toggle.addEventListener('click', () => {
  menu.classList.add('show-menu');
});

close.addEventListener('click', () => {
  menu.classList.remove('show-menu');
});

/**  DESKTOP MENU STICK*/
const scrollHeader = () => {
  const header = document.getElementById('header');
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  this.scrollY >= 50
    ? header.classList.add('bg-header')
    : header.classList.remove('bg-header');
};
window.addEventListener('scroll', scrollHeader);

/** DARK \ LIGHT THEME TOGGLE */
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = `fa-sun`;

// Check in localStorage previuosly theme selected
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? `fa-moon` : `fa-sun`;

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
    darkTheme
  );
  themeButton.classList[selectedIcon === `fa-moon` ? 'add' : 'remove'](
    iconTheme
  );
}

themeButton.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});
