import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Setting base to './' ensures the app works correctly when hosted on a subpath 
  // like https://inadram.github.io/vitamap/
  base: './',
  define: {
    // Shimming process.env so that the Gemini SDK can access the API key in the browser
    'process.env': {
      API_KEY: JSON.stringify(process.env.API_KEY || '')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Ensure assets are placed in a predictable location
    assetsDir: 'assets'
  },
});