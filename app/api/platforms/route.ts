import { NextResponse } from 'next/server';

import { platforms } from '@/data/platforms';

export async function GET() {
  return NextResponse.json(platforms);
}
