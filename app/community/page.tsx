export const metadata = {
  title: 'Community',
  description: 'Join operators sharing playbooks and migration war stories.',
};

const events = [
  {
    title: 'Weekly teardown',
    description: 'Live walk-through of a recent tooling migration with Q&A.',
    cadence: 'Wednesdays — 2pm ET',
  },
  {
    title: 'Operator office hours',
    description: 'Bring a workflow question; we troubleshoot together.',
    cadence: 'Fridays — 12pm ET',
  },
  {
    title: 'Stack swap forum',
    description: 'Asynchronous threads comparing real-world stacks.',
    cadence: 'Always-on',
  },
];

export default function CommunityPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Community</h1>
        <p className="max-w-2xl text-sm text-slate-600">
          FlowSystems community spaces connect operators comparing notes on migrations, tooling experiments, and automation safety nets.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {events.map((event) => (
          <article key={event.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{event.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{event.description}</p>
            <p className="mt-4 text-xs uppercase tracking-wide text-primary-600">{event.cadence}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
