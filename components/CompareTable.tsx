interface CompareRow {
  platform: string;
  standout: string;
  tradeoffs: string;
}

interface CompareTableProps {
  rows: CompareRow[];
}

export function CompareTable({ rows }: CompareTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50/80">
          <tr>
            <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-600">
              Platform
            </th>
            <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-600">
              Best for
            </th>
            <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-600">
              Trade-offs
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.map((row) => (
            <tr key={row.platform} className="hover:bg-slate-50/70">
              <td className="px-4 py-3 font-medium text-slate-800">{row.platform}</td>
              <td className="px-4 py-3 text-slate-700">{row.standout}</td>
              <td className="px-4 py-3 text-slate-700">{row.tradeoffs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
