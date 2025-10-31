import { Section } from "../components/Section";
import { deliveryPhases, principles, researchStreams, valueStack } from "../lib/siteData";

export default function Page() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-6 py-12">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Methodology
        </p>
        <h1 className="text-4xl font-bold text-slate-900">How FlowSystems comes to life</h1>
        <p className="max-w-3xl text-base text-slate-600">
          Our methodology blends systems thinking, practitioner research, and measurable
          outcomes. We design for compounding value—every flow adds to a broader graph
          that makes the next initiative faster and smarter.
        </p>
      </header>

      <Section
        eyebrow="Principles"
        title="Guiding principles for every engagement"
        description="These principles keep our work accountable to real outcomes and healthy systems."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {principles.map((principle) => (
            <article
              key={principle.title}
              className="space-y-2 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-900">{principle.title}</h2>
              <p className="text-sm text-slate-600">{principle.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Operating layers"
        title="Value stack that keeps the system resilient"
        description="Each layer ensures flows are usable today and adaptable tomorrow."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {valueStack.map((layer) => (
            <article
              key={layer.name}
              className="space-y-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">{layer.name}</h3>
              <p className="text-sm text-slate-600">{layer.mission}</p>
              <ul className="list-disc space-y-1 pl-5 text-xs text-slate-500">
                {layer.signals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Lifecycle"
        title="Delivery cadence that compounds learning"
        description="Every engagement cycles through discover, design, deploy, and evolve. Each phase has exit criteria and rituals to keep us honest."
      >
        <ol className="grid gap-6 md:grid-cols-2">
          {deliveryPhases.map((phase, index) => (
            <li
              key={phase.phase}
              className="space-y-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-baseline justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Phase {index + 1}
                </p>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {phase.phase}
                </span>
              </div>
              <p className="text-sm text-slate-600">{phase.purpose}</p>
              <ul className="list-disc space-y-1 pl-5 text-xs text-slate-500">
                {phase.questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        eyebrow="Research"
        title="Continuous insight engines"
        description="We operate standing research streams that feed directly into the system backlog and community programs."
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
      </Section>
    </div>
  );
}
