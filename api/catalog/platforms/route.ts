import { NextResponse } from 'next/server';

import { getPlatforms } from '../../../lib/platforms';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') ?? undefined;

  const items = getPlatforms(category).map((platform) => ({
    slug: platform.slug,
    name: platform.name,
    tagline: platform.tagline,
    categories: platform.categories,
    summary: platform.summary,
    scorecard: platform.scorecard,
  }));

  return NextResponse.json({ ok: true, category: category ?? null, items });
}
