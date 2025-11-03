import type { Platform } from "@/lib/types";
import { cn } from "@/lib/utils";

export type PlatformOverviewProps = {
  platform: Platform;
  className?: string;
};

/**
 * Provides a narrative description of the platform alongside supporting copy.
 * This allows future API-powered content to slot in without reshaping the section.
 */
export function PlatformOverview({ platform, className }: PlatformOverviewProps) {
  return (
    <div className={cn("space-y-4 text-sm text-slate-600 sm:text-base", className)}>
      <p>{platform.overview}</p>
      <p className="text-sm text-slate-500">
        Teams in FlowSystems evaluations cite this platform when orchestrating programs that span multiple operators and demand
        continuous telemetry.
      </p>
    </div>
  );
}
