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
}
