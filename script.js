    /**
     * script.js - Enhanced Interactive & Visual Effects for Portfolio Website
     */

    document.addEventListener('DOMContentLoaded', () => {

    // ===============================================================
    // 1. Interactive Mouse Glow / Cursor Spotlight Effect
    // ===============================================================
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    glow.style.cssText = `
        position: fixed;
        width: 350px;
        height: 350px;
        background: radial-gradient(circle, rgba(160, 172, 185, 0.12) 0%, rgba(0,0,0,0) 70%);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        z-index: 9999;
    `;
    document.body.appendChild(glow);

    window.addEventListener('mousemove', (e) => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });


    // ===============================================================
    // 2. Dynamic Sticky Navbar (Background Blur & Elevation on Scroll)
    // ===============================================================
    const header = document.querySelector('header');
    if (header) {
        header.style.transition = 'all 0.3s ease';
        window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.boxShadow = 'none';
            header.style.backdropFilter = 'none';
        }
        });
    }


    // ===============================================================
    // 3. Smooth Scroll Fade-In & Slide-Up (IntersectionObserver)
    // ===============================================================
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
        });
    }, observerOptions);

    const targetElements = document.querySelectorAll(
        '.about-content, .about-image, .timeline-item, .skill-item, .grid-3-col > div'
    );

    targetElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        revealOnScroll.observe(el);
    });


    // ===============================================================
    // 4. Typing Effect (Text Typewriter) pada Teks Header
    // ===============================================================
    const greetingElem = document.querySelector('.komen');
    if (greetingElem) {
        const originalText = greetingElem.textContent.trim();
        greetingElem.textContent = '';
        let charIndex = 0;

        function typeWriter() {
        if (charIndex < originalText.length) {
            greetingElem.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 70);
        }
        }
        setTimeout(typeWriter, 300);
    }


    // ===============================================================
    // 5. Interactive 3D Tilt Effect pada Foto Profil
    // ===============================================================
    const profileImg = document.querySelector('.about-image img');
    if (profileImg) {
        profileImg.style.transition = 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), filter 0.5s ease';

        profileImg.addEventListener('mousemove', (e) => {
        const rect = profileImg.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotateX = (-y / rect.height) * 16;
        const rotateY = (x / rect.width) * 16;

        profileImg.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        profileImg.addEventListener('mouseleave', () => {
        profileImg.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }


    // ===============================================================
    // 6. Click Ripple Effect pada Button & CTA Link
    // ===============================================================
    const clickables = document.querySelectorAll('button, .btn-underline, nav a');

    clickables.forEach(btn => {
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';

        btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const circle = document.createElement('span');
        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.style.position = 'absolute';
        circle.style.borderRadius = '50%';
        circle.style.background = 'rgba(255, 255, 255, 0.3)';
        circle.style.transform = 'scale(0)';
        circle.style.animation = 'ripple-animation 0.6s linear';
        circle.style.pointerEvents = 'none';

        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) existingRipple.remove();

        circle.classList.add('ripple');
        this.appendChild(circle);
        });
    });

    // Inject CSS Keyframe untuk animasi Ripple
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
        @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
        }
    `;
    document.head.appendChild(styleSheet);


    // ===============================================================
    // 7. Interactive Focus Animation pada Form Input & Textarea
    // ===============================================================
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.style.transition = 'transform 0.2s ease, border-color 0.3s ease, box-shadow 0.3s ease';

        input.addEventListener('focus', () => {
        input.style.transform = 'scale(1.01)';
        });
        input.addEventListener('blur', () => {
        input.style.transform = 'scale(1)';
        });
    });


    // ===============================================================
    // 8. Hover Highlight & Magnetic Feel pada Skill & Timeline
    // ===============================================================
    const interactiveCards = document.querySelectorAll('.skill-item, .timeline-item');
    interactiveCards.forEach(card => {
        card.style.transition = 'transform 0.3s ease, opacity 0.8s ease';
        card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateX(6px)';
        });
        card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateX(0)';
        });
    });


    // ===============================================================
    // 9. Floating Ambient Particles Canvas Background
    // ===============================================================
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-particles';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.4;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.5 + 0.1;
        }

        update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
        ctx.fillStyle = `rgba(160, 172, 185, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        }
    }

    for (let i = 0; i < 35; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
        p.update();
        p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    });