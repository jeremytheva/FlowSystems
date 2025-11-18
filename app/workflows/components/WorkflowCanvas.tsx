"use client";

import { useEffect, useMemo, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { WorkflowEdge, WorkflowNode } from "@/lib/workflows/types";
import { EnergyFilter } from "./EnergyFilterToggle";

interface Props {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId?: string;
  onSelectNode: (id: string) => void;
  energyFilter: EnergyFilter;
  zoom: number;
  pan: { x: number; y: number };
  onPanChange?: (pan: { x: number; y: number }) => void;
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
  onPanChange,
}: Props) {
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const panOrigin = useRef<{ x: number; y: number } | null>(null);

  const filteredNodes = useMemo(() => {
    if (energyFilter === "ALL") return nodes;
    return nodes.filter((node) => node.metadata.energy_level === energyFilter);
  }, [energyFilter, nodes]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!dragStart.current || !panOrigin.current || !onPanChange) return;
      const dx = event.clientX - dragStart.current.x;
      const dy = event.clientY - dragStart.current.y;
      onPanChange({ x: panOrigin.current.x + dx, y: panOrigin.current.y + dy });
    };

    const handleMouseUp = () => {
      dragStart.current = null;
      panOrigin.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [onPanChange]);

  const handleMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!onPanChange) return;
    const target = event.target as HTMLElement;
    if (target.closest("button")) return;
    dragStart.current = { x: event.clientX, y: event.clientY };
    panOrigin.current = { ...pan };
  };

  return (
    <div
      className="relative h-[600px] overflow-hidden rounded-lg border bg-slate-50"
      onMouseDown={handleMouseDown}
      role="presentation"
      style={{ cursor: onPanChange ? "grab" : "default" }}
    >
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
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            return (
              <g key={edge.id}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#94a3b8"
                  strokeWidth={2}
                  markerEnd="url(#arrow)"
                />
                {edge.label && (
                  <text
                    x={midX}
                    y={midY - 4}
                    className="fill-slate-600 text-xs"
                    textAnchor="middle"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
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
