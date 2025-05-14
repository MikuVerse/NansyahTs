// Smooth scroll fallback (optional if CSS fails)
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute('href'));
    section.scrollIntoView({ behavior: 'smooth' });
  });
});
// Ambil elemen tombol dan menu
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

// Toggle menu saat tombol hamburger diklik
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('show');
});
