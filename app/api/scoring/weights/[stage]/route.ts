import type { RouteContext } from 'next';
import { NextResponse } from 'next/server';

import { factorWeights } from '@/data/scoring';

export async function GET(_request: Request, context: RouteContext<{ stage: string }>) {
  const { params } = context;
  return NextResponse.json({ ok: true, stage: params.stage, weights: factorWeights });
}

export async function PATCH(request: Request, context: RouteContext<{ stage: string }>) {
  const { params } = context;
  const body = await request.json().catch(() => undefined);
  return NextResponse.json({ ok: true, stage: params.stage, updated: body ?? null });
}
