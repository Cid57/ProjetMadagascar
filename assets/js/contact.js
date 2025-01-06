// Chat Widget
let isChatOpen = false;

function toggleChat() {
    const chatBody = document.getElementById('chatBody');
    isChatOpen = !isChatOpen;
    chatBody.style.display = isChatOpen ? 'flex' : 'none';
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        const chatMessages = document.getElementById('chatMessages');
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Ajouter le message envoyé
        chatMessages.innerHTML += `
            <div class="message sent">
                <div class="message-content">${message}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
        
        // Simuler une réponse automatique
        setTimeout(() => {
            chatMessages.innerHTML += `
                <div class="message received">
                    <div class="message-content">Merci pour votre message. Un conseiller vous répondra bientôt.</div>
                    <div class="message-time">${time}</div>
                </div>
            `;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
        
        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Formulaire de réservation rapide
document.getElementById('quickBookingForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simuler l'envoi du formulaire
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    
    setTimeout(() => {
        alert('Votre demande de réservation a été envoyée avec succès ! Nous vous contacterons dans les plus brefs délais.');
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        this.reset();
    }, 1500);
});

// Newsletter
document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inscription...';
    
    setTimeout(() => {
        alert('Merci de votre inscription à notre newsletter !');
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        this.reset();
    }, 1500);
});

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser le chat fermé
    const chatBody = document.getElementById('chatBody');
    if (chatBody) {
        chatBody.style.display = 'none';
    }
    
    // Ajouter les validations de formulaire Bootstrap
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');
    const contactError = document.getElementById('contactError');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Récupération des valeurs du formulaire
            const formData = {
                from_name: document.getElementById('contactName').value,
                from_email: document.getElementById('contactEmail').value,
                subject: document.getElementById('contactSubject').value,
                message: document.getElementById('contactMessage').value,
                to_email: 'cindy@madagascar-tourisme.com'
            };

            try {
                // Envoi du mail via EmailJS
                await emailjs.send(
                    'service_madagascar', // Remplacer par votre Service ID
                    'template_contact', // Remplacer par votre Template ID
                    formData
                );

                // Afficher le message de succès
                contactSuccess.style.display = 'block';
                contactError.style.display = 'none';

                // Réinitialiser le formulaire
                contactForm.reset();

                // Cacher le message de succès après 5 secondes
                setTimeout(() => {
                    contactSuccess.style.display = 'none';
                }, 5000);

            } catch (error) {
                console.error('Erreur:', error);
                // Afficher le message d'erreur
                contactError.style.display = 'block';
                contactSuccess.style.display = 'none';

                // Cacher le message d'erreur après 5 secondes
                setTimeout(() => {
                    contactError.style.display = 'none';
                }, 5000);
            }
        });
    }

    // Fonction pour valider l'email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Validation en temps réel des champs
    const contactEmail = document.getElementById('contactEmail');
    if (contactEmail) {
        contactEmail.addEventListener('input', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });
    }

    // Validation des champs requis
    const requiredFields = ['contactName', 'contactEmail', 'contactSubject', 'contactMessage'];
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', function() {
                if (!this.value.trim()) {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                }
            });
        }
    });
});
