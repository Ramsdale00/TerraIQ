import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2018',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 5173,
  },
});
