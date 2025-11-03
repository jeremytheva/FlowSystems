"use client";

import { TagIcon } from "@heroicons/react/24/outline";
import { cn } from "../../lib/utils";

type FilterChipsProps = {
  filters: string[];
  activeFilters: string[];
  onToggleFilter: (filter: string) => void;
};

export function FilterChips({ filters, activeFilters, onToggleFilter }: FilterChipsProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-slate-700">Filters</legend>
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => {
          const isActive = activeFilters.includes(filter);
          return (
            <button
              key={filter}
              type="button"
              onClick={() => onToggleFilter(filter)}
              aria-pressed={isActive}
              className={cn(
                "group inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition", // base styling
                "border-slate-200 bg-white/80 text-slate-600 shadow-sm shadow-slate-900/5 backdrop-blur hover:-translate-y-px hover:border-indigo-400 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2", // interaction feedback
                isActive &&
                  "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md shadow-indigo-200/60 hover:bg-indigo-100 focus-visible:ring-indigo-500"
              )}
            >
              <TagIcon aria-hidden className="h-4 w-4 transition group-hover:scale-110" />
              <span>{filter}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
