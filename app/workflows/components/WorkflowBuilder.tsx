"use client";

import { useEffect, useMemo, useState } from "react";
import { requestExpandNode, requestSummarizeWorkflow } from "@/lib/ai/workflow-ai";
import { saveWorkflow } from "@/lib/workflows/client";
import { WorkflowWithStructure } from "@/lib/workflows/types";
import { AiGenerateWorkflowModal } from "./AiGenerateWorkflowModal";
import { EnergyFilter, EnergyFilterToggle } from "./EnergyFilterToggle";
import { GovernancePanel } from "./GovernancePanel";
import { NodeDetailsPanel } from "./NodeDetailsPanel";
import { SimpleAdvancedModeToggle } from "./SimpleAdvancedModeToggle";
import { SopView } from "./SopView";
import { TaskListView } from "./TaskListView";
import { TimelineView } from "./TimelineView";
import { ViewMode, ViewModeToggle } from "./ViewModeToggle";
import { WorkflowCanvas } from "./WorkflowCanvas";
import { WorkflowDetailsPanel } from "./WorkflowDetailsPanel";

interface Props {
  initialWorkflow: WorkflowWithStructure;
}

export function WorkflowBuilder({ initialWorkflow }: Props) {
  const [workflow, setWorkflow] = useState<WorkflowWithStructure>(initialWorkflow);
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>(
    initialWorkflow.nodes[0]?.id
  );
  const [viewMode, setViewMode] = useState<ViewMode>("FLOW");
  const [energyFilter, setEnergyFilter] = useState<EnergyFilter>("ALL");
  const [mode, setMode] = useState<"SIMPLE" | "ADVANCED">("SIMPLE");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showGenerate, setShowGenerate] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>("");

  useEffect(() => {
    const stored = window.localStorage.getItem("workflow-mode");
    if (stored === "SIMPLE" || stored === "ADVANCED") {
      setMode(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("workflow-mode", mode);
  }, [mode]);

  const selectedNode = useMemo(
    () => workflow.nodes.find((node) => node.id === selectedNodeId),
    [workflow.nodes, selectedNodeId]
  );

  const handleNodeChange = (updated: Partial<WorkflowWithStructure["nodes"][number]>) => {
    setWorkflow((current) => ({
      ...current,
      nodes: current.nodes.map((node) => (node.id === updated.id ? { ...node, ...updated } : node)),
    }));
  };

  const handleSave = async () => {
    const saved = await saveWorkflow(workflow);
    setWorkflow(saved);
    setStatusMessage("Saved to Supabase stub at " + new Date().toLocaleTimeString());
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleExpandNode = async (nodeId: string) => {
    const { nodes, edges } = await requestExpandNode({ workflow_id: workflow.id, node_id: nodeId });
    setWorkflow((current) => ({
      ...current,
      nodes: [...current.nodes, ...(nodes ?? [])],
      edges: [...current.edges, ...(edges ?? [])],
    }));
  };

  const handleSummarize = async () => {
    const response = await requestSummarizeWorkflow({ workflow });
    setSummary(response.summary);
  };

  const filteredNodes = useMemo(() => {
    if (energyFilter === "ALL") return workflow.nodes;
    return workflow.nodes.filter((node) => node.metadata.energy_level === energyFilter);
  }, [energyFilter, workflow.nodes]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowGenerate(true)}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow"
          >
            AI Generate
          </button>
          <button
            onClick={handleSummarize}
            className="rounded-md border px-3 py-2 text-sm font-semibold text-gray-700"
          >
            Summarize
          </button>
          <button
            onClick={handleSave}
            className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow"
          >
            Save
          </button>
          {statusMessage && <span className="text-xs text-gray-600">{statusMessage}</span>}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ViewModeToggle value={viewMode} onChange={setViewMode} />
          <EnergyFilterToggle value={energyFilter} onChange={setEnergyFilter} />
          <SimpleAdvancedModeToggle value={mode} onChange={setMode} />
        </div>
      </div>

      {viewMode === "FLOW" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg border bg-white p-3">
              <label className="text-sm">
                Zoom
                <input
                  type="range"
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="ml-2"
                />
              </label>
              <div className="flex items-center gap-2 text-sm">
                <button onClick={() => setPan((p) => ({ ...p, x: p.x - 40 }))} className="rounded border px-2 py-1">
                  ←
                </button>
                <button onClick={() => setPan((p) => ({ ...p, x: p.x + 40 }))} className="rounded border px-2 py-1">
                  →
                </button>
                <button onClick={() => setPan((p) => ({ ...p, y: p.y - 40 }))} className="rounded border px-2 py-1">
                  ↑
                </button>
                <button onClick={() => setPan((p) => ({ ...p, y: p.y + 40 }))} className="rounded border px-2 py-1">
                  ↓
                </button>
              </div>
            </div>
            <WorkflowCanvas
              nodes={workflow.nodes}
              edges={workflow.edges}
              selectedNodeId={selectedNodeId}
              onSelectNode={setSelectedNodeId}
              energyFilter={energyFilter}
              zoom={zoom}
              pan={pan}
            />
          </div>
          <div className="space-y-4">
            <WorkflowDetailsPanel workflow={workflow} onChange={setWorkflow} />
            <NodeDetailsPanel
              node={selectedNode}
              onChange={handleNodeChange}
              onExpand={selectedNode ? () => handleExpandNode(selectedNode.id) : undefined}
              mode={mode}
            />
            <GovernancePanel workflow={workflow} />
          </div>
        </div>
      )}

      {viewMode === "SOP" && <SopView nodes={filteredNodes} />}
      {viewMode === "TASKS" && <TaskListView nodes={filteredNodes} />}
      {viewMode === "TIMELINE" && <TimelineView nodes={filteredNodes} />}

      {summary && (
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h3 className="text-lg font-semibold">FlowBot summary</h3>
          <p className="text-sm text-gray-700">{summary}</p>
        </div>
      )}

      <AiGenerateWorkflowModal
        open={showGenerate}
        onClose={() => setShowGenerate(false)}
        onGenerated={(wf) => {
          setWorkflow(wf);
          setSelectedNodeId(wf.nodes[0]?.id);
        }}
      />
    </div>
  );
}
