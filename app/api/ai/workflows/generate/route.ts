import { NextResponse } from "next/server";
import { callLLM } from "@/lib/ai/workflow-ai";
import { sampleWorkflow } from "@/lib/workflows/sample-data";
import { WorkflowWithStructure } from "@/lib/workflows/types";

export async function POST(request: Request) {
  const body = await request.json();
  const description: string = body.description || "";
  const phase: string | undefined = body.phase;
  const industry: string | undefined = body.industry;

  await callLLM(
    `Generate workflow for ${description} phase=${phase ?? "any"} industry=${industry ?? "any"}`
  );

  const now = new Date().toISOString();
  const workflowId = `generated-${Date.now()}`;

  const nodeIdMap = new Map<string, string>();
  const nodes = sampleWorkflow.nodes.map((node, index) => {
    const id = `${workflowId}-node-${index + 1}`;
    nodeIdMap.set(node.id, id);

    return {
      ...node,
      id,
      workflow_id: workflowId,
      position: { ...node.position },
      metadata: { ...node.metadata },
      created_at: now,
      updated_at: now,
    };
  });

  const edges = sampleWorkflow.edges.map((edge, index) => ({
    ...edge,
    id: `${workflowId}-edge-${index + 1}`,
    workflow_id: workflowId,
    source_node_id: nodeIdMap.get(edge.source_node_id) ?? edge.source_node_id,
    target_node_id: nodeIdMap.get(edge.target_node_id) ?? edge.target_node_id,
    metadata: edge.metadata ? { ...edge.metadata } : undefined,
    created_at: now,
    updated_at: now,
  }));

  const generated: WorkflowWithStructure = {
    ...sampleWorkflow,
    id: workflowId,
    name: description?.trim() ? `${description} flow` : "Generated Workflow",
    phase: (phase as WorkflowWithStructure["phase"]) ?? sampleWorkflow.phase,
    industry: industry ?? sampleWorkflow.industry,
    created_at: now,
    updated_at: now,
    nodes,
    edges,
  };

  return NextResponse.json({ workflow: generated });
}
