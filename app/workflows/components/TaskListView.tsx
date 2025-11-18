import { WorkflowNode } from "@/app/lib/workflows/types";

interface Props {
  nodes: WorkflowNode[];
}

export function TaskListView({ nodes }: Props) {
  const grouped = nodes.reduce<Record<string, WorkflowNode[]>>((acc, node) => {
    const bucket = node.metadata.energy_level ?? "UNCATEGORIZED";
    acc[bucket] = acc[bucket] ? [...acc[bucket], node] : [node];
    return acc;
  }, {});

  return (
    <div className="space-y-3 rounded-lg border bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold">Tasks</h3>
      {Object.entries(grouped).map(([bucket, bucketNodes]) => (
        <div key={bucket} className="rounded-md bg-gray-50 p-3">
          <p className="text-sm font-semibold">{bucket}</p>
          <ul className="mt-2 space-y-1 text-sm text-gray-700">
            {bucketNodes.map((node) => (
              <li key={node.id} className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                <span>{node.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
