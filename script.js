// Menu toggle functionality
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section'); // Fixed to querySelectorAll
let navLinks = document.querySelectorAll('header nav a'); // Fixed to querySelectorAll


// Close navbar when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    });
});

// Smooth scrolling and active section highlighting
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector(`header nav a[href*="${id}"]`).classList.add('active');
            });
        }
    });
    
    // Sticky header
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);
};

// Smooth scrolling and active section highlighting
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector(`header nav a[href*="${id}"]`).classList.add('active');
            });
        }
    });
};

// Mobile menu toggle
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Contact form handling with FormSubmit
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Collect form data
            const formData = new FormData(contactForm);
            
            // Send to FormSubmit
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Message sent successfully!');
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            })
            .catch(error => {
                alert('Error sending message. Please try again or email me directly.');
                console.error('Error:', error);
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});

// Text animation (if you have this functionality)
const textAnimation = document.querySelector('.text-animation span');
if (textAnimation) {
    const professions = ["Software Developer", "Data Analyst", "UI/UX Designer", "Web Developer"];
    let currentIndex = 0;
    
    function updateProfession() {
        textAnimation.textContent = professions[currentIndex];
        currentIndex = (currentIndex + 1) % professions.length;
    }
    
    setInterval(updateProfession, 2000); // Change every 2 seconds
}