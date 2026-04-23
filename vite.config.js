import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  build: {
    // ✅ Optimisations de build avec esbuild (inclus par défaut)
    minify: 'esbuild',
    
    rollupOptions: {
      output: {
        // ✅ Code splitting simple et compatible avec Rolldown v7
        manualChunks: (id) => {
          // Vendor libraries dans chunks séparés pour meilleur cache
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react-vendor';
            }
            return 'vendors';
          }
        },
        // Optimiser les noms de chunks
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
    
    // Réduire la taille des sources
    sourcemap: false,
    cssCodeSplit: true,
    
    // Chunk taille limite (avertissement)
    chunkSizeWarningLimit: 1000,
    
    // Optimisation rapide
    target: 'ES2020',
  },
  
  // ✅ Optimisations du serveur de dev
  server: {
    strictPort: false,
    middlewareMode: false,
    
    // Proxy vers le backend local en développement
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path,
      },
      '/proxy-image': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path,
      },
      '/proxy-data': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
})
