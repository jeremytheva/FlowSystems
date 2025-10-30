import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { comparisons, getComparisonBySlug } from '@/data/comparisons';
import { CompareTable } from '@/components/CompareTable';

interface ComparisonPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return comparisons.map((comparison) => ({ slug: comparison.slug }));
}

export async function generateMetadata({ params }: ComparisonPageProps): Promise<Metadata> {
  const comparison = getComparisonBySlug(params.slug);

  if (!comparison) {
    return {
      title: 'Comparison not found',
    };
  }

  return {
    title: comparison.title,
    description: comparison.summary,
  };
}

export default function ComparisonPage({ params }: ComparisonPageProps) {
  const comparison = getComparisonBySlug(params.slug);

  if (!comparison) {
    notFound();
  }

  return (
    <article className="space-y-8">
      <Link href="/compare" className="text-sm font-semibold text-primary-700">
        ← Back to comparisons
      </Link>
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900">{comparison.title}</h1>
        <p className="text-lg text-slate-600">{comparison.summary}</p>
      </header>
      <p className="max-w-3xl text-sm text-slate-700">{comparison.narrative}</p>
      <CompareTable rows={comparison.rows} />
    </article>
  );
}
