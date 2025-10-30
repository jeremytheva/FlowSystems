import { NextResponse } from 'next/server';

import { factorWeights } from '@/data/scoring';

interface EvaluatePayload {
  scores: Record<string, number>;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as EvaluatePayload;
  const weightedTotal = factorWeights.reduce((total, factor) => {
    const value = body.scores?.[factor.key] ?? 0;
    return total + value * factor.weight;
  }, 0);

  return NextResponse.json({ ok: true, total: weightedTotal, input: body });
}
