const samplePlatforms = [
  {
    id: 'acme-crm',
    name: 'Acme CRM',
    category: 'CRM',
    pricing: { starter: 12, pro: 29 },
    tags: ['solo-friendly'],
  },
  {
    id: 'zen-mail',
    name: 'Zen Mail',
    category: 'Email',
    pricing: { starter: 5, pro: 15 },
    tags: ['simple', 'affordable'],
  },
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const category = url.searchParams.get('category');
  const platforms = category
    ? samplePlatforms.filter((platform) => platform.category === category)
    : samplePlatforms;

  return Response.json(platforms);
}
