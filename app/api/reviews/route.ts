import { NextResponse } from 'next/server';

import { getAllReviews } from '@/lib/mdx';

export async function GET() {
  const reviews = await getAllReviews();
  return NextResponse.json(
    reviews.map((review) => ({
      slug: review.frontMatter.slug,
      title: review.frontMatter.title,
      summary: review.frontMatter.summary,
      score: review.frontMatter.score,
      status: review.frontMatter.status,
      tags: review.frontMatter.tags,
    })),
  );
}
