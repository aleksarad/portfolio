import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

const projects = defineCollection({
	loader: file("src/content/projects.json"),
	schema: z.object({
		title: z.string(),
		url: z.string().url(),
		year: z.number().optional(),
		description: z.string().optional(),
		tags: z.array(z.string()).optional(),
	}),
});

export const collections = { projects };
