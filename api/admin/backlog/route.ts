import { NextRequest, NextResponse } from 'next/server';

class HttpError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

function ensureAdminAuthorized(request: NextRequest) {
  const configuredToken = process.env.ADMIN_BACKLOG_TOKEN;

  if (!configuredToken) {
    throw new HttpError('Admin authorization is not configured', 500);
  }

  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    throw new HttpError('Missing authorization header', 401);
  }

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length).trim()
    : authHeader.trim();

  if (token !== configuredToken) {
    throw new HttpError('Invalid admin credentials', 401);
  }
}

async function readJsonBody<T>(request: NextRequest): Promise<T> {
  const contentType = request.headers.get('content-type') ?? '';

  if (!contentType.toLowerCase().includes('application/json')) {
    throw new HttpError('Expected application/json body', 415);
  }

  try {
    return await request.json();
  } catch (error) {
    throw new HttpError('Invalid JSON payload', 400);
  }
}

function handleError(error: unknown) {
  if (error instanceof HttpError) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: error.status }
    );
  }

  console.error('Unexpected backlog API error', error);
  return NextResponse.json(
    { ok: false, error: 'Unexpected error' },
    { status: 500 }
  );
}

export async function GET(request: NextRequest) {
  try {
    ensureAdminAuthorized(request);
    return NextResponse.json({ ok: true, items: [] });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    ensureAdminAuthorized(request);
    const body = await readJsonBody<Record<string, unknown>>(request);
    return NextResponse.json(
      { ok: true, created: true, item: body },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    ensureAdminAuthorized(request);
    const body = await readJsonBody<Record<string, unknown>>(request);
    return NextResponse.json({ ok: true, updated: true, item: body });
  } catch (error) {
    return handleError(error);
  }
}
