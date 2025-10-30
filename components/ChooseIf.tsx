'use client';

import { track } from '@/lib/analytics';
import clsx from 'clsx';

type ChooseIfProps = {
  a: { name: string; chooseIf: string[]; skipIf: string[] };
  b: { name: string; chooseIf: string[]; skipIf: string[] };
  deltas?: Array<{ factor: string; delta: number }>;
};

export default function ChooseIf({ a, b, deltas = [] }: ChooseIfProps) {
  const handleClick = (platform: string, verdict: 'choose' | 'skip') => {
    track({ type: 'comparison:verdict', payload: { platform, verdict } });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {[{ platform: a, label: a.name }, { platform: b, label: b.name }].map(({ platform, label }) => (
        <div key={label} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">{label}</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <div>
              <p className="font-medium text-slate-700">Choose if</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                {platform.chooseIf.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handleClick(label, 'choose')}
                className="mt-3 inline-flex items-center gap-1 rounded-full border border-slate-900 px-3 py-1 text-xs font-semibold"
              >
                Mark as fit
              </button>
            </div>
            <div>
              <p className="font-medium text-slate-700">Skip if</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                {platform.skipIf.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handleClick(label, 'skip')}
                className="mt-3 inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500"
              >
                Not a fit
              </button>
            </div>
          </div>
        </div>
      ))}
      {deltas.length > 0 && (
        <div className="md:col-span-2">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Factor deltas
          </p>
          <ul className="grid gap-2 md:grid-cols-3">
            {deltas.map((delta) => (
              <li
                key={delta.factor}
                className={clsx(
                  'rounded-lg border px-4 py-3 text-sm font-medium',
                  delta.delta > 0 ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-rose-200 bg-rose-50 text-rose-800'
                )}
              >
                {delta.factor}: {delta.delta > 0 ? '+' : ''}
                {delta.delta.toFixed(1)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
