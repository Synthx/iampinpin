// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import rehypeExternalLinks from "rehype-external-links";

import node from "@astrojs/node";

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

  adapter: node({
    mode: "standalone",
  }),
});
