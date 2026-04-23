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
    // ✅ Optimisations de build avec esbuild
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Split du code pour paralléliser le chargement (fonction pour Rolldown)
        manualChunks: (id) => {
          if (id.includes('node_modules/react')) {
            return 'react';
          }
          if (id.includes('node_modules/axios')) {
            return 'vendor';
          }
        },
      },
    },
    // Réduire la taille des sources
    sourcemap: false,
    cssCodeSplit: true,
    // Chunk taille limite
    chunkSizeWarningLimit: 500,
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
