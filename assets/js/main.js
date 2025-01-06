// Gestion du loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        loader.style.display = 'none';
    }
});

// Gestion de la navbar au scroll
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');

    // Animation de la navbar au scroll
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Vérifier le scroll initial
    handleScroll();

    // Écouter l'événement de scroll
    window.addEventListener('scroll', handleScroll);

    // Gestion du menu mobile
    const navItems = document.querySelectorAll('.nav-item');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Animation des éléments du menu
    navbarCollapse.addEventListener('show.bs.collapse', () => {
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
            }, (index + 1) * 200); // Retour à 200ms
        });
    });

    navbarCollapse.addEventListener('hide.bs.collapse', () => {
        navItems.forEach(item => {
            item.style.transform = 'translateX(-10px)';
            item.style.opacity = '0';
            item.style.transition = 'all 0.5s ease-in-out'; // Retour à 0.5s
        });
    });

    // Réinitialisation des styles lors de la fermeture
    navbarCollapse.addEventListener('hidden.bs.collapse', () => {
        navItems.forEach(item => {
            item.style.transition = 'none';
            item.style.transform = 'translateX(-10px)';
            item.style.opacity = '0';
            // Force le reflow pour réactiver les transitions
            item.offsetHeight;
            item.style.transition = 'all 0.5s ease-in-out'; // Retour à 0.5s
        });
    });

    // Fermeture du menu mobile quand on clique sur un lien
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('navbarSupportedContent');
    const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});
    
    navLinks.forEach((l) => {
        l.addEventListener('click', () => {
            if (menuToggle.classList.contains('show')) {
                bsCollapse.toggle();
            }
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const heroImage = document.querySelector('.hero-image img');
        const scrolled = window.pageYOffset;
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `scale(1.1) translateY(${scrolled * 0.4}px)`;
        }
    });

    // Bouton retour en haut
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }

    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Gestion de la galerie d'images
    const galleryImages = document.querySelectorAll('.gallery-card img');
    const modalImage = document.getElementById('modalImage');
    const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            galleryModal.show();
        });
    });

    // Fermer la modale avec la touche Echap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            galleryModal.hide();
        }
    });

    // Galerie Modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            modalImage.src = imgSrc;
            modal.show();
        });
    });

    // Fermeture en cliquant n'importe où sur le modal
    document.getElementById('imageModal').addEventListener('click', function() {
        modal.hide();
    });

    // Configuration de Lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'showImageNumberLabel': false
    });

    // Animations GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Animation du hero
    gsap.from('.hero__content h1', {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.hero__content p', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.3
    });

    // Animation des cartes
    gsap.utils.toArray('.gallery-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Smooth scroll pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - navbar.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
});
