import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getPlatformBySlug, platforms } from '../../lib/platforms';

type PageProps = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: PageProps) {
  const platform = getPlatformBySlug(params.slug);

  if (!platform) {
    notFound();
  }

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-12">
      {/* platform_view */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              {platform.categories.join(' • ')}
            </p>
            <h1 className="text-4xl font-semibold text-neutral-900">{platform.name}</h1>
          </div>
          <div className="flex flex-col gap-2 text-right text-sm text-neutral-600">
            <span>Automation score: {platform.scorecard.automation}/10</span>
            <span>Governance score: {platform.scorecard.governance}/10</span>
            <span>Extensibility score: {platform.scorecard.extensibility}/10</span>
          </div>
        </div>
        <p className="text-lg text-neutral-700">{platform.tagline}</p>
        <p className="max-w-3xl text-base leading-relaxed text-neutral-700">
          {platform.summary}
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-md bg-neutral-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            {/* trial_added */}
            Start free trial
          </button>
          <Link
            href="#guides"
            className="rounded-md border border-neutral-300 px-5 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-900"
          >
            Implementation guides
          </Link>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-600">
            Teams that see the fastest wins
          </h2>
          <ul className="mt-2 grid gap-2 text-sm text-neutral-700 sm:grid-cols-3">
            {platform.bestFor.map((item) => (
              <li key={item} className="rounded-md bg-white px-3 py-2 shadow-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-neutral-200 p-6">
          <h2 className="text-xl font-semibold text-neutral-900">Why teams choose {platform.name}</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            Highlights from customers rolling out the platform.
          </p>
          <ul className="mt-4 space-y-3 text-sm text-neutral-700">
            {platform.highlights.map((highlight) => (
              <li key={highlight.title} className="rounded-md border border-neutral-100 bg-neutral-50 p-3">
                <p className="font-medium text-neutral-900">{highlight.title}</p>
                <p className="mt-1 leading-relaxed text-neutral-700">{highlight.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-neutral-200 p-6">
          <h2 className="text-xl font-semibold text-neutral-900">Key capabilities</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            The workflows most teams deploy in their first 90 days.
          </p>
          <ul className="mt-4 space-y-3 text-sm text-neutral-700">
            {platform.capabilities.map((capability) => (
              <li key={capability.title} className="rounded-md border border-neutral-100 bg-neutral-50 p-3">
                <p className="font-medium text-neutral-900">{capability.title}</p>
                <p className="mt-1 leading-relaxed text-neutral-700">{capability.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-lg border border-neutral-200 p-6">
        <h2 className="text-xl font-semibold text-neutral-900">Packaging & pricing</h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          Pick the plan that matches your deployment stage.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {platform.plans.map((plan) => (
            <article key={plan.name} className="flex flex-col gap-3 rounded-md border border-neutral-100 bg-neutral-50 p-4">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">{plan.name}</h3>
                <p className="text-sm text-neutral-600">{plan.price}</p>
              </div>
              <ul className="space-y-2 text-sm text-neutral-700">
                {plan.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-neutral-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-neutral-200 p-6">
        <h2 className="text-xl font-semibold text-neutral-900">Integrations your teams rely on</h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          Connect existing systems without custom engineering projects.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {platform.integrations.map((integration) => (
            <div key={integration.name} className="rounded-md border border-neutral-100 bg-neutral-50 p-3 text-sm text-neutral-700">
              <p className="font-medium text-neutral-900">{integration.name}</p>
              <p className="text-neutral-600">{integration.category}</p>
              {integration.note ? (
                <p className="mt-1 text-xs text-neutral-500">{integration.note}</p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section id="guides" className="rounded-lg border border-neutral-200 p-6">
        <h2 className="text-xl font-semibold text-neutral-900">Launch playbooks & guides</h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          Share these with your enablement and operations partners to accelerate rollout.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {platform.guides.map((guide) => (
            <article key={guide.url} className="flex flex-col gap-3 rounded-md border border-neutral-100 bg-neutral-50 p-4">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">{guide.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">{guide.description}</p>
              </div>
              <Link
                href={guide.url}
                className="text-sm font-medium text-neutral-900 underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                Read the guide
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return platforms.map((platform) => ({ slug: platform.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const platform = getPlatformBySlug(params.slug);

  if (!platform) {
    return {
      title: 'Platform not found — FlowSystems',
    };
  }

  return {
    title: `${platform.name} platform overview`,
    description: platform.summary,
  };
}
