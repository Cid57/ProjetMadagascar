/**
 * ==========================================
 * CHAT.JS - WIDGET DE CHAT
 * ==========================================
 *
 * Fichier: chat.js
 * Description: Gestion du widget de chat interactif
 * Auteur: Équipe Développement Madagascar Tourisme
 * Version: 1.0.0
 *
 * Fonctionnalités:
 * - Ouverture/fermeture du chat
 * - Envoi de messages
 * - Réponses automatiques
 * ==========================================
 */

(function() {
    'use strict';

    const chat = {
        widget: document.getElementById('chatWidget'),
        header: document.getElementById('chatHeader'),
        messages: document.getElementById('chatMessages'),
        input: document.getElementById('messageInput'),
        sendButton: document.getElementById('sendButton'),
        isOpen: false,

        /**
         * Messages de bienvenue et réponses automatiques
         */
        botResponses: {
            'bonjour': 'Bonjour ! Bienvenue sur le site de Madagascar Tourisme. Comment puis-je vous aider ?',
            'animaux': 'Madagascar abrite une faune unique avec plus de 100 espèces de lémuriens ! Visitez notre page Animaux pour en savoir plus.',
            'visites': 'Découvrez nos sites incontournables : parcs nationaux, plages paradisiaques et paysages uniques.',
            'contact': 'Vous pouvez nous contacter au +261 20 12 345 67 ou par email à info@madagascar-tourisme.com',
            'prix': 'Nos tarifs varient selon la durée et le type de séjour. Contactez-nous pour un devis personnalisé !',
            'default': 'Merci pour votre message. Un conseiller vous répondra dans les plus brefs délais. Vous pouvez aussi nous contacter au +261 20 12 345 67.'
        },

        /**
         * Basculer l'ouverture/fermeture du chat
         */
        toggle: function() {
            this.isOpen = !this.isOpen;
            this.widget.classList.toggle('open', this.isOpen);

            if (this.isOpen && this.messages.children.length === 0) {
                // Afficher le message de bienvenue
                this.addBotMessage('Bonjour ! 👋 Comment puis-je vous aider aujourd\'hui ?');
            }
        },

        /**
         * Ajouter un message au chat
         * @param {string} message - Le contenu du message
         * @param {string} type - 'user' ou 'bot'
         */
        addMessage: function(message, type = 'user') {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}`;

            const bubbleDiv = document.createElement('div');
            bubbleDiv.className = 'message-bubble';
            bubbleDiv.textContent = message;

            messageDiv.appendChild(bubbleDiv);
            this.messages.appendChild(messageDiv);

            // Scroll vers le bas
            this.scrollToBottom();
        },

        /**
         * Ajouter un message du bot
         * @param {string} message - Le contenu du message
         */
        addBotMessage: function(message) {
            // Ajouter un délai pour simuler une réponse humaine
            setTimeout(() => {
                this.addMessage(message, 'bot');
            }, 500);
        },

        /**
         * Obtenir une réponse du bot
         * @param {string} userMessage - Message de l'utilisateur
         * @returns {string} - Réponse du bot
         */
        getBotResponse: function(userMessage) {
            const lowerMessage = userMessage.toLowerCase();

            // Chercher un mot-clé dans le message
            for (const [key, response] of Object.entries(this.botResponses)) {
                if (lowerMessage.includes(key)) {
                    return response;
                }
            }

            return this.botResponses.default;
        },

        /**
         * Envoyer un message
         */
        sendMessage: function() {
            const message = this.input.value.trim();

            if (message === '') return;

            // Ajouter le message de l'utilisateur
            this.addMessage(message, 'user');

            // Obtenir et ajouter la réponse du bot
            const botResponse = this.getBotResponse(message);
            this.addBotMessage(botResponse);

            // Vider l'input
            this.input.value = '';
        },

        /**
         * Faire défiler vers le bas du chat
         */
        scrollToBottom: function() {
            this.messages.scrollTop = this.messages.scrollHeight;
        },

        /**
         * Initialiser le chat
         */
        init: function() {
            if (!this.widget) {
                console.log('ℹ️ Widget de chat non trouvé sur cette page');
                return;
            }

            // Écouter le clic sur le header pour ouvrir/fermer
            if (this.header) {
                this.header.addEventListener('click', () => {
                    this.toggle();
                });
            }

            // Écouter le clic sur le bouton d'envoi
            if (this.sendButton) {
                this.sendButton.addEventListener('click', () => {
                    this.sendMessage();
                });
            }

            // Écouter la touche Enter dans l'input
            if (this.input) {
                this.input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        this.sendMessage();
                    }
                });
            }

            console.log('✅ Widget de chat initialisé');
        }
    };

    // Initialiser quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => chat.init());
    } else {
        chat.init();
    }

})();
