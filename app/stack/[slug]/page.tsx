import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "../../components/Section";
import { platforms } from "../../data/catalog/platforms";
import { stacks } from "../../data/stacks";

export function generateStaticParams() {
  return stacks.map((stack) => ({ slug: stack.slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const stack = stacks.find((item) => item.slug === params.slug);

  if (!stack) {
    notFound();
  }

  const stackPlatforms = platforms.filter((platform) => stack.platforms.includes(platform.id));

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Stack</p>
        <h1 className="text-4xl font-bold text-slate-900">{stack.name}</h1>
        <p className="text-base text-slate-600">{stack.description}</p>
        <p className="text-xs uppercase tracking-wide text-slate-500">Focus: {stack.focus}</p>
      </header>

      <Section
        eyebrow="Why this stack works"
        title="Highlights from live deployments"
        contentClassName="grid gap-4 md:grid-cols-2"
      >
        {stack.highlights.map((highlight) => (
          <div key={highlight} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-600">{highlight}</p>
          </div>
        ))}
      </Section>

      <Section eyebrow="Platforms" title="Core platforms powering this stack">
        <ul className="grid gap-4 md:grid-cols-2">
          {stackPlatforms.map((platform) => (
            <li key={platform.id} className="space-y-2 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{platform.name}</h2>
              <p className="text-sm text-slate-600">{platform.tagline}</p>
              <Link className="text-sm font-semibold text-indigo-600 underline" href={`/platform/${platform.id}`}>
                View platform profile
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Signals" title="Metrics we monitor">
        <div className="grid gap-4 sm:grid-cols-2">
          {stack.metrics.map((metric) => (
            <div key={metric.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">{metric.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</p>
              <p className="mt-2 text-xs font-semibold uppercase text-emerald-600">{metric.change}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Flows" title="Recommended operating rituals">
        <ul className="list-disc space-y-2 pl-6 text-sm text-slate-600">
          {stack.recommendedFlows.map((flow) => (
            <li key={flow}>{flow}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
