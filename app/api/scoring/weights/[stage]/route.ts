import { NextResponse } from 'next/server';

import { factorWeights } from '@/data/scoring';

export async function GET(
  _request: Request,
  { params }: { params: { stage: string } }
) {
  return NextResponse.json({ ok: true, stage: params.stage, weights: factorWeights });
}

export async function PATCH(
  request: Request,
  { params }: { params: { stage: string } }
) {
  const body = await request.json().catch(() => undefined);
  return NextResponse.json({ ok: true, stage: params.stage, updated: body ?? null });
}
