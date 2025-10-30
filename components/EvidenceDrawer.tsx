interface EvidenceItem {
  factor: string;
  quote: string;
  source: string;
}

interface EvidenceDrawerProps {
  items: EvidenceItem[];
}

export function EvidenceDrawer({ items }: EvidenceDrawerProps) {
  if (!items?.length) {
    return null;
  }

  return (
    <section className="mt-10 rounded-xl border border-slate-200 bg-white/90 p-6 shadow-sm">
      <h3 className="text-base font-semibold text-slate-800">Evidence & operator notes</h3>
      <p className="mt-2 text-sm text-slate-600">
        Direct quotes, call notes, and telemetry that back the factor scores.
      </p>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <details key={`${item.factor}-${item.source}`} className="group rounded-lg border border-slate-100 p-4">
            <summary className="cursor-pointer list-none font-medium text-primary-700">
              {item.factor} — <span className="text-slate-600">{item.source}</span>
            </summary>
            <p className="mt-2 text-sm text-slate-700">{item.quote}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
