import { publishingPipeline } from '@/data/admin';

export default function PublishingPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">Publishing pipeline</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {publishingPipeline.map((release) => (
          <article key={release.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{release.status}</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">{release.title}</h3>
            <p className="mt-2 text-sm text-slate-600">Target date: {release.date}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
