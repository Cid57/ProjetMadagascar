document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    function checkScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Vérifier au chargement de la page
    checkScroll();
    
    // Vérifier lors du scroll
    window.addEventListener('scroll', checkScroll);
});
