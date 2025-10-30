'use client';

import { track } from '@/lib/analytics';

type MigrationGuideProps = {
  from: string;
  to: string;
  steps: string[];
  risks?: string[];
};

export default function MigrationGuide({ from, to, steps, risks = [] }: MigrationGuideProps) {
  const handleDownload = () => {
    track({ type: 'migration:downloaded', payload: { from, to } });
  };

  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">
        Migration steps: {from} → {to}
      </h3>
      <ol className="mt-3 list-decimal space-y-2 pl-5">
        {steps.map((step, index) => (
          <li key={`${index}-${step}`} className="text-slate-600">
            {step}
          </li>
        ))}
      </ol>
      {risks.length > 0 && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Risks & Mitigations</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-amber-800">
            {risks.map((risk) => (
              <li key={risk}>{risk}</li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="button"
        onClick={handleDownload}
        className="mt-4 inline-flex items-center rounded-full border border-slate-900 px-4 py-2 text-xs font-semibold"
      >
        Download playbook
      </button>
    </section>
  );
}
