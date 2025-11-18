import { NextResponse } from "next/server";
import { sampleWorkflow } from "@/app/lib/workflows/sample-data";
import { callLLM } from "@/app/lib/ai/workflow-ai";
import { WorkflowWithStructure } from "@/app/lib/workflows/types";

export async function POST(request: Request) {
  const body = await request.json();
  const description: string = body.description || "";
  const phase: string | undefined = body.phase;
  const industry: string | undefined = body.industry;

  await callLLM(
    `Generate workflow for ${description} phase=${phase ?? "any"} industry=${industry ?? "any"}`
  );

  const generated: WorkflowWithStructure = {
    ...sampleWorkflow,
    id: `generated-${Date.now()}`,
    name: description?.trim() ? `${description} flow` : "Generated Workflow",
    phase: (phase as WorkflowWithStructure["phase"]) ?? sampleWorkflow.phase,
    industry: industry ?? sampleWorkflow.industry,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return NextResponse.json({ workflow: generated });
}
