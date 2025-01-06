// Fonction globale pour ouvrir la modale
window.openExcursionModal = function(excursion) {
    const modal = new bootstrap.Modal(document.getElementById('excursionModal'));
    
    // Mise à jour du contenu de la modale
    document.querySelector('#excursionModal .modal-title').textContent = excursion.name;
    document.querySelector('#excursionModal .excursion-image').src = excursion.image;
    document.querySelector('#excursionModal .excursion-image').alt = excursion.name;
    document.querySelector('#excursionModal .excursion-description').textContent = excursion.description;
    
    // Mise à jour des points forts
    const highlightsList = document.querySelector('#excursionModal .excursion-highlights');
    highlightsList.innerHTML = excursion.highlights.map(highlight => 
        `<li><i class="fas fa-check-circle text-success me-2"></i>${highlight}</li>`
    ).join('');
    
    modal.show();
};

document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si l'élément de carte existe
    const mapElement = document.getElementById('excursions-map');
    if (!mapElement) return;

    // Initialisation de la carte
    const map = L.map('excursions-map').setView([-18.766947, 46.869107], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ' OpenStreetMap contributors'
    }).addTo(map);

    // Configuration des types de destinations avec images par défaut
    const destinationTypes = {
        plage: {
            color: '#3498db',
            icon: 'umbrella-beach',
            label: 'Plages & Îles',
            defaultImage: '../assets/images/visites/plage1.jpg'
        },
        nature: {
            color: '#2ecc71',
            icon: 'leaf',
            label: 'Nature & Parcs',
            defaultImage: '../assets/images/visites/culture1.jpg'
        },
        aventure: {
            color: '#e74c3c',
            icon: 'mountain',
            label: 'Aventure & Trekking',
            defaultImage: '../assets/images/visites/header-excursion.jpg'
        }
    };

    // Création des destinations
    const destinations = [
        {
            name: 'Mont Marojejy',
            coordinates: [-14.4500, 49.7333],
            type: 'aventure',
            image: '../assets/images/visites/header-excursion.jpg',
            description: 'Grimpez jusqu\'au sommet de ce massif majestueux traversant différents écosystèmes.',
            highlights: [
                'Randonnée en altitude',
                'Biodiversité exceptionnelle',
                'Vues panoramiques',
                'Camping en nature'
            ]
        },
        {
            name: 'Île Sainte-Marie',
            coordinates: [-17.0000, 49.8500],
            type: 'plage',
            image: '../assets/images/visites/plage1.jpg',
            description: 'Découvrez l\'Île Sainte-Marie, un véritable paradis tropical avec son histoire fascinante de pirates.',
            highlights: [
                'Observation des baleines (juillet à septembre)',
                'Plages de sable blanc',
                'Histoire des pirates',
                'Plongée et snorkeling'
            ]
        },
        {
            name: 'Tsingy de Bemaraha',
            coordinates: [-18.7055, 44.7181],
            type: 'nature',
            image: '../assets/images/visites/culture1.jpg',
            description: 'Explorez ce paysage unique de formations calcaires, classé au patrimoine mondial de l\'UNESCO.',
            highlights: [
                'Formations rocheuses spectaculaires',
                'Biodiversité unique',
                'Ponts suspendus',
                'Randonnées guidées'
            ]
        },
        {
            name: 'Nosy Be',
            coordinates: [-13.3167, 48.2667],
            type: 'plage',
            image: '../assets/images/visites/plage2.jpg',
            description: 'L\'île aux parfums vous invite à découvrir ses plages paradisiaques et ses plantations d\'ylang-ylang.',
            highlights: [
                'Plages de sable fin',
                'Excursions en bateau',
                'Plongée sous-marine',
                'Visite des plantations'
            ]
        },
        {
            name: 'Parc National d\'Andringitra',
            coordinates: [-22.1500, 46.9167],
            type: 'aventure',
            image: '../assets/images/visites/header-excursion.jpg',
            description: 'Découvrez l\'un des plus beaux massifs de Madagascar avec ses pics granitiques impressionnants.',
            highlights: [
                'Ascension du Pic Boby',
                'Randonnées variées',
                'Paysages montagneux',
                'Observation de lémuriens'
            ]
        },
        {
            name: 'Parc National d\'Andasibe',
            coordinates: [-18.9333, 48.4167],
            type: 'nature',
            image: '../assets/images/visites/culture1.jpg',
            description: 'Immergez-vous dans une forêt tropicale luxuriante, habitat du plus grand lémurien : l\'Indri.',
            highlights: [
                'Observation des Indris',
                'Randonnées nocturnes',
                'Forêt primaire',
                'Orchidées endémiques'
            ]
        }
    ];

    // Fonction pour créer des icônes personnalisées
    function createCustomIcon(type) {
        const color = destinationTypes[type].color;
        return L.divIcon({
            className: 'custom-marker',
            html: `<div style="
                background-color: ${color};
                width: 25px;
                height: 25px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 0 4px rgba(0,0,0,0.5);
            "></div>`,
            iconSize: [25, 25],
            iconAnchor: [12, 12],
            popupAnchor: [0, -12]
        });
    }

    // Création des marqueurs et popups
    destinations.forEach(function(destination, index) {
        // S'assurer que l'image existe, sinon utiliser l'image par défaut du type
        const imageUrl = destination.image || destinationTypes[destination.type].defaultImage;
        
        // Créer le marqueur avec l'icône correspondante au type
        const marker = L.marker(destination.coordinates, {
            icon: createCustomIcon(destination.type)
        }).addTo(map);
        
        // Créer le contenu de la popup
        const popupContent = `
            <div class="custom-popup">
                <img src="${imageUrl}" alt="${destination.name}" onerror="this.src='${destinationTypes[destination.type].defaultImage}'">
                <h3>${destination.name}</h3>
                <p>${destination.description}</p>
                <button type="button" class="btn btn-primary w-100" onclick="openDestinationModal(${index})">
                    EN SAVOIR PLUS
                </button>
            </div>
        `;

        marker.bindPopup(popupContent);
    });

    // Fonction globale pour ouvrir la modale de destination
    window.openDestinationModal = function(index) {
        const destination = destinations[index];
        const modal = document.getElementById('map-destination-modal');
        
        if (modal && destination) {
            const typeConfig = destinationTypes[destination.type];
            const imageUrl = destination.image || typeConfig.defaultImage;
            
            // Mise à jour du contenu
            modal.querySelector('.modal-title').textContent = destination.name;
            modal.querySelector('#map-modal-image').src = imageUrl;
            modal.querySelector('#map-modal-image').alt = destination.name;
            modal.querySelector('#map-modal-description').textContent = destination.description;
            modal.querySelector('#map-modal-type').textContent = typeConfig.label;
            modal.querySelector('#map-modal-type').className = `badge destination-type-badge bg-${destination.type === 'plage' ? 'primary' : destination.type === 'nature' ? 'success' : 'danger'}`;
            
            const highlightsList = modal.querySelector('#map-modal-highlights');
            highlightsList.innerHTML = destination.highlights
                .map(highlight => `<li><i class="fas fa-${typeConfig.icon} fa-fw me-2"></i>${highlight}</li>`)
                .join('');
            
            // Afficher la modale
            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
        }
    };
});

