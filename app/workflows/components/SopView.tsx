import { WorkflowNode } from "@/lib/workflows/types";

interface Props {
  nodes: WorkflowNode[];
}

export function SopView({ nodes }: Props) {
  return (
    <div className="space-y-3 rounded-lg border bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold">SOP</h3>
      {nodes.length === 0 && <p className="text-sm text-gray-500">No steps yet.</p>}
      <ol className="space-y-2">
        {nodes.map((node, index) => (
          <li key={node.id} className="rounded-md bg-gray-50 p-3">
            <p className="text-sm font-semibold">{index + 1}. {node.label}</p>
            <p className="text-sm text-gray-600">{node.description}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-700">
              <span>Owner: {node.metadata.executor_type ?? "Unassigned"}</span>
              {node.metadata.duration_minutes && (
                <span>Duration: {node.metadata.duration_minutes}m</span>
              )}
              {node.metadata.energy_level && <span>Energy: {node.metadata.energy_level}</span>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
