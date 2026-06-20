export type Post = {
  slug: string;
  index: number;
  title: string;
  image: string;
  description: string;
  tags: string[];
  year: number;
};

export const posts: Post[] = [
  {
    slug: 'post-one',
    index: 1,
    title: 'Blog Post 1',
    image: 'https://placehold.co/600x300/1a1a1a/f0eeea?text=Post+One',
    description:
      'This is just filler to see how it will look when I eventually add blog posts',
    tags: ['[essay]', '[stuff]', '[2026]'],
    year: 2025,
  },
];
