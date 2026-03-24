// Cyber-Noir Interactivity Engine
document.addEventListener('DOMContentLoaded', () => {

    // 1. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Preference Check
    const savedTheme = localStorage.getItem('cyber-theme') || 'dark-mode';
    body.classList.add(savedTheme);

    themeToggle.addEventListener('click', () => {
        // Smooth transition effect handled by CSS
        if (body.classList.contains('dark-mode')) {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('cyber-theme', 'light-mode');
        } else {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('cyber-theme', 'dark-mode');
        }
    });

    // 3. Lightweight Reveal Logic (IntersectionObserver)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 4. Premium Text Reveal (Staggered words)
    const staggerText = (element) => {
        const words = element.innerText.split(' ');
        element.innerHTML = '';
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.innerHTML = word + '&nbsp;';
            span.className = 'text-slide-up';
            span.style.animationDelay = `${index * 0.1}s`;
            element.appendChild(span);
        });
    };

    document.querySelectorAll('h1:not(.no-stagger), h2:not(.no-stagger)').forEach(staggerText);

    // Mobile Menu Toggle (3-span Hamburger)
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            menuToggle.classList.toggle('toggle-animation');
        });
        
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                menuToggle.classList.remove('toggle-animation');
            });
        });
    }

    // 3. Navbar Background Opacity on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // 2. Smooth Anchor Scrolling (Safari Fix)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 6. Hero Portrait Specific Reveal
    const heroPortrait = document.querySelector('.portrait-frame');
    if (heroPortrait) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroPortrait.classList.add('revealed');
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        heroObserver.observe(heroPortrait);
    }
});