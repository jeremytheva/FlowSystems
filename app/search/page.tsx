import Link from "next/link";
import { Section } from "../components/Section";
import { searchFilters, searchResults } from "../data/search";

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Search</p>
        <h1 className="text-4xl font-bold text-slate-900">Find flows, reviews, and stacks</h1>
        <p className="text-base text-slate-600">
          Start with a keyword or pick a filter. Mock results below illustrate how content will show up when the live index is
          connected.
        </p>
      </header>

      <Section eyebrow="Search" title="Explore the library" contentClassName="space-y-4">
        <form className="space-y-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <label className="block text-sm font-medium text-slate-700" htmlFor="search-query">
            Keyword
          </label>
          <input
            id="search-query"
            name="q"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Try \"activation\" or \"customer research\""
            defaultValue="activation"
          />
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Filters</p>
            <div className="flex flex-wrap gap-2">
              {searchFilters.map((filter) => (
                <button
                  key={filter}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                  type="button"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
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
}
