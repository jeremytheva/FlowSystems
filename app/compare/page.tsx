import Link from "next/link";
import { Section } from "../components/Section";
import { comparisons } from "../data/comparisons";
import { platforms } from "../data/catalog/platforms";

const platformById = Object.fromEntries(platforms.map((platform) => [platform.id, platform]));

export default function Page() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Comparisons</p>
        <h1 className="text-4xl font-bold text-slate-900">Side-by-side platform intelligence</h1>
        <p className="text-base text-slate-600">
          Explore curated matchups that highlight how platforms differ across outcomes, telemetry, and enablement maturity.
        </p>
      </header>

      <Section eyebrow="Matchups" title="Featured comparisons" contentClassName="space-y-4">
        {comparisons.map((comparison) => (
          <article key={comparison.id} className="space-y-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{comparison.title}</h2>
            <p className="text-sm text-slate-600">{comparison.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="rounded-full bg-slate-100 px-3 py-1">
                {platformById[comparison.leftPlatform]?.name ?? comparison.leftPlatform}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1">
                {platformById[comparison.rightPlatform]?.name ?? comparison.rightPlatform}
              </span>
            </div>
            <Link className="text-sm font-semibold text-indigo-600 underline" href={`/compare/${comparison.id}`}>
              View comparison
            </Link>
          </article>
        ))}
      </Section>
    </div>
  );
}
