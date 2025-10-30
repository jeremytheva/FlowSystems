import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getPlatformBySlug, platforms } from '@/data/platforms';

interface PlatformPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return platforms.map((platform) => ({ slug: platform.slug }));
}

export async function generateMetadata({ params }: PlatformPageProps): Promise<Metadata> {
  const platform = getPlatformBySlug(params.slug);

  if (!platform) {
    return {
      title: 'Platform not found',
    };
  }

  return {
    title: `${platform.name} platform profile`,
    description: platform.summary,
  };
}

export default function PlatformPage({ params }: PlatformPageProps) {
  const platform = getPlatformBySlug(params.slug);

  if (!platform) {
    notFound();
  }

  const resolvedPlatform = platform;

  const weightedScore = resolvedPlatform.factors.reduce((total, factor) => {
    const normalized = factor.direction === 'normal' ? factor.score : 10 - factor.score;
    return total + normalized * factor.weight;
  }, 0);

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <Link href="/platform" className="text-sm font-semibold text-primary-700">
          ← Back to platforms
        </Link>
        <h1 className="text-4xl font-bold text-slate-900">{resolvedPlatform.name}</h1>
        <p className="text-lg text-slate-600">{resolvedPlatform.headline}</p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="rounded-full bg-primary-100 px-3 py-1 font-semibold text-primary-700">
            Weighted score {(weightedScore * 10).toFixed(0)}/100
          </span>
          <span>{resolvedPlatform.categories.join(' · ')}</span>
          <Link href={resolvedPlatform.website} className="font-semibold text-primary-700" rel="noopener noreferrer">
            Visit website ↗
          </Link>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-4 text-sm text-slate-700">
          <p>{resolvedPlatform.summary}</p>
          <h2 className="text-base font-semibold text-slate-900">Highlights</h2>
          <ul className="space-y-2">
            {resolvedPlatform.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary-500" aria-hidden />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          <Link href={`/review/${resolvedPlatform.slug}-review`} className="text-sm font-semibold text-primary-700">
            Read full review →
          </Link>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Factor scores</h2>
          <dl className="mt-4 space-y-3 text-sm text-slate-700">
            {resolvedPlatform.factors.map((factor) => (
              <div key={factor.key} className="flex items-center justify-between gap-3">
                <div>
                  <dt className="font-medium text-slate-800">{factor.label}</dt>
                  <dd className="text-xs uppercase tracking-wide text-slate-500">
                    Weight {(factor.weight * 100).toFixed(0)}% · {factor.direction === 'normal' ? 'Higher is better' : 'Lower is better'}
                  </dd>
                </div>
                <span className="text-lg font-semibold text-primary-700">{factor.score.toFixed(1)}</span>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </article>
  );
}
