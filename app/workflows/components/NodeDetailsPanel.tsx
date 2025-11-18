"use client";

import { useEffect } from "react";
import { EnergyLevel, MasAgentType, NodeMetadata, WorkflowNode } from "@/lib/workflows/types";

interface Props {
  node?: WorkflowNode;
  onChange: (metadata: Partial<WorkflowNode>) => void;
  onExpand?: () => void;
  mode: "SIMPLE" | "ADVANCED";
}

const energyOptions: EnergyLevel[] = ["LOW", "MEDIUM", "HIGH"];
const agentOptions: MasAgentType[] = [
  "DEFINE",
  "ATTRACT",
  "SERVE",
  "EVOLVE",
  "GOVERN",
  "MASTER",
];

export function NodeDetailsPanel({ node, onChange, onExpand, mode }: Props) {
  useEffect(() => {
    // placeholder to show mode changes could trigger analytics later
  }, [mode]);

  if (!node) {
    return (
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-600">Select a node to edit details.</p>
      </div>
    );
  }

  const updateMetadata = (metadata: Partial<NodeMetadata>) => {
    onChange({ ...node, metadata: { ...node.metadata, ...metadata } });
  };

  return (
    <div className="space-y-4 rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-gray-500">Node</p>
          <h3 className="text-lg font-semibold">{node.label}</h3>
        </div>
        {onExpand && (
          <button
            onClick={onExpand}
            className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow"
          >
            Expand with AI
          </button>
        )}
      </div>

      <div className="space-y-3">
        <label className="block text-sm">
          <span className="text-gray-700">Title</span>
          <input
            value={node.label}
            onChange={(e) => onChange({ ...node, label: e.target.value })}
            className="mt-1 w-full rounded-md border px-2 py-1 text-sm"
          />
        </label>
        <label className="block text-sm">
          <span className="text-gray-700">Description</span>
          <textarea
            value={node.description ?? ""}
            onChange={(e) => onChange({ ...node, description: e.target.value })}
            className="mt-1 w-full rounded-md border px-2 py-1 text-sm"
            rows={3}
          />
        </label>
      </div>

      {mode === "ADVANCED" && (
        <div className="grid grid-cols-2 gap-3 text-sm">
          <label className="block">
            <span className="text-gray-700">Duration (minutes)</span>
            <input
              type="number"
              value={node.metadata.duration_minutes ?? ""}
              onChange={(e) => updateMetadata({ duration_minutes: Number(e.target.value) })}
              className="mt-1 w-full rounded-md border px-2 py-1"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Energy</span>
            <select
              value={node.metadata.energy_level ?? ""}
              onChange={(e) => updateMetadata({ energy_level: e.target.value as EnergyLevel })}
              className="mt-1 w-full rounded-md border px-2 py-1"
            >
              <option value="">Select</option>
              {energyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-gray-700">Executor</span>
            <select
              value={node.metadata.executor_type ?? ""}
              onChange={(e) => updateMetadata({ executor_type: e.target.value as NodeMetadata["executor_type"] })}
              className="mt-1 w-full rounded-md border px-2 py-1"
            >
              <option value="">Select</option>
              <option value="HUMAN">Human</option>
              <option value="AGENT">Agent</option>
            </select>
          </label>
          <label className="block">
            <span className="text-gray-700">Priority</span>
            <select
              value={node.metadata.priority ?? ""}
              onChange={(e) => updateMetadata({ priority: e.target.value as NodeMetadata["priority"] })}
              className="mt-1 w-full rounded-md border px-2 py-1"
            >
              <option value="">Select</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </label>
          <label className="block">
            <span className="text-gray-700">Assigned agent</span>
            <select
              value={node.metadata.assigned_agent ?? ""}
              onChange={(e) => updateMetadata({ assigned_agent: e.target.value as MasAgentType })}
              className="mt-1 w-full rounded-md border px-2 py-1"
            >
              <option value="">Select</option>
              {agentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-gray-700">Emotional load (1-5)</span>
            <input
              type="number"
              min={1}
              max={5}
              value={node.metadata.emotional_load_score ?? ""}
              onChange={(e) => updateMetadata({ emotional_load_score: Number(e.target.value) })}
              className="mt-1 w-full rounded-md border px-2 py-1"
            />
          </label>
          <label className="block col-span-2">
            <span className="text-gray-700">Preconditions</span>
            <textarea
              value={node.metadata.preconditions ?? ""}
              onChange={(e) => updateMetadata({ preconditions: e.target.value })}
              className="mt-1 w-full rounded-md border px-2 py-1"
              rows={2}
            />
          </label>
          <label className="block col-span-2">
            <span className="text-gray-700">Postconditions</span>
            <textarea
              value={node.metadata.postconditions ?? ""}
              onChange={(e) => updateMetadata({ postconditions: e.target.value })}
              className="mt-1 w-full rounded-md border px-2 py-1"
              rows={2}
            />
          </label>
          <label className="block col-span-2">
            <span className="text-gray-700">Success metrics</span>
            <textarea
              value={node.metadata.success_metrics ?? ""}
              onChange={(e) => updateMetadata({ success_metrics: e.target.value })}
              className="mt-1 w-full rounded-md border px-2 py-1"
              rows={2}
            />
          </label>
        </div>
      )}
    </div>
  );
}
