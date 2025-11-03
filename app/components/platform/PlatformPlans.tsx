import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

import type { PlatformPlan } from "@/lib/types";
import { cn } from "@/lib/utils";

export type PlatformPlansProps = {
  plans: PlatformPlan[];
  className?: string;
};

/**
 * Pricing tiers render as cards with clear hierarchy so operators can compare value props.
 */
export function PlatformPlans({ plans, className }: PlatformPlansProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-3", className)}>
      {plans.map((plan) => (
        <article
          key={plan.tier}
          className="space-y-3 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-900/5 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-indigo-600">
            <CurrencyDollarIcon aria-hidden className="h-4 w-4" />
            <span>{plan.tier}</span>
          </div>
          <p className="text-2xl font-semibold text-slate-900">{plan.price}</p>
          <p className="text-sm text-slate-600">{plan.bestFor}</p>
        </article>
      ))}
    </div>
  );
}
