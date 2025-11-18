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
  const [newConnection, setNewConnection] = useState({
    source: initialWorkflow.nodes[0]?.id ?? "",
    target: initialWorkflow.nodes[1]?.id ?? "",
    label: "",
  });
  const [forkConfig, setForkConfig] = useState({
    source: initialWorkflow.nodes[0]?.id ?? "",
    trueTarget: initialWorkflow.nodes[1]?.id ?? "",
    falseTarget: initialWorkflow.nodes[2]?.id ?? "",
    condition: "",
  });

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

  const handleAddConnection = () => {
    if (!newConnection.source || !newConnection.target) return;
    const id = `edge-${Date.now()}`;
    const edge = {
      id,
      workflow_id: workflow.id,
      source_node_id: newConnection.source,
      target_node_id: newConnection.target,
      label: newConnection.label || "Trigger",
    } satisfies WorkflowWithStructure["edges"][number];
    setWorkflow((current) => ({ ...current, edges: [...current.edges, edge] }));
  };

  const handleAddFork = () => {
    if (!forkConfig.source || !forkConfig.trueTarget || !forkConfig.falseTarget) return;
    const sourceNode = workflow.nodes.find((node) => node.id === forkConfig.source);
    const baseX = sourceNode?.position.x ?? 0;
    const baseY = sourceNode?.position.y ?? 0;

    const forkNode = {
      id: `node-fork-${Date.now()}`,
      workflow_id: workflow.id,
      type: "DECISION" as const,
      label: forkConfig.condition || "Conditional branch",
      description: "Decision fork created in builder",
      position: { x: baseX + 150, y: baseY + 60 },
      metadata: sourceNode?.metadata ?? {},
    } satisfies WorkflowWithStructure["nodes"][number];

    const edgesToAdd: WorkflowWithStructure["edges"] = [
      {
        id: `edge-${forkNode.id}-in`,
        workflow_id: workflow.id,
        source_node_id: forkConfig.source,
        target_node_id: forkNode.id,
        label: forkConfig.condition || "Condition",
      },
      {
        id: `edge-${forkNode.id}-true`,
        workflow_id: workflow.id,
        source_node_id: forkNode.id,
        target_node_id: forkConfig.trueTarget,
        label: "Yes / True",
      },
      {
        id: `edge-${forkNode.id}-false`,
        workflow_id: workflow.id,
        source_node_id: forkNode.id,
        target_node_id: forkConfig.falseTarget,
        label: "No / Else",
      },
    ];

    setWorkflow((current) => ({
      ...current,
      nodes: [...current.nodes, forkNode],
      edges: [...current.edges, ...edgesToAdd],
    }));
    setSelectedNodeId(forkNode.id);
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
                <button onClick={() => setPan((p) => ({ ...p, x: p.x + 40 }))} className="rounded border px-2 py-1">
                  ←
                </button>
                <button onClick={() => setPan((p) => ({ ...p, x: p.x - 40 }))} className="rounded border px-2 py-1">
                  →
                </button>
                <button onClick={() => setPan((p) => ({ ...p, y: p.y + 40 }))} className="rounded border px-2 py-1">
                  ↑
                </button>
                <button onClick={() => setPan((p) => ({ ...p, y: p.y - 40 }))} className="rounded border px-2 py-1">
                  ↓
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 rounded-lg border bg-white p-3 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-800">Add connection</h4>
                <label className="block text-xs text-gray-600">
                  From
                  <select
                    value={newConnection.source}
                    onChange={(e) => setNewConnection((c) => ({ ...c, source: e.target.value }))}
                    className="mt-1 w-full rounded-md border px-2 py-1 text-sm"
                  >
                    {workflow.nodes.map((node) => (
                      <option key={node.id} value={node.id}>
                        {node.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs text-gray-600">
                  To
                  <select
                    value={newConnection.target}
                    onChange={(e) => setNewConnection((c) => ({ ...c, target: e.target.value }))}
                    className="mt-1 w-full rounded-md border px-2 py-1 text-sm"
                  >
                    {workflow.nodes.map((node) => (
                      <option key={node.id} value={node.id}>
                        {node.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs text-gray-600">
                  Trigger / condition
                  <input
                    value={newConnection.label}
                    onChange={(e) => setNewConnection((c) => ({ ...c, label: e.target.value }))}
                    className="mt-1 w-full rounded-md border px-2 py-1 text-sm"
                    placeholder="e.g. form submitted"
                  />
                </label>
                <button
                  onClick={handleAddConnection}
                  className="w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow"
                >
                  Add connection
                </button>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-800">Add fork</h4>
                <label className="block text-xs text-gray-600">
                  Fork source
                  <select
                    value={forkConfig.source}
                    onChange={(e) => setForkConfig((c) => ({ ...c, source: e.target.value }))}
                    className="mt-1 w-full rounded-md border px-2 py-1 text-sm"
                  >
                    {workflow.nodes.map((node) => (
                      <option key={node.id} value={node.id}>
                        {node.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs text-gray-600">
                  Condition / trigger
                  <input
                    value={forkConfig.condition}
                    onChange={(e) => setForkConfig((c) => ({ ...c, condition: e.target.value }))}
                    className="mt-1 w-full rounded-md border px-2 py-1 text-sm"
                    placeholder="e.g. lead is qualified"
                  />
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="block text-xs text-gray-600">
                    True branch
                    <select
                      value={forkConfig.trueTarget}
                      onChange={(e) => setForkConfig((c) => ({ ...c, trueTarget: e.target.value }))}
                      className="mt-1 w-full rounded-md border px-2 py-1 text-sm"
                    >
                      {workflow.nodes.map((node) => (
                        <option key={node.id} value={node.id}>
                          {node.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-xs text-gray-600">
                    False branch
                    <select
                      value={forkConfig.falseTarget}
                      onChange={(e) => setForkConfig((c) => ({ ...c, falseTarget: e.target.value }))}
                      className="mt-1 w-full rounded-md border px-2 py-1 text-sm"
                    >
                      {workflow.nodes.map((node) => (
                        <option key={node.id} value={node.id}>
                          {node.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <button
                  onClick={handleAddFork}
                  className="w-full rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow"
                >
                  Add fork with condition
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
              onPanChange={setPan}
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
