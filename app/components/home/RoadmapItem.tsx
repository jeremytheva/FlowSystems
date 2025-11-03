import type { ReleaseItem } from "../../lib/types";

export function RoadmapItem({ release }: { release: ReleaseItem }) {
  return (
    <li className="flex flex-col gap-4 rounded-[var(--fs-radius-md)] border border-slate-200/70 bg-white/80 p-5 shadow-md shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-900">{release.title}</p>
        <p className="text-sm text-slate-600">{release.focus}</p>
      </div>
      <div className="flex flex-col items-start gap-1 text-left text-xs uppercase tracking-wide text-slate-500 sm:items-end sm:text-right">
        <span className="rounded-full bg-slate-900/5 px-3 py-1 text-[0.7rem] font-semibold">{release.eta}</span>
        <p>{release.owner}</p>
      </div>
    </li>
  );
}
