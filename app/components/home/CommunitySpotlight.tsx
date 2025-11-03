import type { CommunityHighlights } from "../../lib/types";

export function CommunitySpotlight({ community }: { community: CommunityHighlights }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
      <article className="space-y-4 rounded-[var(--fs-radius-md)] border border-slate-200/70 bg-white/80 p-6 shadow-md shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
        <h3 className="text-lg font-semibold text-slate-900">{community.spotlight.name}</h3>
        <p className="text-sm text-slate-600">{community.spotlight.description}</p>
        <p className="text-sm font-medium text-slate-700">
          {community.spotlight.membership}+ active members
        </p>
        <ul className="grid gap-2 text-sm text-slate-500">
          {community.spotlight.programs.map((program) => (
            <li key={program} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-sky-400" />
              <span>{program}</span>
            </li>
          ))}
        </ul>
      </article>
      <div className="grid gap-4">
        <div className="rounded-[var(--fs-radius-md)] border border-slate-200/70 bg-white/80 p-5 shadow-md shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Rituals</h4>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {community.rituals.map((ritual) => (
              <li
                key={ritual.name}
                className="rounded-xl border border-slate-200/60 bg-slate-50/70 p-3 text-sm shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <p className="font-semibold text-slate-900">{ritual.name}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{ritual.cadence}</p>
                <p className="mt-1 text-xs text-slate-600">{ritual.focus}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[var(--fs-radius-md)] border border-slate-200/70 bg-white/80 p-5 shadow-md shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Community Impact</h4>
          <ul className="mt-4 grid gap-2 text-sm text-slate-600">
            {community.contributions.map((contribution) => (
              <li key={contribution} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-indigo-400" />
                <span>{contribution}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
