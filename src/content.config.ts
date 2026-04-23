import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const imageSchema = z
  .object({
    src: z.url(),
    alt: z.string().optional(),
  })
  .optional();

const baseSchema = z.object({
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  pubDate: z.coerce.date(),
  editDate: z.coerce.date().optional(),
  title: z.string().min(1, { message: "Title cannot be empty." }),
  description: z.string().min(1, { message: "Description cannot be empty." }),
  tags: z.array(z.string()).default([]),
  image: imageSchema,
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: baseSchema.extend({
    repoUrl: z.url().optional(),
    demoUrl: z.url().optional(),
    status: z
      .enum(["completed", "in-progress", "planned"])
      .default("completed"),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: baseSchema,
});

export const collections = {
  projects,
  blog,
};
