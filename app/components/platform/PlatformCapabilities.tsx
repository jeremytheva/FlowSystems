import { LightBulbIcon } from "@heroicons/react/24/outline";

import type { PlatformCapability } from "@/lib/types";
import { cn } from "@/lib/utils";

export type PlatformCapabilitiesProps = {
  capabilities: PlatformCapability[];
  className?: string;
};

/**
 * Renders the key capabilities as interactive cards so future drill-ins or deep-links
 * can reference a consistent element hierarchy.
 */
export function PlatformCapabilities({ capabilities, className }: PlatformCapabilitiesProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {capabilities.map((capability) => (
        <article
          key={capability.id}
          className="group space-y-2 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-900/5 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600">
            <LightBulbIcon aria-hidden className="h-5 w-5" />
            <h3>{capability.label}</h3>
          </div>
          <p className="text-sm text-slate-600">{capability.description}</p>
        </article>
      ))}
    </div>
  );
}
