import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    alias: {
      src: '/src',
    },
  },
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    hmr: {
      clientPort: 5173,
    },
  }
});