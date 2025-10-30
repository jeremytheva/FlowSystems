import { NextResponse } from 'next/server';

import { getPlatformsByCategory } from '@/data/platforms';

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const items = getPlatformsByCategory(params.slug);
  if (items.length === 0) {
    return NextResponse.json({ message: 'Category not found' }, { status: 404 });
  }

  return NextResponse.json(items);
}
