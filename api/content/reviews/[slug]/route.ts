import { NextResponse } from 'next/server';
import { buildReviewFromTemplate, InvalidReviewSlugError } from '../../../../lib/content/review-template';

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const review = await buildReviewFromTemplate(params.slug);
    return NextResponse.json({ ok: true, slug: params.slug, review });
  } catch (error) {
    if (error instanceof InvalidReviewSlugError) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 404 }
      );
    }

    console.error('Failed to generate review payload', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to load review content' },
      { status: 500 }
    );
  }
}
