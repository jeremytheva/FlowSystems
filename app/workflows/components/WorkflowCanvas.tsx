"use client";

import { useMemo } from "react";
import { WorkflowEdge, WorkflowNode } from "@/app/lib/workflows/types";
import { EnergyFilter } from "./EnergyFilterToggle";

interface Props {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId?: string;
  onSelectNode: (id: string) => void;
  energyFilter: EnergyFilter;
  zoom: number;
  pan: { x: number; y: number };
}

const nodeColors: Record<string, string> = {
  TRIGGER: "bg-emerald-100 border-emerald-300",
  TASK: "bg-white border-gray-200",
  AUTOMATION: "bg-sky-100 border-sky-300",
  DECISION: "bg-amber-100 border-amber-300",
  SUBFLOW: "bg-indigo-100 border-indigo-300",
  CHECKPOINT: "bg-purple-100 border-purple-300",
  BREAK: "bg-rose-100 border-rose-300",
  GOVERNANCE: "bg-teal-100 border-teal-300",
  END: "bg-gray-100 border-gray-300",
};

export function WorkflowCanvas({
  nodes,
  edges,
  selectedNodeId,
  onSelectNode,
  energyFilter,
  zoom,
  pan,
}: Props) {
  const filteredNodes = useMemo(() => {
    if (energyFilter === "ALL") return nodes;
    return nodes.filter((node) => node.metadata.energy_level === energyFilter);
  }, [energyFilter, nodes]);

  return (
    <div className="relative h-[600px] overflow-hidden rounded-lg border bg-slate-50">
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "top left",
        }}
      >
        <svg className="absolute inset-0 h-full w-full">
          {edges.map((edge) => {
            const source = nodes.find((n) => n.id === edge.source_node_id);
            const target = nodes.find((n) => n.id === edge.target_node_id);
            if (!source || !target) return null;
            const x1 = source.position.x + 100;
            const y1 = source.position.y + 40;
            const x2 = target.position.x;
            const y2 = target.position.y + 20;
            return (
              <line
                key={edge.id}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#94a3b8"
                strokeWidth={2}
                markerEnd="url(#arrow)"
              />
            );
          })}
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
            </marker>
          </defs>
        </svg>
        {filteredNodes.map((node) => (
          <button
            key={node.id}
            onClick={() => onSelectNode(node.id)}
            className={`absolute w-48 rounded-lg border px-3 py-2 text-left shadow-sm transition hover:shadow ${
              nodeColors[node.type] ?? "bg-white border-gray-200"
            } ${selectedNodeId === node.id ? "ring-2 ring-blue-500" : ""}`}
            style={{ left: node.position.x, top: node.position.y }}
          >
            <p className="text-xs uppercase text-gray-500">{node.type}</p>
            <p className="font-semibold text-gray-900">{node.label}</p>
            <p className="text-xs text-gray-600">{node.description}</p>
            {node.metadata.energy_level && (
              <span className="mt-2 inline-block rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-gray-700">
                {node.metadata.energy_level} energy
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
