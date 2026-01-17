document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = document.querySelector('.chat-widget');
    const chatHeader = document.querySelector('.chat-header');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input textarea');
    const sendButton = document.querySelector('.chat-input button');

    // Fonction pour basculer l'état du chat
    function toggleChat() {
        chatWidget.classList.toggle('expanded');
        if (chatWidget.classList.contains('expanded')) {
            chatInput.focus();
        }
    }

    // Ouvrir/fermer le chat au clic sur le header
    chatHeader.addEventListener('click', toggleChat);

    // Envoyer un message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Créer et ajouter le message de l'utilisateur
            const userMessageDiv = document.createElement('div');
            userMessageDiv.className = 'user-message';
            userMessageDiv.innerHTML = `<span>${message}</span>`;
            chatMessages.appendChild(userMessageDiv);

            // Réinitialiser l'input
            chatInput.value = '';
            
            // Faire défiler vers le bas
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Simuler une réponse du bot après un délai
            setTimeout(() => {
                const botMessageDiv = document.createElement('div');
                botMessageDiv.className = 'bot-message';
                botMessageDiv.innerHTML = `<span>Merci pour votre message. Un conseiller vous répondra bientôt.</span>`;
                chatMessages.appendChild(botMessageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }

    // Envoyer au clic sur le bouton
    sendButton.addEventListener('click', sendMessage);

    // Envoyer avec la touche Entrée
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});
