import { notFound } from "next/navigation";
import { Section } from "../../components/Section";
import { comparisons } from "../../data/comparisons";
import { platforms } from "../../data/catalog/platforms";

const platformById = Object.fromEntries(platforms.map((platform) => [platform.id, platform]));

export function generateStaticParams() {
  return comparisons.map((comparison) => ({ slug: comparison.id }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const comparison = comparisons.find((item) => item.id === params.slug);

  if (!comparison) {
    notFound();
  }

  const leftPlatform = platformById[comparison.leftPlatform];
  const rightPlatform = platformById[comparison.rightPlatform];

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Comparison</p>
        <h1 className="text-4xl font-bold text-slate-900">{comparison.title}</h1>
        <p className="text-base text-slate-600">{comparison.description}</p>
      </header>

      <Section eyebrow="Snapshot" title="Quick view" contentClassName="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">{leftPlatform?.name ?? comparison.leftPlatform}</h2>
          <p className="text-sm text-slate-600">{leftPlatform?.tagline}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">{rightPlatform?.name ?? comparison.rightPlatform}</h2>
          <p className="text-sm text-slate-600">{rightPlatform?.tagline}</p>
        </div>
      </Section>

      <Section eyebrow="Factor breakdown" title="Where each platform leads" contentClassName="space-y-4">
        <table className="w-full text-sm text-slate-600">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="pb-2 text-left">Factor</th>
              <th className="pb-2 text-left">{leftPlatform?.name ?? comparison.leftPlatform}</th>
              <th className="pb-2 text-left">{rightPlatform?.name ?? comparison.rightPlatform}</th>
              <th className="pb-2 text-left">Edge</th>
            </tr>
          </thead>
          <tbody>
            {comparison.factors.map((factor) => (
              <tr key={factor.label} className="border-t border-slate-200">
                <td className="py-2 font-medium text-slate-900">{factor.label}</td>
                <td className="py-2">{factor.left}</td>
                <td className="py-2">{factor.right}</td>
                <td className="py-2 capitalize">{factor.edge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
