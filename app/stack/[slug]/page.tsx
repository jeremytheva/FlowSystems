const layers = [
  {
    layer: 'Capture',
    description: 'Where raw customer signals arrive—email, forms, integrations.',
  },
  {
    layer: 'Orchestrate',
    description: 'Automations that keep the team in sync and trigger workflows.',
  },
  {
    layer: 'Deliver',
    description: 'The surface where operators collaborate with clients or customers.',
  },
];

export default function StackPage({ params }: { params: { slug: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Stack blueprint: {params.slug.replace(/-/g, ' ')}</h1>
      <p className="text-sm text-slate-600">
        Stack blueprints outline how FlowSystems combines multiple platforms to support a job-to-be-done. Use them as a starting point for your
        own architecture.
      </p>
      <div className="space-y-4">
        {layers.map((layer) => (
          <div key={layer.layer} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">{layer.layer}</h2>
            <p className="mt-2 text-sm text-slate-600">{layer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
