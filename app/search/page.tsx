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
