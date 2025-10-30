import { NextResponse } from 'next/server';

import { getReviewBySlug } from '@/lib/mdx';

interface ReviewParams {
  params: { slug: string };
}

export async function GET(_request: Request, { params }: ReviewParams) {
  const review = await getReviewBySlug(params.slug);

  if (!review) {
    return NextResponse.json({ message: 'Review not found' }, { status: 404 });
  }

  return NextResponse.json({
    frontMatter: review.frontMatter,
  });
}
