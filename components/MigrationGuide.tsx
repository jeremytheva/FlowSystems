interface MigrationStep {
  title: string;
  description: string;
}

interface MigrationGuideProps {
  steps: MigrationStep[];
}

export function MigrationGuide({ steps }: MigrationGuideProps) {
  return (
    <section className="mt-10 rounded-xl border border-slate-200 bg-white/80 p-6 shadow-sm">
      <h3 className="text-base font-semibold text-slate-800">Migration game plan</h3>
      <ol className="mt-4 space-y-4 text-sm text-slate-700">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-700">
              {index + 1}
            </span>
            <div>
              <p className="font-medium text-slate-800">{step.title}</p>
              <p className="mt-1 text-slate-600">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
