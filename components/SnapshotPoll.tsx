'use client';

import { track } from '@/lib/analytics';
import { useState } from 'react';

type SnapshotPollProps = {
  question: string;
  options: string[];
};

export default function SnapshotPoll({ question, options }: SnapshotPollProps) {
  const [response, setResponse] = useState<string | null>(null);

  const handleVote = (option: string) => {
    setResponse(option);
    track({ type: 'poll:voted', payload: { option } });
  };

  return (
    <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-sm">
      <p className="font-semibold text-slate-900">{question}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            disabled={response === option}
            onClick={() => handleVote(option)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
              response === option
                ? 'border-emerald-600 bg-emerald-600 text-white'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {response && <p className="mt-3 text-xs text-emerald-600">Thanks for the feedback!</p>}
    </div>
  );
}
