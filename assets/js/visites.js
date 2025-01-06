// Initialisation de AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1200, // Réduit pour une animation plus dynamique
        once: false,
        offset: 0,
        easing: 'ease-in-out', // Changé pour une animation plus naturelle
        delay: 50, // Réduit pour démarrer plus rapidement
        disable: 'mobile',
        mirror: true // Ajoute un effet miroir pour les animations
    });

    // Sélection des éléments
    const filterButtons = document.querySelectorAll('.btn-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Fonction pour mettre à jour les compteurs
    function updateCounters() {
        filterButtons.forEach(button => {
            const filter = button.getAttribute('data-filter');
            let count;
            
            if (filter === 'all') {
                count = galleryItems.length;
            } else {
                count = document.querySelectorAll(`.gallery-item.${filter}`).length;
            }

            // Créer ou mettre à jour le compteur
            let counter = button.querySelector('.filter-counter');
            if (!counter) {
                counter = document.createElement('span');
                counter.className = 'filter-counter';
                button.appendChild(counter);
            }
            counter.textContent = count;
        });
    }

    // Fonction de filtrage améliorée avec animation
    function filterGallery(filter) {
        galleryItems.forEach(item => {
            item.classList.remove('animate-fadeInUp');
            
            if (filter === 'all' || item.classList.contains(filter)) {
                item.classList.remove('hidden');
                // Ajouter l'animation avec un délai
                setTimeout(() => {
                    item.classList.add('animate-fadeInUp');
                }, 50);
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Gestionnaire de clic pour les boutons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Animation des boutons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = 'scale(1)';
            });
            this.classList.add('active');
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);

            // Appliquer le filtre
            filterGallery(filter);
        });
    });

    // Gestion du modal avec animation
    const galleryCards = document.querySelectorAll('.gallery-card');
    const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
    const modalImage = document.getElementById('modalImage');

    galleryCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (modal && modalImage && img) {
                modalImage.style.opacity = '0';
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                modal.show();
                setTimeout(() => {
                    modalImage.style.opacity = '1';
                }, 100);
            }
        });
    });

    // Animation au scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.gallery-item, .tour-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animate-fadeInUp');
            }
        });
    }

    // Écouter l'événement de scroll
    window.addEventListener('scroll', animateOnScroll);

    // Initialisation
    updateCounters();
    animateOnScroll();

    // S'assurer que tous les éléments sont visibles au chargement
    galleryItems.forEach(item => {
        item.classList.remove('hidden');
    });
});

// Initialisation de la carte
function initMap() {
    // Centre de Madagascar
    const madagascar = [-18.766947, 46.869107];
    
    // Création de la carte
    const map = L.map('map').setView(madagascar, 6);
    
    // Ajout du fond de carte
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Points d'intérêt
    const points = [
        {
            name: "Parc National d'Andasibe",
            type: "parcs",
            coords: [-18.9333, 48.4167],
            icon: "tree"
        },
        {
            name: "Nosy Be",
            type: "plages",
            coords: [-13.3167, 48.2500],
            icon: "umbrella-beach"
        },
        {
            name: "Antananarivo",
            type: "villes",
            coords: [-18.8792, 47.5079],
            icon: "city"
        },
        {
            name: "Allée des Baobabs",
            type: "parcs",
            coords: [-20.2508, 44.4185],
            icon: "tree"
        },
        {
            name: "Île Sainte-Marie",
            type: "plages",
            coords: [-16.8500, 49.9167],
            icon: "umbrella-beach"
        }
    ];

    // Création des marqueurs personnalisés
    points.forEach(point => {
        const icon = L.divIcon({
            html: `<i class="fas fa-${point.icon}"></i>`,
            className: `custom-marker ${point.type}`,
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30]
        });

        const marker = L.marker(point.coords, { icon }).addTo(map);
        marker.bindPopup(`
            <div class="map-popup">
                <h3>${point.name}</h3>
                <button class="btn btn-primary btn-sm">En savoir plus</button>
            </div>
        `);
    });
}

// Initialisation de la carte après le chargement de la page
document.addEventListener('DOMContentLoaded', initMap);

// Animation des conseils avec gestion des performances
const conseilItems = document.querySelectorAll('.conseil-item');
if (conseilItems.length > 0) {
    conseilItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            requestAnimationFrame(() => {
                this.classList.add('active');
            });
        });
        
        item.addEventListener('mouseleave', function() {
            requestAnimationFrame(() => {
                this.classList.remove('active');
            });
        });
    });
}
