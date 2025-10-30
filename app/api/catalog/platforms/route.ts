import { NextResponse } from 'next/server';

import { getPlatformsByCategory, platforms } from '@/data/platforms';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  if (!category) {
    return NextResponse.json({ ok: true, items: platforms });
  }

  return NextResponse.json({ ok: true, category, items: getPlatformsByCategory(category) });
}
