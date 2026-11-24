/* ==========================================
   IDG Loy Krathong 2026 - JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ---- Create Floating Lanterns ----
    createLanterns();

    // ---- Create Floating Flowers ----
    createFlowers();

    // ---- Navbar Scroll ----
    initNavbar();

    // ---- Mobile Menu ----
    initMobileMenu();

    // ---- Countdown Timer ----
    initCountdown();

    // ---- Scroll Animations (AOS-like) ----
    initScrollAnimations();

    // ---- Score Bar Animations ----
    initScoreBars();

    // ---- Active Nav Link ----
    initActiveNavLink();
});

// ---- Floating Lanterns ----
function createLanterns() {
    const container = document.getElementById('lanterns');
    const count = 15;

    for (let i = 0; i < count; i++) {
        const lantern = document.createElement('div');
        lantern.className = 'lantern';
        
        const size = Math.random() * 15 + 10;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 20;
        const drift = (Math.random() - 0.5) * 200;

        lantern.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            --drift: ${drift}px;
        `;

        container.appendChild(lantern);
    }
}

// ---- Floating Flowers ----
function createFlowers() {
    const container = document.getElementById('flowers');
    const flowers = ['🪷', '🌸', '🌺', '✨', '🕯️'];
    const count = 10;

    for (let i = 0; i < count; i++) {
        const flower = document.createElement('div');
        flower.className = 'floating-flower';
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];

        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 25;
        const size = Math.random() * 15 + 12;

        flower.style.cssText = `
            left: ${left}%;
            font-size: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;

        container.appendChild(flower);
    }
}

// ---- Navbar ----
function initNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ---- Mobile Menu ----
function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        });
    });
}

// ---- Countdown Timer ----
function initCountdown() {
    // Event date: November 24, 2026, 15:00 Bangkok time (UTC+7)
    const eventDate = new Date('2026-11-24T15:00:00+07:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = eventDate - now;

        if (diff <= 0) {
            document.getElementById('days').textContent = '🎉';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            document.querySelector('.countdown-label').textContent = 'งานเริ่มแล้ว!';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ---- Scroll Animations ----
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// ---- Score Bars ----
function initScoreBars() {
    const scoreFills = document.querySelectorAll('.score-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
            }
        });
    }, { threshold: 0.5 });

    scoreFills.forEach(fill => observer.observe(fill));
}

// ---- Active Nav Link ----
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}
