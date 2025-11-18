"use client";

import { useState } from "react";
import { requestGenerateWorkflow } from "@/app/lib/ai/workflow-ai";
import { WorkflowWithStructure } from "@/app/lib/workflows/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onGenerated: (workflow: WorkflowWithStructure) => void;
}

export function AiGenerateWorkflowModal({ open, onClose, onGenerated }: Props) {
  const [description, setDescription] = useState("Automate a client services intake");
  const [phase, setPhase] = useState("SERVE");
  const [industry, setIndustry] = useState("Consulting");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError(null);
      const { workflow } = await requestGenerateWorkflow({ description, phase, industry });
      onGenerated(workflow);
      onClose();
    } catch (err) {
      setError("Unable to generate workflow right now.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold">Generate workflow with FlowBot</h3>
        <p className="mt-1 text-sm text-gray-600">
          Describe the outcome you want and FlowBot will propose a starting workflow.
        </p>

        <div className="mt-4 space-y-3">
          <label className="block text-sm">
            <span className="text-gray-700">Desired outcome</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-md border px-2 py-1"
              rows={3}
            />
          </label>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <label className="block">
              <span className="text-gray-700">Phase</span>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
                className="mt-1 w-full rounded-md border px-2 py-1"
              >
                <option value="DEFINE">Define</option>
                <option value="ATTRACT">Attract</option>
                <option value="SERVE">Serve</option>
                <option value="EVOLVE">Evolve</option>
                <option value="GOVERN">Govern</option>
                <option value="CROSS_PHASE">Cross-phase</option>
              </select>
            </label>
            <label className="block">
              <span className="text-gray-700">Industry</span>
              <input
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="mt-1 w-full rounded-md border px-2 py-1"
              />
            </label>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
}
