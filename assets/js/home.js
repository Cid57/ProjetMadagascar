// Initialisation du carrousel de la galerie pour mobile
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation du Swiper pour la galerie mobile
    if (document.querySelector('.gallery-swiper')) {
        new Swiper('.gallery-swiper', {
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
    }
});
