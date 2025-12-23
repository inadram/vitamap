import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Ensures assets load correctly on subpaths like GitHub/GitLab Pages
  base: './',
  define: {
    // Robust shim for process.env for Gemini SDK compatibility in the browser
    'process.env': {
      API_KEY: JSON.stringify(process.env.API_KEY || '')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    // Ensures the manifest is generated for easier debugging of asset paths if needed
    manifest: true,
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
});
