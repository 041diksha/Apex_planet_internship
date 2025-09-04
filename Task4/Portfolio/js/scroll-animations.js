// Scroll reveal animations
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    reset: true
});

sr.reveal('.hero-content, .about-image', { origin: 'left' });
sr.reveal('.hero-image, .about-text', { origin: 'right' });
sr.reveal('.section-title, .skills-container, .portfolio-grid, .contact-container', { origin: 'bottom' });

// Active nav link on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if(pageYOffset >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav ul li a').forEach(a => {
        a.classList.remove('active');
        if(a.getAttribute('href') === `#${current}`) {
            a.classList.add('active');
        }
    });
});

