document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Vérifier le scroll initial
    handleScroll();

    // Écouter l'événement de scroll
    window.addEventListener('scroll', handleScroll);
});
