import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getPlatformsByCategory, platforms } from '@/data/platforms';

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const categories = new Set(platforms.flatMap((platform) => platform.categories));
  return Array.from(categories).map((category) => ({ slug: category }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const items = getPlatformsByCategory(params.slug);
  if (items.length === 0) {
    return { title: 'Category not found' };
  }

  const formatted = params.slug.replace(/-/g, ' ');
  return {
    title: `${formatted} platforms`,
    description: `Curated platforms serving ${formatted} workflows.`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const items = getPlatformsByCategory(params.slug);

  if (items.length === 0) {
    notFound();
  }

  const formatted = params.slug.replace(/-/g, ' ');

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <Link href="/platform" className="text-sm font-semibold text-primary-700">
          ← Back to platforms
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">{formatted} platforms</h1>
        <p className="text-sm text-slate-600">Tools FlowSystems has vetted for this job-to-be-done.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((platform) => (
          <article key={platform.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{platform.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{platform.summary}</p>
            <div className="mt-4 flex items-center justify-between text-sm text-primary-700">
              <Link href={`/platform/${platform.slug}`}>View profile →</Link>
              <Link href={`/review/${platform.slug}-review`} className="text-slate-500">
                Review →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
