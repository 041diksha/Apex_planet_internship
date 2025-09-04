// Form Submission with Formspree
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Use the same Formspree endpoint as in index.html
    contactForm.setAttribute('action', 'https://formspree.io/f/mldwpooe');
    contactForm.setAttribute('method', 'POST');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate form
        const name = this.elements['name'].value.trim();
        const email = this.elements['email'].value.trim();
        const message = this.elements['message'].value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all required fields');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you! Your message has been sent successfully.</p>
                `;
                const successContainer = document.getElementById('form-success-container');
                if (successContainer) {
                    successContainer.innerHTML = '';
                    successContainer.appendChild(successMsg);
                } else {
                    this.parentNode.insertBefore(successMsg, this.nextSibling);
                }

                // Reset form
                this.reset();

                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMsg.style.opacity = '0';
                    setTimeout(() => successMsg.remove(), 300);
                }, 5000);
            } else {
                // Show error from Formspree
                alert('Error: ' + (data.error || data.message || 'Form submission failed'));
                console.error('Formspree error:', data);
            }
        } catch (error) {
            alert('There was an error sending your message. Please check your internet connection or try again later.');
            console.error('Fetch error:', error);
            // Optionally, show error in the form-success-container
            const errorContainer = document.getElementById('form-success-container');
            if (errorContainer) {
                errorContainer.innerHTML = '<div class="form-success" style="color:#ff6b6b;"><i class="fas fa-times-circle"></i> <p>Failed to send message. Please try again later.</p></div>';
                setTimeout(() => {
                    errorContainer.innerHTML = '';
                }, 5000);
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span class="btn-text">Send Message</span><span class="btn-icon"><i class="fas fa-paper-plane"></i></span>';
        }
    });
}
