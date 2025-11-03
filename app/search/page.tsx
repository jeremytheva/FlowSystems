"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Section } from "../components/Section";
import { SearchForm } from "../components/search/SearchForm";
import { ResultsList } from "../components/search/ResultsList";
import { searchFilters, searchResults } from "../data/search";

export default function Page() {
  const [keyword, setKeyword] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const loadingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleLoadingComplete = useCallback(() => {
    if (loadingTimeout.current) {
      clearTimeout(loadingTimeout.current);
    }

    loadingTimeout.current = setTimeout(() => {
      setLoading(false);
    }, 450);
  }, []);

  const simulateLoading = useCallback(() => {
    setLoading(true);
    scheduleLoadingComplete();
  }, [scheduleLoadingComplete]);

  useEffect(() => {
    // Simulate initial data fetch so skeletons display before content appears.
    simulateLoading();

    return () => {
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current);
      }
    };
  }, [simulateLoading]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      simulateLoading();
    },
    [simulateLoading]
  );

  const handleKeywordChange = useCallback(
    (value: string) => {
      setKeyword(value);
      simulateLoading();
    },
    [simulateLoading]
  );

  const handleToggleFilter = useCallback(
    (filter: string) => {
      setActiveFilters((previous) => {
        const isActive = previous.includes(filter);
        if (isActive) {
          return previous.filter((item) => item !== filter);
        }

        return [...previous, filter];
      });
      simulateLoading();
    },
    [simulateLoading]
  );

  const filteredResults = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return searchResults.filter((result) => {
      const matchesKeyword = normalizedKeyword
        ? [result.title, result.summary, result.type].some((field) => field.toLowerCase().includes(normalizedKeyword))
        : true;

      const matchesFilter =
        activeFilters.length === 0 ||
        activeFilters.some((filter) => filter.toLowerCase().startsWith(result.type.toLowerCase()));

      return matchesKeyword && matchesFilter;
    });
  }, [activeFilters, keyword]);

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-6 py-12 lg:px-8 lg:py-16">
      <header className="space-y-3 text-center sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Search</p>
        <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Find flows, reviews, and stacks</h1>
        <p className="text-sm text-slate-600 sm:text-base">
          Explore FlowSystems insights with filters tailored to the way research, growth, and success teams evaluate platforms.
        </p>
      </header>

      <Section
        eyebrow="Library"
        title="Search the FlowSystems collection"
        description="Use filters and keywords together to narrow your exploration. Results update instantly with subtle loading cues."
        contentClassName="space-y-10"
      >
        <SearchForm
          keyword={keyword}
          filters={searchFilters}
          activeFilters={activeFilters}
          onKeywordChange={handleKeywordChange}
          onToggleFilter={handleToggleFilter}
          onSubmit={handleSubmit}
        />
      </Section>

      <Section
        eyebrow="Results"
        title="Preview"
        description="Mock data illustrates how the live experience will present FlowSystems search output."
        contentClassName="space-y-6"
      >
        <ResultsList results={filteredResults} loading={loading} />
      </Section>
    </div>
  );
  try {
    return (
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Search
          </p>
          <h1 className="text-4xl font-bold text-slate-900">Find flows, reviews, and stacks</h1>
        </header>

        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Type a keyword to find platforms, comparisons, or insights from the FlowSystems library.
          </p>
          {/* TODO: Replace with real search component */}
          <input
            type="text"
            placeholder="Search FlowSystems..."
            className="w-full rounded-md border border-slate-300 px-4 py-2 text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <Section
          eyebrow="Filters"
          title="Refine the preview"
          description="Toggle the mock filters to see how different FlowSystems content types appear in results."
        >
          <form className="space-y-4">
            <fieldset className="space-y-2">
              <legend className="text-sm font-semibold text-slate-700">Content types</legend>
              <div className="flex flex-wrap gap-3">
                {searchFilters.map((filter) => (
                  <label key={filter} className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    {filter}
                  </label>
                ))}
              </div>
            </fieldset>

            <p className="text-xs text-slate-500">
              Interactions are mocked for now. The live version will connect to the FlowSystems search API.
            </p>
          </form>
        </Section>

        <Section eyebrow="Results" title="Preview" contentClassName="space-y-4">
          {searchResults.map((result) => (
            <article key={result.id} className="space-y-2 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-slate-500">{result.type}</p>
                <Link className="text-sm font-semibold text-indigo-600 underline" href={result.href}>
                  View
                </Link>
              </div>
              <h2 className="text-lg font-semibold text-slate-900">{result.title}</h2>
              <p className="text-sm text-slate-600">{result.summary}</p>
            </article>
          ))}
        </Section>
      </div>
    );
  } catch (error) {
    console.error("Error rendering /search page:", error);
    // The exact error is logged so debugging tools can surface the failure.

    if (process.env.NODE_ENV === "development") {
      const renderError = error instanceof Error ? error : new Error(String(error));
      return <ErrorBoundary error={renderError} />;
    }

    return (
      <div className="mx-auto max-w-4xl space-y-4 px-6 py-12">
        <p className="text-lg font-semibold text-slate-900">Error loading content.</p>
        <p className="text-sm text-slate-600">Please refresh the page or try again later.</p>
      </div>
    );
  }
}
