// @ts-check
import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";

import webmanifest from "astro-webmanifest";

import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
  site: "https://janis.me",
  integrations: [
    solidJs(),
    sitemap(),
    webmanifest({
      name: "janis.me - my personal website",

      /**
       * optional
       **/
      icon: "src/assets/astronaut.svg", // source for favicon & icons
      short_name: "janis.me",
      description: "Janis Jansen - Fullstack dev & creator",
      start_url: "/",
      theme_color: "#212529",
      background_color: "#212529",
      display: "standalone",
    }),
  ],
  vite: {
    resolve: {
      alias: {
        $: `${path.resolve(__dirname, "src")}`,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // path to your scss variables
          api: "modern-compiler",
          additionalData: `@use "$styles/index.scss" as *;\n@use "include-media" as *;\n\n`,
        },
      },
    },
  },
});
