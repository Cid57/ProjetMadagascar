// Création et gestion du bouton back-to-top
document.addEventListener('DOMContentLoaded', function() {
    // Créer le bouton s'il n'existe pas déjà
    if (!document.getElementById('backToTop')) {
        const backToTopButton = document.createElement('button');
        backToTopButton.id = 'backToTop';
        backToTopButton.className = 'back-to-top';
        backToTopButton.setAttribute('aria-label', 'Retour en haut de la page');
        backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
        document.body.appendChild(backToTopButton);
    }

    // Récupérer le bouton
    const backToTopButton = document.getElementById('backToTop');

    // Gérer la visibilité du bouton au scroll
    function handleScroll() {
        if (window.scrollY > 200) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    // Écouter l'événement de scroll
    window.addEventListener('scroll', handleScroll);

    // Gérer le clic sur le bouton
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Vérifier la position initiale
    handleScroll();
});
