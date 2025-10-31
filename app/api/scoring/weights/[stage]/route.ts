import { NextResponse } from 'next/server';
import { readWeightStage } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { stage: string } }
) {
  const stage = params.stage;
  const data = await readWeightStage(stage);

  if (!data) {
    return NextResponse.json({ ok: false, error: 'stage-not-found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, stage: data.stage, factors: data.factors });
}
