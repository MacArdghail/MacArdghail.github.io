export type Project = {
  slug: string;
  index: number;
  title: string;
  image: string;
  description: string;
  tags: string[];
  link?: string;
  year: number;
};

export const projects: Project[] = [
  {
    slug: 'travelmap',
    index: 1,
    title: 'travelmap.ie',
    image: '/travelmap.png',
    description:
      'Interactive map visualizing Irish travel advisories from the DFA. Tracks daily changes and shows which countries moved between warning levels.',
    tags: ['[angular]', '[leaflet.js]', '[dfa]', '[travel]'],
    link: 'https://travelmap.ie',
    year: 2024,
    },
];
