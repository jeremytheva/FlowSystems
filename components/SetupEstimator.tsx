'use client';

import { track } from '@/lib/analytics';
import { useMemo, useState, type ChangeEvent } from 'react';

export type SetupEstimatorDefaults = {
  imports: number;
  automations: number;
  users: number;
};

const HOURS_PER_IMPORT = 1.5;
const HOURS_PER_AUTOMATION = 2;
const HOURS_PER_USER = 0.5;

type SetupEstimatorProps = {
  defaults: SetupEstimatorDefaults;
};

export default function SetupEstimator({ defaults }: SetupEstimatorProps) {
  const [imports, setImports] = useState(defaults.imports);
  const [automations, setAutomations] = useState(defaults.automations);
  const [users, setUsers] = useState(defaults.users);

  const totalHours = useMemo(() => {
    return imports * HOURS_PER_IMPORT + automations * HOURS_PER_AUTOMATION + users * HOURS_PER_USER;
  }, [imports, automations, users]);

  const totalDays = totalHours / 6;

  const handleChange = (setter: (value: number) => void, label: string) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      setter(value);
      track({ type: 'setup:changed', payload: { field: label, value } });
    };

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
      <h3 className="text-base font-semibold text-slate-900">Setup estimator</h3>
      <p className="mt-2 text-xs text-slate-500">Estimate the effort to get live in your first week.</p>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-slate-500">
          Imports
          <input
            type="number"
            min={0}
            value={imports}
            onChange={handleChange(setImports, 'imports')}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-slate-500">
          Automations
          <input
            type="number"
            min={0}
            value={automations}
            onChange={handleChange(setAutomations, 'automations')}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-slate-500">
          Users
          <input
            type="number"
            min={0}
            value={users}
            onChange={handleChange(setUsers, 'users')}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          />
        </label>
      </div>
      <div className="mt-4 rounded-lg bg-white p-4 text-sm text-slate-700 shadow-sm">
        <p className="font-semibold text-slate-900">Projected lift</p>
        <p className="mt-1">{totalHours.toFixed(1)} hours ≈ {totalDays.toFixed(1)} working days.</p>
        <p className="mt-1 text-xs text-slate-500">Assuming 6 focus hours per day.</p>
      </div>
    </div>
  );
}
