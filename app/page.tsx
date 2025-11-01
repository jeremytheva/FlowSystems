import { Section } from "./components/Section";
import {
  categories,
  communityHighlights,
  featuredPrograms,
  systemMetrics,
  upcomingReleases,
  valueStack,
} from "./lib/siteData";

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-6 py-12">
      <header className="space-y-6 rounded-2xl bg-slate-900 px-8 py-12 text-slate-100 shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          FlowSystems Operating Graph
        </p>
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
          Build, scale, and evolve flows that move the entire business forward.
        </h1>
        <p className="max-w-3xl text-lg text-slate-200">
          A unified system for aligning growth, product, and operations teams around the
          flows that compound value. We connect research, telemetry, and enablement so
          operators can make confident moves faster.
        </p>
        <div className="flex flex-col gap-3 text-sm text-slate-300 sm:flex-row">
          <div className="rounded-full bg-slate-800 px-4 py-2">
            Wizard complete → Outcomes library unlocked
          </div>
          <div className="rounded-full bg-slate-800 px-4 py-2">
            Stack opened → Composable flows ready for activation
          </div>
          <div className="rounded-full bg-slate-800 px-4 py-2">
            Newsletter signup → Weekly systems intelligence briefings
          </div>
        </div>
      </header>

      <Section
        eyebrow="Snapshot"
        title="The system is live across teams and industries"
        description="Key metrics we monitor to ensure flows stay healthy and outcomes keep compounding."
      >
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {systemMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-slate-200 bg-white/80 p-4 shadow-sm"
            >
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {metric.label}
              </dt>
              <dd className="mt-2 text-3xl font-semibold text-slate-900">{metric.value}</dd>
              <p className="mt-2 text-sm text-slate-600">{metric.caption}</p>
              {metric.trend ? (
                <p className="mt-3 text-xs font-semibold uppercase text-emerald-600">
                  {metric.trend}
                </p>
              ) : null}
            </div>
          ))}
        </dl>
      </Section>

      <Section
        eyebrow="Categories"
        title="How we structure the FlowSystems library"
        description={`Each category houses frameworks, telemetry, and enablement packages designed to solve for a core operating challenge.`}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.slug}
              className="space-y-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-900">{category.name}</h3>
              <p className="text-sm text-slate-600">{category.description}</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-500">
                {category.focusAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Programs"
        title="Featured flows operators are deploying now"
        description={`These programs blend automation, enablement, and decision intelligence. Each can be adapted for your environment in weeks, not months.`}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredPrograms.map((program) => (
            <article
              key={program.slug}
              className="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {program.category}
                </p>
                <h3 className="text-xl font-semibold text-slate-900">{program.name}</h3>
                <p className="text-sm text-slate-600">{program.summary}</p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-slate-500">
                  {program.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                Maturity: {program.maturity}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Value Stack"
        title="Operating layers that keep flows resilient"
        description={`We make value creation visible across foundation, activation, and evolution layers so leaders know where to invest next.`}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {valueStack.map((layer) => (
            <article
              key={layer.name}
              className="space-y-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">{layer.name}</h3>
              <p className="text-sm text-slate-600">{layer.mission}</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-500">
                {layer.signals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Roadmap"
        title="Upcoming releases on the FlowSystems roadmap"
        description="What we are shipping next to expand coverage across teams and industries."
      >
        <ul className="space-y-4">
          {upcomingReleases.map((release) => (
            <li
              key={release.title}
              className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">{release.title}</p>
                <p className="text-sm text-slate-600">{release.focus}</p>
              </div>
              <div className="text-left text-xs uppercase tracking-wide text-slate-500 sm:text-right">
                <p>{release.eta}</p>
                <p>{release.owner}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Community"
        title="Where practitioners co-create the next generation of flows"
        description={`Our community programs keep the system grounded in real operator experience. Join to share playbooks, validate ideas, and see what others are shipping.`}
      >
        <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
          <article className="space-y-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              {communityHighlights.spotlight.name}
            </h3>
            <p className="text-sm text-slate-600">
              {communityHighlights.spotlight.description}
            </p>
            <p className="text-sm font-medium text-slate-700">
              {communityHighlights.spotlight.membership}+ active members
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-500">
              {communityHighlights.spotlight.programs.map((program) => (
                <li key={program}>{program}</li>
              ))}
            </ul>
          </article>
          <div className="grid gap-4">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Rituals
              </h4>
              <ul className="mt-3 grid gap-3 sm:grid-cols-3">
                {communityHighlights.rituals.map((ritual) => (
                  <li key={ritual.name} className="rounded-md bg-slate-50 p-3">
                    <p className="text-sm font-semibold text-slate-900">{ritual.name}</p>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      {ritual.cadence}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">{ritual.focus}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Community Impact
              </h4>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
                {communityHighlights.contributions.map((contribution) => (
                  <li key={contribution}>{contribution}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
