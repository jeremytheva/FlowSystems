"use client";

import { FormEvent } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { cn } from "../../lib/utils";
import { FilterChips } from "./FilterChips";

type SearchFormProps = {
  keyword: string;
  filters: string[];
  activeFilters: string[];
  onKeywordChange: (value: string) => void;
  onToggleFilter: (filter: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
};

export function SearchForm({
  keyword,
  filters,
  activeFilters,
  onKeywordChange,
  onToggleFilter,
  onSubmit,
  className,
}: SearchFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "space-y-6 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-900/5 backdrop-blur",
        className,
      )}
    >
      {/* Input section styled as a hero search bar to guide user focus */}
      <div className="space-y-2">
        <label htmlFor="search-keyword" className="text-sm font-medium text-slate-700">
          Keyword
        </label>
        <div className="relative">
          <MagnifyingGlassIcon
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          />
          <input
            id="search-keyword"
            name="keyword"
            type="search"
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
            placeholder="Search FlowSystems for platforms, reviews, or playbooks..."
            className="w-full rounded-xl border border-slate-200 bg-white px-11 py-3 text-base text-slate-900 shadow-inner shadow-slate-900/5 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:ring-offset-2 focus:ring-offset-white"
          />
        </div>
        <p className="text-xs text-slate-500">
          Interactions are mocked for now. The live version will connect to the FlowSystems search API.
        </p>
      </div>

      {/* Toggleable filter chips promote discoverability of available search facets */}
      <FilterChips filters={filters} activeFilters={activeFilters} onToggleFilter={onToggleFilter} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-slate-500">Use keywords and filters together to refine your results.</p>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
        >
          Run search
        </button>
      </div>
    </form>
  );
}
