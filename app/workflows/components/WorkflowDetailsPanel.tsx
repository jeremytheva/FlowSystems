"use client";

import { WorkflowWithStructure, WorkflowPhase, WorkflowStatus } from "@/app/lib/workflows/types";

interface Props {
  workflow: WorkflowWithStructure;
  onChange: (workflow: WorkflowWithStructure) => void;
}

const phases: WorkflowPhase[] = [
  "DEFINE",
  "ATTRACT",
  "SERVE",
  "EVOLVE",
  "GOVERN",
  "CROSS_PHASE",
];

const statuses: WorkflowStatus[] = ["DRAFT", "ACTIVE", "ARCHIVED"];

export function WorkflowDetailsPanel({ workflow, onChange }: Props) {
  return (
    <div className="space-y-3 rounded-lg border bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold">Workflow</h3>
      <label className="block text-sm">
        <span className="text-gray-700">Name</span>
        <input
          value={workflow.name}
          onChange={(e) => onChange({ ...workflow, name: e.target.value })}
          className="mt-1 w-full rounded-md border px-2 py-1"
        />
      </label>
      <label className="block text-sm">
        <span className="text-gray-700">Description</span>
        <textarea
          value={workflow.description ?? ""}
          onChange={(e) => onChange({ ...workflow, description: e.target.value })}
          className="mt-1 w-full rounded-md border px-2 py-1"
          rows={3}
        />
      </label>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <label className="block">
          <span className="text-gray-700">Phase</span>
          <select
            value={workflow.phase}
            onChange={(e) => onChange({ ...workflow, phase: e.target.value as WorkflowPhase })}
            className="mt-1 w-full rounded-md border px-2 py-1"
          >
            {phases.map((phase) => (
              <option key={phase} value={phase}>
                {phase}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">Status</span>
          <select
            value={workflow.status}
            onChange={(e) => onChange({ ...workflow, status: e.target.value as WorkflowStatus })}
            className="mt-1 w-full rounded-md border px-2 py-1"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">Industry</span>
          <input
            value={workflow.industry ?? ""}
            onChange={(e) => onChange({ ...workflow, industry: e.target.value })}
            className="mt-1 w-full rounded-md border px-2 py-1"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Health score</span>
          <input
            type="number"
            value={workflow.health_score ?? ""}
            onChange={(e) => onChange({ ...workflow, health_score: Number(e.target.value) })}
            className="mt-1 w-full rounded-md border px-2 py-1"
          />
        </label>
      </div>
    </div>
  );
}
