AOS.init();  // Inisialisasi AOS

// Smooth Scroll
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Show More Button
document.getElementById('showMoreBtn').addEventListener('click', function() {
    var extraInfo = document.getElementById('extraInfo');
    if (extraInfo.style.display === 'none') {
        extraInfo.style.display = 'block';
        this.innerText = 'Show Less';
    } else {
        extraInfo.style.display = 'none';
        this.innerText = 'Show More';
    }
});

// Animasi Teks Bergerak
window.addEventListener('scroll', function() {
    const text = document.getElementById('movingText');
    if (window.scrollY > 100) {
        text.style.transform = 'translateX(100px)';
    } else {
        text.style.transform = 'translateX(0)';
    }
});
