document.addEventListener('DOMContentLoaded', function() {
    // Gérer les boutons de partage
    const shareButtons = document.querySelectorAll('.sharing-options .btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.textContent.trim().toLowerCase();
            let shareUrl = '';
            const pageUrl = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('Découvrez la biodiversité unique de Madagascar et aidez-nous à la protéger !');
            
            switch(platform) {
                case 'partager sur facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
                    break;
                case 'partager sur twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${text}`;
                    break;
                case 'partager sur instagram':
                    // Instagram ne permet pas le partage direct via URL, on affiche un message
                    alert('Pour partager sur Instagram, veuillez copier le lien et le partager via l\'application Instagram');
                    return;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });

    // Gérer le bouton principal de partage
    const mainShareButton = document.querySelector('#sensibiliserModal .btn-primary');
    if (mainShareButton) {
        mainShareButton.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: 'Madagascar Biodiversité',
                    text: 'Découvrez la biodiversité unique de Madagascar et aidez-nous à la protéger !',
                    url: window.location.href
                })
                .catch(console.error);
            } else {
                alert('Utilisez les boutons de partage ci-dessus pour partager sur vos réseaux sociaux préférés');
            }
        });
    }
});
