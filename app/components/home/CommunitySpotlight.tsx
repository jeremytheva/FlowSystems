import type { CommunityHighlights } from "../../lib/types";

export function CommunitySpotlight({ community }: { community: CommunityHighlights }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
      <article className="space-y-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">{community.spotlight.name}</h3>
        <p className="text-sm text-slate-600">{community.spotlight.description}</p>
        <p className="text-sm font-medium text-slate-700">
          {community.spotlight.membership}+ active members
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-500">
          {community.spotlight.programs.map((program) => (
            <li key={program}>{program}</li>
          ))}
        </ul>
      </article>
      <div className="grid gap-4">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Rituals</h4>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">
            {community.rituals.map((ritual) => (
              <li key={ritual.name} className="rounded-md bg-slate-50 p-3">
                <p className="text-sm font-semibold text-slate-900">{ritual.name}</p>
                <p className="text-xs uppercase tracking-wide text-slate-500">{ritual.cadence}</p>
                <p className="mt-1 text-xs text-slate-600">{ritual.focus}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Community Impact</h4>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
            {community.contributions.map((contribution) => (
              <li key={contribution}>{contribution}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
