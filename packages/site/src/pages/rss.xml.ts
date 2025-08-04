import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';

export async function GET(_: unknown) {
  const blog = await getCollection('blog');

  return rss({
    stylesheet: '/pretty-feed-v3.xsl',
    title: `Janis Jansen's blog`,
    description: 'janis.me/blog - a blog made for programming, probably full of food',
    site: 'https://janis.me/blog',
    items: await Promise.all(
      blog.map(async post => ({
        title: post.data.title,
        pubDate: post.data.createdAt,
        description: post.data.description,
        content: sanitizeHtml(post.rendered?.html as string),
        link: `/blog/${post.id}`,
      })),
    ),
    customData: `<language>en</language>`,
  });
}
