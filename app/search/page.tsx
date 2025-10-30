import SearchClient, { SearchItem } from './search-client';

import { platforms } from '@/data/platforms';
import { comparisons } from '@/data/comparisons';

export const metadata = {
  title: 'Search',
  description: 'Look up platforms, reviews, and comparisons in one view.',
};

const searchable: SearchItem[] = [
  ...platforms.map((platform) => ({
    type: 'Platform',
    title: platform.name,
    description: platform.summary,
    href: `/platform/${platform.slug}`,
  })),
  ...platforms.map((platform) => ({
    type: 'Review',
    title: `${platform.name} review`,
    description: `Deep dive on ${platform.name}`,
    href: `/review/${platform.slug}-review`,
  })),
  ...comparisons.map((comparison) => ({
    type: 'Comparison',
    title: comparison.title,
    description: comparison.summary,
    href: `/compare/${comparison.slug}`,
  })),
];

export default function SearchPage() {
  return <SearchClient items={searchable} />;
}
