import { readdirSync, readFileSync } from 'node:fs';
import sitemap from '@astrojs/sitemap';
import scriptEmbed from '@brandonaaron/astro-script-embed';
import { transformerMetaHighlight } from '@shikijs/transformers';
import { defineConfig, passthroughImageService } from 'astro/config';
import webmanifest from 'astro-webmanifest';
import surimiPlugin from 'surimi/vite';

const blogDir = new URL('./src/pages/blog/', import.meta.url);
const lastModified = new Map<string, string>(
	readdirSync(blogDir, { withFileTypes: true })
		.filter(entry => entry.isDirectory())
		.flatMap(entry => {
			const markdown = readFileSync(new URL(`${entry.name}/index.md`, blogDir), 'utf8');
			const updatedAt = markdown.match(/^updatedAt:\s*(\S+)/m)?.[1];
			return updatedAt ? [[`/blog/${entry.name}/`, new Date(updatedAt).toISOString()] as const] : [];
		}),
);

// https://astro.build/config
export default defineConfig({
	site: 'https://janis.me',
	trailingSlash: 'always',
	// Astro 7 defaults to 'jsx', which drops spaces at line breaks around inline elements.
	compressHTML: true,
	image: {
		service: passthroughImageService(),
	},

	build: {
		inlineStylesheets: 'always',
	},

	integrations: [
		sitemap({
			serialize(item) {
				const lastmod = lastModified.get(new URL(item.url).pathname);
				return lastmod ? { ...item, lastmod } : item;
			},
		}),
		webmanifest({
			name: 'janis.me - my personal website',
			icon: 'src/assets/astronaut.svg',
			short_name: 'janis.me',
			description: 'Janis Jansen - Fullstack dev & creator',
			start_url: '/',
			theme_color: '#212529',
			background_color: '#212529',
			display: 'standalone',
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
		plugins: [surimiPlugin()],
	},
});
