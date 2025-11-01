import type { FlowCategory } from "../../lib/types";

export function CategoryCard({ category }: { category: FlowCategory }) {
  return (
    <article className="space-y-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">{category.name}</h3>
      <p className="text-sm text-slate-600">{category.description}</p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-500">
        {category.focusAreas.map((area) => (
          <li key={area}>{area}</li>
        ))}
      </ul>
    </article>
  );
}
