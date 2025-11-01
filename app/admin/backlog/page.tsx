import { Section } from "../../components/Section";
import { backlogItems } from "../../data/admin/tasks";

export default function Page() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Backlog Intake</h1>
        <p className="text-sm text-slate-600">
          Track new requests from customers and partners. Prioritize them into the roadmap.
        </p>
      </header>

      <Section eyebrow="Requests" title="Items awaiting triage" contentClassName="space-y-4">
        {backlogItems.map((task) => (
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
