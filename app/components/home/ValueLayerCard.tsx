import type { ValueLayer } from "../../lib/types";

export function ValueLayerCard({ layer }: { layer: ValueLayer }) {
  return (
    <article className="space-y-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{layer.name}</h3>
      <p className="text-sm text-slate-600">{layer.mission}</p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-500">
        {layer.signals.map((signal) => (
          <li key={signal}>{signal}</li>
        ))}
      </ul>
    </article>
  );
}
