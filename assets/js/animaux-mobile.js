// Fonction pour détecter si on est sur mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Fonction pour désactiver/activer lightbox selon le device
function toggleLightbox() {
    const galleryLinks = document.querySelectorAll('.gallery-item a');
    
    if (isMobile()) {
        // Désactive lightbox sur mobile
        galleryLinks.forEach(link => {
            link.removeAttribute('data-lightbox');
            link.style.pointerEvents = 'none';
            link.onclick = (e) => e.preventDefault();
        });
    } else {
        // Réactive lightbox sur desktop
        galleryLinks.forEach(link => {
            link.setAttribute('data-lightbox', 'gallery');
            link.style.pointerEvents = 'auto';
            link.onclick = null;
        });
    }
}

// Exécute au chargement et au redimensionnement
document.addEventListener('DOMContentLoaded', toggleLightbox);
window.addEventListener('resize', toggleLightbox);
