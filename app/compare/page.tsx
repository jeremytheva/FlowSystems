import Link from 'next/link';

import { comparisons } from '@/data/comparisons';

export const metadata = {
  title: 'Comparisons',
  description: 'Side-by-side analysis of adjacent platforms with operator context.',
};

export default function ComparisonIndexPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Comparisons</p>
        <h1 className="text-3xl font-bold text-slate-900">Stack decisions, clarified</h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Shortlists should highlight trade-offs, not marketing copy. Use these comparisons to understand when each platform shines and the
          migration work required to adopt it.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {comparisons.map((comparison) => (
          <article key={comparison.slug} className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">{comparison.title}</h2>
              <p className="text-sm text-slate-600">{comparison.summary}</p>
            </div>
            <div className="mt-6 text-sm font-semibold text-primary-700">
              <Link href={`/compare/${comparison.slug}`}>View analysis →</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
