import type { ReleaseItem } from "../../lib/types";

export function RoadmapItem({ release }: { release: ReleaseItem }) {
  return (
    <li className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-900">{release.title}</p>
        <p className="text-sm text-slate-600">{release.focus}</p>
      </div>
      <div className="text-left text-xs uppercase tracking-wide text-slate-500 sm:text-right">
        <p>{release.eta}</p>
        <p>{release.owner}</p>
      </div>
    </li>
  );
}
