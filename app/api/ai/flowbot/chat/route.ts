import { NextResponse } from 'next/server';

const prompts = [
  'Summarize the FlowOS review in two bullet points.',
  'What migration risks should I flag for SprintKit?',
  'Compare FlowOS and HubSpot Starter for automation-led teams.',
];

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({ ok: true, message: 'chat stub', input: body, samplePrompts: prompts });
}
