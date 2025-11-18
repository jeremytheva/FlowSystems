import { MasAgentType } from "../workflows/types";

interface AssignPayload {
  workflow_id: string;
  node_id: string;
  agent_type: MasAgentType;
}

export async function assignMasAgent(payload: AssignPayload) {
  const response = await fetch("/api/mas/assign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to assign MAS agent");
  }

  return response.json();
}
