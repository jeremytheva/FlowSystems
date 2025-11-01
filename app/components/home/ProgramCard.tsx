import type { FlowProgram } from "../../lib/types";

const maturityColor: Record<FlowProgram["maturity"], string> = {
  pilot: "text-amber-600",
  scaling: "text-emerald-600",
  production: "text-indigo-600",
};

export function ProgramCard({ program }: { program: FlowProgram }) {
  return (
    <article className="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{program.category}</p>
        <h3 className="text-xl font-semibold text-slate-900">{program.name}</h3>
        <p className="text-sm text-slate-600">{program.summary}</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-500">
          {program.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </div>
      <div className="space-y-1 text-xs uppercase tracking-wide text-slate-500">
        <p className={maturityColor[program.maturity]}>Maturity: {program.maturity}</p>
        <p>Signals: {program.recommendedSignals.join(", ")}</p>
      </div>
    </article>
  );
}
