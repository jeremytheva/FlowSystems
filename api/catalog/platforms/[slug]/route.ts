import { NextResponse } from 'next/server';

import { getPlatformBySlug } from '../../../../lib/platforms';

type RouteContext = {
  params: {
    slug: string;
  };
};

export async function GET(_req: Request, context: RouteContext) {
  const platform = getPlatformBySlug(context.params.slug);

  if (!platform) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Platform not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ ok: true, platform });
}
