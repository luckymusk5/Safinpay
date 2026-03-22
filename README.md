# Safinpay

A React + Vite e-commerce application.

## Deployer sur Vercel depuis GitHub

### Option 1 – Déploiement automatique via l'interface Vercel (recommandé)

1. Allez sur [vercel.com](https://vercel.com) et connectez-vous avec votre compte GitHub.
2. Cliquez sur **"Add New Project"**.
3. Importez le dépôt `Safinpay` depuis GitHub.
4. Vercel détecte automatiquement Vite. Laissez les paramètres par défaut :
   - **Framework Preset** : `Vite`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
5. Cliquez sur **"Deploy"**.

Vercel redéploiera automatiquement à chaque `push` sur la branche `main`.

### Option 2 – Déploiement automatique via GitHub Actions

Un workflow CI/CD est inclus dans `.github/workflows/deploy.yml`.  
Il se déclenche à chaque `push` ou `pull_request` sur `main`.

#### Configuration des secrets GitHub requis

Dans votre dépôt GitHub, allez dans **Settings → Secrets and variables → Actions** et ajoutez :

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Token d'API Vercel ([créer ici](https://vercel.com/account/tokens)) |
| `VERCEL_ORG_ID` | ID de votre organisation Vercel (trouvé dans `.vercel/project.json` après `vercel link`) |
| `VERCEL_PROJECT_ID` | ID du projet Vercel (trouvé dans `.vercel/project.json` après `vercel link`) |

#### Obtenir les IDs Vercel

```bash
# Installer la CLI Vercel
npm install -g vercel

# Lier le projet local au projet Vercel
vercel link

# Les valeurs VERCEL_ORG_ID et VERCEL_PROJECT_ID se trouvent dans :
cat .vercel/project.json
```

### Développement local

```bash
npm install
npm run dev
```

### Build de production

```bash
npm run build
npm run preview
```

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
