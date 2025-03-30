document.addEventListener('DOMContentLoaded', function() {
    // Declare all variables once
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    const header = document.querySelector('.header');
    const contactForm = document.getElementById('contactForm');
    const textAnimation = document.querySelector('.text-animation span');

    // Menu toggle with null check
    if (menuIcon) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        };
    }

    // Close navbar when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar) navbar.classList.remove('active');
            if (menuIcon) menuIcon.classList.remove('bx-x');
        });
    });

    // Scroll handler
    window.onscroll = () => {
        // Sticky header
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 100);
        }

        // Section highlighting
        sections.forEach(sec => {
            const top = window.scrollY;
            const offset = sec.offsetTop - 150;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const targetLink = document.querySelector(`header nav a[href*="${id}"]`);
                    if (targetLink) targetLink.classList.add('active');
                });
            }
        });
    };

    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (!submitBtn) return;

            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            })
            .then(response => response.ok ? 
                (alert('Message sent!'), contactForm.reset()) : 
                Promise.reject('Failed to send'))
            .catch(error => {
                alert('Error sending message. Please try again or email directly.');
                console.error('Error:', error);
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    
});
