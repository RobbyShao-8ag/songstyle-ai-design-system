import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const pageSchema = z.object({
  title: z.string(),
  description: z.string(),
  lang: z.enum(["zh-CN", "en"]),
  route: z.string().startsWith("/"),
  section: z.string(),
  order: z.number()
});

const docs = defineCollection({
  loader: glob({
    pattern: "{manifesto,principles,foundations,references,guides,en}/**/*.{md,mdx}",
    base: "./docs"
  }),
  schema: pageSchema
});

const checklists = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./checklists" }),
  schema: pageSchema
});

const prompts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./prompts" }),
  schema: pageSchema
});

const examples = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./examples" }),
  schema: pageSchema
});

const skills = defineCollection({
  loader: glob({ pattern: "**/SKILL.md", base: "./skills" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    license: z.string().optional(),
    metadata: z.record(z.string(), z.string()).optional()
  })
});

export const collections = { docs, checklists, prompts, examples, skills };
