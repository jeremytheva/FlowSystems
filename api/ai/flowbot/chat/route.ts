import { NextResponse } from 'next/server';

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

type ChatRequestBody = {
  messages: ChatMessage[];
};

function parseJson<T>(parser: () => Promise<T>): Promise<T | undefined> {
  return parser().then(
    (value) => value,
    () => undefined,
  );
}

function validateChatBody(body: unknown): { value?: ChatRequestBody; error?: string } {
  if (!body || typeof body !== 'object') {
    return { error: 'Request body must be a JSON object.' };
  }

  const messages = (body as { messages?: unknown }).messages;

  if (!Array.isArray(messages) || messages.length === 0) {
    return { error: '"messages" must be a non-empty array.' };
  }

  const invalidMessage = messages.find((message) => {
    if (!message || typeof message !== 'object') {
      return true;
    }

    const { role, content } = message as Partial<ChatMessage>;
    return (
      typeof content !== 'string' ||
      content.trim().length === 0 ||
      (role !== 'user' && role !== 'assistant' && role !== 'system')
    );
  });

  if (invalidMessage) {
    return { error: 'Each message must include a valid role and non-empty content.' };
  }

  return { value: { messages: messages as ChatMessage[] } };
}

export async function POST(req: Request) {
  if (!req.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json(
      { ok: false, error: 'Content-Type must be application/json.' },
      { status: 415 },
    );
  }

  const body = await parseJson(() => req.json());

  if (!body) {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON payload.' },
      { status: 400 },
    );
  }

  const result = validateChatBody(body);

  if (!result.value) {
    return NextResponse.json(
      { ok: false, error: result.error ?? 'Invalid chat request.' },
      { status: 422 },
    );
  }

  return NextResponse.json({ ok: true, message: 'chat stub', input: result.value });
}
