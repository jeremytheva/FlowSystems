import type { FlowCategory } from "../../lib/types";

export function CategoryCard({ category }: { category: FlowCategory }) {
  return (
    <article className="group relative overflow-hidden rounded-[var(--fs-radius-md)] border border-slate-200/70 bg-white/80 p-6 shadow-md shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-sky-400/0 to-emerald-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <h3 className="relative text-xl font-semibold text-slate-900">{category.name}</h3>
      <p className="relative text-sm text-slate-600">{category.description}</p>
      <ul className="relative list-disc space-y-1 pl-5 text-sm text-slate-500">
        {category.focusAreas.map((area) => (
          <li key={area}>{area}</li>
        ))}
      </ul>
    </article>
  );
}
