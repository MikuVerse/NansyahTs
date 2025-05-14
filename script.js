// JavaScript untuk men-toggle visibility dari menu navigasi
const toggleNavButton = document.getElementById('toggleNav');
const navMenu = document.getElementById('navMenu');

// Ketika tombol "Menu" di-klik, toggle menu navigasi
toggleNavButton.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});
