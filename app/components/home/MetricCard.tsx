import type { SystemMetric } from "../../lib/types";

export function MetricCard({ metric }: { metric: SystemMetric }) {
  return (
    <div className="group rounded-[var(--fs-radius-md)] border border-slate-200/70 bg-white/80 p-5 shadow-md shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{metric.label}</dt>
      <dd className="mt-3 text-3xl font-semibold text-slate-900">{metric.value}</dd>
      <p className="mt-3 text-sm text-slate-600">{metric.caption}</p>
      {metric.trend ? (
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {metric.trend}
        </p>
      ) : null}
    </div>
  );
}
