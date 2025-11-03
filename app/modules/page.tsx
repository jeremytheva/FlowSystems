import Link from "next/link";
import type { Metadata } from "next";

import { moduleRegistry } from "@modules/index";
import type { ModuleStatus } from "@modules/index";

const statusStyles: Record<ModuleStatus, string> = {
  core: "bg-emerald-100 text-emerald-700 border-emerald-200",
  mvp: "bg-sky-100 text-sky-700 border-sky-200",
  planned: "bg-slate-100 text-slate-700 border-slate-200",
};

export const metadata: Metadata = {
  title: "Flow Systems Modules",
  description: "Unified Flow Systems architecture overview across core modules.",
};

export default function ModulesPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Unified Flow Systems Modules</h1>
        <p className="max-w-2xl text-base text-slate-600">
          Each module encapsulates a core business capability. The FlowBot Core powers orchestration while the remaining flows
          activate specific journeys across branding, strategy, acquisition, service, workflow, evolution, and governance.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {moduleRegistry.map((module) => {
          const statusLabel = `${module.status.charAt(0).toUpperCase()}${module.status.slice(1)}`;

          return (
            <article
              key={module.slug}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{module.name}</h2>
                <p className="text-sm text-slate-500">{module.summary}</p>
              </div>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusStyles[module.status]}`}
              >
                {statusLabel}
              </span>
            </div>
            <p className="text-sm text-slate-600">{module.description}</p>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Primary Actions</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {module.primaryActions.map((action) => (
                  <li key={action} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {action}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <Link className="text-sm font-semibold text-indigo-600 hover:text-indigo-500" href={`/modules/${module.slug}`}>
                View module details
              </Link>
              <span className="text-xs text-slate-400">Integrations: {module.integrationPoints.length}</span>
            </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
