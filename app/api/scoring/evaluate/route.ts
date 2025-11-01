import { NextResponse } from 'next/server';

type FactorInput = {
  key: string;
  raw: number;
  weight: number;
  direction?: 'normal' | 'inverted';
  scale?: number;
};

class HttpError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

function validateFactors(value: unknown): FactorInput[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new HttpError('`factors` must be a non-empty array', 422);
  }

  return value.map((factor) => {
    if (typeof factor !== 'object' || factor === null) {
      throw new HttpError('Each factor must be an object', 422);
    }

    const { key, raw, weight, direction = 'normal', scale = 5 } =
      factor as Record<string, unknown>;

    if (typeof key !== 'string' || key.trim() === '') {
      throw new HttpError('Each factor must include a key', 422);
    }

    if (typeof raw !== 'number' || Number.isNaN(raw)) {
      throw new HttpError(`Factor "${key}" is missing a numeric raw score`, 422);
    }

    if (typeof weight !== 'number' || !Number.isFinite(weight) || weight <= 0) {
      throw new HttpError(
        `Factor "${key}" must have a positive numeric weight`,
        422
      );
    }

    if (typeof scale !== 'number' || !Number.isFinite(scale) || scale <= 0) {
      throw new HttpError(
        `Factor "${key}" must define a positive numeric scale`,
        422
      );
    }

    if (direction !== 'normal' && direction !== 'inverted') {
      throw new HttpError(
        `Factor "${key}" has an unsupported direction: ${direction}`,
        422
      );
    }

    return { key, raw, weight, direction, scale };
  });
}

function normalizeScore(raw: number, direction: 'normal' | 'inverted', scale: number) {
  const boundedRaw = Math.min(Math.max(raw, 0), scale);
  const normalized = direction === 'inverted' ? scale - boundedRaw : boundedRaw;
  return normalized / scale;
}

export async function POST(req: Request) {
  try {
    let payload: unknown;

    const contentType = req.headers.get('content-type') ?? '';

    if (!contentType.toLowerCase().includes('application/json')) {
      throw new HttpError('Expected application/json body', 415);
    }

    try {
      payload = await req.json();
    } catch (error) {
      throw new HttpError('Invalid JSON payload', 400);
    }

    if (!payload || typeof payload !== 'object') {
      throw new HttpError('Body must be a JSON object', 400);
    }

    const { factors } = payload as { factors?: unknown };

    const normalizedFactors = validateFactors(factors).map((factor) => {
      const normalizedScore = normalizeScore(
        factor.raw,
        factor.direction,
        factor.scale
      );
      return {
        ...factor,
        normalizedScore,
        weightedScore: normalizedScore * factor.weight,
      };
    });

    const totalWeight = normalizedFactors.reduce((sum, factor) => sum + factor.weight, 0);

    if (totalWeight === 0) {
      throw new HttpError('Total weight must be greater than 0', 422);
    }

    const weightedSum = normalizedFactors.reduce(
      (sum, factor) => sum + factor.weightedScore,
      0
    );

    const total = Number(((weightedSum / totalWeight) * 100).toFixed(2));

    return NextResponse.json({
      ok: true,
      total,
      breakdown: normalizedFactors.map(({ weightedScore, ...factor }) => ({
        ...factor,
        weightedScore: Number(weightedScore.toFixed(4)),
      })),
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: error.status }
      );
    }

    console.error('Unexpected scoring evaluation error', error);
    return NextResponse.json(
      { ok: false, error: 'Unexpected error' },
      { status: 500 }
    );
  }
}
