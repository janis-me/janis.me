import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(_: unknown) {
  const blog = await getCollection('blog');

  return rss({
    stylesheet: '/pretty-feed-v3.xsl',
    title: `Janis Jansen's blog`,
    description: 'janis.me/blog - a blog made for programming, probably full of food',
    site: 'https://janis.me/blog',
    items: blog.map(post => ({
      title: post.data.title,
      pubDate: post.data.createdAt,
      link: `/blog/${post.id}`,
    })),
    customData: `<language>en</language>`,
  });
}
