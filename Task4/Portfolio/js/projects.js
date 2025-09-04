// Project data
const projects = [
    {
        id: 1,
        title: "Image Generator",
        subtitle: "Web-based Image Search Tool",
        date: "Feb 18th - July 21st, 2024",
        image: "assets/projects/image3.svg",
        description: "A web-based tool that allows users to search and download high-quality images using the Unsplash API. The platform provides an intuitive interface for users to explore a vast collection of images with real-time search functionality and responsive design.",
        technologies: ["HTML", "CSS", "JavaScript", "Unsplash API"],
        features: [
            "User-friendly search interface",
            "Real-time image retrieval from Unsplash API",
            "Ability to download and save images",
            "Responsive design for seamless experience",
            "High-quality image collection"
        ]
    },
    {
        id: 2,
        title: "TravelQuest",
        subtitle: "AI-Powered Travel Planning Website",
        date: "Oct 24th - Dec 27th, 2024",
        image: "assets/projects/travelquest.png",
        description: "An intelligent travel planning website that offers personalized itineraries based on user preferences, integrating AI and real-time data for an optimized travel experience. Features include AI-powered chatbot assistance, real-time API integrations, and machine learning predictions.",
        technologies: ["HTML", "CSS", "JavaScript", "Node.js (Express)", "Google Maps API", "OpenWeather API", "Eventbrite API"],
        features: [
            "AI-powered chatbot for instant travel assistance",
            "Real-time integration with Google Maps, OpenWeather, and Eventbrite APIs",
            "Machine learning predictions for optimized routes and travel plans",
            "Personalized travel itineraries",
            "Intelligent route optimization"
        ]
    },
    {
        id: 3,
        title: "DoubtSlayer",
        subtitle: "AI Chatbot for Overcoming Self-Doubt",
        date: "2024",
        image: "assets/projects/image2.svg",
        description: "An AI-based chatbot that helps users overcome self-doubt by responding with aggressive motivation, cognitive reframing, or realism depending on the input. The bot is trained using a custom fine-tuned T5 model on motivational and psychology-related prompts. It also supports features like PDF summarization, quiz generation, and question answering.",
        technologies: ["Python", "PyTorch", "MongoDB", "Cohere API", "Flask", "JSON"],
        features: [
            "AI-based chatbot for motivation and psychology support",
            "Custom fine-tuned T5 model training",
            "PDF summarization capabilities",
            "Quiz generation functionality",
            "Question answering system",
            "User interaction history storage"
        ]
    }
];

// Modal functionality
const modal = document.getElementById('project-modal');
const modalContent = document.querySelector('.modal-body');
const closeBtn = document.querySelector('.close-modal');
closeBtn.setAttribute('aria-label', 'Close modal');
const viewButtons = document.querySelectorAll('.view-details');

// Focus trap for modal accessibility
function trapFocus(element) {
    const focusableEls = element.querySelectorAll('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) { // shift + tab
                if (document.activeElement === firstFocusableEl) {
                    e.preventDefault();
                    lastFocusableEl.focus();
                }
            } else { // tab
                if (document.activeElement === lastFocusableEl) {
                    e.preventDefault();
                    firstFocusableEl.focus();
                }
            }
        }
    });
}

viewButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = parseInt(button.getAttribute('data-project'));
        const project = projects.find(p => p.id === projectId);
        
        if (project) {
            // Build modal content
            let html = `
                <img src="${project.image}" alt="${project.title}" class="modal-image">
                <h2 class="modal-title">${project.title}</h2>
                <span class="modal-subtitle">${project.subtitle}</span>
                <span class="modal-date">${project.date}</span>
                
                <div class="modal-description">
                    <p>${project.description}</p>
                    ${project.collaboration ? `<p><strong>Collaboration:</strong> ${project.collaboration}</p>` : ''}
                </div>
                
                <div class="modal-tech">
                    <h3>Technologies Used</h3>
                    <ul>
                        ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-features">
                    <h3>Key Features</h3>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            modalContent.innerHTML = html;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            // Trap focus
            setTimeout(() => {
                trapFocus(modal);
                closeBtn.focus();
            }, 100);
        }
    });
});

// Close modal
closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// Close when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Close with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});