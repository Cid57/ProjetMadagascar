// Initialiser EmailJS avec votre clé publique
emailjs.init("xGRXNDeP96w1SeLjP");

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('volunteerForm');
    const confirmationDiv = document.getElementById('confirmationMessage');
    const modal = document.getElementById('benevolModal');
    
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Validation du formulaire
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }
            
            // Récupérer les données du formulaire
            const formData = {
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                availability: document.getElementById('availability').value,
                domain: document.getElementById('domain').value,
                message: document.getElementById('message').value,
                domain_text: document.getElementById('domain').options[document.getElementById('domain').selectedIndex].text,
                availability_text: document.getElementById('availability').options[document.getElementById('availability').selectedIndex].text
            };

            // Animation de chargement
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Envoi en cours...';
            
            try {
                // Envoyer l'email via EmailJS
                await emailjs.send(
                    'service_lyq33w7',
                    'template_4cvhqth',
                    {
                        to_name: "Association Madagascar",
                        from_name: formData.name,
                        from_email: formData.email,
                        availability: formData.availability_text,
                        domain: formData.domain_text,
                        message: formData.message
                    }
                );

                // Animation de transition
                form.style.opacity = '0';
                form.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    // Masquer le formulaire
                    form.style.display = 'none';
                    
                    // Préparer le message de confirmation
                    confirmationDiv.innerHTML = `
                        <div class="success-animation mb-4">
                            <div class="checkmark">
                                <svg class="checkmark_stem" height="36" width="36">
                                    <circle class="checkmark_circle" cx="18" cy="18" r="17" fill="none"/>
                                    <path class="checkmark_check" fill="none" d="M7.5,18 l6,6 l15,-15"/>
                                </svg>
                            </div>
                        </div>
                        <h4 class="mb-3">Merci pour votre candidature !</h4>
                        <p class="mb-4">Nous avons bien reçu votre demande de bénévolat.</p>
                        <div class="submission-details mb-4">
                            <p><strong>Nom :</strong> ${formData.name}</p>
                            <p><strong>Mission :</strong> ${formData.domain_text}</p>
                            <p><strong>Disponibilité :</strong> ${formData.availability_text}</p>
                        </div>
                        <p>Nous vous contacterons très prochainement à l'adresse <strong>${formData.email}</strong> pour discuter des prochaines étapes.</p>
                        <div class="mt-4">
                            <button type="button" class="btn btn-primary me-2" data-bs-dismiss="modal">Fermer</button>
                            <button type="button" class="btn btn-outline-primary" onclick="location.reload()">
                                Nouvelle candidature
                            </button>
                        </div>
                    `;
                    
                    // Afficher le message avec animation
                    confirmationDiv.style.display = 'block';
                    setTimeout(() => {
                        confirmationDiv.style.opacity = '1';
                        confirmationDiv.style.transform = 'translateY(0)';
                    }, 100);
                }, 300);
            } catch (error) {
                // En cas d'erreur, afficher un message d'erreur
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
                console.error('EmailJS error:', error);
                return;
            }
            
            // Réinitialiser le formulaire
            form.classList.remove('was-validated');
            form.reset();
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        });
    }
    
    // Réinitialiser le formulaire quand la modale est fermée
    if (modal) {
        modal.addEventListener('hidden.bs.modal', function() {
            if (form) {
                form.style.display = 'block';
                form.style.opacity = '1';
                form.style.transform = 'translateY(0)';
                form.classList.remove('was-validated');
                form.reset();
                const submitButton = form.querySelector('button[type="submit"]');
                submitButton.disabled = false;
                submitButton.innerHTML = 'Envoyer ma candidature';
            }
            if (confirmationDiv) {
                confirmationDiv.style.display = 'none';
                confirmationDiv.style.opacity = '0';
                confirmationDiv.style.transform = 'translateY(20px)';
                confirmationDiv.innerHTML = '';
            }
        });
    }
});
