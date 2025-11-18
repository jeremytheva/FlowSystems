import { WorkflowWithStructure, WorkflowGovernanceWarning } from "./types";

export function evaluateWorkflowHealth(
  workflow: WorkflowWithStructure
): { score: number; warnings: WorkflowGovernanceWarning[] } {
  const warnings: WorkflowGovernanceWarning[] = [];

  if (!workflow.nodes || workflow.nodes.length === 0) {
    warnings.push({
      id: "no-nodes",
      message: "Workflow has no steps yet.",
      severity: "error",
    });
  }

  const typeCounts = workflow.nodes?.reduce<Record<string, number>>((acc, node) => {
    acc[node.type] = (acc[node.type] ?? 0) + 1;
    return acc;
  }, {});

  if (!typeCounts?.TRIGGER) {
    warnings.push({
      id: "missing-trigger",
      message: "Add at least one TRIGGER to mark when the workflow starts.",
      severity: "warning",
    });
  }

  if (!typeCounts?.END) {
    warnings.push({
      id: "missing-end",
      message: "Add an END node to signal closure.",
      severity: "warning",
    });
  }

  const missingDetails = workflow.nodes?.filter(
    (node) => !node.label || !node.description || !node.metadata.executor_type
  );

  if (missingDetails && missingDetails.length > 0) {
    warnings.push({
      id: "missing-details",
      message: `${missingDetails.length} node(s) are missing label, description, or executor type.`,
      severity: "warning",
    });
  }

  const disconnected = workflow.nodes?.filter((node) => {
    const isSource = workflow.edges?.some((edge) => edge.source_node_id === node.id);
    const isTarget = workflow.edges?.some((edge) => edge.target_node_id === node.id);
    return !isSource && !isTarget;
  });

  if (disconnected && disconnected.length > 0) {
    warnings.push({
      id: "disconnected",
      message: `${disconnected.length} node(s) are not connected to the main flow.`,
      severity: "info",
    });
  }

  // Start with 100 and subtract small penalties per warning.
  const baseScore = 100;
  const penalty = warnings.reduce((sum, warning) => {
    if (warning.severity === "error") return sum + 40;
    if (warning.severity === "warning") return sum + 20;
    return sum + 10;
  }, 0);

  const score = Math.max(10, baseScore - penalty);

  return { score, warnings };
}
