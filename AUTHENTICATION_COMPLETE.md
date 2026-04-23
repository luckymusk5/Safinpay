# 📋 Safinpay Authentication System - Documentation Complète

## ✅ État du Projet

### Compilation & Déploiement Local
- **Frontend**: ✅ Vite compiling successfully on http://localhost:5175
- **Backend**: ✅ Flask running on http://localhost:8000
- **Database**: ✅ Neon PostgreSQL (eu-west-2)

### API Endpoints - Tous Standardisés
Réponse format: `{success: boolean, message: string, data?: {...}}`

#### POST /api/auth/register/
```
Status 201 (Success):
{
  "success": true,
  "message": "Compte créé avec succès",
  "data": {
    "access": "token...",
    "refresh": "token...",
    "expires_at": "2026-04-24T...",
    "refresh_expires_at": "2026-05-23T...",
    "user": {
      "id": "Ce96759770d03a4",
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "phone": "+237...",
      "role": "client|seller",
      "name": "John Doe",
      "is_seller": false,
      "is_superuser": false,
      "shop_name": ""
    }
  }
}

Status 400 (Validation Error):
{
  "success": false,
  "message": "Le mot de passe doit contenir au minimum 8 caractères"
}

Status 409 (Conflict - Email exists):
{
  "success": false,
  "message": "Un compte existe déjà avec cet email (rôle: client)"
}

Status 500 (Server Error):
{
  "success": false,
  "message": "Erreur serveur lors de l'inscription"
}
```

#### POST /api/auth/login/
```
Status 200 (Success):
{
  "success": true,
  "message": "Connexion réussie",
  "data": { ... same structure as register ... }
}

Status 401 (Unauthorized):
{
  "success": false,
  "message": "Email, téléphone ou mot de passe incorrect"
}
```

### React Components
- **Register_new.jsx**: Formulaire d'enregistrement avec validation client
  - Vérifie: email format, password match, password length (8+)
  - Stocke tokens dans localStorage
  - Redirect 1.5s après succès
  - Affiche messages d'erreur avec couleurs

- **Login_new.jsx**: Formulaire de connexion
  - Même pattern que Register
  - Supports identifier (email ou phone)

### Validation Règles
| Field | Rule | Error Message |
|-------|------|---------|
| email | Required, unique per role | "L'adresse email est requise" / "Un compte existe déjà..." |
| password | Min 8 chars | "Le mot de passe doit contenir au minimum 8 caractères" |
| first_name | Required | "Le prénom est requis" |
| last_name | Required | "Le nom est requis" |
| phone | Required | "Le téléphone est requis" |
| role | "client" ou "seller" | |

### Test Results (API)
✅ **Test 1**: Duplicate email → 409
✅ **Test 2**: Short password → 400  
✅ **Test 3**: Valid login → 200 with tokens
✅ **Test 4**: Wrong password → 401

## 🚀 Prochaines Étapes

### Phase 1: Proxy System (IMMEDIATE)
1. **Implement /proxy-data route** (Flask)
   - Format: `/proxy-data?url=<URL>&format=json|text|html`
   - Returns: `{success: true, data: {...}, content_type: "...", size_bytes: N}`
   - Example: `GET /proxy-data?url=https://example.com/api/data&format=json`

2. **Update AsyncProductImage.jsx**
   - Add fallback to /proxy-image for external URLs
   - Cache strategy: 1 year for images

### Phase 2: Deployment (AFTER proxy system)
1. **Push to Git**
   ```
   git add .
   git commit -m "Fix: Auth system standardization + Vite compilation resolved"
   git push
   ```

2. **Deploy to Railway**
   - Auto-deploy on push
   - Test endpoints at https://safinpaybackend-production.up.railway.app

### Phase 3: Testing (LOCAL before Railway)
1. Register with new email
2. Verify email in Neon database
3. Login with registered credentials
4. Check tokens in localStorage
5. Test CORS from React to Flask

## 📁 File Structure
```
src/pages/
  ├── Register_new.jsx ✅
  ├── Login_new.jsx ✅
  └── ...

safinpaybackend/
  └── safinpayback.py ✅
      ├── /api/auth/register/ ✅
      ├── /api/auth/login/ ✅
      └── /proxy-image ✅
```

## 🔗 Links
- Frontend (local): http://localhost:5175
- Frontend (register): http://localhost:5175/register
- Frontend (login): http://localhost:5175/login
- Backend (local): http://localhost:8000
- Backend (production): https://safinpaybackend-production.up.railway.app
- Database: Neon eu-west-2 (neondb_owner)

## 📝 Notes
- Tokens valid for ~30 days
- Refresh token for automatic renewal
- All timestamps in UTC
- Password hashed with scrypt
- CORS enabled for localhost:5173/5174/5175 and Railway origins
- Image caching: 20,347 products pre-loaded at startup
