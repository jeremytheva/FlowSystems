import { Section } from "../components/Section";
import { dashboardMetrics, workstreams } from "../data/dashboard/metrics";

const statusColor: Record<string, string> = {
  up: "text-emerald-600",
  down: "text-rose-600",
  steady: "text-slate-500",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-12">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Dashboard</p>
        <h1 className="text-4xl font-bold text-slate-900">Score & Impact Dashboard</h1>
        <p className="max-w-3xl text-base text-slate-600">
          Track the health of live flows, identify where to intervene, and keep executive stakeholders aligned on measurable
          outcomes.
        </p>
      </header>

      <Section
        eyebrow="Signals"
        title="Operating scorecard"
        contentClassName="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {dashboardMetrics.map((metric) => (
          <div key={metric.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{metric.title}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{metric.value}</p>
            <p className={`mt-2 text-xs font-semibold uppercase ${statusColor[metric.status]}`}>{metric.change}</p>
          </div>
        ))}
      </Section>

      <Section
        eyebrow="Execution"
        title="In-flight workstreams"
        contentClassName="grid gap-4 md:grid-cols-2"
      >
        {workstreams.map((stream) => (
          <article key={stream.id} className="space-y-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">{stream.name}</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-wide text-slate-500">
                {stream.owner}
              </span>
            </div>
            <p className="text-sm text-slate-600">Next action: {stream.nextAction}</p>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-indigo-500" style={{ width: `${stream.progress}%` }} />
            </div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Progress: {stream.progress}%</p>
          </article>
        ))}
      </Section>
    </div>
  );
}
