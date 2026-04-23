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
    // ✅ Optimisations de build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Split du code pour paralléliser le chargement
        manualChunks: {
          'react': ['react', 'react-dom', 'react-router-dom'],
          'vendor': ['axios'],
          'tailwind': [],
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
    // Compression gzip en dev
    middlewareMode: false,
  },
})
