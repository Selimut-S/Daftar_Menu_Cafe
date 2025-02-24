const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let index = 0;
let startX = 0;
let isDragging = false;

function showSlide(i) {
    index += i;
    if (index < 0) {
        index = images.length - 1;
    } else if (index >= images.length) {
        index = 0;
    }
    slides.style.transition = 'opacity 0.5s';
    slides.style.opacity = 0;
    setTimeout(() => {
        slides.style.transform = `translateX(${-index * 100}%)`;
        slides.style.opacity = 1;
    }, 500);
}

prevButton.addEventListener('click', () => showSlide(-1));
nextButton.addEventListener('click', () => showSlide(1));

// Touch events
slides.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

slides.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            showSlide(1);
        } else {
            showSlide(-1);
        }
        isDragging = false;
    }
});

slides.addEventListener('touchend', () => {
    isDragging = false;
});

// Mouse events
slides.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
});

slides.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = startX - currentX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            showSlide(1);
        } else {
            showSlide(-1);
        }
        isDragging = false;
    }
});

slides.addEventListener('mouseup', () => {
    isDragging = false;
});

slides.addEventListener('mouseleave', () => {
    isDragging = false;
});