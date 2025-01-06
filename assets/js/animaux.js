    document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des tooltips Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Animation au scroll avec AOS
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    // Animation des statistiques
    function animateValue(element, start, end, duration, symbol) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = currentValue + symbol;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Observer pour les statistiques
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const value = element.textContent;
                let finalValue = parseInt(value);
                let symbol = value.includes('%') ? '%' : '+';
                
                // Réinitialiser le texte pour l'animation
                element.textContent = '0' + symbol;
                
                // Lancer l'animation
                animateValue(element, 0, finalValue, 2000, symbol);
                
                // Ne déclencher qu'une fois
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.5
    });

    // Observer toutes les statistiques
    document.querySelectorAll('.stat-value').forEach(stat => {
        observer.observe(stat);
    });

    // Gestion des boutons de don
    const donationButtons = document.querySelectorAll('.donation-btn');
    const thankYouMessage = document.querySelector('.thank-you-message');
    const messageText = document.querySelector('.message-text');

    donationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const amount = this.dataset.amount;
            const isRecurring = this.dataset.recurring === 'true';
            
            if (amount === 'autre') {
                const customAmount = prompt('Entrez le montant de votre don en euros :');
                if (customAmount && !isNaN(customAmount)) {
                    showThankYouMessage(customAmount, isRecurring);
                }
            } else {
                showThankYouMessage(amount, isRecurring);
            }
        });
    });

    function showThankYouMessage(amount, isRecurring) {
        const message = isRecurring ? 
            `Merci pour votre don mensuel de ${amount}€ !` :
            `Merci pour votre don de ${amount}€ !`;
        
        messageText.textContent = message;
        thankYouMessage.style.display = 'block';
        
        setTimeout(() => {
            const modal = bootstrap.Modal.getInstance(document.getElementById('donationModal'));
            modal.hide();
            setTimeout(() => {
                thankYouMessage.style.display = 'none';
            }, 500);
        }, 3000);
    }

    // Gestion du formulaire de bénévolat
    const volunteerForm = document.getElementById('volunteerForm');
    const confirmationMessage = document.getElementById('confirmationMessage');

    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (this.checkValidity()) {
                confirmationMessage.innerHTML = `
                    <div class="alert alert-success">
                        <i class="fas fa-check-circle"></i>
                        <h5>Merci pour votre candidature !</h5>
                        <p>Nous vous contacterons bientôt pour discuter des opportunités de bénévolat.</p>
                    </div>
                `;
                confirmationMessage.style.display = 'block';
                this.classList.remove('was-validated');
                
                setTimeout(() => {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('benevolatModal'));
                    modal.hide();
                    setTimeout(() => {
                        this.reset();
                        confirmationMessage.style.display = 'none';
                    }, 500);
                }, 3000);
            } else {
                this.classList.add('was-validated');
            }
        });
    }

    // Réinitialisation des modales à la fermeture
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('hidden.bs.modal', function() {
            const form = this.querySelector('form');
            const message = this.querySelector('.alert, .confirmation-message, .thank-you-message');
            if (form) {
                form.reset();
                form.classList.remove('was-validated');
            }
            if (message) {
                message.style.display = 'none';
            }
        });
    });

    // Loader
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        window.addEventListener('load', () => {
            loader.classList.add('loaded');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        });
    }

    // Navbar scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // Initialisation de Lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': "Image %1 sur %2",
        'fadeDuration': 300,
        'imageFadeDuration': 300,
        'disableScrolling': true
    });

    // Habitat Modal
    const habitatCards = document.querySelectorAll('.habitat-card');
    const habitatModal = new bootstrap.Modal(document.getElementById('habitatModal'));
    
    habitatCards.forEach(card => {
        card.addEventListener('click', function() {
            const habitatType = this.dataset.habitat;
            
            // Cacher tous les contenus
            document.querySelectorAll('.habitat-details').forEach(detail => {
                detail.classList.remove('active');
            });
            
            // Afficher le contenu correspondant
            document.getElementById(habitatType).classList.add('active');
            
            // Ouvrir le modal
            habitatModal.show();
        });
    });

    // Donation Modal
    const donationBtn = document.querySelector('.conservation-content .btn-custom');
    const donationModal = new bootstrap.Modal(document.getElementById('donationModal'));
    const donationOptions = document.querySelectorAll('.donation-option');
    const customAmount = document.getElementById('customAmount');
    const donateButton = document.getElementById('donateButton');

    if (donationBtn) {
        // Ouvrir le modal au clic sur le bouton
        donationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            donationModal.show();
        });
    }

    // Gérer la sélection des options de don
    donationOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Retirer la sélection précédente
            donationOptions.forEach(opt => opt.classList.remove('selected'));
            // Ajouter la sélection actuelle
            this.classList.add('selected');
            // Vider le montant personnalisé
            if (customAmount) customAmount.value = '';
        });
    });

    if (donateButton) {
        // Animation du bouton de don
        donateButton.addEventListener('click', function() {
            const selectedOption = document.querySelector('.donation-option.selected');
            let amount = customAmount ? customAmount.value : '';
            
            if (selectedOption) {
                amount = selectedOption.dataset.amount;
            }

            if (amount) {
                this.innerHTML = '<i class="fas fa-check me-2"></i>Merci pour votre don !';
                this.style.background = '#27ae60';
                
                setTimeout(() => {
                    donationModal.hide();
                    // Réinitialiser le bouton après 3 secondes
                    setTimeout(() => {
                        this.innerHTML = '<i class="fas fa-heart me-2"></i>Faire un don';
                        this.style.background = '#e67e22';
                        donationOptions.forEach(opt => opt.classList.remove('selected'));
                        if (customAmount) customAmount.value = '';
                    }, 3000);
                }, 1500);
            }
        });
    }

    // Animations des cartes
    const cards = document.querySelectorAll('.habitat-card, .species-card');
    cards.forEach(card => {
        const img = card.querySelector('img');
        const content = card.querySelector('.card-content');
        
        if (img && content) {
            card.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.1)';
                content.style.transform = 'translateY(0)';
            });
            
            card.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
                content.style.transform = 'translateY(100%)';
            });
        }
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animation des statistiques
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        const statsSection = document.querySelector('.endangered-species-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stats.forEach(stat => {
                        const finalValue = parseInt(stat.textContent);
                        let currentValue = 0;
                        const duration = 2000; // 2 secondes
                        const increment = finalValue / (duration / 16); // 60 FPS

                        const animation = setInterval(() => {
                            currentValue += increment;
                            if (currentValue >= finalValue) {
                                stat.textContent = finalValue;
                                clearInterval(animation);
                            } else {
                                stat.textContent = Math.floor(currentValue);
                            }
                            
                            // Ajouter le symbole % pour les statistiques qui en ont besoin
                            if (stat.closest('.stat-card').querySelector('.stat-description').textContent.includes('perte')) {
                                stat.textContent += '%';
                            }
                        }, 16);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        observer.observe(statsSection);
    }

    // Lancer l'animation des statistiques
    animateStats();

    // Initialisation du Swiper pour la galerie mobile
    const gallerySwiper = new Swiper('.gallery-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
});
