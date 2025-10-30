const checklists = [
  {
    title: 'Review prep',
    items: ['Assign researcher', 'Schedule customer interviews', 'Collect telemetry'],
  },
  {
    title: 'Scoring refresh',
    items: ['Update factor weights', 'Sync with product telemetry', 'Document scoring rationale'],
  },
  {
    title: 'Publishing',
    items: ['QA MDX content', 'Record changelog entry', 'Promote in community'],
  },
];

export default function AdminHomePage() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {checklists.map((checklist) => (
        <article key={checklist.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">{checklist.title}</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {checklist.items.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary-500" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
