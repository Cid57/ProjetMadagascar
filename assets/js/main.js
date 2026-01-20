/**
 * ==========================================
 * MAIN.JS - SCRIPT PRINCIPAL
 * ==========================================
 *
 * Fichier: main.js
 * Description: Script principal du site - Fonctionnalités communes à toutes les pages
 * Auteur: Équipe Développement Madagascar Tourisme
 * Version: 1.0.0
 *
 * Fonctionnalités:
 * - Gestion du loader
 * - Bouton retour en haut
 * - Smooth scroll
 * - Gestion des animations au scroll
 * ==========================================
 */

(function() {
    'use strict';

    /**
     * ==========================================
     * 1. GESTION DU LOADER
     * ==========================================
     */
    const loader = {
        element: document.getElementById('loader'),

        /**
         * Masquer le loader après chargement complet de la page
         */
        hide: function() {
            if (this.element) {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        this.element.classList.add('hidden');
                        // Retirer complètement du DOM après la transition
                        setTimeout(() => {
                            this.element.style.display = 'none';
                        }, 500);
                    }, 300);
                });
            }
        },

        /**
         * Initialiser le loader
         */
        init: function() {
            this.hide();
        }
    };

    /**
     * ==========================================
     * 2. BOUTON RETOUR EN HAUT
     * ==========================================
     */
    const backToTop = {
        button: document.querySelector('.back-to-top'),
        scrollThreshold: 300,

        /**
         * Afficher/masquer le bouton selon le scroll
         */
        toggleVisibility: function() {
            if (window.pageYOffset > this.scrollThreshold) {
                this.button.classList.add('show');
            } else {
                this.button.classList.remove('show');
            }
        },

        /**
         * Remonter en haut de la page
         */
        scrollToTop: function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },

        /**
         * Initialiser le bouton
         */
        init: function() {
            if (!this.button) return;

            // Écouter le scroll
            window.addEventListener('scroll', () => {
                this.toggleVisibility();
            });

            // Écouter le clic
            this.button.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToTop();
            });
        }
    };

    /**
     * ==========================================
     * 3. SMOOTH SCROLL POUR LES ANCRES
     * ==========================================
     */
    const smoothScroll = {
        /**
         * Gérer le smooth scroll pour tous les liens d'ancre
         */
        init: function() {
            const links = document.querySelectorAll('a[href^="#"]');

            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');

                    // Ignorer les liens avec data-lightbox (galerie)
                    if (this.hasAttribute('data-lightbox')) {
                        return;
                    }

                    // Ignorer les liens vides ou juste "#"
                    if (href === '#' || href === '') {
                        e.preventDefault();
                        return;
                    }

                    const target = document.querySelector(href);

                    if (target) {
                        e.preventDefault();

                        const offsetTop = target.offsetTop - 80; // 80px pour la navbar

                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    };

    /**
     * ==========================================
     * 4. ANIMATION DES STATISTIQUES (COMPTEUR)
     * ==========================================
     */
    const statsCounter = {
        /**
         * Animer un nombre de 0 à sa valeur finale
         * @param {HTMLElement} element - L'élément à animer
         * @param {number} target - La valeur cible
         * @param {number} duration - Durée de l'animation en ms
         */
        animateValue: function(element, target, duration = 2000) {
            const start = 0;
            const increment = target / (duration / 16); // 60 FPS
            let current = start;

            const timer = setInterval(() => {
                current += increment;

                if (current >= target) {
                    element.textContent = Math.floor(target) + (element.dataset.suffix || '');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + (element.dataset.suffix || '');
                }
            }, 16);
        },

        /**
         * Observer pour détecter quand les stats entrent dans le viewport
         */
        init: function() {
            const statNumbers = document.querySelectorAll('.stat-number[data-value]');

            if (statNumbers.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                        entry.target.classList.add('counted');
                        const value = parseFloat(entry.target.dataset.value);
                        const suffix = entry.target.textContent.match(/[^0-9]/g)?.join('') || '';
                        entry.target.dataset.suffix = suffix;
                        this.animateValue(entry.target, value);
                    }
                });
            }, {
                threshold: 0.5
            });

            statNumbers.forEach(stat => observer.observe(stat));
        }
    };

    /**
     * ==========================================
     * 5. UTILITAIRES
     * ==========================================
     */
    const utils = {
        /**
         * Ajouter une classe active au lien de navigation actuel
         */
        highlightCurrentPage: function() {
            const currentLocation = window.location.pathname;
            const navLinks = document.querySelectorAll('.nav-link');

            navLinks.forEach(link => {
                const linkPath = link.getAttribute('href');

                // Vérifier si le lien correspond à la page actuelle
                if (currentLocation.endsWith(linkPath) ||
                    (currentLocation.endsWith('/') && linkPath === 'index.html')) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        },

        /**
         * Initialiser Lightbox si présent
         */
        initLightbox: function() {
            // Vérifier si Lightbox est chargé via jQuery
            if (typeof $ !== 'undefined' && $.fn.lightbox !== 'undefined') {
                console.log('✅ Lightbox détecté et prêt');
            } else if (typeof lightbox !== 'undefined') {
                lightbox.option({
                    'resizeDuration': 200,
                    'wrapAround': true,
                    'showImageNumberLabel': false,
                    'fadeDuration': 300,
                    'imageFadeDuration': 300
                });
                console.log('✅ Lightbox configuré');
            } else {
                console.warn('⚠️ Lightbox non détecté');
            }
        }
    };

    /**
     * ==========================================
     * 6. INITIALISATION GLOBALE
     * ==========================================
     */
    function init() {
        // Attendre que le DOM soit prêt
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeApp);
        } else {
            initializeApp();
        }
    }

    /**
     * Fonction principale d'initialisation
     */
    function initializeApp() {
        console.log('🌍 Madagascar Tourisme - Initialisation...');

        // Initialiser AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: false,
                mirror: false,
                offset: 100,
                disable: 'mobile'
            });
        }

        // Initialiser tous les modules
        loader.init();
        backToTop.init();
        smoothScroll.init();
        statsCounter.init();
        utils.highlightCurrentPage();
        utils.initLightbox();

        console.log('✅ Application initialisée avec succès');
    }

    // Démarrer l'application
    init();

})();
