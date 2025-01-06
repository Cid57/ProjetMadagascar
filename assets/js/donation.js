document.addEventListener('DOMContentLoaded', function() {
    const donationButtons = document.querySelectorAll('.donation-btn');
    const selectedAmountSpan = document.querySelector('.selected-amount');
    const selectedDonation = document.querySelector('.selected-donation');
    const customAmountInput = document.querySelector('.custom-amount-input');
    const customAmountField = document.querySelector('#customAmount');
    const donationSection = document.querySelector('.donation-section-main');
    const thankYouSection = document.querySelector('.thank-you-section');
    let currentAmount = null;
    let isRecurring = false;

    // Messages d'impact pour différents montants
    const impactMessages = {
        5: {
            oneTime: "Votre don de 5€ permet de planter un arbre dans une zone protégée.",
            monthly: "Votre don mensuel de 5€ aide à nourrir un lémurien pendant une semaine."
        },
        10: {
            oneTime: "Avec 10€, vous financez une journée de patrouille anti-braconnage.",
            monthly: "10€ par mois permettent de protéger un hectare de forêt pendant un mois."
        },
        20: {
            oneTime: "20€ permettent d'équiper un garde forestier en matériel de surveillance.",
            monthly: "Votre don mensuel de 20€ finance l'éducation environnementale d'une classe."
        },
        50: {
            oneTime: "Grâce à vos 50€, nous pouvons installer une caméra de surveillance pour la faune.",
            monthly: "50€ mensuels contribuent à la réhabilitation d'une espèce menacée."
        }
    };

    // Fonction pour obtenir un message d'impact aléatoire pour les montants personnalisés
    const customAmountMessages = [
        "Votre générosité aide à préserver la biodiversité unique de Madagascar.",
        "Chaque euro compte dans la protection des espèces menacées.",
        "Votre soutien est précieux pour la conservation de la faune malgache.",
        "Ensemble, nous pouvons faire la différence pour l'avenir de Madagascar."
    ];

    // Fonction pour mettre à jour l'affichage du montant sélectionné avec message d'impact
    function updateSelectedAmount(amount, recurring) {
        const amountText = recurring ? `${amount}€/mois` : `${amount}€`;
        selectedAmountSpan.textContent = amountText;
        selectedDonation.style.display = 'block';
        currentAmount = amount;
        isRecurring = recurring;

        // Trouver le message d'impact approprié
        let impactMessage = '';
        if (impactMessages[amount]) {
            impactMessage = recurring ? impactMessages[amount].monthly : impactMessages[amount].oneTime;
        } else {
            const randomIndex = Math.floor(Math.random() * customAmountMessages.length);
            impactMessage = customAmountMessages[randomIndex];
        }

        // Mettre à jour le message d'impact avec animation
        const impactDiv = document.querySelector('.impact-message') || document.createElement('div');
        impactDiv.className = 'impact-message';
        impactDiv.style.opacity = '0';
        impactDiv.innerHTML = `
            <div class="impact-icon">
                <i class="fas ${getRandomIcon()}"></i>
            </div>
            <p>${impactMessage}</p>
        `;

        if (!document.querySelector('.impact-message')) {
            selectedDonation.appendChild(impactDiv);
        }

        // Animation du message
        setTimeout(() => {
            impactDiv.style.opacity = '1';
            impactDiv.style.transform = 'translateY(0)';
        }, 100);
    }

    // Fonction pour obtenir une icône aléatoire
    function getRandomIcon() {
        const icons = ['fa-seedling', 'fa-leaf', 'fa-tree', 'fa-paw', 'fa-heart', 'fa-globe-africa'];
        return icons[Math.floor(Math.random() * icons.length)];
    }

    // Gérer le clic sur les boutons de don
    donationButtons.forEach(button => {
        button.addEventListener('click', function() {
            donationButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const amount = this.dataset.amount;
            const recurring = this.dataset.recurring === 'true';

            if (amount === 'autre') {
                customAmountInput.style.display = 'block';
                selectedDonation.style.display = 'none';
                if (customAmountField) {
                    customAmountField.focus();
                }
            } else {
                customAmountInput.style.display = 'none';
                updateSelectedAmount(amount, recurring);
            }
        });
    });

    // Gérer la saisie du montant personnalisé
    if (customAmountField) {
        customAmountField.addEventListener('input', function() {
            const amount = this.value;
            if (amount && amount > 0) {
                updateSelectedAmount(amount, false);
            } else {
                selectedDonation.style.display = 'none';
            }
        });
    }

    // Gérer le clic sur le bouton "Procéder au don"
    const proceedButton = document.querySelector('.proceed-donation');
    if (proceedButton) {
        proceedButton.addEventListener('click', function() {
            if (!currentAmount || currentAmount <= 0) {
                alert('Veuillez sélectionner un montant valide');
                return;
            }

            // Afficher le message de remerciement
            donationSection.style.display = 'none';
            const finalAmountSpan = document.querySelector('.final-amount');
            if (finalAmountSpan) {
                finalAmountSpan.textContent = isRecurring ? `${currentAmount}€/mois` : `${currentAmount}€`;
            }
            thankYouSection.style.display = 'block';

            // Cacher les boutons de la modal
            const modalFooter = document.querySelector('.modal-footer');
            if (modalFooter) {
                modalFooter.style.display = 'none';
            }

            // Rediriger après 8 secondes
            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('donationModal'));
                if (modal) {
                    modal.hide();
                    
                    // Réinitialiser le formulaire
                    setTimeout(() => {
                        donationSection.style.display = 'block';
                        thankYouSection.style.display = 'none';
                        modalFooter.style.display = 'flex'; // Réafficher les boutons
                        donationButtons.forEach(btn => btn.classList.remove('active'));
                        selectedDonation.style.display = 'none';
                        customAmountInput.style.display = 'none';
                        if (customAmountField) customAmountField.value = '';
                        const impactMessage = document.querySelector('.impact-message');
                        if (impactMessage) impactMessage.remove();
                        currentAmount = null;
                        isRecurring = false;
                    }, 500);

                    // Simuler la redirection vers le système de paiement
                    window.location.href = '#paiement';
                }
            }, 8000);
        });
    }
});
