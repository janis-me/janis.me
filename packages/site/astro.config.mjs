// @ts-check
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sitemap from "@astrojs/sitemap";
import scriptEmbed from "@brandonaaron/astro-script-embed";
import { transformerMetaHighlight } from "@shikijs/transformers";
import { defineConfig, passthroughImageService } from "astro/config";
import pdf from "astro-pdf";
import webmanifest from "astro-webmanifest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
  site: "https://janis.me",
  image: {
    service: passthroughImageService(),
  },

  build: {
    inlineStylesheets: "always",
  },

  integrations: [
    sitemap(),
    webmanifest({
      name: "janis.me - my personal website",
      icon: "src/assets/astronaut.svg",
      short_name: "janis.me",
      description: "Janis Jansen - Fullstack dev & creator",
      start_url: "/",
      theme_color: "#212529",
      background_color: "#212529",
      display: "standalone",
    }),
    pdf({
      baseOptions: {
        path: "/pdf[pathname].pdf",
        pdf: { format: "A4", scale: 0.8, printBackground: true },
      },
      pages: {
        "/cl/raw": [
          {
            path: "/cl.pdf",
            preCallback: (page) => {
              page.emulateMediaFeatures([
                { name: "prefers-color-scheme", value: "light" },
              ]);
            },
            pdf: {
              pageRanges: "1",
              format: "A4",
              scale: 0.8,
              printBackground: true,
            },
          },
        ],
        "/cv/raw": [
          {
            path: "/cv.pdf",
            preCallback: (page) => {
              page.emulateMediaFeatures([
                { name: "prefers-color-scheme", value: "light" },
              ]);
            },
          },
          {
            path: "/cv-dark.pdf",
            preCallback: async (page) => {
              await page.emulateMediaFeatures([
                { name: "prefers-color-scheme", value: "dark" },
              ]);
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
        light: "github-light",
        dark: "github-dark",
      },
    },
  },

  vite: {
    resolve: {
      alias: {
        $: path.resolve(__dirname, "src"),
      },
    },
  },
});
