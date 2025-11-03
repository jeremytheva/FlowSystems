import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

import type { Platform } from "@/lib/types";
import { cn } from "@/lib/utils";

export type PlatformHeroProps = {
  platform: Platform;
  className?: string;
};

/**
 * Presents the platform overview using a headline layout that mirrors marketing hero sections.
 * The card-like wrapper and subtle gradients align with the updated FlowSystems visual language
 * and keep key metadata grouped for quick scanning.
 */
export function PlatformHero({ platform, className }: PlatformHeroProps) {
  const categoryLabel = platform.category
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

  return (
    <header
      className={cn(
        "relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-900/10",
        "sm:p-10 lg:p-12",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-white" aria-hidden />
      <div className="relative z-10 space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Platform</p>
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">{platform.name}</h1>
          <p className="text-base text-slate-600 sm:text-lg">{platform.tagline}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">{categoryLabel}</span>
          {platform.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <p className="max-w-2xl">
            FlowSystems tracks this platform for operators orchestrating cross-functional outcomes.
          </p>
          <Link
            href={platform.website}
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
          >
            Visit website
            <ArrowTopRightOnSquareIcon aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
