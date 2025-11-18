import { NextResponse } from "next/server";
import { MasAgentType } from "@/app/lib/workflows/types";

export async function POST(request: Request) {
  const body = await request.json();
  const { workflow_id, node_id, agent_type } = body as {
    workflow_id: string;
    node_id: string;
    agent_type: MasAgentType;
  };

  return NextResponse.json({
    workflow_id,
    node_id,
    agent_type,
    status: "stubbed",
    message: "MAS assignment endpoint placeholder.",
  });
}
