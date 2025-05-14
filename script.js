// Toggle Navigation Menu
const toggleNav = document.getElementById('toggleNav');
const navMenu = document.getElementById('navMenu');

toggleNav.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});
