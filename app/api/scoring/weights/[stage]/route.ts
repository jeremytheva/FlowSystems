import { NextResponse } from 'next/server';

import { factorWeights } from '@/data/scoring';

interface Params {
  params: { stage: string };
}

export async function GET(_request: Request, { params }: Params) {
  return NextResponse.json({ ok: true, stage: params.stage, weights: factorWeights });
}

export async function PATCH(request: Request, { params }: Params) {
  const body = await request.json().catch(() => undefined);
  return NextResponse.json({ ok: true, stage: params.stage, updated: body ?? null });
}
