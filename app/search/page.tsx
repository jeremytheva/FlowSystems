import Link from "next/link";
import { Section } from "../components/Section";
import { searchFilters, searchResults } from "../data/search";


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

                        export default function Page() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Search
        </p>
        <h1 className="text-4xl font-bold text-slate-900">
          Find flows, reviews, and stacks
        </h1>
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
    </div>
  );
}

