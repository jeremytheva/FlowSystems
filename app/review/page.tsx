import { RenderMdx } from '@/lib/mdx';
import { readLatestReview } from '@/lib/data';

export const revalidate = 3600;

export default async function ReviewPage() {
  const entry = await readLatestReview();

  return (
    <article className="prose prose-slate max-w-none">
      <p className="text-sm uppercase tracking-wide text-slate-500">
        Stage tag: {(entry.frontMatter.stage as string) ?? 'solo'}
      </p>
      <RenderMdx source={entry.content} frontMatter={entry.frontMatter} />
    </article>
  );
}
