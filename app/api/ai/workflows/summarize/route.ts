import { NextResponse } from "next/server";
import { callLLM } from "@/lib/ai/workflow-ai";
import { WorkflowWithStructure } from "@/lib/workflows/types";

export async function POST(request: Request) {
  const body = await request.json();
  const { workflow } = body as { workflow: WorkflowWithStructure };

  await callLLM(`Summarize workflow ${workflow?.name}`);

  const sop = workflow?.nodes
    ?.map((node, index) => `${index + 1}. ${node.label} - ${node.description}`)
    .join("\n") ?? "No steps yet";

  const taskList = workflow?.nodes?.map((node) => node.label) ?? [];

  const summary =
    workflow?.description ??
    "FlowBot summary placeholder. Replace with generated narrative when wired to LLM.";

  return NextResponse.json({ sop, taskList, summary });
}
