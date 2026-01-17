/**
 * ==========================================
 * FLOATING-BUTTONS.JS - BOUTONS FLOTTANTS
 * ==========================================
 *
 * Fichier: floating-buttons.js
 * Description: Gestion des boutons flottants (WhatsApp, Email, etc.)
 * Auteur: Équipe Développement Madagascar Tourisme
 * Version: 1.0.0
 *
 * Fonctionnalités:
 * - Affichage/masquage selon le scroll
 * - Actions des boutons de contact
 * ==========================================
 */

(function() {
    'use strict';

    const floatingButtons = {
        buttons: document.querySelectorAll('.floating-btn'),
        scrollThreshold: 200,

        /**
         * Afficher/masquer les boutons selon le scroll
         */
        toggleVisibility: function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            this.buttons.forEach(button => {
                // Ne pas appliquer au bouton "retour en haut" qui a sa propre logique
                if (button.classList.contains('back-to-top')) return;

                if (scrollTop > this.scrollThreshold) {
                    button.style.opacity = '1';
                    button.style.visibility = 'visible';
                } else {
                    button.style.opacity = '0';
                    button.style.visibility = 'hidden';
                }
            });
        },

        /**
         * Gérer le clic sur le bouton WhatsApp
         */
        handleWhatsApp: function() {
            const whatsappBtn = document.querySelector('.whatsapp-btn');

            if (whatsappBtn) {
                whatsappBtn.addEventListener('click', () => {
                    const phoneNumber = '261201234567'; // Numéro à personnaliser
                    const message = encodeURIComponent('Bonjour, je souhaite obtenir plus d\'informations sur Madagascar.');
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

                    window.open(whatsappUrl, '_blank');
                });
            }
        },

        /**
         * Gérer le clic sur le bouton Email
         */
        handleEmail: function() {
            const emailBtn = document.querySelector('.email-btn');

            if (emailBtn) {
                emailBtn.addEventListener('click', () => {
                    const email = 'info@madagascar-tourisme.com';
                    const subject = encodeURIComponent('Demande d\'information');
                    const body = encodeURIComponent('Bonjour,\n\nJe souhaite obtenir plus d\'informations concernant...\n\nCordialement,');

                    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
                });
            }
        },

        /**
         * Initialiser les boutons flottants
         */
        init: function() {
            if (this.buttons.length === 0) {
                console.log('ℹ️ Aucun bouton flottant trouvé');
                return;
            }

            // Écouter le scroll
            window.addEventListener('scroll', () => {
                this.toggleVisibility();
            });

            // Gérer les actions des boutons
            this.handleWhatsApp();
            this.handleEmail();

            // Vérifier l'état initial
            this.toggleVisibility();

            console.log('✅ Boutons flottants initialisés');
        }
    };

    // Initialiser quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => floatingButtons.init());
    } else {
        floatingButtons.init();
    }

})();
