/**
 * ==========================================
 * NAVBAR.JS - NAVIGATION
 * ==========================================
 *
 * Fichier: navbar.js
 * Description: Gestion de la barre de navigation
 * Auteur: Équipe Développement Madagascar Tourisme
 * Version: 1.0.0
 *
 * Fonctionnalités:
 * - Navigation sticky avec effet au scroll
 * - Fermeture automatique du menu mobile
 * - Animation d'apparition
 * ==========================================
 */

(function() {
    'use strict';

    const navbar = {
        element: document.querySelector('.navbar'),
        scrollThreshold: 50,
        lastScrollTop: 0,

        /**
         * Ajouter la classe 'scrolled' quand l'utilisateur scrolle
         */
        handleScroll: function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > this.scrollThreshold) {
                this.element.classList.add('scrolled');
            } else {
                this.element.classList.remove('scrolled');
            }

            this.lastScrollTop = scrollTop;
        },

        /**
         * Fermer le menu mobile après un clic sur un lien
         */
        closeMobileMenu: function() {
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');

            if (!navbarToggler || !navbarCollapse) return;

            // Écouter les clics sur les liens de navigation
            const navLinks = document.querySelectorAll('.nav-link');

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    // Vérifier si le menu est ouvert (sur mobile)
                    if (navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                });
            });
        },

        /**
         * Animation d'apparition au chargement
         */
        animateOnLoad: function() {
            setTimeout(() => {
                this.element.classList.add('fade-in');
            }, 100);
        },

        /**
         * Initialiser la navbar
         */
        init: function() {
            if (!this.element) {
                console.warn('⚠️ Navbar element not found');
                return;
            }

            // Écouter le scroll
            window.addEventListener('scroll', () => {
                this.handleScroll();
            });

            // Fermer le menu mobile au clic
            this.closeMobileMenu();

            // Animation au chargement
            this.animateOnLoad();

            // Vérifier l'état initial au cas où la page est déjà scrollée
            this.handleScroll();

            console.log('✅ Navbar initialisée');
        }
    };

    // Initialiser quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => navbar.init());
    } else {
        navbar.init();
    }

})();
