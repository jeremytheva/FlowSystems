import {
  buildReviewFromTemplate,
  InvalidReviewSlugError,
} from '../../../../lib/content/review-template';

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const review = await buildReviewFromTemplate(params.slug);
    return new Response(
      JSON.stringify({ ok: true, slug: review.slug, review }),
      {
        headers: { 'content-type': 'application/json' },
      }
    );
  } catch (error) {
    if (error instanceof InvalidReviewSlugError) {
      return new Response(
        JSON.stringify({ ok: false, error: error.message }),
        {
          status: 400,
          headers: { 'content-type': 'application/json' },
        }
      );
    }

    console.error('Failed to generate review payload', error);
    return new Response(
      JSON.stringify({ ok: false, error: 'Failed to load review content' }),
      {
        status: 500,
        headers: { 'content-type': 'application/json' },
      }
    );
  }
}
