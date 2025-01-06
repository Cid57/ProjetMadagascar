document.addEventListener('DOMContentLoaded', function() {
    const benevoleForm = document.getElementById('benevoleForm');
    const submitButton = document.querySelector('.submit-benevole');
    const benevoleSection = document.querySelector('.benevole-section-main');
    const thankYouSection = document.querySelector('.thank-you-section');
    const modalFooter = document.querySelector('#benevoleModal .modal-footer');

    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Vérifier si le formulaire est valide
            if (!benevoleForm.checkValidity()) {
                benevoleForm.reportValidity();
                return;
            }

            // Récupérer les valeurs du formulaire
            const formData = {
                nomPrenom: document.getElementById('nomPrenom').value,
                email: document.getElementById('email').value,
                telephone: document.getElementById('telephone').value,
                disponibilite: document.getElementById('disponibilite').value,
                competences: document.getElementById('competences').value,
                domaines: {
                    terrain: document.getElementById('terrain').checked,
                    sensibilisation: document.getElementById('sensibilisation').checked,
                    administratif: document.getElementById('administratif').checked
                }
            };

            // Simuler l'envoi des données (à remplacer par un vrai envoi au serveur)
            console.log('Données du formulaire:', formData);

            // Cacher le formulaire et les boutons
            benevoleSection.style.display = 'none';
            modalFooter.style.display = 'none';

            // Afficher le message de remerciement
            thankYouSection.style.display = 'block';

            // Fermer la modal et réinitialiser après 8 secondes
            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('benevoleModal'));
                if (modal) {
                    modal.hide();
                    
                    // Réinitialiser le formulaire
                    setTimeout(() => {
                        benevoleSection.style.display = 'block';
                        thankYouSection.style.display = 'none';
                        modalFooter.style.display = 'flex';
                        benevoleForm.reset();
                    }, 500);
                }
            }, 8000);
        });
    }
});
