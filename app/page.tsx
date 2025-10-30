import Link from 'next/link';

import { platforms } from '@/data/platforms';
import { getAllReviews } from '@/lib/mdx';

export default async function HomePage() {
  const [primaryReview, ...restReviews] = await getAllReviews();
  const featuredPlatforms = platforms.slice(0, 2);

  return (
    <div className="space-y-16">
      <section className="grid gap-10 rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-slate-100 p-10 shadow-sm md:grid-cols-2">
        <div className="space-y-6">
          <p className="inline-flex rounded-full bg-primary-100 px-4 py-1 text-sm font-medium text-primary-700">
            Operator intelligence for lean teams
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Pick the right platform, ship revenue faster.
          </h1>
          <p className="text-lg text-slate-600">
            FlowSystems maps the journey from evaluation to migration. Explore factor-weighted scores, compare trade-offs, and
            follow step-by-step playbooks to roll out tools without derailing your roadmap.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/review"
              className="rounded-full bg-primary-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
            >
              Read the latest reviews
            </Link>
            <Link href="/platform" className="text-sm font-semibold text-primary-700">
              Browse platforms →
            </Link>
          </div>
        </div>
        {primaryReview ? (
          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-white/70 p-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">Latest deep dive</p>
              <h2 className="text-2xl font-semibold text-slate-900">{primaryReview.frontMatter.title}</h2>
              <p className="text-sm text-slate-600">{primaryReview.frontMatter.summary}</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-700">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
                <p className="text-2xl font-semibold text-primary-700">{primaryReview.frontMatter.score}/100</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
                <p className="font-medium">{primaryReview.frontMatter.status}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Tags</p>
                <p>{primaryReview.frontMatter.tags.join(', ')}</p>
              </div>
            </div>
            <Link href={`/review/${primaryReview.frontMatter.slug}`} className="text-sm font-semibold text-primary-700">
              Open the review →
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
            Author your first review in <code>content/reviews</code> to feature it here.
          </div>
        )}
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Featured platforms</h2>
          <Link href="/platform" className="text-sm font-semibold text-primary-700">
            See all platforms →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredPlatforms.map((platform) => (
            <article key={platform.id} className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">{platform.categories.join(' · ')}</p>
                <h3 className="text-lg font-semibold text-slate-900">{platform.name}</h3>
                <p className="text-sm text-slate-600">{platform.summary}</p>
              </div>
              <div className="mt-6 space-y-2 text-sm text-slate-700">
                {platform.highlights.map((highlight) => (
                  <p key={highlight} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-500" aria-hidden />
                    <span>{highlight}</span>
                  </p>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between text-sm font-semibold text-primary-700">
                <Link href={`/platform/${platform.slug}`}>Explore {platform.name} →</Link>
                <Link href={platform.website} className="text-slate-500" rel="noopener noreferrer">
                  Website ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {restReviews.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-900">More operator notes</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {restReviews.map((review) => (
              <article key={review.frontMatter.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Review</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{review.frontMatter.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{review.frontMatter.summary}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="font-semibold text-primary-700">Score {review.frontMatter.score}</span>
                  <Link href={`/review/${review.frontMatter.slug}`} className="font-semibold text-primary-700">
                    Read →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
