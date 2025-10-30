import { NextResponse } from 'next/server';

import { factorWeights } from '@/data/scoring';

export async function GET() {
  return NextResponse.json(factorWeights);
}
