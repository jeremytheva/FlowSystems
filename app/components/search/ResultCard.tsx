"use client";

import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

type SearchResult = {
  id: string;
  type: string;
  title: string;
  summary: string;
  href: string;
};

// Result cards use consistent spacing and tags to match FlowSystems card visuals.
export function ResultCard({ result }: { result: SearchResult }) {
  return (
    <article className="group space-y-3 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-md shadow-slate-900/5 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          {result.type}
        </span>
        <Link
          href={result.href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition group-hover:text-indigo-500"
        >
          View
          <ArrowUpRightIcon aria-hidden className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{result.title}</h3>
      <p className="text-sm text-slate-600">{result.summary}</p>
    </article>
  );
}
