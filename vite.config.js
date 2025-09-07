// vite.config.js
import handlebars from 'vite-plugin-handlebars';
import legacy from '@vitejs/plugin-legacy';

export default {
  plugins: [
    handlebars({
      partialDirectory: './src/partials',
    }),
    // -----------
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  root: 'src',
  publicDir: './public', // Set the public directory to <root>/public
  build: {
    outDir: '../dist', // Set the output directory to <root>/dist
  }
};