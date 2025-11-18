import { WorkflowWithStructure } from "../workflows/types";

interface GenerateWorkflowInput {
  description: string;
  phase?: string;
  industry?: string;
}

export interface GenerateWorkflowResponse {
  workflow: WorkflowWithStructure;
}

interface ExpandNodeInput {
  workflow_id: string;
  node_id: string;
}

export interface ExpandNodeResponse {
  nodes: WorkflowWithStructure["nodes"];
  edges: WorkflowWithStructure["edges"];
}

interface SummarizeInput {
  workflow: WorkflowWithStructure;
}

export interface SummarizeResponse {
  sop: string;
  taskList: string[];
  summary: string;
}

export async function callLLM(prompt: string): Promise<string> {
  // Placeholder for real LLM integration
  console.log("LLM prompt: ", prompt);
  return Promise.resolve("TODO: integrate FlowBot or OpenAI");
}

export async function requestGenerateWorkflow(
  payload: GenerateWorkflowInput
): Promise<GenerateWorkflowResponse> {
  const response = await fetch("/api/ai/workflows/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to generate workflow");
  }

  return response.json();
}

export async function requestExpandNode(
  payload: ExpandNodeInput
): Promise<ExpandNodeResponse> {
  const response = await fetch("/api/ai/workflows/expand-node", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to expand node");
  }

  return response.json();
}

export async function requestSummarizeWorkflow(
  payload: SummarizeInput
): Promise<SummarizeResponse> {
  const response = await fetch("/api/ai/workflows/summarize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to summarize workflow");
  }

  return response.json();
}
