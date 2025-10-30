interface NewsletterPageProps {
  params: { slug: string };
}

const issues: Record<string, { title: string; summary: string; highlights: string[] }> = {
  'flowos-launch': {
    title: 'FlowOS launch debrief',
    summary: 'Operator insights from the first FlowOS migrations and automation wins.',
    highlights: [
      'Checklist for auditing CRM → FlowOS data migrations.',
      'Automation recipes that replaced 70% of Zapier workflows.',
      'Community Q&A on scaling support responses.',
    ],
  },
};

export default function NewsletterIssuePage({ params }: NewsletterPageProps) {
  const issue = issues[params.slug];

  if (!issue) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Newsletter issue not found</h1>
        <p className="text-sm text-slate-600">Check the slug or head back to the main newsletter page.</p>
      </div>
    );
  }

  return (
    <article className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">{issue.title}</h1>
      <p className="text-sm text-slate-600">{issue.summary}</p>
      <ul className="space-y-3 text-sm text-slate-700">
        {issue.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-primary-500" aria-hidden />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
