'use client';

type Factor = {
  key: string;
  raw: number;
  direction: 'normal' | 'inverted';
  weight: number;
};

type FactorTableProps = {
  factors: Factor[];
};

const LABELS: Record<string, string> = {
  TimeToValue: 'Time-to-Value',
  SetupEffort: 'Setup Effort',
  Integrations: 'Integrations',
};

export default function FactorTable({ factors }: FactorTableProps) {
  if (!Array.isArray(factors) || factors.length === 0) {
    return <p className="text-sm text-slate-500">No factor data provided.</p>;
  }

  return (
    <table className="mt-4 w-full table-fixed border-separate border-spacing-y-2 text-sm">
      <thead>
        <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
          <th className="w-1/2">Factor</th>
          <th>Score</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>
        {factors.map((factor) => (
          <tr key={factor.key} className="rounded-lg bg-white shadow-sm">
            <td className="rounded-l-lg px-4 py-3 font-medium text-slate-700">
              {LABELS[factor.key] ?? factor.key}
            </td>
            <td className="px-4 py-3 text-slate-600">
              {factor.direction === 'inverted' ? 10 - factor.raw : factor.raw} / 10
            </td>
            <td className="rounded-r-lg px-4 py-3 text-slate-500">{(factor.weight * 100).toFixed(0)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
