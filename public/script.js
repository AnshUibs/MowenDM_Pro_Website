document.addEventListener('DOMContentLoaded', function() {
    
    new Typed('.auto-type', {
        strings: ["Digital Marketer.", "Freelancer.", "Brand Promoter."],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#00f2ea" },
            shape: { type: "circle", stroke: { width: 0, color: "#000000" }, polygon: { nb_sides: 5 } },
            opacity: { value: 0.5, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.1, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: {
                grab: { distance: 140, line_opacity: 0.3 },
                bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                repulse: { distance: 200, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 }
            }
        },
        retina_detect: true
    });

    const scrollElements = document.querySelectorAll('.scroll-reveal');
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        formStatus.textContent = 'Sending...';
        formStatus.style.color = '#e0e0e0';

        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
            formStatus.style.color = '#00f2ea';
            contactForm.reset();
        })
        .catch((error) => {
            formStatus.textContent = 'An error occurred. Please try again later.';
            formStatus.style.color = '#ff6b6b';
            console.error('Error:', error);
        });
    });
});