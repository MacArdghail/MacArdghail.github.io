export type PianoPerformance = {
  slug: string;
  index: number;
  title: string;
  youtubeUrl: string;
  youtubeEmbedId: string;
  description: string;
  tags: string[];
  year: number;
};

export const pianoPerformances: PianoPerformance[] = [
  {
    slug: 'cinema-paradiso-love-theme',
    index: 1,
    title: 'Cinema Paradiso - Love Theme',
    youtubeUrl: 'https://www.youtube.com/watch?v=op483l5s_dQ',
    youtubeEmbedId: 'op483l5s_dQ',
    description:
      'Ennio Morricone\'s love theme from Cinema Paradiso. A beautiful song from my favourite film - This is filler, I will record myself',
    tags: ['[Morricone]', '[Cinema Paradiso]', '[2026]'],
    year: 2024,
  },
];
