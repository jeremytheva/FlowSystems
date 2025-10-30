const templates = [
  { name: 'Review template', path: 'content/templates/review.template.mdx', description: 'Base MDX structure for a platform deep dive.' },
  { name: 'Comparison template', path: 'content/templates/comparison.template.mdx', description: 'Side-by-side scoring guidance for two or more tools.' },
];

export default function ImportPage() {
  return (
    <div className="space-y-4 text-sm text-slate-600">
      <h2 className="text-2xl font-semibold text-slate-900">Templates & import</h2>
      <p>
        Author new content by copying the templates below into <code>content/reviews</code> or a dedicated comparison folder. The importer ensures required
        fields are present before a review is promoted to publishable.
      </p>
      <ul className="space-y-3">
        {templates.map((template) => (
          <li key={template.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">{template.name}</p>
            <p className="text-xs text-slate-500">{template.path}</p>
            <p className="mt-2 text-sm text-slate-600">{template.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
