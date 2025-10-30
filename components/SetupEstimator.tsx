'use client';

import { useMemo, useState } from 'react';

interface SetupEstimatorProps {
  defaults?: {
    imports?: number;
    automations?: number;
    users?: number;
  };
}

const IMPORT_HOURS = 1.5;
const AUTOMATION_HOURS = 2.5;
const USER_HOURS = 0.75;

export function SetupEstimator({ defaults }: SetupEstimatorProps) {
  const [imports, setImports] = useState(defaults?.imports ?? 1);
  const [automations, setAutomations] = useState(defaults?.automations ?? 2);
  const [users, setUsers] = useState(defaults?.users ?? 3);

  const hours = useMemo(() => {
    return imports * IMPORT_HOURS + automations * AUTOMATION_HOURS + users * USER_HOURS;
  }, [imports, automations, users]);

  return (
    <section className="mt-10 rounded-xl border border-slate-200 bg-white/80 p-6 shadow-sm">
      <h3 className="text-base font-semibold text-slate-800">Setup time estimator</h3>
      <p className="mt-2 text-sm text-slate-600">
        Adjust the sliders to see how onboarding scope changes the total operator hours required.
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <EstimatorField
          label="Data imports"
          value={imports}
          onChange={setImports}
          helper="CSV migrations or API backfills"
        />
        <EstimatorField
          label="Automations"
          value={automations}
          onChange={setAutomations}
          helper="Custom flows or zaps"
        />
        <EstimatorField label="Team members" value={users} onChange={setUsers} helper="Seats to invite" />
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-primary-50 px-4 py-3 text-sm text-primary-800">
        <p className="font-medium">Estimated operator hours</p>
        <p className="text-2xl font-semibold">{hours.toFixed(1)} hrs</p>
      </div>
    </section>
  );
}

interface EstimatorFieldProps {
  label: string;
  value: number;
  helper: string;
  onChange: (value: number) => void;
}

function EstimatorField({ label, value, helper, onChange }: EstimatorFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-slate-700">
      <span className="font-medium text-slate-800">{label}</span>
      <input
        type="range"
        min={0}
        max={10}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="accent-primary-600"
      />
      <span className="text-xs text-slate-500">
        {value} · {helper}
      </span>
    </label>
  );
}
