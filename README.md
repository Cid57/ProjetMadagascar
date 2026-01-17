# 🌴 Site Madagascar Tourisme

Site web professionnel pour promouvoir le tourisme à Madagascar. Design moderne, responsive et optimisé.

## 📋 Table des matières

- [Structure du projet](#structure-du-projet)
- [Pages](#pages)
- [Architecture CSS](#architecture-css)
- [Architecture JavaScript](#architecture-javascript)
- [Installation](#installation)
- [Conventions de code](#conventions-de-code)
- [Maintenance](#maintenance)

---

## 📁 Structure du projet

```
madagascar/
├── index.html                 # Page d'accueil
├── pages/                     # Pages du site
│   ├── animaux.html          # Page faune
│   ├── visites.html          # Page sites touristiques
│   ├── excursions.html       # Page excursions
│   └── contact.html          # Page contact
├── assets/                    # Ressources
│   ├── css/                  # Feuilles de style
│   │   ├── style.css         # Styles principaux (SANS media queries)
│   │   ├── components/       # Composants réutilisables
│   │   │   ├── navbar.css
│   │   │   ├── footer.css
│   │   │   ├── buttons.css
│   │   │   ├── floating-buttons.css
│   │   │   ├── floating-buttons-mobile.css
│   │   │   ├── chat-widget.css
│   │   │   ├── chat-widget-mobile.css
│   │   │   └── loader.css
│   │   └── pages/            # Styles spécifiques aux pages
│   │       ├── home.css      # Page d'accueil (SANS media queries)
│   │       ├── home-mobile.css # Page d'accueil (responsive)
│   │       ├── animaux.css
│   │       ├── animaux-mobile.css
│   │       ├── visites.css
│   │       ├── visites-mobile.css
│   │       ├── excursions.css
│   │       ├── excursions-mobile.css
│   │       ├── contact.css
│   │       └── contact-mobile.css
│   ├── js/                   # Scripts JavaScript
│   │   ├── main.js           # Script principal
│   │   ├── navbar.js         # Navigation
│   │   ├── floating-buttons.js # Boutons flottants
│   │   ├── chat.js           # Widget de chat
│   │   └── home.js           # Page d'accueil
│   └── images/               # Images du site
│       ├── animaux/
│       ├── visites/
│       ├── contact/
│       └── destinations/
└── README.md                 # Documentation
```

---

## 🌐 Pages

### 1. **Index.html** - Page d'accueil ✅
**Status**: Complète (CSS + JS)

**Sections**:
- Hero avec image d'accueil
- Destinations populaires (Animaux, Visites, Excursions)
- Statistiques de biodiversité
- Section météo et meilleures périodes
- Témoignages clients (carousel)
- Galerie photo (lightbox + swiper mobile)
- À propos de Madagascar

**Fichiers associés**:
- CSS: `style.css`, `home.css`, `home-mobile.css`
- JS: `main.js`, `navbar.js`, `floating-buttons.js`, `chat.js`, `home.js`

### 2. **Animaux.html** - Faune de Madagascar ⏳
**Status**: HTML prêt, CSS/JS en attente

### 3. **Visites.html** - Sites touristiques ⏳
**Status**: HTML prêt, CSS/JS en attente

### 4. **Excursions.html** - Activités ⏳
**Status**: HTML prêt, CSS/JS en attente

### 5. **Contact.html** - Contact ⏳
**Status**: HTML prêt, CSS/JS en attente

---

## 🎨 Architecture CSS

### Principe de séparation

**IMPORTANT**: Le projet suit une architecture stricte de séparation des styles:

#### Fichiers standards (sans media queries)
- `style.css` - Styles de base globaux
- `components/*.css` - Composants réutilisables
- `pages/*.css` - Styles spécifiques aux pages

**Ces fichiers ne contiennent AUCUNE media query**

#### Fichiers responsive (avec media queries)
- `pages/*-mobile.css` - Toutes les règles responsive

**Ces fichiers contiennent TOUTES les media queries**

### Variables CSS (Design Tokens)

Le système utilise des variables CSS pour la cohérence:

```css
:root {
    /* Couleurs */
    --primary-color: #FF6B35;        /* Orange */
    --secondary-color: #2E7D32;      /* Vert */
    --accent-color: #00ACC1;         /* Bleu */

    /* Typographie */
    --font-primary: 'Poppins', sans-serif;
    --font-heading: 'Playfair Display', serif;

    /* Espacements */
    --spacing-xs: 0.5rem;            /* 8px */
    --spacing-sm: 1rem;              /* 16px */
    --spacing-md: 1.5rem;            /* 24px */
    --spacing-lg: 2rem;              /* 32px */
    --spacing-xl: 3rem;              /* 48px */
    --spacing-2xl: 4rem;             /* 64px */
    --spacing-3xl: 6rem;             /* 96px */
}
```

### Breakpoints responsive

```css
/* Tablette */
@media (max-width: 992px) { }

/* Mobile */
@media (max-width: 768px) { }

/* Petit mobile */
@media (max-width: 480px) { }
```

---

## ⚙️ Architecture JavaScript

### Modules JavaScript

Chaque fichier JS est un module indépendant encapsulé dans une IIFE (Immediately Invoked Function Expression):

```javascript
(function() {
    'use strict';

    const monModule = {
        // Propriétés
        element: document.querySelector('.element'),

        // Méthodes
        init: function() {
            // Code d'initialisation
        }
    };

    // Auto-initialisation
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => monModule.init());
    } else {
        monModule.init();
    }
})();
```

### Fichiers JavaScript

#### **main.js** - Script principal
Fonctionnalités globales communes à toutes les pages:
- Gestion du loader
- Bouton retour en haut
- Smooth scroll
- Animation des compteurs

#### **navbar.js** - Navigation
- Effet sticky au scroll
- Fermeture automatique menu mobile
- Animation d'apparition

#### **floating-buttons.js** - Boutons flottants
- WhatsApp
- Email
- Affichage/masquage au scroll

#### **chat.js** - Widget de chat
- Ouverture/fermeture
- Envoi de messages
- Réponses automatiques

#### **home.js** - Page d'accueil
- Swiper galerie mobile
- Horloge Madagascar
- Carousel témoignages
- Effet parallax

---

## 🚀 Installation

### 1. Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Éditeur de code (VSCode recommandé)
- Serveur local optionnel (Live Server, XAMPP, etc.)

### 2. Installation
```bash
# Cloner ou télécharger le projet
cd madagascar

# Ouvrir index.html dans un navigateur
# OU utiliser un serveur local
```

### 3. Dépendances externes (CDN)
Le projet utilise des bibliothèques externes via CDN:
- Bootstrap 5.3.2
- Font Awesome 6.4.2
- AOS (Animate On Scroll)
- Lightbox2
- Swiper 8

**Aucune installation npm nécessaire**

---

## 📝 Conventions de code

### CSS

#### Nommage BEM
```css
/* Block */
.destination-card { }

/* Element */
.destination-card__title { }
.destination-card__content { }

/* Modifier */
.destination-card--featured { }
```

#### Ordre des propriétés
1. Positionnement (position, top, left, z-index)
2. Box model (display, width, height, padding, margin)
3. Typographie (font, color, text-align)
4. Visuel (background, border, box-shadow)
5. Autres (cursor, transition, animation)

#### Commentaires
```css
/* ==========================================
   SECTION PRINCIPALE
   ========================================== */

/* Sous-section */
.element {
    /* Propriété importante */
    property: value;
}
```

### JavaScript

#### Nommage
- **Variables et fonctions**: camelCase
  ```javascript
  const monElement = document.querySelector('.element');
  function faireQuelqueChose() { }
  ```

- **Constantes**: UPPER_SNAKE_CASE
  ```javascript
  const API_URL = 'https://api.example.com';
  ```

- **Classes**: PascalCase
  ```javascript
  class MaClasse { }
  ```

#### Commentaires JSDoc
```javascript
/**
 * Description de la fonction
 * @param {string} param1 - Description du paramètre
 * @returns {boolean} - Description du retour
 */
function maFonction(param1) {
    return true;
}
```

---

## 🔧 Maintenance

### Ajout d'une nouvelle page

1. **Créer le fichier HTML** dans `/pages/`
2. **Créer les fichiers CSS**:
   - `/assets/css/pages/nom-page.css` (sans media queries)
   - `/assets/css/pages/nom-page-mobile.css` (avec media queries)
3. **Créer le fichier JS**: `/assets/js/nom-page.js`
4. **Lier les fichiers** dans le HTML:
```html
<!-- CSS -->
<link rel="stylesheet" href="../assets/css/pages/nom-page.css">
<link rel="stylesheet" href="../assets/css/pages/nom-page-mobile.css">

<!-- JS -->
<script src="../assets/js/nom-page.js"></script>
```

### Modification des styles

**RÈGLE D'OR**:
- Styles de base → fichier principal (ex: `home.css`)
- Styles responsive → fichier mobile (ex: `home-mobile.css`)

**Ne jamais** mélanger les deux !

### Optimisation

- **Images**: Compresser les images (TinyPNG, ImageOptim)
- **CSS**: Minifier en production
- **JS**: Minifier en production
- **Caching**: Configurer les headers de cache

---

## 👥 Équipe

- **Développement**: Équipe Madagascar Tourisme
- **Version**: 1.0.0
- **Date**: 2026

---

## 📄 Licence

© 2024 Madagascar Tourisme. Tous droits réservés.
