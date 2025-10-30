import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getAllReviews, getReviewBySlug } from '@/lib/mdx';

interface ReviewPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const reviews = await getAllReviews();
  return reviews.map((review) => ({ slug: review.frontMatter.slug }));
}

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const review = await getReviewBySlug(params.slug);

  if (!review) {
    return {
      title: 'Review not found',
    };
  }

  return {
    title: review.frontMatter.title,
    description: review.frontMatter.summary,
  };
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const review = await getReviewBySlug(params.slug);

  if (!review) {
    notFound();
  }

  const resolvedReview = review;

  return (
    <article className="prose prose-slate max-w-none">
      <Link href="/review" className="text-sm font-semibold text-primary-700">
        ← Back to reviews
      </Link>
      <h1>{resolvedReview.frontMatter.title}</h1>
      <p className="text-base text-slate-600">{resolvedReview.frontMatter.summary}</p>
      <div className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white/80 p-6 text-sm text-slate-600 md:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Overall score</p>
          <p className="text-3xl font-semibold text-primary-700">{resolvedReview.frontMatter.score}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="font-medium text-slate-800">{resolvedReview.frontMatter.status}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Tags</p>
          <p>{resolvedReview.frontMatter.tags.join(' · ')}</p>
        </div>
      </div>
      <div className="mt-10 space-y-6 text-slate-800">{resolvedReview.content}</div>
    </article>
  );
}
