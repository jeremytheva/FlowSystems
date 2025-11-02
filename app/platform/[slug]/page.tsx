import Link from "next/link";
import { notFound } from "next/navigation";

import { Section } from "@/app/components/Section";
import { platforms } from "@/app/data/catalog/platforms";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  try {
    console.log("[build] Generating static params for platforms:", platforms.length);
    return platforms.map((platform) => ({ slug: platform.id }));
  } catch (error) {
    console.error("[build] Failed to load platforms:", error);
    return [];
  }
}

function normalisePlatformSlug(rawSlug: string) {
  if (!rawSlug) {
    return "";
  }

  let decoded = rawSlug;
  try {
    decoded = decodeURIComponent(rawSlug);
  } catch (error) {
    console.warn("[platform] Failed to decode slug", rawSlug, error);
  }

  return decoded.trim().toLowerCase();
}

export default function PlatformPage({ params }: { params: { slug: string } }) {
  const slug = normalisePlatformSlug(params.slug);
  const platform = platforms.find((item) => item.id === slug);

  if (!platform) {
    console.warn("[platform] Missing platform for slug", params.slug);
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl space-y-10 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Platform</p>
        <h1 className="text-4xl font-bold text-slate-900">{platform.name}</h1>
        <p className="text-base text-slate-600">{platform.tagline}</p>
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wide text-slate-500">
          {platform.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1">
              {tag}
            </span>
          ))}
        </div>
        <Link className="text-sm font-semibold text-indigo-600 underline" href={platform.website}>
          Visit website
        </Link>
      </header>

      <Section
        eyebrow="Overview"
        title="What this platform enables"
        description="Snapshot of the core jobs to be done and why operators choose it for this stack."
      >
        <p className="text-sm text-slate-600">{platform.overview}</p>
      </Section>

      <Section
        eyebrow="Capabilities"
        title="How the platform delivers outcomes"
        contentClassName="grid gap-4 sm:grid-cols-2"
      >
        {platform.capabilities.map((capability) => (
          <article key={capability.id} className="space-y-2 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">{capability.label}</h2>
            <p className="text-sm text-slate-600">{capability.description}</p>
          </article>
        ))}
      </Section>

      <Section
        eyebrow="Live Signals"
        title="Adoption metrics we monitor"
        contentClassName="grid gap-4 sm:grid-cols-2"
      >
        {platform.metrics.map((metric) => (
          <div key={metric.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</p>
            {metric.trend ? (
              <p className="mt-2 text-xs font-semibold uppercase text-emerald-600">{metric.trend}</p>
            ) : null}
          </div>
        ))}
      </Section>

      <Section
        eyebrow="Plans"
        title="Pricing & deployment modes"
        description="Choose the plan that matches your operating complexity."
        contentClassName="grid gap-4 sm:grid-cols-3"
      >
        {platform.plans.map((plan) => (
          <article key={plan.tier} className="space-y-2 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{plan.tier}</p>
            <p className="text-2xl font-semibold text-slate-900">{plan.price}</p>
            <p className="text-sm text-slate-600">{plan.bestFor}</p>
          </article>
        ))}
      </Section>

      <Section
        eyebrow="Ecosystem"
        title="Integrations operators rely on"
      >
        <ul className="flex flex-wrap gap-2 text-sm text-slate-600">
          {platform.integrations.map((integration) => (
            <li key={integration} className="rounded-full bg-slate-100 px-3 py-1">
              {integration}
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
