import { NextResponse } from 'next/server';

type BacklogItem = {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'done';
  assignedTo?: string;
};

type CreateBacklogInput = {
  title: string;
  description?: string;
};

type UpdateBacklogInput = {
  id: string;
  title?: string;
  description?: string;
  status?: BacklogItem['status'];
  assignedTo?: string;
};

const MOCK_ITEMS: BacklogItem[] = [];

function ensureJsonRequest(req: Request) {
  if (!req.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json(
      { ok: false, error: 'Content-Type must be application/json.' },
      { status: 415 },
    );
  }

  return undefined;
}

function validateCreateBody(body: unknown): { value?: CreateBacklogInput; error?: string } {
  if (!body || typeof body !== 'object') {
    return { error: 'Request body must be a JSON object.' };
  }

  const { title, description } = body as Partial<CreateBacklogInput>;

  if (typeof title !== 'string' || title.trim().length === 0) {
    return { error: '"title" is required and must be a non-empty string.' };
  }

  if (description !== undefined && typeof description !== 'string') {
    return { error: '"description" must be a string when provided.' };
  }

  return { value: { title: title.trim(), description } };
}

function validateUpdateBody(body: unknown): { value?: UpdateBacklogInput; error?: string } {
  if (!body || typeof body !== 'object') {
    return { error: 'Request body must be a JSON object.' };
  }

  const { id, title, description, status, assignedTo } = body as Partial<UpdateBacklogInput>;

  if (typeof id !== 'string' || id.trim().length === 0) {
    return { error: '"id" is required and must be a non-empty string.' };
  }

  if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
    return { error: '"title" must be a non-empty string when provided.' };
  }

  if (description !== undefined && typeof description !== 'string') {
    return { error: '"description" must be a string when provided.' };
  }

  if (
    status !== undefined &&
    status !== 'pending' &&
    status !== 'in_progress' &&
    status !== 'done'
  ) {
    return { error: '"status" must be one of "pending", "in_progress", or "done".' };
  }

  if (assignedTo !== undefined && typeof assignedTo !== 'string') {
    return { error: '"assignedTo" must be a string when provided.' };
  }

  if (title === undefined && description === undefined && status === undefined && assignedTo === undefined) {
    return { error: 'At least one field must be provided to update.' };
  }

  return {
    value: {
      id: id.trim(),
      title: title?.trim(),
      description,
      status,
      assignedTo,
    },
  };
}

export async function GET() {
  return NextResponse.json({ ok: true, items: MOCK_ITEMS });
}

export async function POST(req: Request) {
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

  const result = validateCreateBody(body);

  if (!result.value) {
    return NextResponse.json(
      { ok: false, error: result.error ?? 'Invalid backlog item.' },
      { status: 422 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      created: true,
      item: {
        id: 'backlog-item-demo',
        title: result.value.title,
        description: result.value.description,
      },
    },
    { status: 201 },
  );
}

export async function PATCH(req: Request) {
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

  const result = validateUpdateBody(body);

  if (!result.value) {
    return NextResponse.json(
      { ok: false, error: result.error ?? 'Invalid backlog update.' },
      { status: 422 },
    );
  }

  return NextResponse.json({ ok: true, updated: true, item: result.value });
}
