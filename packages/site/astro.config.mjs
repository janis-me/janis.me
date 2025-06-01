// @ts-check
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { transformerMetaHighlight } from '@shikijs/transformers';
import webmanifest from 'astro-webmanifest';
import { defineConfig } from 'astro/config';
import autolinkHeadings from 'rehype-autolink-headings';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
  site: 'https://janis.me',
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
    mdx({
      rehypePlugins: [
        [
          autolinkHeadings,
          {
            behavior: 'wrap',
            properties: {
              className: ['markdown-anchor'],
            },
          },
        ],
      ],
    }),
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
