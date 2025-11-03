import { PuzzlePieceIcon } from "@heroicons/react/24/outline";

import { cn } from "@/lib/utils";

export type PlatformIntegrationsProps = {
  integrations: string[];
  className?: string;
};

/**
 * Displays integration partners as chips for quick scanning and parity with the search chips.
 */
export function PlatformIntegrations({ integrations, className }: PlatformIntegrationsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {integrations.map((integration) => (
        <span
          key={integration}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-sm text-slate-600 shadow-sm"
        >
          <PuzzlePieceIcon aria-hidden className="h-4 w-4 text-indigo-500" />
          {integration}
        </span>
      ))}
    </div>
  );
}
