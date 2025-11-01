import type { SystemMetric } from "../../lib/types";

export function MetricCard({ metric }: { metric: SystemMetric }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white/80 p-4 shadow-sm">
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{metric.label}</dt>
      <dd className="mt-2 text-3xl font-semibold text-slate-900">{metric.value}</dd>
      <p className="mt-2 text-sm text-slate-600">{metric.caption}</p>
      {metric.trend ? (
        <p className="mt-3 text-xs font-semibold uppercase text-emerald-600">{metric.trend}</p>
      ) : null}
    </div>
  );
}