// Initialisation de EmailJS
(function() {
    emailjs.init("xGRXNDeP96w1SeLjP");
})();

// Gestion du formulaire de contact
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Afficher un indicateur de chargement
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';

    // Récupération des données du formulaire
    const formData = {
        excursion: document.querySelector('#excursionModal .modal-title').textContent,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        message: document.getElementById('message').value
    };

    // Préparation des paramètres pour EmailJS
    const templateParams = {
        to_email: "cindy_singer913@msn.com",
        from_name: formData.name,
        from_email: formData.email,
        excursion_name: formData.excursion,
        phone: formData.phone,
        desired_date: formData.date,
        message: formData.message,
        reply_to: formData.email
    };

    // Envoi de l'email via EmailJS
    emailjs.send(
        "service_lyq33w7",
        "template_4cvhqth",
        templateParams
    )
    .then(function(response) {
        console.log("Email envoyé avec succès!", response);
        alert(`Merci pour votre intérêt pour l'excursion "${formData.excursion}" !
Nous avons bien reçu votre demande et nous vous contacterons dans les plus brefs délais.`);
        
        // Réinitialisation du formulaire
        document.getElementById('contactForm').reset();
        
        // Fermeture de la modale
        bootstrap.Modal.getInstance(document.getElementById('excursionModal')).hide();
    })
    .catch(function(error) {
        console.error("Erreur lors de l'envoi de l'email:", error);
        alert("Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer plus tard.");
    })
    .finally(function() {
        // Restaurer le bouton
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    });
});
