document.addEventListener('DOMContentLoaded', () => {

            // --- ANIMATED CURSOR SCRIPT ---
            const cursorDot = document.querySelector('.cursor-dot');
            const cursorOutline = document.querySelector('.cursor-outline');
            const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .hobby-card, .timeline-item, .service-card');

            window.addEventListener('mousemove', (e) => {
                const posX = e.clientX;
                const posY = e.clientY;
                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;
                cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 300, fill: "forwards" });
            });

            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovered'));
                el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovered'));
            });

            // --- SCROLL FADE-IN ANIMATION SCRIPT ---
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            const fadeInElements = document.querySelectorAll('.fade-in');
            fadeInElements.forEach(el => observer.observe(el));

            // --- ACTIVE NAV LINK ON SCROLL ---
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            window.addEventListener('scroll', () => {
                let current = 'home';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (pageYOffset >= sectionTop - 75) {
                        current = section.getAttribute('id');
                    }
                });
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            });

            // --- DARK/LIGHT MODE TOGGLE ---
            const themeToggleBtns = document.querySelectorAll('#theme-toggle, #mobile-theme-toggle');
            const themeIcon = document.querySelector('#theme-toggle i');
            const mobileThemeIcon = document.querySelector('#mobile-theme-toggle i');

            const enableDarkMode = () => {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                if (themeIcon) themeIcon.className = 'fas fa-moon';
                if (mobileThemeIcon) mobileThemeIcon.className = 'fas fa-moon';
            };

            const disableDarkMode = () => {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
                if (themeIcon) themeIcon.className = 'fas fa-sun';
                if (mobileThemeIcon) mobileThemeIcon.className = 'fas fa-sun';
            };

            // Check for saved theme preference or system preference
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }

            themeToggleBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (document.body.classList.contains('dark-mode')) {
                        disableDarkMode();
                    } else {
                        enableDarkMode();
                    }
                });
            });

            // --- HERO H1 TEXT ANIMATION ---
            const h1 = document.querySelector('#home h1');
            const originalText = "Hi, I’m Htoo Aung Hlaing Win — Aspiring Front-End Developer.";
            h1.innerHTML = ''; // Clear existing text

            originalText.split(' ').forEach((word, wordIndex) => {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'h1-word';

                word.split('').forEach((char, charIndex) => {
                    const charSpan = document.createElement('span');
                    charSpan.className = 'char';
                    charSpan.textContent = char;
                    charSpan.style.transitionDelay = `${(wordIndex * 100) + (charIndex * 20)}ms`;
                    wordSpan.appendChild(charSpan);
                });

                h1.appendChild(wordSpan);
                h1.appendChild(document.createTextNode(' ')); // Add space between words
            });

            // --- RESPONSIVE NAV TOGGLE ---
            const navUl = document.querySelector('nav ul');
            const mobileToggle = document.querySelector('#mobile-theme-toggle');

            function handleResize() {
                if (window.innerWidth <= 768) {
                    if (navUl) navUl.style.display = 'none';
                    if (mobileToggle) mobileToggle.style.display = 'block';
                } else {
                    if (navUl) navUl.style.display = 'flex';
                    if (mobileToggle) mobileToggle.style.display = 'none';
                }
            }
            handleResize();
            window.addEventListener('resize', handleResize);

        });