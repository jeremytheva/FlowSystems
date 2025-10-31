'use client';

import { track } from '@/lib/analytics';
import clsx from 'clsx';
import { useState } from 'react';

type Preset = {
  id: string;
  label: string;
  description: string;
};

const PRESETS: Preset[] = [
  {
    id: 'solo-crm',
    label: 'Solo CRM Launch',
    description: 'Lightweight pipeline tracking with automation basics.',
  },
  {
    id: 'client-onboarding',
    label: 'Client Onboarding',
    description: 'Template and e-sign workflows for service businesses.',
  },
  {
    id: 'ops-automation',
    label: 'Ops Automation',
    description: 'Connect forms, docs, and messaging for faster handoffs.',
  },
];

export default function PresetButtons() {
  const [active, setActive] = useState<string | null>(PRESETS[0]?.id ?? null);

  const handleSelect = (preset: Preset) => {
    setActive(preset.id);
    track({ type: 'preset:selected', payload: { preset: preset.id } });
  };

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {PRESETS.map((preset) => (
        <button
          key={preset.id}
          type="button"
          onClick={() => handleSelect(preset)}
          className={clsx(
            'rounded-lg border p-4 text-left transition',
            active === preset.id
              ? 'border-slate-900 bg-slate-900 text-white shadow-lg'
              : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
          )}
        >
          <span className="block text-sm font-semibold">{preset.label}</span>
          <span className="mt-2 block text-xs text-slate-500">{preset.description}</span>
        </button>
      ))}
    </div>
  );
}
