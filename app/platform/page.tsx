import Link from 'next/link';

import { platforms } from '@/data/platforms';

export const metadata = {
  title: 'Platforms',
  description: 'Snapshot of vetted platforms including factor scoring, standout moments, and migration highlights.',
};

export default function PlatformIndexPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Platforms</p>
        <h1 className="text-3xl font-bold text-slate-900">Tools ready for operator-led teams</h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Each platform listed here has been reviewed hands-on. Scores combine setup effort, time-to-value, and ecosystem maturity so you
          can pick with confidence.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {platforms.map((platform) => (
          <article key={platform.id} className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">{platform.categories.join(' · ')}</p>
              <h2 className="text-xl font-semibold text-slate-900">{platform.name}</h2>
              <p className="text-sm text-slate-600">{platform.summary}</p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-600">
              {platform.factors.slice(0, 2).map((factor) => (
                <div key={factor.key} className="rounded-lg bg-slate-50 px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-slate-500">{factor.label ?? factor.key}</p>
                  <p className="text-lg font-semibold text-primary-700">{factor.score.toFixed(1)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between text-sm font-semibold text-primary-700">
              <Link href={`/platform/${platform.slug}`}>Open profile →</Link>
              <Link href={`/review/${platform.slug}-review`} className="text-slate-500">
                Read review →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
