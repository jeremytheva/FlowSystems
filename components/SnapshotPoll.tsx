'use client';

import { useState } from 'react';

interface SnapshotPollProps {
  question: string;
  options: string[];
}

export function SnapshotPoll({ question, options }: SnapshotPollProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="mt-8 rounded-xl border border-slate-200 bg-white/80 p-6 shadow-sm">
      <h3 className="text-base font-semibold text-slate-800">{question}</h3>
      <div className="mt-4 grid gap-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setSelected(option)}
            className={`rounded-lg border px-4 py-2 text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              selected === option
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-slate-200 bg-white text-slate-700 hover:border-primary-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
        <button
          type="button"
          disabled={!selected}
          onClick={() => setSubmitted(true)}
          className="rounded-full bg-primary-600 px-4 py-1.5 font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Submit
        </button>
        {submitted && selected && <p>Thanks! We logged “{selected}”.</p>}
      </div>
    </section>
  );
}
