// GSAP animation removed. Using Intersection Observer + CSS for animations now.
// Intersection Observer for scroll-based animations

document.addEventListener('DOMContentLoaded', () => {
  // Elements to animate
  const animatedEls = [
    ...document.querySelectorAll('main section'),
    ...document.querySelectorAll('.portfolio-item'),
    ...document.querySelectorAll('.skill-category'),
    ...document.querySelectorAll('h2, h3, .btn, img, .skill-item, .contact-item')
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add('animate-in');
        // Animate children with .stagger-animate class
        const children = el.querySelectorAll('.stagger-animate');
        children.forEach((child, idx) => {
          setTimeout(() => child.classList.add('animate-in'), idx * 100);
        });
      } else {
        el.classList.remove('animate-in');
        // Remove animation from children
        const children = el.querySelectorAll('.stagger-animate');
        children.forEach(child => child.classList.remove('animate-in'));
      }
    });
  }, {
    threshold: 0.15
  });

  animatedEls.forEach(el => {
    el.classList.add('pre-animate'); // initial state
    // Also set pre-animate for children
    el.querySelectorAll('.stagger-animate').forEach(child => child.classList.add('pre-animate'));
    observer.observe(el);
  });

  // 5. Animate nav links on load
  gsap.from('.nav-links li', {
    opacity: 0,
    y: -20,
    duration: 0.6,
    stagger: 0.08,
    ease: 'power2.out',
    delay: 0.2
  });

  // 6. Animate mobile menu open/close
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        gsap.fromTo(navLinks, {x: '-100%'}, {x: '0%', duration: 0.4, ease: 'power2.out'});
      } else {
        gsap.to(navLinks, {x: '-100%', duration: 0.4, ease: 'power2.in'});
      }
    });
  }

  // 7. Animate modal open/close
  const modal = document.getElementById('project-modal');
  if (modal) {
    const observer = new MutationObserver(() => {
      if (modal.classList.contains('show')) {
        gsap.fromTo('.modal-content', {scale: 0.9, opacity: 0}, {scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out'});
      }
    });
    observer.observe(modal, {attributes: true, attributeFilter: ['class']});
  }

  // 8. Animate footer
  gsap.from('footer .footer-content > .footer-column', {
    opacity: 0,
    y: 40,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: 'footer',
      start: 'top 90%',
      toggleActions: 'play none none none'
    }
  });
});