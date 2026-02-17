// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import rehypeExternalLinks from "rehype-external-links";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [svelte()],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: ["noopener noreferrer"],
          target: "_blank",
        },
      ],
    ],
  },
  adapter: netlify(),
});
