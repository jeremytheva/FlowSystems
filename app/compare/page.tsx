import { RenderMdx } from '@/lib/mdx';
import { readLatestComparison } from '@/lib/data';

export const revalidate = 3600;

export default async function ComparePage() {
  const entry = await readLatestComparison();

  return (
    <article className="prose prose-slate max-w-none">
      <RenderMdx source={entry.content} frontMatter={entry.frontMatter} />
    </article>
  );
}
