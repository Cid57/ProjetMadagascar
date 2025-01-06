function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        if(obj.innerText.includes('%')) {
            obj.innerText = value + '%';
        } else if(obj.innerText.includes('+')) {
            obj.innerText = value + '+';
        } else {
            obj.innerText = value;
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function startCounterAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = parseInt(element.dataset.value);
                animateValue(element, 0, finalValue, 2000);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    // Observer tous les éléments avec les classes stat-number et biodiv-stat
    document.querySelectorAll('.stat-number, .biodiv-stat').forEach(stat => {
        if (!stat.hasAttribute('data-animated')) {
            observer.observe(stat);
            stat.setAttribute('data-animated', 'true');
        }
    });
}

// Démarrer l'animation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', startCounterAnimation);

// Réinitialiser l'animation lors du changement de page ou du retour en arrière
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.querySelectorAll('.stat-number, .biodiv-stat').forEach(stat => {
            stat.removeAttribute('data-animated');
        });
        startCounterAnimation();
    }
});
