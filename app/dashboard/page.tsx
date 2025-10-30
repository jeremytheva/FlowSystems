const metrics = [
  { label: 'Reviews published', value: 12, description: 'Reviews with operator interviews and telemetry supporting factor scores.' },
  { label: 'Active migrations tracked', value: 27, description: 'Companies currently rolling out platforms with FlowSystems playbooks.' },
  { label: 'Community operators', value: 480, description: 'Members sharing workflows and lessons learned inside our community.' },
];

export const metadata = {
  title: 'Dashboard',
  description: 'Operational view of FlowSystems coverage and community activity.',
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900">FlowSystems dashboard</h1>
        <p className="text-sm text-slate-600">
          A snapshot of how many platforms we are actively reviewing, the migrations in progress, and community engagement.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-primary-600">{metric.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{metric.value}</p>
            <p className="mt-2 text-sm text-slate-600">{metric.description}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-sm text-slate-600">
        <p>
          Want your platform included or need help planning a migration? Email <a className="font-semibold text-primary-700" href="mailto:hello@flowsystems.dev">hello@flowsystems.dev</a> to connect with the research team.
        </p>
      </div>
    </div>
  );
}
