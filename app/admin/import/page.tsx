import { Section } from "../../components/Section";
import { importQueue } from "../../data/admin/tasks";

export default function Page() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Import Queue</h1>
        <p className="text-sm text-slate-600">
          Monitor data imports from research, partner, and community sources. Resolve blockers before they delay publishing.
        </p>
      </header>

      <Section eyebrow="Active Jobs" title="Work in flight" contentClassName="space-y-4">
        {importQueue.map((task) => (
          <article key={task.id} className="space-y-2 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">{task.title}</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-wide text-slate-500">
                {task.status.replace("-", " ")}
              </span>
            </div>
            <p className="text-sm text-slate-600">Owner: {task.owner}</p>
            {task.notes ? <p className="text-sm text-slate-500">{task.notes}</p> : null}
          </article>
        ))}
      </Section>
    </div>
  );
}
