#!/usr/bin/env node

/**
 * 🔍 Vérification de la configuration Vercel pour Safinpay
 * 
 * Usage: node verify-vercel-config.js
 * 
 * Vérifie :
 * - ✅ package.json correct
 * - ✅ vite.config.js sans terser
 * - ✅ vercel.json rewrites corrects
 * - ✅ api.js proxy configuration
 * - ✅ AsyncProductImage.jsx proxy configuration
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

const log = (msg, color = 'reset') => console.log(`${colors[color]}${msg}${colors.reset}`);

let errors = [];

log('\n🔍 Vérification de la configuration Vercel...\n', 'blue');

// 1. Vérifier package.json
log('1️⃣  Vérification package.json...', 'yellow');
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  
  // Vérifier scripts
  if (!pkg.scripts.build || !pkg.scripts.dev) {
    errors.push('❌ package.json: scripts build ou dev manquants');
  } else {
    log('   ✅ Scripts build/dev présents', 'green');
  }
  
  // Vérifier esbuild (optionnel mais recommandé)
  if (!pkg.devDependencies.esbuild) {
    log('   ⚠️  esbuild manquant (optionnel, Vite peut l\'utiliser)', 'yellow');
  } else {
    log('   ✅ esbuild installé', 'green');
  }
  
  // Vérifier dépendances essentielles
  const essential = ['react', 'react-dom', 'react-router-dom', 'axios'];
  essential.forEach(dep => {
    if (pkg.dependencies[dep]) {
      log(`   ✅ ${dep} présent`, 'green');
    } else {
      errors.push(`❌ package.json: ${dep} manquant`);
    }
  });
  
} catch (e) {
  errors.push(`❌ Erreur lecture package.json: ${e.message}`);
}

// 2. Vérifier vite.config.js
log('\n2️⃣  Vérification vite.config.js...', 'yellow');
try {
  const viteConfig = fs.readFileSync('vite.config.js', 'utf-8');
  
  if (viteConfig.includes("minify: 'terser'")) {
    errors.push('❌ vite.config.js: minify terser trouvé (doit être esbuild)');
  } else if (viteConfig.includes("minify: 'esbuild'")) {
    log('   ✅ minify: esbuild configuré', 'green');
  } else {
    log('   ℹ️  minify: non explicitement configuré (Vite utilisera esbuild par défaut)', 'yellow');
  }
  
  if (viteConfig.includes('manualChunks')) {
    log('   ✅ Code splitting manualChunks configuré', 'green');
  }
  
  if (viteConfig.includes('proxy')) {
    log('   ✅ Proxy dev server configuré', 'green');
  } else {
    errors.push('⚠️  vite.config.js: proxy dev server non configuré');
  }
  
} catch (e) {
  errors.push(`❌ Erreur lecture vite.config.js: ${e.message}`);
}

// 3. Vérifier vercel.json
log('\n3️⃣  Vérification vercel.json...', 'yellow');
try {
  const vercelJson = JSON.parse(fs.readFileSync('vercel.json', 'utf-8'));
  
  if (vercelJson.buildCommand && vercelJson.buildCommand.includes('npm run build')) {
    log('   ✅ buildCommand configuré', 'green');
  } else {
    errors.push('❌ vercel.json: buildCommand incorrect');
  }
  
  if (vercelJson.outputDirectory === 'dist') {
    log('   ✅ outputDirectory: dist', 'green');
  } else {
    errors.push('❌ vercel.json: outputDirectory doit être "dist"');
  }
  
  if (vercelJson.rewrites) {
    const rewrites = vercelJson.rewrites.map(r => r.source);
    const required = ['/api/(.*)', '/proxy-image(.*)', '/proxy-data(.*)'];
    
    required.forEach(pattern => {
      if (rewrites.some(r => r.includes(pattern))) {
        log(`   ✅ Rewrite pour ${pattern}`, 'green');
      } else {
        errors.push(`❌ vercel.json: rewrite pour ${pattern} manquante`);
      }
    });
  } else {
    errors.push('❌ vercel.json: rewrites manquants');
  }
  
} catch (e) {
  errors.push(`❌ Erreur lecture vercel.json: ${e.message}`);
}

// 4. Vérifier api.js
log('\n4️⃣  Vérification src/services/api.js...', 'yellow');
try {
  const apiJs = fs.readFileSync('src/services/api.js', 'utf-8');
  
  if (apiJs.includes('getApiBaseUrl')) {
    log('   ✅ getApiBaseUrl() fonction présente', 'green');
  } else {
    errors.push('❌ src/services/api.js: getApiBaseUrl() manquante');
  }
  
  if (apiJs.includes('timeout: 30000')) {
    log('   ✅ timeout: 30s configuré', 'green');
  } else {
    log('   ⚠️  timeout: 30s non trouvé (vérifier la valeur)', 'yellow');
  }
  
} catch (e) {
  errors.push(`❌ Erreur lecture src/services/api.js: ${e.message}`);
}

// 5. Vérifier AsyncProductImage.jsx
log('\n5️⃣  Vérification src/components/AsyncProductImage.jsx...', 'yellow');
try {
  const asyncImg = fs.readFileSync('src/components/AsyncProductImage.jsx', 'utf-8');
  
  if (asyncImg.includes('getBackendOrigin')) {
    log('   ✅ getBackendOrigin() fonction présente', 'green');
  } else {
    errors.push('❌ src/components/AsyncProductImage.jsx: getBackendOrigin() manquante');
  }
  
  if (asyncImg.includes('/api/image/')) {
    log('   ✅ /api/image/ route utilisée', 'green');
  } else {
    errors.push('❌ src/components/AsyncProductImage.jsx: /api/image/ route manquante');
  }
  
} catch (e) {
  errors.push(`❌ Erreur lecture src/components/AsyncProductImage.jsx: ${e.message}`);
}

// Résumé final
log('\n' + '='.repeat(50), 'blue');
if (errors.length === 0) {
  log('✅ Toutes les vérifications réussies ! 🎉', 'green');
  log('Votre Safinpay est prêt pour Vercel', 'green');
} else {
  log(`❌ ${errors.length} problème(s) détecté(s):`, 'red');
  errors.forEach((err, i) => {
    const color = err.includes('⚠️') ? 'yellow' : 'red';
    log(`   ${i + 1}. ${err}`, color);
  });
}
log('='.repeat(50) + '\n', 'blue');

process.exit(errors.filter(e => e.includes('❌')).length > 0 ? 1 : 0);
