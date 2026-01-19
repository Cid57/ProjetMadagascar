/**
 * ==========================================
 * HOME.JS - PAGE D'ACCUEIL
 * ==========================================
 *
 * Fichier: home.js
 * Description: Scripts spécifiques à la page d'accueil (index.html)
 * Auteur: Équipe Développement Madagascar Tourisme
 * Version: 1.0.0
 *
 * Fonctionnalités:
 * - Initialisation du Swiper pour la galerie mobile
 * - Affichage de l'heure actuelle à Madagascar
 * - Gestion des interactions spécifiques
 * ==========================================
 */

(function() {
    'use strict';

    const homePage = {
        /**
         * Initialiser le Swiper pour la galerie mobile
         */
        initGallerySwiper: function() {
            const swiperElement = document.querySelector('.gallery-swiper');

            if (!swiperElement || typeof Swiper === 'undefined') {
                console.log('ℹ️ Swiper non disponible ou élément non trouvé');
                return;
            }

            const gallerySwiper = new Swiper('.gallery-swiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    }
                }
            });

            console.log('✅ Gallery Swiper initialisé');
        },

        /**
         * Afficher l'heure actuelle à Madagascar (UTC+3)
         */
        displayMadagascarTime: function() {
            const timeElement = document.getElementById('currentTime');

            if (!timeElement) return;

            const updateTime = () => {
                const now = new Date();

                // Obtenir l'heure UTC
                const utcHours = now.getUTCHours();
                const utcMinutes = now.getUTCMinutes();

                // Ajouter 3 heures pour Madagascar (UTC+3)
                let madagascarHours = utcHours + 3;

                // Gérer le passage à minuit
                if (madagascarHours >= 24) {
                    madagascarHours -= 24;
                }

                // Formater avec des zéros devant si nécessaire
                const hoursStr = madagascarHours.toString().padStart(2, '0');
                const minutesStr = utcMinutes.toString().padStart(2, '0');

                timeElement.textContent = `${hoursStr}:${minutesStr}`;
            };

            // Mettre à jour immédiatement
            updateTime();

            // Mettre à jour toutes les secondes
            setInterval(updateTime, 1000);

            console.log('✅ Horloge Madagascar initialisée');
        },

        /**
         * Initialiser le carousel Bootstrap (témoignages)
         */
        initTestimonialsCarousel: function() {
            const carouselElement = document.getElementById('testimonialCarousel');

            if (!carouselElement) {
                console.log('ℹ️ Carousel de témoignages non trouvé');
                return;
            }

            // Le carousel Bootstrap s'initialise automatiquement
            // mais on peut ajouter des options personnalisées si nécessaire

            console.log('✅ Carousel de témoignages initialisé');
        },

        /**
         * Gérer le formulaire de newsletter
         */
        handleNewsletterForm: function() {
            const forms = document.querySelectorAll('.newsletter-form');

            forms.forEach(form => {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();

                    const emailInput = form.querySelector('input[type="email"]');
                    const email = emailInput?.value;

                    if (email) {
                        // Simulation d'envoi (à remplacer par un vrai appel API)
                        console.log('📧 Inscription newsletter:', email);

                        // Afficher un message de succès
                        alert('Merci pour votre inscription ! Vous recevrez bientôt nos dernières actualités.');

                        // Réinitialiser le formulaire
                        form.reset();
                    }
                });
            });

            if (forms.length > 0) {
                console.log('✅ Formulaires newsletter initialisés');
            }
        },

        /**
         * Ajouter un effet parallax (Contenu + Image)
         */
        initParallaxEffect: function() {
            const heroContent = document.querySelector('.hero__content');
            const heroImage = document.querySelector('.hero-image');

            if (!heroContent) return;

            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                
                // Optimisation : ne pas animer si hors champ
                if (scrolled > window.innerHeight) return;

                // Parallax sur le texte (monte moins vite que le scroll)
                // et fondu progressif
                heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
                heroContent.style.opacity = 1 - (scrolled / 600);

                // Parallax sur l'image (pour simuler le background-attachment: fixed)
                // L'image descend à moitié de la vitesse du scroll
                if (heroImage) {
                    heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            });

            console.log('✅ Effet parallax initialisé');
        },

        /**
         * Initialiser le bouton de défilement vers le bas
         */
        initScrollDown: function() {
            const scrollBtn = document.querySelector('.scroll-down');
            
            if (scrollBtn) {
                scrollBtn.addEventListener('click', () => {
                    const nextSection = document.querySelector('#destinations') || document.querySelector('section:nth-of-type(2)');
                    
                    if (nextSection) {
                        const offsetTop = nextSection.offsetTop - 80; // Compenser la navbar
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
                console.log('✅ Scroll Down initialisé');
            }
        },

        /**
         * Initialiser la page d'accueil
         */
        init: function() {
            // Vérifier qu'on est bien sur la page d'accueil
            if (!document.querySelector('.hero')) {
                console.log('ℹ️ Page d\'accueil non détectée');
                return;
            }

            console.log('🏠 Initialisation de la page d\'accueil...');

            this.initGallerySwiper();
            this.displayMadagascarTime();
            this.initTestimonialsCarousel();
            this.handleNewsletterForm();
            this.initParallaxEffect();
            this.initScrollDown();

            console.log('✅ Page d\'accueil initialisée');
        }
    };

    // Initialiser quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => homePage.init());
    } else {
        homePage.init();
    }

})();
