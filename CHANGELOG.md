# neu-rix UI

## 📝 Changelog

### [1.1.0] - 2026-04-13

#### 🔒 Sécurité & Auth
- Authentification basée sur bcrypt (suppression des mots de passe en clair)
- Validation serveur avec Zod sur toutes les entrées API
- `NEXTAUTH_SECRET` désormais requis en production (échec au démarrage sinon)
- Middleware étendu : gating du namespace `/admin` sur le rôle `admin`
- Correction typo `isProteted` → `isProtected` dans `middleware.js`

#### 🔌 API
- Nouvelles routes : `/api/signup`, `/api/health`, `/api/models`,
  `/api/projects`, `/api/projects/[id]`, `/api/jobs`, `/api/jobs/[id]`,
  `/api/billing`, `/api/admin/users`
- Helper `apiHandler` : dispatch par méthode, gestion centralisée des erreurs,
  enforcement auth/rôles

#### 🗄️ Données
- Store JSON file-backed dans `lib/db.js` (`.data/*.json`)
- Seed automatique des comptes de démonstration (bcrypt)
- Module `lib/users.js` pour CRUD utilisateur sécurisé

#### 🧪 Qualité
- ESLint (`next/core-web-vitals` + `prettier`)
- Prettier + `prettier-plugin-tailwindcss`
- Jest + React Testing Library (setup `next/jest`)
- Tests initiaux pour `lib/validators` et `components/Card`
- Alias de chemins via `jsconfig.json` (`@/components`, `@/lib`, ...)

#### 🎨 UI
- `tailwind.config.js` étendu : palette `neurix`, animations, gradients, ombres
- `next.config.js` : en-têtes de sécurité (HSTS, X-Frame-Options, CSP-adjacent),
  `poweredByHeader: false`, redirect `/home → /`
- `ErrorBoundary` global monté dans `_app.js`
- `Card` accepte désormais `className`, `as`, et props HTML

#### 🧹 Nettoyage
- Suppression de `neurix-ui.zip` et ajout de `*.zip` dans `.gitignore`
- README : correction Next.js 14.2.5 → 15.5.15, section env + API

### [1.0.0] - 2026-04-13

#### ✨ Initial Release
- Setup Next.js project avec React 18 et Tailwind CSS
- Créé 9 pages principales (index, dashboard, login, signup, etc.)
- Composants réutilisables (Header, Sidebar, Card)
- Landing page HTML statique
- Design dark mode avec animations
- Configuration de déploiement

#### Pages
- **Homepage** - Page d'accueil avec CTA
- **Dashboard** - Interface principale d'exécution de jobs IA
- **Authentication** - Login et Signup
- **User Profile** - Gestion du profil utilisateur
- **Models** - Catalogue des modèles IA disponibles
- **Jobs History** - Historique des jobs exécutés
- **Settings** - Paramètres utilisateur et sécurité
- **Documentation** - Guide utilisateur
- **Error Pages** - Pages 404 et 500

#### Composants
- `Header` - Barre de navigation
- `Sidebar` - Menu latéral
- `Card` - Composant de carte générique

#### Assets
- Landing page HTML statique avec design moderne
- Favicon et configuration public

---

## 🚀 Prochaines étapes

- [x] Intégrer une API backend (routes Next.js `/api/*`)
- [x] Authentification sécurisée (NextAuth + bcrypt)
- [x] Opérations CRUD (projets, jobs, billing)
- [x] Tests unitaires (Jest + RTL)
- [x] Lint & format (ESLint + Prettier)
- [ ] Migrer le store JSON vers PostgreSQL + Prisma
- [ ] Tests E2E (Playwright)
- [ ] Déployer sur Vercel/production
- [ ] Intégrer Stripe pour la facturation réelle
- [ ] Configurer monitoring (Sentry) et logging externe
