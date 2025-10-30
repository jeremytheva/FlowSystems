import { NextResponse } from 'next/server';

import { courseCohorts } from '@/data/admin';

export async function GET() {
  return NextResponse.json({ ok: true, courses: courseCohorts });
}
