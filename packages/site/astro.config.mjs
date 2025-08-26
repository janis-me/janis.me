// @ts-check
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';
import scriptEmbed from '@brandonaaron/astro-script-embed';
import { transformerMetaHighlight } from '@shikijs/transformers';
import pdf from 'astro-pdf';
import webmanifest from 'astro-webmanifest';
import { defineConfig, passthroughImageService } from 'astro/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
  site: 'https://janis.me',

  server: {
    host: '127.0.0.1',
    port: 4321,
  },

  image: {
    service: passthroughImageService(),
  },

  build: {
    inlineStylesheets: 'always',
  },

  integrations: [
    sitemap(),
    webmanifest({
      name: 'janis.me - my personal website',

      /**
       * optional
       **/
      icon: 'src/assets/astronaut.svg', // source for favicon & icons
      short_name: 'janis.me',
      description: 'Janis Jansen - Fullstack dev & creator',
      start_url: '/',
      theme_color: '#212529',
      background_color: '#212529',
      display: 'standalone',
    }),
    pdf({
      baseOptions: {
        path: '/pdf[pathname].pdf',
        screen: true,
        pdf: { format: 'A4', scale: 0.8, printBackground: true },
      },
      pages: {
        '/cv/raw': [
          'cv.pdf',
          {
            path: '/cv-light.pdf',
            preCallback: page => {
              page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
            },
          },
          {
            path: '/cv-dark.pdf',
            preCallback: async page => {
              await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
            },
          },
        ],
      },
    }),
    scriptEmbed(),
  ],

  markdown: {
    shikiConfig: {
      transformers: [transformerMetaHighlight()],
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },

  vite: {
    resolve: {
      alias: {
        $: path.resolve(__dirname, 'src'),
      },
    },
  },
});
