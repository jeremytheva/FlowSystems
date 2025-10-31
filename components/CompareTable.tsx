'use client';

type CompareRow = {
  factor: string;
  a: number;
  b: number;
};

type CompareTableProps = {
  data: CompareRow[];
};

export default function CompareTable({ data }: CompareTableProps) {
  if (!data || data.length === 0) {
    return <p className="text-sm text-slate-500">No comparison data found.</p>;
  }

  return (
    <table className="mt-4 w-full table-auto text-sm">
      <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
        <tr>
          <th className="px-4 py-2 text-left">Factor</th>
          <th className="px-4 py-2 text-left">Option A</th>
          <th className="px-4 py-2 text-left">Option B</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.factor} className="border-b border-slate-100">
            <td className="px-4 py-3 font-medium text-slate-700">{row.factor}</td>
            <td className="px-4 py-3 text-slate-600">{row.a}</td>
            <td className="px-4 py-3 text-slate-600">{row.b}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
