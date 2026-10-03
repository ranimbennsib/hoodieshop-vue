# HoodieShop

Boutique en ligne de hoodies développée avec **Vue.js 3**. Le site permet de parcourir un catalogue, filtrer les produits, choisir une couleur, remplir un panier et passer une commande.

=> Projet réalisé dans le cadre du cours de développement côté client (framework Vue.js) — ISET Bizerte, DSI 2 eme année.

## Captures d'écran


[Accueil](screenshots/home.png) 
[Catalogue](screenshots/catalogue.png) 
[Panier](screenshots/cart.png) 
[Commande](screenshots/checkout.png)

## Fonctionnalités

- **Page d'accueil** : bannière d'accueil, slider des nouveautés, compteurs animés, avis clients en défilement continu
- **Catalogue** : filtres par catégorie (homme / femme / enfant) et par taille, recherche par nom
- **Fiche produit** : choix de la couleur avec changement d'image, badges *Nouveau*, *Stock faible* et *Rupture de stock*
- **Panier** : ajout, suppression, modification des quantités (limitée au stock disponible), compteur dynamique dans la barre de navigation
- **Commande** : formulaire client, choix du mode de livraison (standard, express, point relais), récapitulatif avec calcul du total
- **Contact** : formulaire avec validation et informations de l'entreprise
- **Design responsive** avec Bootstrap 5

## Technologies utilisées


[Vue.js 3](https://vuejs.org/) | Framework front-end 
[Vue Router 4](https://router.vuejs.org/) | Navigation entre les pages 
[Vuex 4](https://vuex.vuejs.org/) | Gestion d'état (store configuré) 
[Bootstrap 5](https://getbootstrap.com/) + Bootstrap Icons | Interface et icônes 
[Axios](https://axios-http.com/) | Requêtes HTTP (installé pour la connexion à une API) 
| Vue CLI 5 | Outil de build et serveur de développement 

## Installation

### Prérequis

- [Node.js](https://nodejs.org/) (version LTS recommandée)
- npm (installé avec Node.js)

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/ranimbennsib/hoodieshop-vue.git


# 2. Aller dans le dossier du projet
cd hoodieshop-vue

# 3. Installer les dépendances
npm install

# 4. Lancer le serveur de développement
npm run serve
```

Ouvre ensuite le navigateur sur l'adresse affichée dans le terminal (en général `http://localhost:8080`).

### Autres commandes

```bash
npm run build   # Compile et minifie pour la production
npm run lint    # Vérifie et corrige le code avec ESLint
```

## Pages du site


`/` => Accueil 
`/catalogue` | Catalogue des hoodies |
`/contact` | Contact |
| `/cart` | Panier |
| `/checkout` | Finalisation de la commande |

## Structure du projet

├── public/                 # index.html et favicon
└── src/
    ├── assets/             # Images (logo, bannière)
    ├── components/         # Composants réutilisables
    │   ├── Navbar.vue
    │   ├── ProductCard.vue
    │   ├── NewProducts.vue
    │   ├── StatSection.vue
    │   ├── ReviewSection.vue
    │   └── FooterSection.vue
    ├── views/              # Pages
    │   ├── HomeView.vue
    │   ├── CatalogueView.vue
    │   ├── CartView.vue
    │   ├── CheckoutView.vue
    │   └── ContactView.vue
    ├── router/             # Configuration des routes
    ├── store/              # Store Vuex
    ├── App.vue
    └── main.js             # Point d'entrée + gestion du panier
```

## Limites actuelles et améliorations prévues

- Les produits sont écrits directement dans le code : ils pourraient venir d'une API (Spring Boot, Laravel...) via Axios
- Le panier est perdu lors du rafraîchissement de la page : à sauvegarder avec Vuex ou `localStorage`
- La commande est simulée (aucun paiement ni envoi réel)
- Ajouter l'authentification des utilisateurs et un historique de commandes

## Auteure

**Ranim Ben Nsib** — étudiante en 2ᵉ année DSI, ISET Bizerte

