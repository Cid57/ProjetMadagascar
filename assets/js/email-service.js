// Initialisation de EmailJS
(function() {
    emailjs.init("xGRXNDeP96w1SeLjP");
})();

// Configuration des templates et services
const EMAIL_CONFIG = {
    CONTACT_SERVICE: "service_madagascar",
    EXCURSION_SERVICE: "service_lyq33w7",
    CONTACT_TEMPLATE: "template_contact",
    EXCURSION_TEMPLATE: "template_4cvhqth"
};

// Fonction générique pour l'envoi d'emails
async function sendEmail(templateId, serviceId, templateParams) {
    try {
        const response = await emailjs.send(serviceId, templateId, templateParams);
        console.log("Email envoyé avec succès!", response);
        return { success: true, response };
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email:", error);
        return { success: false, error };
    }
}

// Gestionnaire pour le formulaire de contact général
function handleContactForm(formElement, successCallback, errorCallback) {
    formElement.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Afficher l'indicateur de chargement
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';

        const formData = {
            from_name: this.querySelector('#contactName').value,
            from_email: this.querySelector('#contactEmail').value,
            subject: this.querySelector('#contactSubject').value,
            message: this.querySelector('#contactMessage').value,
            to_email: 'cindy@madagascar-tourisme.com',
            reply_to: this.querySelector('#contactEmail').value
        };

        const result = await sendEmail(
            EMAIL_CONFIG.CONTACT_TEMPLATE,
            EMAIL_CONFIG.CONTACT_SERVICE,
            formData
        );

        // Réactiver le bouton
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        if (result.success) {
            if (successCallback) successCallback();
            this.reset();
        } else {
            if (errorCallback) errorCallback();
        }
    });
}

