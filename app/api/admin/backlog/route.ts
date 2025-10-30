import { NextResponse } from 'next/server';

import { reviewBacklog } from '@/data/admin';

export async function GET() {
  return NextResponse.json({ ok: true, items: reviewBacklog });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => undefined);
  return NextResponse.json({ ok: true, created: true, input: body ?? null }, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => undefined);
  return NextResponse.json({ ok: true, updated: true, input: body ?? null });
}
