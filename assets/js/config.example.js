// Configuration EmailJS - EXEMPLE
// Copiez ce fichier en config.js et remplacez par vos vraies valeurs

const EMAIL_CONFIG = {
    // Clé publique EmailJS
    PUBLIC_KEY: "VOTRE_CLE_PUBLIQUE_EMAILJS",

    // Services
    CONTACT_SERVICE: "votre_service_contact",
    EXCURSION_SERVICE: "votre_service_excursion",

    // Templates
    CONTACT_TEMPLATE: "votre_template_contact",
    EXCURSION_TEMPLATE: "votre_template_excursion",

    // Email de destination
    TO_EMAIL: "votre-email@exemple.com"
};

// Exporter la configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAIL_CONFIG;
}
