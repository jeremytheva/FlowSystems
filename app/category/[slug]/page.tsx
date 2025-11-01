import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "../../components/Section";
import { categories } from "../../data/catalog/categories";
import { platforms } from "../../data/catalog/platforms";
import { featuredPrograms } from "../../data/library/programs";

interface CategoryPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default function Page({ params }: CategoryPageProps) {
  const category = categories.find((item) => item.slug === params.slug);

  if (!category) {
    notFound();
  }

  const relatedPrograms = featuredPrograms.filter((program) => program.categorySlug === category.slug);
  const relatedPlatforms = platforms.filter((platform) => platform.category === category.slug);

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-6 py-12">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Category</p>
        <h1 className="text-4xl font-bold text-slate-900">{category.name}</h1>
        <p className="max-w-3xl text-base text-slate-600">{category.heroStatement}</p>
      </header>

      <Section
        eyebrow="Focus areas"
        title="Where this category unlocks leverage"
        description="These themes guide the research backlog, platform evaluations, and enablement kits we ship first."
        contentClassName="grid gap-4 sm:grid-cols-2"
      >
        {category.focusAreas.map((area) => (
          <div key={area} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">{area}</p>
            <p className="mt-2 text-sm text-slate-600">
              We track signals and success stories in this area to keep the playbook current.
            </p>
          </div>
        ))}
      </Section>

      <Section
        eyebrow="Programs"
        title="Programs validating this category"
        description="Each program blends research, telemetry, and enablement to deliver measurable outcomes."
        contentClassName="grid gap-6 md:grid-cols-2"
      >
        {relatedPrograms.length > 0 ? (
          relatedPrograms.map((program) => (
            <article key={program.slug} className="space-y-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{program.name}</h2>
              <p className="text-sm text-slate-600">{program.summary}</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-500">
                {program.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Signals: {program.recommendedSignals.join(", ")}
              </p>
            </article>
          ))
        ) : (
          <p className="text-sm text-slate-600">We are actively designing programs for this category.</p>
        )}
      </Section>

      <Section
        eyebrow="Platforms"
        title="Platforms we monitor for this category"
        description="These vendors anchor the stack recommendations and comparison experiences."
        contentClassName="grid gap-6 md:grid-cols-2"
      >
        {relatedPlatforms.length > 0 ? (
          relatedPlatforms.map((platform) => (
            <article key={platform.id} className="space-y-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{platform.name}</h3>
              <p className="text-sm text-slate-600">{platform.tagline}</p>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Tags: {platform.tags.join(", ")}
              </p>
              <Link className="text-sm font-semibold text-slate-900 underline" href={`/platform/${platform.id}`}>
                View platform profile
              </Link>
            </article>
          ))
        ) : (
          <p className="text-sm text-slate-600">Platform evaluations are in progress for this category.</p>
        )}
      </Section>
    </div>
  );
}
