"use client";

import { SparklesIcon } from "@heroicons/react/24/outline";
import { cn } from "../../lib/utils";
import { ResultCard } from "./ResultCard";

type Result = {
  id: string;
  type: string;
  title: string;
  summary: string;
  href: string;
};

type ResultsListProps = {
  results: Result[];
  loading: boolean;
  className?: string;
};

export function ResultsList({ results, loading, className }: ResultsListProps) {
  return (
    <section className={cn("space-y-4", className)} aria-live="polite" aria-busy={loading}>
      {loading ? (
        <div className="space-y-4">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-inner shadow-slate-900/5"
            >
              <div className="animate-pulse space-y-3">
                <div className="h-5 w-24 rounded-full bg-slate-200" />
                <div className="h-6 w-3/4 rounded-lg bg-slate-200" />
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-5/6 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center text-slate-500">
          <SparklesIcon aria-hidden className="h-8 w-8 text-indigo-400" />
          <div className="space-y-1">
            <p className="text-base font-semibold text-slate-700">No results found</p>
            <p className="text-sm text-slate-500">
              Try adjusting your keywords or removing filters to see more of the FlowSystems library.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
