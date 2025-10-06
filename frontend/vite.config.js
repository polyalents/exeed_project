import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    // ✅ Сжатие Brotli
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false,
      threshold: 10240, // только файлы >10KB
    }),
    // ✅ Gzip fallback
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false,
      threshold: 10240,
    }),
    // ✅ Оптимизация изображений
    ViteImageOptimizer({
      png: { quality: 70 },
      jpeg: { quality: 70 },
      webp: { quality: 75 },
      avif: { quality: 60 },
    }),
  ],

  resolve: {
    alias: {
      '/static': path.resolve(__dirname, './static'),
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 3001,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5002',
        changeOrigin: true,
        secure: false,
      },
    },
    fs: { allow: ['..', './static'] },
  },

  build: {
    minify: 'terser',
    cssMinify: true,
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['axios'],
        },
      },
    },
    assetsInlineLimit: 4096, // инлайнит мелкие изображения
  },
})
