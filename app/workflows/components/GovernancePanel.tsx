import { evaluateWorkflowHealth } from "@/lib/workflows/governance";
import { WorkflowWithStructure } from "@/lib/workflows/types";

interface Props {
  workflow: WorkflowWithStructure;
}

export function GovernancePanel({ workflow }: Props) {
  const { score, warnings } = evaluateWorkflowHealth(workflow);

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Governance</h3>
        <span className="rounded-md bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
          Health: {score}/100
        </span>
      </div>
      <ul className="mt-3 space-y-2">
        {warnings.map((warning) => (
          <li
            key={warning.id}
            className="flex items-start gap-2 rounded-md bg-gray-50 p-3 text-sm text-gray-700"
          >
            <span className="mt-0.5 h-2 w-2 rounded-full bg-amber-500" aria-hidden />
            <span>{warning.message}</span>
          </li>
        ))}
        {warnings.length === 0 && (
          <li className="text-sm text-gray-600">No governance warnings detected.</li>
        )}
      </ul>
    </div>
  );
}
