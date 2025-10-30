import { factorWeights } from '@/data/scoring';

export default function ScoringPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">Scoring framework</h2>
      <p className="text-sm text-slate-600">
        Factor weights reflect the jobs-to-be-done for lean teams. Owners audit telemetry and interviews quarterly to confirm the weights still
        hold.
      </p>
      <ul className="grid gap-4 md:grid-cols-2">
        {factorWeights.map((factor) => (
          <li key={factor.key} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{factor.key}</p>
            <p className="mt-2 text-3xl font-bold text-primary-700">{(factor.weight * 100).toFixed(0)}%</p>
            <p className="mt-2 text-sm text-slate-600">Steward: {factor.owner}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
