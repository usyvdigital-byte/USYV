// Ensure GSAP and ScrollTrigger are registered
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        once: true, // Only animate once
        mirror: false, // Do not animate on scroll out/in
    });

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetElement.offsetTop - 80, // Offset for fixed header
                        autoKill: false
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });

    // Hero Section Animations (GSAP)
    gsap.from(".hero-text-animate-1", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out"
    });
    gsap.from(".hero-text-animate-2", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.8,
        ease: "power3.out"
    });
    gsap.from(".hero-text-animate-3", {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        delay: 1.2,
        ease: "back.out(1.7)"
    });

    // Scroll Progress Bar
    gsap.to("#scroll-progress", {
        scaleX: 1,
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
        }
    });

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
    });

    closeMobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
    });

    mobileMenu.querySelectorAll('a.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
    });


    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        let isValid = true;

        // Reset errors
        nameError.classList.add('hidden');
        emailError.classList.add('hidden');
        messageError.classList.add('hidden');
        formSuccess.classList.add('hidden');
        formError.classList.add('hidden');

        // Name validation
        if (nameInput.value.trim() === '') {
            nameError.classList.remove('hidden');
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.classList.remove('hidden');
            isValid = false;
        }

        // Message validation
        if (messageInput.value.trim() === '') {
            messageError.classList.remove('hidden');
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission (replace with actual backend integration later)
            console.log('Form submitted:', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });

            // Here you would typically send data to a backend (e.g., using fetch API)
            // Example:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nameInput.value,
                    email: emailInput.value,
                    message: messageInput.value
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    formSuccess.classList.remove('hidden');
                    contactForm.reset(); // Clear form
                } else {
                    formError.classList.remove('hidden');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                formError.classList.remove('hidden');
            });
            */

            // For now, just show success and clear form
            formSuccess.classList.remove('hidden');
            contactForm.reset(); // Clear form
        }
    });
});