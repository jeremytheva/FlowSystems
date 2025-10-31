'use client';

import { useState } from 'react';

type EvidenceItem = {
  label: string;
  url: string;
  summary: string;
};

type EvidenceDrawerProps = {
  items: EvidenceItem[];
};

export default function EvidenceDrawer({ items }: EvidenceDrawerProps) {
  const [open, setOpen] = useState(false);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <button
        type="button"
        className="flex w-full items-center justify-between text-left text-sm font-semibold text-slate-800"
        onClick={() => setOpen((value) => !value)}
      >
        Evidence drawer
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {open ? 'Hide' : 'Show'}
        </span>
      </button>
      {open && (
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={item.url} className="rounded-lg border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">{item.label}</p>
              <p className="mt-1 text-xs text-slate-500">{item.summary}</p>
              <a href={item.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold text-slate-700">
                Open source ↗
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
