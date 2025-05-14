// Hamburger toggle
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('show'); // Menampilkan atau menyembunyikan menu saat tombol diklik
});

// Smooth scroll
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Mencegah link default behavior (scrolling ke anchor)
    const section = document.querySelector(this.getAttribute('href')); // Mencari section yang sesuai dengan href
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' }); // Scroll ke bagian dengan smooth animation
    }
  });
});
