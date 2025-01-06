document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = document.getElementById('chatWidget');
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const chatHeader = document.getElementById('chatHeader');
    let messageHistory = [];

    // Configuration des réponses
    const responses = {
        welcome: {
            message: "Bonjour ! Voici nos différentes destinations à Madagascar :<br><br>" +
                    "<span class='highlight'>Le Nord :</span> Nosy Be, plages paradisiaques<br>" +
                    "<span class='highlight'>Le Sud :</span> Parcs nationaux, baobabs<br>" +
                    "<span class='highlight'>L'Est :</span> Forêts tropicales, Sainte-Marie<br>" +
                    "<span class='highlight'>L'Ouest :</span> Tsingy, Morondava<br><br>" +
                    "Quelle région souhaitez-vous découvrir ?",
            suggestions: ["Le Nord", "Le Sud", "L'Est", "L'Ouest", "Les activités", "La meilleure période"]
        },
        regions: {
            nord: {
                message: "Le Nord de Madagascar est connu pour ses plages paradisiaques et ses îles :<br><br>" +
                        "<div class='image-grid'>" +
                        "<img src='assets/images/destinations/nosy-be.jpg' alt='Plage de Nosy Be'>" +
                        "<img src='assets/images/destinations/diego.jpg' alt='Baie de Diego Suarez'>" +
                        "</div><br>" +
                        "• <span class='highlight'>Nosy Be :</span> L'île aux parfums 🏖️<br>" +
                        "• <span class='highlight'>Diego Suarez :</span> Baies et plages 🌊<br>" +
                        "• <span class='highlight'>Montagne d'Ambre :</span> Parc national 🌿",
                suggestions: ["Activités à Nosy Be", "Hôtels recommandés", "Comment s'y rendre"]
            },
            sud: {
                message: "Le Sud offre des paysages uniques et une biodiversité exceptionnelle :<br><br>" +
                        "<div class='image-grid'>" +
                        "<img src='assets/images/destinations/baobabs.jpg' alt='Allée des Baobabs'>" +
                        "<img src='assets/images/destinations/isalo.jpg' alt='Parc National Isalo'>" +
                        "</div><br>" +
                        "• <span class='highlight'>Allée des Baobabs :</span> Coucher de soleil magique 🌅<br>" +
                        "• <span class='highlight'>Parc National de l'Isalo :</span> Canyons et piscines naturelles 🏞️<br>" +
                        "• <span class='highlight'>Fort-Dauphin :</span> Plages sauvages 🏖️",
                suggestions: ["Voir les baobabs", "Randonnées disponibles", "Meilleure période"]
            },
            est: {
                message: "L'Est regorge de forêts tropicales et d'îles paradisiaques :<br><br>" +
                        "<div class='image-grid'>" +
                        "<img src='assets/images/destinations/sainte-marie.jpg' alt='Île Sainte-Marie'>" +
                        "<img src='assets/images/destinations/masoala.jpg' alt='Parc National de Masoala'>" +
                        "</div><br>" +
                        "• <span class='highlight'>Île Sainte-Marie :</span> Observation des baleines 🐋<br>" +
                        "• <span class='highlight'>Parc National de Masoala :</span> Forêt primaire 🌳<br>" +
                        "• <span class='highlight'>Canal des Pangalanes :</span> Navigation fluviale ⛵",
                suggestions: ["Voir les baleines", "Hébergements", "Accès à l'île"]
            },
            ouest: {
                message: "L'Ouest vous surprendra avec ses paysages spectaculaires :<br><br>" +
                        "<div class='image-grid'>" +
                        "<img src='assets/images/destinations/tsingy.jpg' alt='Tsingy de Bemaraha'>" +
                        "<img src='assets/images/destinations/morondava.jpg' alt='Plage de Morondava'>" +
                        "</div><br>" +
                        "• <span class='highlight'>Tsingy de Bemaraha :</span> Formations rocheuses uniques 🗿<br>" +
                        "• <span class='highlight'>Morondava :</span> Plages et baobabs 🏖️<br>" +
                        "• <span class='highlight'>Kirindy :</span> Forêt sèche et lémuriens 🐒",
                suggestions: ["Explorer les Tsingy", "Meilleure saison", "Transport"]
            }
        },
        activities: {
            general: {
                message: "Découvrez toutes les activités à Madagascar :<br><br>" +
                        "🏊‍♂️ <span class='highlight'>Activités nautiques :</span><br>" +
                        "• Plongée sous-marine à Nosy Be<br>" +
                        "• Observation des baleines à Sainte-Marie<br>" +
                        "• Surf à Fort-Dauphin<br>" +
                        "• Snorkeling dans les lagons<br><br>" +
                        "🌿 <span class='highlight'>Nature et Aventure :</span><br>" +
                        "• Randonnée dans l'Isalo<br>" +
                        "• Exploration des Tsingy<br>" +
                        "• Safari dans les parcs nationaux<br>" +
                        "• Observation des lémuriens<br><br>" +
                        "🏖️ <span class='highlight'>Détente et Culture :</span><br>" +
                        "• Plages paradisiaques<br>" +
                        "• Visites de villages traditionnels<br>" +
                        "• Découverte de l'artisanat local<br>" +
                        "• Dégustation de cuisine malgache",
                suggestions: ["Activités nautiques", "Randonnées", "Safaris", "Culture locale"]
            },
            nautiques: {
                message: "Activités nautiques à Madagascar :<br><br>" +
                        "🤿 <span class='highlight'>Plongée sous-marine :</span><br>" +
                        "• Sites exceptionnels à Nosy Be<br>" +
                        "• Récifs coralliens préservés<br>" +
                        "• Rencontre avec tortues et raies<br><br>" +
                        "🐋 <span class='highlight'>Observation des baleines :</span><br>" +
                        "• Migration des baleines à bosse<br>" +
                        "• Sorties en bateau à Sainte-Marie<br>" +
                        "• Période : juillet à septembre<br><br>" +
                        "🏄‍♂️ <span class='highlight'>Autres activités :</span><br>" +
                        "• Surf à Fort-Dauphin<br>" +
                        "• Kayak dans les mangroves<br>" +
                        "• Voile traditionnelle",
                suggestions: ["Réserver une activité", "Voir les prix", "Équipement nécessaire"]
            },
            randonnees: {
                message: "Les meilleures randonnées à Madagascar :<br><br>" +
                        "🏔️ <span class='highlight'>Parc National de l'Isalo :</span><br>" +
                        "• Canyons spectaculaires<br>" +
                        "• Piscines naturelles<br>" +
                        "• Circuits de 1 à 5 jours<br><br>" +
                        "🗿 <span class='highlight'>Tsingy de Bemaraha :</span><br>" +
                        "• Via ferrata unique<br>" +
                        "• Formations calcaires<br>" +
                        "• Parcours aventure<br><br>" +
                        "🌋 <span class='highlight'>Montagne d'Ambre :</span><br>" +
                        "• Forêt tropicale<br>" +
                        "• Cascades<br>" +
                        "• Faune endémique",
                suggestions: ["Réserver un guide", "Équipement conseillé", "Niveau difficulté"]
            },
            safaris: {
                message: "Safaris et observation de la faune :<br><br>" +
                        "🦒 <span class='highlight'>Parcs Nationaux :</span><br>" +
                        "• Andasibe-Mantadia : Lémuriens<br>" +
                        "• Ranomafana : Forêt tropicale<br>" +
                        "• Kirindy : Fosa et baobabs<br><br>" +
                        "🦎 <span class='highlight'>Faune endémique :</span><br>" +
                        "• 100+ espèces de lémuriens<br>" +
                        "• Caméléons multicolores<br>" +
                        "• Oiseaux rares<br><br>" +
                        "📸 <span class='highlight'>Photo Safari :</span><br>" +
                        "• Guides spécialisés<br>" +
                        "• Spots d'observation<br>" +
                        "• Safaris nocturnes",
                suggestions: ["Réserver un safari", "Meilleure période", "Voir les espèces"]
            },
            culture: {
                message: "Découverte de la culture malgache :<br><br>" +
                        "🏺 <span class='highlight'>Artisanat traditionnel :</span><br>" +
                        "• Sculpture sur bois<br>" +
                        "• Vannerie raffinée<br>" +
                        "• Soie sauvage<br><br>" +
                        "🍚 <span class='highlight'>Gastronomie :</span><br>" +
                        "• Cours de cuisine<br>" +
                        "• Marchés locaux<br>" +
                        "• Épices et vanille<br><br>" +
                        "💃 <span class='highlight'>Traditions :</span><br>" +
                        "• Danses traditionnelles<br>" +
                        "• Cérémonies du retournement<br>" +
                        "• Musique malgache",
                suggestions: ["Visites culturelles", "Cours de cuisine", "Acheter artisanat"]
            },
            "nosy be": {
                message: "Voici les meilleures activités à Nosy Be :<br><br>" +
                        "🏊‍♂️ <span class='highlight'>Plongée :</span> Sites exceptionnels avec tortues et requins<br>" +
                        "🐋 <span class='highlight'>Observation des baleines :</span> De juillet à septembre<br>" +
                        "🌺 <span class='highlight'>Plantations :</span> Visite des champs de ylang-ylang<br>" +
                        "🏖️ <span class='highlight'>Plages :</span> Andilana, Madirokely, Ambatoloaka",
                suggestions: ["Prix des activités", "Réserver", "Autres destinations"]
            },
            "baobabs": {
                message: "L'Allée des Baobabs est un site unique :<br><br>" +
                        "🌅 <span class='highlight'>Coucher de soleil :</span> Meilleur moment pour les photos<br>" +
                        "🚶‍♂️ <span class='highlight'>Visite guidée :</span> Histoire et légendes des baobabs<br>" +
                        "🌳 <span class='highlight'>Espèces :</span> 7 espèces différentes de baobabs<br>" +
                        "📸 <span class='highlight'>Photo :</span> Spot le plus photographié de Madagascar",
                suggestions: ["Meilleur moment", "Guide local", "Transport"]
            },
            "baleines": {
                message: "Observation des baleines à Sainte-Marie :<br><br>" +
                        "🐋 <span class='highlight'>Saison :</span> De juillet à septembre<br>" +
                        "🚤 <span class='highlight'>Sorties :</span> Excursions en bateau avec guide<br>" +
                        "📸 <span class='highlight'>Photo :</span> Approche respectueuse des baleines<br>" +
                        "🎥 <span class='highlight'>Vidéo :</span> Possibilité de filmer les sauts",
                suggestions: ["Réserver une sortie", "Hébergements proches", "Autres activités"]
            }
        },
        period: {
            message: "Voici les meilleures périodes pour visiter Madagascar :<br><br>" +
                    "🌞 <span class='highlight'>Haute saison :</span> Avril à Octobre (Saison sèche)<br>" +
                    "🌧️ <span class='highlight'>Saison des pluies :</span> Novembre à Mars<br>" +
                    "🐋 <span class='highlight'>Baleines :</span> Juillet à Septembre<br>" +
                    "💰 <span class='highlight'>Prix bas :</span> Novembre à Mars",
            suggestions: ["Nord en saison sèche", "Sud toute l'année", "Est (éviter cyclones)"]
        },
        hotels: {
            message: "Voici nos recommandations d'hébergement :<br><br>" +
                    "⭐️ <span class='highlight'>Luxe :</span> Resorts en bord de plage<br>" +
                    "🏠 <span class='highlight'>Charme :</span> Lodges dans la nature<br>" +
                    "💰 <span class='highlight'>Budget :</span> Guesthouses locales<br>" +
                    "🏕️ <span class='highlight'>Aventure :</span> Campements dans les parcs",
            suggestions: ["Voir les prix", "Réserver", "Autres options"]
        },
        transport: {
            message: "Comment se déplacer à Madagascar :<br><br>" +
                    "✈️ <span class='highlight'>Avion :</span> Vols intérieurs réguliers<br>" +
                    "🚗 <span class='highlight'>4x4 :</span> Idéal pour les pistes<br>" +
                    "🚌 <span class='highlight'>Taxi-brousse :</span> Transport local authentique<br>" +
                    "🚤 <span class='highlight'>Bateau :</span> Pour les îles",
            suggestions: ["Prix des vols", "Location 4x4", "Conseils"]
        },
        booking: {
            sortie: {
                message: "Pour réserver une sortie observation des baleines :<br><br>" +
                        "🎫 <span class='highlight'>Réservation en ligne :</span><br>" +
                        "• Site web : www.madagascar-whales.com<br>" +
                        "• Email : booking@madagascar-whales.com<br><br>" +
                        "📞 <span class='highlight'>Par téléphone :</span><br>" +
                        "• +261 34 02 XXX XX<br>" +
                        "• +261 32 07 XXX XX<br><br>" +
                        "💰 <span class='highlight'>Tarifs :</span><br>" +
                        "• Demi-journée : 60€/personne<br>" +
                        "• Journée complète : 100€/personne<br>" +
                        "• Forfait famille : 220€ (4 personnes)",
                suggestions: ["Voir les disponibilités", "Autres activités", "Contacter un guide"]
            },
            hotel: {
                message: "Réservez votre hébergement à Madagascar :<br><br>" +
                        "🏨 <span class='highlight'>Hôtels partenaires :</span><br>" +
                        "• Booking.com - Meilleures offres<br>" +
                        "• Hotels.com - Comparateur de prix<br><br>" +
                        "🏡 <span class='highlight'>Lodges et Guesthouses :</span><br>" +
                        "• Airbnb.com - Locations locales<br>" +
                        "• Madagascar-hotels.com - Hébergements authentiques<br><br>" +
                        "💡 <span class='highlight'>Conseils de réservation :</span><br>" +
                        "• Réserver 2-3 mois à l'avance en haute saison<br>" +
                        "• Vérifier les avis et photos récentes<br>" +
                        "• Demander les conditions d'annulation",
                suggestions: ["Voir les prix", "Contacter les hôtels", "Autres options"]
            },
            prix: {
                message: "Voici les tarifs moyens à Madagascar :<br><br>" +
                        "🏨 <span class='highlight'>Hébergement :</span><br>" +
                        "• Budget : 15-30€/nuit<br>" +
                        "• Milieu de gamme : 50-100€/nuit<br>" +
                        "• Luxe : 150€+/nuit<br><br>" +
                        "🍽️ <span class='highlight'>Restauration :</span><br>" +
                        "• Repas local : 3-5€<br>" +
                        "• Restaurant : 10-20€<br><br>" +
                        "🎫 <span class='highlight'>Activités :</span><br>" +
                        "• Excursions : 30-80€<br>" +
                        "• Parcs nationaux : 10-25€<br>" +
                        "• Guides : 20-40€/jour",
                suggestions: ["Réserver maintenant", "Voir les promotions", "Autres informations"]
            },
            guide: {
                message: "Contactez nos guides locaux certifiés :<br><br>" +
                        "🎓 <span class='highlight'>Guides francophones :</span><br>" +
                        "• Association des Guides de Madagascar<br>" +
                        "• Guides certifiés par l'Office du Tourisme<br><br>" +
                        "📱 <span class='highlight'>Contact :</span><br>" +
                        "• WhatsApp : +261 34 XX XXX XX<br>" +
                        "• Email : guides@madagascar-tourisme.com<br><br>" +
                        "💰 <span class='highlight'>Tarifs guides :</span><br>" +
                        "• Demi-journée : 30€<br>" +
                        "• Journée complète : 50€<br>" +
                        "• Circuit personnalisé : sur devis",
                suggestions: ["Réserver un guide", "Voir les circuits", "Questions fréquentes"]
            },
            disponibilites: {
                message: "Consultez les disponibilités en temps réel :<br><br>" +
                        "📅 <span class='highlight'>Haute saison (Juillet-Septembre) :</span><br>" +
                        "• Réservation 3 mois à l'avance conseillée<br>" +
                        "• Sorties garanties tous les jours<br><br>" +
                        "🗓️ <span class='highlight'>Basse saison :</span><br>" +
                        "• Plus de flexibilité sur les dates<br>" +
                        "• Tarifs préférentiels<br><br>" +
                        "⚠️ <span class='highlight'>Note importante :</span><br>" +
                        "• Les sorties dépendent de la météo<br>" +
                        "• Possibilité d'annulation/report",
                suggestions: ["Réserver maintenant", "Voir la météo", "Autres dates"]
            }
        },
    };

    // Fonction pour ajouter un message
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'sent' : 'received'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = message;
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = new Date().toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        chatMessages.appendChild(messageDiv);
        
        messageHistory.push({
            text: message,
            isUser: isUser,
            time: new Date()
        });
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Fonction pour ajouter les suggestions
    function addSuggestions(suggestions) {
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'quick-suggestions';
        
        suggestions.forEach(suggestion => {
            const button = document.createElement('button');
            button.className = 'suggestion-btn';
            button.textContent = suggestion;
            button.onclick = () => handleUserMessage(suggestion);
            suggestionsDiv.appendChild(button);
        });
        
        chatMessages.appendChild(suggestionsDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Fonction pour gérer les messages utilisateur
    function handleUserMessage(message) {
        addMessage(message, true);
        
        const messageLower = message.toLowerCase();
        let response;

        // Vérifier les activités
        if (messageLower.includes('les activités')) {
            response = responses.activities.general;
        } else if (messageLower.includes('activités nautiques')) {
            response = responses.activities.nautiques;
        } else if (messageLower.includes('randonnée')) {
            response = responses.activities.randonnees;
        } else if (messageLower.includes('safari')) {
            response = responses.activities.safaris;
        } else if (messageLower.includes('culture')) {
            response = responses.activities.culture;
        }
        // Vérifier les réservations et actions
        else if (messageLower.includes('réserver une sortie')) {
            response = responses.booking.sortie;
        } else if (messageLower.includes('réserver') && messageLower.includes('hotel')) {
            response = responses.booking.hotel;
        } else if (messageLower.includes('voir les prix') || messageLower.includes('tarif')) {
            response = responses.booking.prix;
        } else if (messageLower.includes('guide') || messageLower.includes('contacter')) {
            response = responses.booking.guide;
        } else if (messageLower.includes('disponibilité')) {
            response = responses.booking.disponibilites;
        }
        // Vérifier les régions
        else if (messageLower.includes('nord')) {
            response = responses.regions.nord;
        } else if (messageLower.includes('sud')) {
            response = responses.regions.sud;
        } else if (messageLower.includes('est')) {
            response = responses.regions.est;
        } else if (messageLower.includes('ouest')) {
            response = responses.regions.ouest;
        }
        // Vérifier les activités spécifiques
        else if (messageLower.includes('nosy be') || messageLower.includes('activités à nosy')) {
            response = responses.activities["nosy be"];
        } else if (messageLower.includes('baobab')) {
            response = responses.activities.baobabs;
        } else if (messageLower.includes('baleine')) {
            response = responses.activities.baleines;
        }
        // Vérifier les autres catégories
        else if (messageLower.includes('période') || messageLower.includes('saison') || messageLower.includes('quand')) {
            response = responses.period;
        } else if (messageLower.includes('hotel') || messageLower.includes('hébergement') || messageLower.includes('dormir')) {
            response = responses.hotels;
        } else if (messageLower.includes('transport') || messageLower.includes('déplacement') || messageLower.includes('aller')) {
            response = responses.transport;
        }
        // Message par défaut
        else {
            response = {
                message: "Je peux vous aider à découvrir Madagascar. Que souhaitez-vous savoir ?",
                suggestions: responses.welcome.suggestions
            };
        }

        setTimeout(() => {
            addMessage(response.message);
            if (response.suggestions) {
                addSuggestions(response.suggestions);
            }
        }, 500);
    }

    // Gestionnaires d'événements
    sendButton.onclick = () => {
        const message = messageInput.value.trim();
        if (message) {
            handleUserMessage(message);
            messageInput.value = '';
        }
    };

    messageInput.onkeypress = (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    };

    chatHeader.onclick = () => {
        chatWidget.classList.toggle('expanded');
    };

    // Initialisation
    addMessage(responses.welcome.message);
    addSuggestions(responses.welcome.suggestions);
});
