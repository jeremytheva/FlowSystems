import Link from 'next/link';

import { getAllReviews } from '@/lib/mdx';

export const metadata = {
  title: 'Reviews',
  description: 'Deep-dive reviews of operator platforms with factor-weighted scoring and migration guidance.',
};

export default async function ReviewIndexPage() {
  const reviews = await getAllReviews();

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Reviews</p>
        <h1 className="text-3xl font-bold text-slate-900">Operator field notes for modern platforms</h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Every review is grounded in customer interviews, telemetry, and hands-on migrations. Scores map to the factors that matter
          for solos and micro teams.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {reviews.map((review) => (
          <article key={review.frontMatter.slug} className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Score {review.frontMatter.score}</p>
              <h2 className="text-xl font-semibold text-slate-900">{review.frontMatter.title}</h2>
              <p className="text-sm text-slate-600">{review.frontMatter.summary}</p>
            </div>
            <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
              <span>{review.frontMatter.tags.join(' · ')}</span>
              <Link href={`/review/${review.frontMatter.slug}`} className="font-semibold text-primary-700">
                Read review →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {reviews.length === 0 && (
        <p className="rounded-lg border border-dashed border-slate-300 bg-white/70 p-6 text-sm text-slate-500">
          Add a review under <code>content/reviews</code> to populate this section.
        </p>
      )}
    </div>
  );
}
