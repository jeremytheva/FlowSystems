import Link from "next/link";
import { listWorkflows } from "@/lib/workflows/client";

export default async function WorkflowsPage() {
  const workflows = await listWorkflows();

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase text-gray-500">Flow Systems</p>
          <h1 className="text-3xl font-bold">Workflow Builder</h1>
          <p className="text-gray-600">Design calm, behaviour-aware workflows with FlowBot and MAS.</p>
        </div>
        <Link
          href={`/workflows/${workflows[0]?.id ?? "new"}`}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow"
        >
          Open sample
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {workflows.map((workflow) => (
          <Link
            key={workflow.id}
            href={`/workflows/${workflow.id}`}
            className="rounded-lg border bg-white p-4 shadow-sm transition hover:shadow"
          >
            <p className="text-xs uppercase text-gray-500">{workflow.phase}</p>
            <h3 className="text-xl font-semibold">{workflow.name}</h3>
            <p className="text-sm text-gray-700">{workflow.description}</p>
            <div className="mt-2 flex items-center gap-3 text-xs text-gray-600">
              <span>Status: {workflow.status}</span>
              {workflow.industry && <span>{workflow.industry}</span>}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
