# Configuration Vercel pour Safinpay

## 🚀 Déploiement Production sur Vercel

Cette documentation explique comment déployer Safinpay sur Vercel sans erreur.

---

## 📋 Prérequis

- ✅ Repository GitHub avec Safinpay
- ✅ Compte Vercel (https://vercel.com)
- ✅ Backend Flask sur Railway: `https://safinpaybackend-production.up.railway.app`

---

## 🔧 Configuration Automatique

### 1. **package.json** (Scripts)

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "start": "vite preview --host",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

- `npm run build` → Compile le React avec Vite/Rolldown
- `npm run start` → Lance le serveur de preview (utilisé par Vercel)

### 2. **vite.config.js** (Build + Dev Server)

- ✅ Minification avec esbuild (inclus par défaut)
- ✅ Code splitting automatique (React, Vendor chunks)
- ✅ Proxy `/api/*` vers `localhost:8000` en dev
- ✅ Proxy `/proxy-image` et `/proxy-data` en dev

### 3. **vercel.json** (Rewrites)

Le fichier `vercel.json` configure le proxy pour Vercel :

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://safinpaybackend-production.up.railway.app/api/$1"
    },
    {
      "source": "/proxy-image(.*)",
      "destination": "https://safinpaybackend-production.up.railway.app/proxy-image$1"
    },
    {
      "source": "/proxy-data(.*)",
      "destination": "https://safinpaybackend-production.up.railway.app/proxy-data$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Ce que ça fait :**
- `/api/*` → Proxy vers Railway (backend)
- `/proxy-image*` → Proxy vers Railway (images)
- `/proxy-data*` → Proxy vers Railway (JSON/texte)
- `/*` → Redirige vers `/index.html` (SPA routing)

---

## 🔌 Configuration Frontend

### **src/services/api.js**

```javascript
const getApiBaseUrl = () => {
  // Dev local: /api/ → vite proxy → localhost:8000
  if (import.meta.env.DEV) {
    return "/api/";
  }
  
  // Prod Vercel: /api/ → vercel.json proxy → Railway
  if (window.location.origin.includes('vercel.app')) {
    return "/api/";
  }
  
  // Fallback: direct Railway
  return "https://safinpaybackend-production.up.railway.app/api/";
};
```

### **src/components/AsyncProductImage.jsx**

```javascript
const getBackendOrigin = () => {
  // Dev: window.location.origin (vite proxy)
  if (import.meta.env.DEV) {
    return window.location.origin;
  }
  
  // Prod Vercel: window.location.origin (vercel.json proxy)
  if (window.location.origin.includes('vercel.app')) {
    return window.location.origin;
  }
  
  // Fallback: Railway direct
  return "https://safinpaybackend-production.up.railway.app";
};
```

**Résultat :**
- Images servies via `/api/image/<id>` (ultra-rapide, cachées)
- Images externes via `/proxy-image?url=...` (CORS safe)

---

## 🔐 Dépendances Essentielles

Vérifiez que `package.json` contient :

```json
{
  "devDependencies": {
    "esbuild": "^0.25.12",
    "vite": "npm:rolldown-vite@7.2.5",
    "@vitejs/plugin-react": "^5.1.1"
  }
}
```

❌ **Ne pas utiliser Terser** (cause erreur "terser not found")
✅ **Utiliser esbuild** (inclus par défaut)

---

## 📦 Routes Backend Disponibles

| Route | Méthode | Description |
|-------|---------|-------------|
| `/api/products` | GET | Liste des produits |
| `/api/image/<id>` | GET | Image du produit (cachée) |
| `/api/auth/register/` | POST | Enregistrement |
| `/api/auth/login/` | POST | Connexion |
| `/proxy-image` | GET | Proxy d'images externes |
| `/proxy-data` | GET | Proxy de données JSON/texte |

---

## 🚀 Déploiement sur Vercel

### Étape 1: Commit et Push

```bash
git add -A
git commit -m "chore: vercel deployment config"
git push origin main
```

### Étape 2: Connecter Vercel

1. Allez à https://vercel.com/import
2. Connectez votre repository GitHub
3. Laissez les settings par défaut (Vercel détecte `vite.json` + `package.json`)
4. Cliquez **Deploy**

### Étape 3: Variables d'Environnement (optionnel)

Si vous avez un fichier `.env.production` :

```
VITE_API_URL=/api/
VITE_BACKEND_ORIGIN=https://your-vercel-app.vercel.app
```

Mais ce n'est **pas nécessaire** - la config auto-détecte Vercel.

---

## ✅ Vérification du Déploiement

### 1. **Vérifier le build**

```bash
npm run build
# Doit compiler sans erreurs
```

### 2. **Tester localement**

```bash
# Terminal 1: Backend
cd safinpaybackend
python safinpayback.py

# Terminal 2: Frontend
npm run dev
# Ouvrir http://localhost:5173
```

### 3. **Vérifier les routes proxy**

```bash
# Sur Vercel (remplacer par votre URL)
curl https://safinpay.vercel.app/api/products?limit=1
curl https://safinpay.vercel.app/proxy-image?url=...
```

### 4. **Vérifier les images**

- Ouvrir https://safinpay.vercel.app/search?q=bonbon
- Images doivent charger sans erreur CORS
- Console dev ne doit avoir aucune erreur 404

---

## 🐛 Troubleshooting

### Erreur: "terser not found"

❌ **Problème :** `vite.config.js` utilise `minify: 'terser'`
✅ **Solution :** Changez en `minify: 'esbuild'`

### Erreur: "Cannot find module '@vitejs/plugin-react'"

❌ **Problème :** Package.json manque la dépendance
✅ **Solution :**
```bash
npm install --save-dev @vitejs/plugin-react
git push  # Vercel va redéployer
```

### CORS Error sur images

❌ **Problème :** Images externes (glotelho.cm) retournent CORS error
✅ **Solution :** Utiliser `/proxy-image?url=...` à la place

```javascript
// ❌ Mauvais (CORS error)
<img src="https://glotelho.cm/image.jpg" />

// ✅ Correct (proxy)
<img src="/proxy-image?url=https%3A%2F%2Fglotelho.cm%2Fimage.jpg" />
```

### Timeout lors du chargement des images

❌ **Problème :** Images prennent > 30 secondes
✅ **Solution :** 
- Vérifier que le backend Railway est actif
- Vérifier la bande passante réseau
- Augmenter le timeout dans `api.js` si nécessaire

---

## 📊 Architecture Finale

```
┌─────────────────────────────────────────┐
│       Navigateur (Client)               │
└──────────────────┬──────────────────────┘
                   │
                   │ http://safinpay.vercel.app
                   ↓
┌─────────────────────────────────────────┐
│   Vercel (Frontend SPA + Proxy)         │
│  - React 19 + Vite build                │
│  - vercel.json rewrites                 │
│  - /api/* → Railway                     │
│  - /proxy-* → Railway                   │
└──────────────────┬──────────────────────┘
                   │
                   │ /api/*, /proxy-*
                   ↓
┌─────────────────────────────────────────┐
│  Railway (Backend Flask)                │
│  - /api/products, /api/auth/*           │
│  - /api/image/<id> (5000 cachées)       │
│  - /proxy-image (images externes)       │
│  - /proxy-data (JSON/texte)             │
└─────────────────────────────────────────┘
```

---

## 🎉 Résultat

✅ Safinpay déployé sur Vercel  
✅ Pas d'erreur CORS  
✅ Images ultra-rapides (cachées)  
✅ Authentification fonctionnelle  
✅ Auto-déploiement on `git push`  

**URL de production :** `https://your-vercel-project.vercel.app`

---

## 📝 Notes

- Tous les fichiers sont pré-configurés ✅
- **Aucune modification manuelle** n'est nécessaire après chaque push
- Le proxy Vercel redirige automatiquement vers Railway
- CORS est géré côté backend (tous les origins acceptés)

