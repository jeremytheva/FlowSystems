interface Factor {
  key: string;
  label?: string;
  raw: number;
  direction: 'normal' | 'inverted';
  weight: number;
}

interface FactorTableProps {
  factors: Factor[];
}

export function FactorTable({ factors }: FactorTableProps) {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50/80">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Factor</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Score</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Weight</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Direction</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {factors.map((factor) => (
            <tr key={factor.key}>
              <td className="px-4 py-3 font-medium text-slate-800">{factor.label ?? factor.key}</td>
              <td className="px-4 py-3 text-slate-700">{factor.raw.toFixed(1)}</td>
              <td className="px-4 py-3 text-slate-700">{(factor.weight * 100).toFixed(0)}%</td>
              <td className="px-4 py-3 text-slate-700">{factor.direction === 'normal' ? '↑ higher is better' : '↓ lower is better'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
