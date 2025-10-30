import { NextResponse } from 'next/server';

import { getPlatformsByCategory } from '@/data/platforms';

interface CategoryParams {
  params: { slug: string };
}

export async function GET(_request: Request, { params }: CategoryParams) {
  const items = getPlatformsByCategory(params.slug);
  if (items.length === 0) {
    return NextResponse.json({ message: 'Category not found' }, { status: 404 });
  }

  return NextResponse.json(items);
}
