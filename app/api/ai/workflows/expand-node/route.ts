import { NextResponse } from "next/server";
import { callLLM } from "@/app/lib/ai/workflow-ai";
import { WorkflowEdge, WorkflowNode } from "@/app/lib/workflows/types";

export async function POST(request: Request) {
  const body = await request.json();
  const { workflow_id, node_id } = body as {
    workflow_id: string;
    node_id: string;
  };

  await callLLM(`Expand node ${node_id} in workflow ${workflow_id}`);

  const newNodeId = `generated-node-${Date.now()}`;
  const newNodes: WorkflowNode[] = [
    {
      id: newNodeId,
      workflow_id,
      type: "TASK",
      label: "AI suggested step",
      description: "This task was suggested by FlowBot to deepen the flow.",
      position: { x: 300, y: 300 },
      metadata: {
        duration_minutes: 25,
        energy_level: "MEDIUM",
        executor_type: "HUMAN",
        priority: "MEDIUM",
        success_metrics: "Task reviewed and accepted",
        emotional_load_score: 2,
      },
    },
  ];

  const newEdges: WorkflowEdge[] = [
    {
      id: `edge-${node_id}-${newNodeId}`,
      workflow_id,
      source_node_id: node_id,
      target_node_id: newNodeId,
      label: "Suggested",
    },
  ];

  return NextResponse.json({ nodes: newNodes, edges: newEdges });
}
