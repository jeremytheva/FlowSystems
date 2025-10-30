export const metadata = {
  title: 'About',
  description: 'Why FlowSystems exists and how we evaluate tools.',
};

export default function AboutPage() {
  return (
    <div className="space-y-6 text-sm text-slate-700">
      <h1 className="text-3xl font-bold text-slate-900">About FlowSystems</h1>
      <p>
        FlowSystems is an independent guide maintained by operators who have built and scaled service businesses. We capture the
        unglamorous moments of implementing new platforms—data cleanup, automation guardrails, and supporting teams through
        change.
      </p>
      <p>
        Reviews are built from structured interviews, telemetry data, and real migrations. Factor weights prioritize time-to-value and
        setup effort so solos and micro teams can roll out the right tool without hiring a full RevOps function.
      </p>
      <p>
        Have a platform or workflow we should evaluate? Reach out via <a className="font-semibold text-primary-700" href="mailto:hello@flowsystems.dev">hello@flowsystems.dev</a>.
      </p>
    </div>
  );
}
