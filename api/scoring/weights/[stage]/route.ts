import { NextResponse } from 'next/server';

type WeightConfig = {
  weights: number[];
};

const VALID_STAGES = new Set(['draft', 'published']);

function ensureStage(stage: string) {
  if (!VALID_STAGES.has(stage)) {
    return NextResponse.json(
      { ok: false, error: `Unknown stage "${stage}".` },
      { status: 404 },
    );
  }

  return undefined;
}

function ensureJsonRequest(req: Request) {
  if (!req.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json(
      { ok: false, error: 'Content-Type must be application/json.' },
      { status: 415 },
    );
  }

  return undefined;
}

function validateWeightBody(body: unknown): { value?: WeightConfig; error?: string } {
  if (!body || typeof body !== 'object') {
    return { error: 'Request body must be a JSON object.' };
  }

  const { weights } = body as Partial<WeightConfig>;

  if (
    !Array.isArray(weights) ||
    weights.length === 0 ||
    !weights.every((weight) => typeof weight === 'number' && Number.isFinite(weight))
  ) {
    return { error: '"weights" must be a non-empty array of numbers.' };
  }

  return { value: { weights } };
}

export async function GET(_: Request, { params }: { params: { stage: string } }) {
  const invalidStage = ensureStage(params.stage);
  if (invalidStage) {
    return invalidStage;
  }

  return NextResponse.json({ ok: true, stage: params.stage, weights: [] });
}

export async function PATCH(req: Request, { params }: { params: { stage: string } }) {
  const invalidStage = ensureStage(params.stage);
  if (invalidStage) {
    return invalidStage;
  }

  const invalidRequest = ensureJsonRequest(req);
  if (invalidRequest) {
    return invalidRequest;
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON payload.' },
      { status: 400 },
    );
  }

  const result = validateWeightBody(body);

  if (!result.value) {
    return NextResponse.json(
      { ok: false, error: result.error ?? 'Invalid weight configuration.' },
      { status: 422 },
    );
  }

  return NextResponse.json({ ok: true, stage: params.stage, updated: result.value });
}
