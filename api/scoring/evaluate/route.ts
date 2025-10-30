import { NextResponse } from 'next/server';

type EvaluationInput = {
  responses: number[];
  weights: number[];
};

function isNumberArray(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => typeof item === 'number' && Number.isFinite(item))
  );
}

function validateEvaluationBody(body: unknown): { value?: EvaluationInput; error?: string } {
  if (!body || typeof body !== 'object') {
    return { error: 'Request body must be a JSON object.' };
  }

  const { responses, weights } = body as Partial<EvaluationInput>;

  if (!isNumberArray(responses)) {
    return { error: '"responses" must be an array of numbers.' };
  }

  if (!isNumberArray(weights)) {
    return { error: '"weights" must be an array of numbers.' };
  }

  if (responses.length !== weights.length) {
    return { error: '"responses" and "weights" must contain the same number of entries.' };
  }

  return { value: { responses, weights } };
}

export async function POST(req: Request) {
  if (!req.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json(
      { ok: false, error: 'Content-Type must be application/json.' },
      { status: 415 },
    );
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

  const result = validateEvaluationBody(body);

  if (!result.value) {
    return NextResponse.json(
      { ok: false, error: result.error ?? 'Invalid evaluation request.' },
      { status: 422 },
    );
  }

  const { responses, weights } = result.value;

  const total = responses.reduce(
    (accumulator, response, index) => accumulator + response * weights[index],
    0,
  );

  return NextResponse.json({ ok: true, total, input: result.value });
}
