import { notFound } from "next/navigation";

import { Section } from "@/app/components/Section";
import { platforms } from "@/app/data/catalog/platforms";
import { buildReviewFromTemplate } from "@/app/lib/content/review-template";

export const dynamic = "force-dynamic";

const reviewSlugs = platforms.map((platform) => `${platform.id}-review`);

export function generateStaticParams() {
  try {
    console.log("[build] Generating static params for reviews:", reviewSlugs.length);
    return reviewSlugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("[build] Failed to generate review slugs:", error);
    return [];
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  if (!reviewSlugs.includes(params.slug)) {
    notFound();
  }

  const review = await buildReviewFromTemplate(params.slug);

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Review</p>
        <h1 className="text-4xl font-bold text-slate-900">{review.title}</h1>
        <p className="text-base text-slate-600">{review.summary.headline}</p>
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Generated {new Date(review.summary.generatedAt).toLocaleDateString()} · Tags: {review.tags.join(", ")}
        </p>
      </header>

      <Section
        eyebrow="Score"
        title="How this platform performs"
        contentClassName="grid gap-4 md:grid-cols-[1fr_2fr]"
      >
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Composite Score</p>
          <p className="mt-2 text-4xl font-semibold text-slate-900">{review.score.toFixed(1)}</p>
          <p className="mt-2 text-sm text-slate-600">Status: {review.status}</p>
        </div>
        <table className="w-full text-sm text-slate-600">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="pb-2 text-left">Factor</th>
              <th className="pb-2 text-left">Direction</th>
              <th className="pb-2 text-left">Weight</th>
              <th className="pb-2 text-left">Raw</th>
            </tr>
          </thead>
          <tbody>
            {review.factors.map((factor) => (
              <tr key={factor.key} className="border-t border-slate-200">
                <td className="py-2 font-medium text-slate-900">{factor.key}</td>
                <td className="py-2 capitalize">{factor.direction}</td>
                <td className="py-2">{Math.round(factor.weight * 100)}%</td>
                <td className="py-2">{factor.raw}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section
        eyebrow="Narrative"
        title="Operator summary"
        description="Draft content generated from the template. Replace with research-backed insights during production."
      >
        <article className="prose prose-slate max-w-none text-sm">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{review.body}</pre>
        </article>
      </Section>
    </div>
  );
}