// Gestionnaire pour le formulaire de réservation d'excursion
function handleExcursionForm(formElement) {
    if (!formElement) return;

    formElement.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log("Formulaire soumis"); // Debug

        // Afficher l'indicateur de chargement
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';

        try {
            // Récupérer le titre de l'excursion
            const excursionTitle = document.querySelector('#excursionModal .modal-title')?.textContent || 
                                 document.querySelector('#sainte-marie-modal .modal-title')?.textContent || 
                                 'Excursion non spécifiée';

            const formData = {
                excursion: excursionTitle,
                from_name: this.querySelector('#name').value,
                from_email: this.querySelector('#email').value,
                phone: this.querySelector('#phone').value,
                desired_date: this.querySelector('#date').value,
                message: this.querySelector('#message').value,
                to_email: "cindy_singer913@msn.com",
                reply_to: this.querySelector('#email').value
            };

            console.log("Données du formulaire:", formData); // Debug

            const result = await sendEmail(
                EMAIL_CONFIG.EXCURSION_TEMPLATE,
                EMAIL_CONFIG.EXCURSION_SERVICE,
                formData
            );

            if (result.success) {
                // Fermer la modal de réservation
                const reservationModal = document.getElementById('reservationModal');
                const bsReservationModal = bootstrap.Modal.getInstance(reservationModal);
                if (bsReservationModal) {
                    bsReservationModal.hide();
                }

                // Attendre que la modal de réservation soit fermée
                setTimeout(() => {
                    // Mettre à jour et afficher la modal de confirmation
                    const excursionNameElement = document.getElementById('excursionName');
                    if (excursionNameElement) {
                        excursionNameElement.textContent = formData.excursion;
                    }

                    // Afficher la modal de confirmation
                    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
                    confirmationModal.show();

                    // Fermer automatiquement la modal de confirmation après 3 secondes
                    setTimeout(() => {
                        const confirmationModal = document.getElementById('confirmationModal');
                        const bsConfirmationModal = bootstrap.Modal.getInstance(confirmationModal);
                        if (bsConfirmationModal) {
                            bsConfirmationModal.hide();
                        }
                    }, 3000);

                    // Réinitialiser le formulaire
                    this.reset();
                }, 500);

            } else {
                alert("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard.");
            }
        } catch (error) {
            console.error("Erreur:", error); // Debug
            alert("Une erreur est survenue. Veuillez réessayer plus tard.");
        } finally {
            // Réactiver le bouton
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Gestionnaire pour le formulaire bénévole
function handleBenevoleForm(formElement) {
    if (!formElement) return;

    formElement.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Afficher l'indicateur de chargement
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';

        try {
            const formData = {
                excursion: "Demande de Bénévolat",
                from_name: this.querySelector('#benevoleName').value,
                from_email: this.querySelector('#benevoleEmail').value,
                phone: this.querySelector('#benevolePhone').value,
                desired_date: this.querySelector('#benevoleDispo').value,
                message: this.querySelector('#benevoleMessage').value,
                to_email: "cindy_singer913@msn.com",
                reply_to: this.querySelector('#benevoleEmail').value
            };

            console.log("Envoi des données bénévole:", formData); // Debug

            const result = await sendEmail(
                EMAIL_CONFIG.EXCURSION_TEMPLATE,
                EMAIL_CONFIG.EXCURSION_SERVICE,
                formData
            );

            console.log("Résultat de l'envoi:", result); // Debug

            if (result.success) {
                // Réinitialiser le formulaire
                this.reset();

                // Fermer la modale bénévole
                const benevoleModal = document.getElementById('benevoleModal');
                const bsBenevoleModal = bootstrap.Modal.getInstance(benevoleModal);
                if (bsBenevoleModal) {
                    bsBenevoleModal.hide();
                }

                // Attendre que la modale bénévole soit fermée
                setTimeout(() => {
                    // Afficher la modale de confirmation
                    const confirmationModal = new bootstrap.Modal(document.getElementById('benevoleConfirmationModal'));
                    confirmationModal.show();

                    // Fermer automatiquement la modale de confirmation après 8 secondes
                    setTimeout(() => {
                        const confirmationModal = document.getElementById('benevoleConfirmationModal');
                        const bsConfirmationModal = bootstrap.Modal.getInstance(confirmationModal);
                        if (bsConfirmationModal) {
                            bsConfirmationModal.hide();
                        }
                    }, 8000);

                }, 500);
            } else {
                // Afficher le message d'erreur dans la modale bénévole
                const errorMsg = document.getElementById('benevoleError');
                if (errorMsg) {
                    errorMsg.textContent = "Une erreur est survenue lors de l'envoi. Veuillez réessayer.";
                    errorMsg.style.display = 'block';
                }
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi:", error); // Debug
            // Afficher le message d'erreur dans la modale bénévole
            const errorMsg = document.getElementById('benevoleError');
            if (errorMsg) {
                errorMsg.textContent = "Une erreur est survenue. Veuillez réessayer plus tard.";
                errorMsg.style.display = 'block';
            }
        } finally {
            // Réactiver le bouton
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Fonction pour fermer la modal de confirmation
function closeConfirmationModal() {
    const confirmationModal = document.getElementById('confirmationModal');
    const bsConfirmationModal = bootstrap.Modal.getInstance(confirmationModal);
    if (bsConfirmationModal) {
        bsConfirmationModal.hide();
    }
}

// Fonction pour initialiser tous les formulaires
function initializeForms() {
    // Initialiser le formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        handleContactForm(contactForm, 
            () => {
                const successMsg = document.getElementById('contactSuccess');
                if (successMsg) successMsg.style.display = 'block';
            },
            () => {
                const errorMsg = document.getElementById('contactError');
                if (errorMsg) errorMsg.style.display = 'block';
            }
        );
    }

    // Initialiser le formulaire d'excursion
    const excursionForm = document.getElementById('excursionForm');
    if (excursionForm) {
        handleExcursionForm(excursionForm);
    }

    // Initialiser le formulaire bénévole
    const benevoleForm = document.getElementById('benevoleForm');
    if (benevoleForm) {
        console.log("Initialisation du formulaire bénévole"); // Debug
        handleBenevoleForm(benevoleForm);
    } else {
        console.log("Formulaire bénévole non trouvé"); // Debug
    }
}

// Initialiser les formulaires au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log("Initialisation des formulaires..."); // Debug
    initializeForms();
});
