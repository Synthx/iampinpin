import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";
import { digitalGardenLoader } from "@/loaders/garden-loader.ts";

const changelog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/contents/changelog" }),
  schema: z.object({
    title: z.string(),
    version: z.string(),
    date: z.coerce.date(),
  }),
});

const garden = defineCollection({
  loader: digitalGardenLoader({ base: "./src/contents/garden" }),
  schema: z.object({
    title: z.string(),
    type: z.enum(["project", "talk", "hobby"]),
    date: z.coerce.date(),
    image: z.string().optional(),
    url: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = {
  changelog,
  garden,
};
