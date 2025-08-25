// @ts-check
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import scriptEmbed from '@brandonaaron/astro-script-embed';
import { transformerMetaHighlight } from '@shikijs/transformers';
import { dev } from 'astro';
import pdf from 'astro-pdf';
import webmanifest from 'astro-webmanifest';
import { defineConfig, passthroughImageService } from 'astro/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
  site: 'https://janis.me',

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
      // Adapted the `original` server version: https://github.com/lameuler/astro-pdf/blob/main/src/server.ts
      server: async config => {
        const server = await dev({ root: fileURLToPath(config.root), base: 'localhost', logLevel: 'error' });
        // get the actual port number for static preview server
        const host = server.address.address ?? 'localhost';
        const port = server.address.port ?? 4321;

        console.log(server);

        const str = `http://${host}:${port}`;
        console.log(str);

        const url = new URL(str);
        console.log(url.toString());

        return {
          url,
          close: server.stop,
        };
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

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
});
