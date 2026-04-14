# 🚀 Neurix UI

La puissance de l'IA accessible à tous.

Neurix est une plateforme web moderne permettant d'accéder facilement à des modèles d'intelligence artificielle sans complexité. Construite avec **Next.js**, **React** et **Tailwind CSS**.

## ✨ Fonctionnalités

- 🎯 Interface utilisateur moderne et intuitive
- 🤖 Accès aux meilleurs modèles IA (GPT-3, DALL-E, Whisper, Codex)
- 💰 Tarification transparente et flexible
- 🔒 Authentification sécurisée (Login/Signup)
- 📊 Dashboard avec historique des jobs
- 🎨 Design dark mode avec animations fluides
- 📱 Entièrement responsive

## 🛠️ Stack Technologique

- **Frontend**: Next.js 15.5.15, React 18.2.0
- **Styling**: Tailwind CSS 3.4.4
- **Auth**: NextAuth.js 4 (JWT, bcrypt)
- **Validation**: Zod
- **Tests**: Jest + React Testing Library
- **Qualité**: ESLint (next/core-web-vitals) + Prettier
- **Build**: PostCSS 8.4.39, Autoprefixer 10.4.19
- **Node.js** version 18+

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/neurix-ui.git
cd neurix-ui

# Installer les dépendances
npm install
```

## 🚀 Démarrage

**Mode développement :**
```bash
npm run dev
```
Accédez à http://localhost:3000

**Build pour production :**
```bash
npm run build
npm start
```

**Qualité & tests :**
```bash
npm run lint         # ESLint
npm run format       # Prettier (écriture)
npm run format:check # Prettier (vérification CI)
npm test             # Jest + React Testing Library
npm run test:ci      # Jest avec coverage
```

## 🔐 Variables d'environnement

Copiez `.env.example` vers `.env.local` puis remplissez :

```bash
cp .env.example .env.local
```

Variables importantes :

| Variable | Description |
|----------|-------------|
| `NEXTAUTH_SECRET` | Secret JWT (`openssl rand -base64 48`). **Requis en production.** |
| `NEXTAUTH_URL` | URL canonique de l'application |
| `NEXT_PUBLIC_API_URL` | URL de l'API publique |
| `LOG_LEVEL` | `debug` \| `info` \| `warn` \| `error` |

## 🔌 API

| Route | Méthode | Auth | Description |
|-------|---------|------|-------------|
| `/api/health` | GET | — | Healthcheck |
| `/api/signup` | POST | — | Création de compte (bcrypt) |
| `/api/auth/[...nextauth]` | * | — | NextAuth |
| `/api/models` | GET | ✓ | Catalogue des modèles |
| `/api/projects` | GET/POST | ✓ | Liste & création |
| `/api/projects/[id]` | GET/PUT/DELETE | ✓ | CRUD |
| `/api/jobs` | GET/POST | ✓ | Liste & soumission |
| `/api/jobs/[id]` | GET/DELETE | ✓ | Détail / annulation |
| `/api/billing` | GET | ✓ | Évènements & synthèse |
| `/api/admin/users` | GET | admin | Liste utilisateurs |

## 📁 Structure du projet

```
neurix-ui/
├── pages/              # Pages Next.js
│   ├── index.js       # Homepage
│   ├── dashboard.js    # Dashboard principal
│   ├── login.js        # Page de connexion
│   ├── signup.js       # Page d'inscription
│   ├── profile.js      # Profil utilisateur
│   ├── models.js       # Catalogue des modèles
│   ├── jobs.js         # Historique des jobs
│   ├── settings.js     # Paramètres
│   ├── docs.js         # Documentation
│   ├── 404.js          # Page 404
│   └── 500.js          # Page erreur serveur
├── components/         # Composants React
│   ├── Header.js       # En-tête
│   ├── Sidebar.js      # Barre latérale
│   └── Card.js         # Carte générique
├── styles/             # Feuilles de style
│   └── globals.css     # Styles globaux
├── public/             # Fichiers statiques
│   └── index.html      # Landing page HTML
└── tailwind.config.js  # Configuration Tailwind
```

## 🎨 Pages disponibles

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/dashboard` | Dashboard principal |
| `/login` | Connexion |
| `/signup` | Inscription |
| `/profile` | Profil utilisateur |
| `/models` | Catalogue des modèles IA |
| `/jobs` | Historique des exécutions |
| `/settings` | Paramètres utilisateur |
| `/docs` | Documentation |

## 🔧 Configuration

### Tailwind CSS
Configuré dans `tailwind.config.js` avec thème dark personnalisé.

### PostCSS
Configuré dans `postcss.config.js` avec Tailwind et Autoprefixer.

## 🚢 Déploiement

### Vercel (recommandé pour Next.js)
```bash
npm i -g vercel
vercel
```

### Autres plateformes
- Netlify
- Railway
- Heroku
- DigitalOcean

## 📝 License

MIT - Libre d'utilisation

## 👤 Auteur

Créé avec ❤️ par Martial Fabrice

## 🤝 Contribution

Les contributions sont bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.

---

**Neurix** - Démocratiser l'accès à l'IA 🤖
