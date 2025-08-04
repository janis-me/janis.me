import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  layout: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  published: z.boolean().default(false),
  tags: z.array(z.string()),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/pages/blog' }),
  schema: blogSchema,
});

export const collections = { blog };

export type BlogProps = z.infer<typeof blogSchema>;
