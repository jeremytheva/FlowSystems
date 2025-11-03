import type { ValueLayer } from "../../lib/types";

export function ValueLayerCard({ layer }: { layer: ValueLayer }) {
  return (
    <article className="space-y-4 rounded-[var(--fs-radius-md)] border border-slate-200/70 bg-white/80 p-6 shadow-md shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
      <h3 className="text-lg font-semibold text-slate-900">{layer.title}</h3>
      <p className="text-sm text-slate-600">{layer.description}</p>
      {layer.examples && layer.examples.length > 0 && (
        <ul className="grid gap-2 text-sm text-slate-500">
          {layer.examples.map((example) => (
            <li key={example} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-slate-300" />
              <span>{example}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
