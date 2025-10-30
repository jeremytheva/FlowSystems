export const metadata = {
  title: 'Course coming soon',
};

const syllabus = [
  {
    title: 'Audit your current stack',
    description: 'Inventory workflows, automations, and constraints so you can evaluate platforms against reality.',
  },
  {
    title: 'Design your operating model',
    description: 'Translate customer journeys into explicit workflows ready for tooling.',
  },
  {
    title: 'Run a structured pilot',
    description: 'Sequence migrations, set guardrails, and define success signals before scaling.',
  },
];

import { courseCohorts } from '@/data/admin';

export default function CoursePage({ params }: { params: { slug: string } }) {
  const cohort = courseCohorts.find((course) => course.slug === params.slug);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Course: {params.slug.replace(/-/g, ' ')}</h1>
      {cohort && (
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Status: {cohort.status}</p>
      )}
      <p className="text-sm text-slate-600">
        FlowSystems courses translate playbooks into actionable training. We are currently recording this cohort—join the waitlist below to
        get notified when it opens.
      </p>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Planned syllabus</h2>
        <ol className="mt-4 space-y-3 text-sm text-slate-700">
          {syllabus.map((module, index) => (
            <li key={module.title} className="flex gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
                {index + 1}
              </span>
              <div>
                <p className="font-medium text-slate-800">{module.title}</p>
                <p className="text-slate-600">{module.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <button className="mt-6 rounded-full bg-primary-600 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-700">
          Join waitlist
        </button>
      </div>
    </div>
  );
}
