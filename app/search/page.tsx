'use client';

import { useMemo, useState } from 'react';

import { platforms } from '@/data/platforms';
import { comparisons } from '@/data/comparisons';

export const metadata = {
  title: 'Search',
  description: 'Look up platforms, reviews, and comparisons in one view.',
};

const searchable = [
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
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query) return searchable;
    return searchable.filter((item) =>
      `${item.title} ${item.description}`.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Search FlowSystems</h1>
      <p className="text-sm text-slate-600">Find platforms, reviews, comparisons, and migration guides.</p>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by platform or job-to-be-done"
        className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none"
      />
      <div className="space-y-3">
        {results.map((item) => (
          <a
            key={`${item.type}-${item.href}`}
            href={item.href}
            className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-primary-300"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.type}</p>
            <p className="text-base font-semibold text-slate-900">{item.title}</p>
            <p className="text-sm text-slate-600">{item.description}</p>
          </a>
        ))}
        {results.length === 0 && <p className="text-sm text-slate-500">No matches yet—try another keyword.</p>}
      </div>
    </div>
  );
}
