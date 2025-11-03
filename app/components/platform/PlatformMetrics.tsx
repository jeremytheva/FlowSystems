import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

import type { PlatformMetric } from "@/lib/types";
import { cn } from "@/lib/utils";

export type PlatformMetricsProps = {
  metrics: PlatformMetric[];
  className?: string;
};

/**
 * Highlights performance signals with tonal badges so operators can quickly spot movement.
 */
export function PlatformMetrics({ metrics, className }: PlatformMetricsProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-inner shadow-slate-900/5"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{metric.label}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-slate-900">{metric.value}</span>
            {metric.trend ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                <ArrowTrendingUpIcon aria-hidden className="h-4 w-4" />
                {metric.trend}
              </span>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
