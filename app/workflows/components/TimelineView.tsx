import { WorkflowNode } from "@/app/lib/workflows/types";

interface Props {
  nodes: WorkflowNode[];
}

export function TimelineView({ nodes }: Props) {
  let cumulative = 0;
  const events = nodes.map((node) => {
    const start = cumulative;
    const duration = node.metadata.duration_minutes ?? 0;
    cumulative += duration;
    return { ...node, start, duration };
  });

  return (
    <div className="space-y-3 rounded-lg border bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold">Timeline</h3>
      <ul className="space-y-2">
        {events.map((event) => (
          <li key={event.id} className="rounded-md bg-gray-50 p-3">
            <p className="text-sm font-semibold">{event.label}</p>
            <p className="text-xs text-gray-600">Start: {event.start}m — Duration: {event.duration}m</p>
            <p className="text-xs text-gray-500">{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
