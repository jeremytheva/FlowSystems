import { NextResponse } from 'next/server';
import { readPlatforms } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') ?? undefined;

  const platforms = await readPlatforms(category ?? undefined);

  return NextResponse.json({ ok: true, category: category ?? null, items: platforms });
}
