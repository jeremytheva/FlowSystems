import { NextResponse } from 'next/server';

import { comparisons } from '@/data/comparisons';

export async function GET() {
  return NextResponse.json(comparisons);
}
