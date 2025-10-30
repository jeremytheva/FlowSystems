'use client';

import { useMemo, useState } from 'react';

export type SearchItem = {
  type: 'Platform' | 'Review' | 'Comparison';
  title: string;
  description: string;
  href: string;
};

interface SearchClientProps {
  items: SearchItem[];
}

export default function SearchClient({ items }: SearchClientProps) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query) return items;
    return items.filter((item) =>
      `${item.title} ${item.description}`.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }, [items, query]);

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
