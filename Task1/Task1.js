// Global variables
let counter = 0;
let currentImageIndex = 0;
let isDarkTheme = false;

// Image gallery array
const galleryImages = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=150&fit=crop',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=150&fit=crop',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=200&h=150&fit=crop',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=200&h=150&fit=crop'
];

// Color palette for background changes
const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
];

let currentColorIndex = 0;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('Creative Learning Hub loaded successfully! 🚀');
    
    // Initialize typing effect
    initTypingEffect();
    
    // Add scroll animations
    initScrollAnimations();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Add particle effect to hero section
    createParticles();
});

// Welcome Alert Function (Main requirement)
function showWelcomeAlert() {
    const messages = [
        "Hello there! 👋 Welcome to my first web development project!",
        "Thanks for visiting! 🎉 This project showcases HTML, CSS, and JavaScript skills!",
        "Welcome to the Creative Learning Hub! 🌟 Hope you enjoy exploring!",
        "Hello! 🚀 Ready to dive into the world of web development?",
        "Welcome aboard! 🎨 Let's create something amazing together!"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    alert(randomMessage);
}

// Theme Toggle Function
function toggleTheme() {
    const body = document.body;
    const themeButton = document.querySelector('.btn-secondary i');
    
    isDarkTheme = !isDarkTheme;
    
    if (isDarkTheme) {
        body.classList.add('dark-theme');
        themeButton.className = 'fas fa-sun';
        showNotification('Dark theme activated! 🌙', 'success');
    } else {
        body.classList.remove('dark-theme');
        themeButton.className = 'fas fa-moon';
        showNotification('Light theme activated! ☀️', 'success');
    }
}

// Background Color Changer
function changeBackgroundColor() {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    const body = document.body;
    
    // Don't change if dark theme is active
    if (!isDarkTheme) {
        body.style.background = colors[currentColorIndex];
        showNotification('Background color changed! 🎨', 'info');
    } else {
        showNotification('Please switch to light theme first! 🌙', 'warning');
    }
}

// Counter Functions
function incrementCounter() {
    counter++;
    updateCounterDisplay();
    addCounterAnimation();
}

function decrementCounter() {
    counter--;
    updateCounterDisplay();
    addCounterAnimation();
}

function resetCounter() {
    counter = 0;
    updateCounterDisplay();
    showNotification('Counter reset to zero! 🔄', 'info');
}

function updateCounterDisplay() {
    const counterElement = document.getElementById('counter');
    if (counterElement) {
        counterElement.textContent = counter;
    }
}

function addCounterAnimation() {
    const counterElement = document.getElementById('counter');
    if (counterElement) {
        counterElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            counterElement.style.transform = 'scale(1)';
        }, 200);
    }
}

// Text Animation Function
function animateText() {
    const textElement = document.getElementById('animated-text');
    if (textElement) {
        textElement.classList.add('animated-text');
        
        // Change text content
        const animations = [
            '✨ Amazing animation! ✨',
            '🎉 Interactive features! 🎉',
            '🚀 JavaScript is awesome! 🚀',
            '💫 Smooth transitions! 💫',
            '🌟 Creative coding! 🌟'
        ];
        
        const randomText = animations[Math.floor(Math.random() * animations.length)];
        textElement.textContent = randomText;
        
        // Remove animation class after animation completes
        setTimeout(() => {
            textElement.classList.remove('animated-text');
        }, 500);
        
        showNotification('Text animated! ✨', 'success');
    }
}

// Image Gallery Functions
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateGalleryImage();
}

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGalleryImage();
}

function updateGalleryImage() {
    const imageElement = document.getElementById('gallery-image');
    if (imageElement) {
        // Add fade out effect
        imageElement.style.opacity = '0';
        
        setTimeout(() => {
            imageElement.src = galleryImages[currentImageIndex];
            imageElement.style.opacity = '1';
        }, 200);
        
        showNotification(`Image ${currentImageIndex + 1} of ${galleryImages.length} 📸`, 'info');
    }
}

// Form Handling
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && message) {
        showNotification(`Thank you ${name}! Your message has been sent! 📧`, 'success');
        
        // Reset form
        event.target.reset();
        
        // Simulate form submission
        setTimeout(() => {
            showNotification('Message delivered successfully! ✨', 'success');
        }, 1000);
    } else {
        showNotification('Please fill in all fields! ⚠️', 'error');
    }
}

// Social Media Alert
function showSocialAlert(platform) {
    const messages = {
        'GitHub': 'Check out my projects on GitHub! 🐙',
        'LinkedIn': 'Connect with me on LinkedIn! 💼',
        'Twitter': 'Follow me on Twitter for updates! 🐦'
    };
    
    alert(messages[platform] || `Visit my ${platform} profile!`);
}

// Typing Effect
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const texts = [
            'HTML',
            'CSS', 
            'JavaScript',
            'Web Development'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = 100;
            
            if (isDeleting) {
                typeSpeed /= 2;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before next word
            }
            
            setTimeout(type, typeSpeed);
        }
        
        type();
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00b894' : type === 'error' ? '#e74c3c' : type === 'warning' ? '#f39c12' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Particle Effect
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        hero.appendChild(particle);
    }
}

// Add CSS for particles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content button {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-content button:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(particleStyle);

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + K to change background color
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        changeBackgroundColor();
    }
    
    // Ctrl/Cmd + T to toggle theme
    if ((event.ctrlKey || event.metaKey) && event.key === 't') {
        event.preventDefault();
        toggleTheme();
    }
    
    // Spacebar to show welcome alert
    if (event.code === 'Space' && event.target === document.body) {
        event.preventDefault();
        showWelcomeAlert();
    }
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(event) {
    konamiCode.push(event.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('🎉 Konami Code activated! You found the easter egg! 🎮', 'success');
        // Add some fun effects
        document.body.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
        konamiCode = [];
    }
});

// Add shake animation for easter egg
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(shakeStyle);

// Performance optimization - Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Add any scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

console.log('🎉 All JavaScript features loaded successfully!');
console.log('💡 Try these keyboard shortcuts:');
console.log('   - Ctrl/Cmd + K: Change background color');
console.log('   - Ctrl/Cmd + T: Toggle theme');
console.log('   - Spacebar: Show welcome alert');
console.log('   - Konami Code: Find the easter egg!'); 
