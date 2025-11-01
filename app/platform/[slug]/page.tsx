import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface Platform {
  id: string;
  name: string;
  category: string;
  pricing: Record<string, number>;
  tags: string[];
}

async function fetchPlatforms(): Promise<Platform[]> {
  const headersList = headers();
  const protocol = headersList.get('x-forwarded-proto') ?? 'http';
  const host = headersList.get('host');
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || (host ? `${protocol}://${host}` : '');

  const response = await fetch(`${baseUrl}/api/catalog/platforms`, {
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch platforms');
  }

  return (await response.json()) as Platform[];
}

export default async function PlatformPage({
  params,
}: {
  params: { slug: string };
}) {
  const platforms = await fetchPlatforms();
  const platform = platforms.find((item) => item.id === params.slug) ?? notFound();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{platform.name}</h1>
      <p className="text-gray-600">{platform.category}</p>
      <ul className="mt-4">
        {Object.entries(platform.pricing).map(([tier, price]) => (
          <li key={tier}>
            {tier}: ${price}/mo
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function generateStaticParams() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  if (!baseUrl) {
    return [];
  }

  try {
    const response = await fetch(`${baseUrl}/api/catalog/platforms`);
    if (!response.ok) {
      return [];
    }

    const platforms = (await response.json()) as Platform[];
    return platforms.map((platform) => ({ slug: platform.id }));
  } catch (error) {
    console.error('Failed to prefetch platform slugs', error);
    return [];
  }
}
