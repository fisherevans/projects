// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://projects.fisher.sh',
    integrations: [mdx(), sitemap()],
    markdown: {
        shikiConfig: {
            themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
            defaultColor: false, // tokens carry --shiki-light/--shiki-dark, keyed off [data-theme]
            wrap: false,
        },
    },
});
