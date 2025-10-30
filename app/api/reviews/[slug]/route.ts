import { NextResponse } from 'next/server';

import { getReviewBySlug } from '@/lib/mdx';

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const review = await getReviewBySlug(params.slug);

  if (!review) {
    return NextResponse.json({ message: 'Review not found' }, { status: 404 });
  }

  return NextResponse.json({
    frontMatter: review.frontMatter,
  });
}
