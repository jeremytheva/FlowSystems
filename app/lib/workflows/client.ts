import { sampleWorkflows } from "./sample-data";
import { WorkflowWithStructure } from "./types";

// Placeholder client that mimics Supabase calls.
export async function listWorkflows(): Promise<WorkflowWithStructure[]> {
  return Promise.resolve(sampleWorkflows);
}

export async function fetchWorkflow(
  id: string
): Promise<WorkflowWithStructure | undefined> {
  return Promise.resolve(sampleWorkflows.find((wf) => wf.id === id));
}

export async function saveWorkflow(
  workflow: WorkflowWithStructure
): Promise<WorkflowWithStructure> {
  // In a production integration this would persist via Supabase.
  const updated = { ...workflow, updated_at: new Date().toISOString() };
  return Promise.resolve(updated);
}
