# ✅ Checklist Pre-Deployment Vercel

Avant de déployer sur Vercel, vérifiez tous ces points :

## 🔧 Configuration

- [ ] `package.json` contient les scripts : `build`, `dev`, `start`
- [ ] `vite.config.js` utilise `minify: 'esbuild'` (NOT terser)
- [ ] `vite.config.js` configure le proxy dev pour `/api`, `/proxy-image`, `/proxy-data`
- [ ] `vercel.json` contient tous les rewrites pour le backend Railway
- [ ] `src/services/api.js` utilise `getApiBaseUrl()` adapté à l'env
- [ ] `src/components/AsyncProductImage.jsx` utilise `getBackendOrigin()` adapté à l'env

## 📦 Dépendances

- [ ] `npm install` exécuté avec succès
- [ ] `esbuild` est dans `devDependencies`
- [ ] Pas de `terser` dans `devDependencies`
- [ ] `@vitejs/plugin-react` installé
- [ ] `vite` version : `npm:rolldown-vite@7.2.5`

## 🧪 Tests Locaux

- [ ] `npm run build` passe sans erreur (0 failures)
- [ ] Fichiers générés dans `dist/` :
  - [ ] `index.html` présent
  - [ ] `dist/assets/index-*.js` présent
  - [ ] `dist/assets/index-*.css` présent

- [ ] `npm run dev` lance le serveur de dev
- [ ] Frontend accessible à `http://localhost:5173`
- [ ] Pas d'erreurs dans la console du navigateur

- [ ] Backend local lancé sur `http://localhost:8000`
- [ ] `GET http://localhost:5173/api/products` → proxy vers `localhost:8000/api/products` ✅
- [ ] `GET http://localhost:5173/api/image/PRO000000000001` → fonctionne ✅

## 🔐 Authentification

- [ ] Registration endpoint fonctionne : `POST /api/auth/register/`
  - Email unique test
  - Password > 8 chars
  - Tokens générés et stockés en localStorage

- [ ] Login endpoint fonctionne : `POST /api/auth/login/`
  - Credentials valides
  - Tokens retournés

## 🖼️ Images & Proxy

- [ ] `GET /api/image/<id>` retourne les images cachées
- [ ] `GET /proxy-image?url=...` proxy les images externes
- [ ] `GET /proxy-data?url=...` proxy les données JSON
- [ ] CORS headers présents dans les réponses

## 🚀 Avant le Git Push

- [ ] Git commits propres et descriptifs
- [ ] Tous les fichiers de configuration committé :
  - [ ] `package.json`
  - [ ] `vite.config.js`
  - [ ] `vercel.json`
  - [ ] `src/services/api.js`
  - [ ] `src/components/AsyncProductImage.jsx`
  - [ ] `safinpaybackend/safinpayback.py`

- [ ] `.gitignore` contient :
  - [ ] `node_modules/`
  - [ ] `dist/`
  - [ ] `.env.local`
  - [ ] `.venv/`

## 📋 Vercel Setup

- [ ] Compte Vercel créé et connecté à GitHub
- [ ] Repository forké/poussé sur GitHub
- [ ] Vercel project créé (importé depuis GitHub)

## 🔗 Configuration Vercel Dashboard

Dans Vercel (vercel.com) → Project Settings :

- [ ] **Framework Preset** : Vite
- [ ] **Build Command** : `npm run build` (auto-détecté)
- [ ] **Output Directory** : `dist` (auto-détecté)
- [ ] **Install Command** : `npm install` (default)

## ✅ Vérification Finale

```bash
# Exécuter la vérification
npm run verify
```

Doit afficher : ✅ Toutes les vérifications réussies ! 🎉

---

## 🎯 Déploiement

Une fois tout vérifié :

```bash
git add -A
git commit -m "chore: final vercel deployment config"
git push origin main
```

Vercel devrait :
1. Détecter le push automatiquement
2. Lancer le build
3. Déployer sur `https://your-project.vercel.app`

---

## 🔍 Après le Déploiement

- [ ] Site accessible sur Vercel URL
- [ ] Page d'accueil charge sans erreur
- [ ] Vérifier la console dev (F12) :
  - [ ] Pas d'erreurs 404
  - [ ] Pas d'erreurs CORS
  - [ ] Pas d'erreurs de parsing JS

- [ ] Tester l'authentification :
  - [ ] Registration page charge
  - [ ] Login page charge
  - [ ] Formulaires soumettent sans erreur

- [ ] Tester les images :
  - [ ] Images de produits chargent
  - [ ] Pas d'erreur CORS en console

- [ ] Vérifier dans les Vercel logs qu'il n'y a pas d'erreur de build

---

## 🐛 En cas de problème

### Build échoue
- [ ] Vérifier `npm run build` localement
- [ ] Vérifier les erreurs dans Vercel logs
- [ ] Push une correction, Vercel redéployera automatiquement

### CORS Error
- [ ] Vérifier que `vercel.json` redirige `/api/*` vers Railway
- [ ] Vérifier que le backend Railway est actif
- [ ] Vérifier les headers CORS dans le backend

### Images ne chargent pas
- [ ] Vérifier que `/api/image/<id>` retourne 200
- [ ] Vérifier que les images sont en cache sur le backend
- [ ] Vérifier la bande passante réseau

---

## 📞 Support

- **Vercel Logs**: https://vercel.com/docs/concepts/deployments/logs
- **Vite Docs**: https://vitejs.dev/
- **Flask CORS**: https://flask-cors.readthedocs.io/
