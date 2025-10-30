import { NextResponse } from 'next/server';

const comments = [
  {
    id: '1',
    author: 'Jess',
    message: 'Ran the FlowOS pilot in March—automation recipes saved hours.',
  },
];

export async function GET() {
  return NextResponse.json({ ok: true, comments });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => undefined);
  return NextResponse.json({ ok: true, created: true, input: body ?? null }, { status: 201 });
}
