// Fonction pour insérer le chatbot
function insertChatWidget() {
    const chatWidget = document.createElement('div');
    chatWidget.innerHTML = `
    <!-- Chat Widget -->
    <div id="chatWidget" class="chat-widget">
        <div id="chatHeader" class="chat-header">
            <div class="chat-header-text">
                <i class="fas fa-comments"></i>
            </div>
            <div class="chat-title">
                <h3>Découvrez Madagascar</h3>
                <p>Votre guide virtuel pour explorer l'île</p>
            </div>
        </div>
        <div id="chatBody" class="chat-body">
            <div id="chatMessages" class="chat-messages"></div>
            <div class="chat-input">
                <input type="text" id="messageInput" placeholder="Écrivez votre message...">
                <button id="sendButton">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>`;
    document.body.appendChild(chatWidget.firstElementChild);
}

// Insérer le chatbot quand le DOM est chargé
document.addEventListener('DOMContentLoaded', insertChatWidget);
