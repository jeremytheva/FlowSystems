import { notFound } from "next/navigation";
import { fetchWorkflow } from "@/app/lib/workflows/client";
import { WorkflowBuilder } from "../components/WorkflowBuilder";

interface Props {
  params: { id: string };
}

export default async function WorkflowDetailPage({ params }: Props) {
  const workflow = await fetchWorkflow(params.id);

  if (!workflow) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl space-y-4 px-4 py-6">
      {workflow && <WorkflowBuilder initialWorkflow={workflow} />}
    </main>
  );
}
