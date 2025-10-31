import { Section } from "../components/Section";
import { communityHighlights, researchStreams } from "../lib/siteData";

export default function Page() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-6 py-12">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Community
        </p>
        <h1 className="text-4xl font-bold text-slate-900">Connect with operators building the future</h1>
        <p className="max-w-3xl text-base text-slate-600">
          The FlowSystems community is where practitioners swap playbooks, validate new
          flows, and co-create enablement packages. Join live rituals or plug into the
          async research streams feeding the operating graph.
        </p>
      </header>

      <Section
        eyebrow="Spotlight"
        title={communityHighlights.spotlight.name}
        description={communityHighlights.spotlight.description}
      >
        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-700">
              {communityHighlights.spotlight.membership}+ members actively sharing
              benchmarks and stories.
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
              {communityHighlights.spotlight.programs.map((program) => (
                <li key={program}>{program}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Why teams join
            </h2>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>See real-time telemetry from peers shipping similar flows.</li>
              <li>Access teardown labs that accelerate learning by doing.</li>
              <li>Contribute to the backlog powering upcoming releases.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Rituals"
        title="Cadences that keep the community moving"
        description="Join live sessions or async exchanges depending on how you like to collaborate."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {communityHighlights.rituals.map((ritual) => (
            <article
              key={ritual.name}
              className="space-y-2 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {ritual.cadence}
              </p>
              <h3 className="text-lg font-semibold text-slate-900">{ritual.name}</h3>
              <p className="text-sm text-slate-600">{ritual.focus}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Collaboration"
        title="Where community work meets the product roadmap"
        description={`Research leads and community hosts stay in lock-step. Insights from every interaction inform what ships next.`}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {researchStreams.map((stream) => (
            <article
              key={stream.name}
              className="space-y-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">{stream.name}</h3>
              <p className="text-xs uppercase tracking-wide text-slate-500">{stream.cadence}</p>
              <p className="text-sm text-slate-600">{stream.keyQuestion}</p>
              <p className="text-xs font-medium text-slate-500">Primary artifact: {stream.artifact}</p>
            </article>
          ))}
        </div>
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
          Looking to propose a new stream or share data? Email{' '}
          <a href="mailto:community@flowsystems.io" className="font-medium text-slate-900">
            community@flowsystems.io
          </a>{' '}
          and include the flow, metric, and outcome you want to explore.
        </div>
      </Section>

      <Section
        eyebrow="Impact"
        title="What the community delivered last quarter"
        description="A snapshot of the signal we captured and the value we unlocked together."
      >
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          {communityHighlights.contributions.map((contribution) => (
            <li key={contribution}>{contribution}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
