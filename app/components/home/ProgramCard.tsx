import type { FlowProgram } from "../../lib/types";

const maturityColor: Record<FlowProgram["maturity"], string> = {
  pilot: "text-amber-600",
  scaling: "text-emerald-600",
  production: "text-indigo-600",
};

export function ProgramCard({ program }: { program: FlowProgram }) {
  return (
    <article className="group flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[var(--fs-radius-md)] border border-slate-200/70 bg-white/80 p-6 shadow-md shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl">
      <div className="space-y-4">
        <p className="inline-flex items-center rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {program.category}
        </p>
        <h3 className="text-xl font-semibold text-slate-900">{program.name}</h3>
        <p className="text-sm text-slate-600">{program.summary}</p>
        <ul className="grid gap-2 text-sm text-slate-500">
          {program.outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400" />
              <span>{outcome}</span>
            </li>
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
