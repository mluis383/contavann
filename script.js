document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. NAVBAR SCROLL EFFECT & ACTIVE SECTION HIGHLIGHT --- */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight seção ativa
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
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

    /* --- 2. CONTADORES ANIMADOS --- */
    const counters = document.querySelectorAll('.counter');
    let speed = 200;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Intersection Observer para disparar o contador quando visível
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startCounters();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    /* --- 3. BOTÃO VOLTAR AO TOPO --- */
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* --- 4. SCROLL REVEAL (EFEITOS DE ENTRADA SUAVE) --- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate(0, 0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        
        if (el.classList.contains('reveal-up')) el.style.transform = 'translateY(40px)';
        if (el.classList.contains('reveal-left')) el.style.transform = 'translateX(-40px)';
        if (el.classList.contains('reveal-right')) el.style.transform = 'translateX(40px)';

        revealObserver.observe(el);
    });
});