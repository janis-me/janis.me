import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/pages/blog' }),
  schema: z.object({
    title: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    published: z.boolean().default(false),
    tags: z.array(z.string()),
  }),
});

export const collections = { blog };
