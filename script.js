// Fungsi untuk menampilkan/menghilangkan dropdown menu dan mengubah tampilan hamburger
function toggleMenu() {
  const menu = document.getElementById("menu");
  const hamburger = document.getElementById("hamburger");

  // Toggle tampilan menu
  menu.style.display = (menu.style.display === "block") ? "none" : "block";

  // Animasi hamburger: buka/tutup dengan efek rotasi
  hamburger.classList.toggle("open");
}