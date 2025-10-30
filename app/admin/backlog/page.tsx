import { reviewBacklog } from '@/data/admin';

export default function BacklogPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">Review backlog</h2>
      <table className="min-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-sm shadow-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">Platform</th>
            <th className="px-4 py-3 text-left font-semibold">Stage</th>
            <th className="px-4 py-3 text-left font-semibold">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {reviewBacklog.map((item) => (
            <tr key={item.platform}>
              <td className="px-4 py-3 font-medium text-slate-800">{item.platform}</td>
              <td className="px-4 py-3 text-slate-600">{item.stage}</td>
              <td className="px-4 py-3 text-slate-600">{item.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
