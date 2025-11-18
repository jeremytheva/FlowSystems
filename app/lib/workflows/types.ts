export type WorkflowPhase =
  | "DEFINE"
  | "ATTRACT"
  | "SERVE"
  | "EVOLVE"
  | "GOVERN"
  | "CROSS_PHASE";

export type WorkflowStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type NodeType =
  | "TRIGGER"
  | "TASK"
  | "AUTOMATION"
  | "DECISION"
  | "SUBFLOW"
  | "CHECKPOINT"
  | "BREAK"
  | "GOVERNANCE"
  | "END";

export type EnergyLevel = "LOW" | "MEDIUM" | "HIGH";

export type ExecutorType = "HUMAN" | "AGENT";

export type MasAgentType =
  | "DEFINE"
  | "ATTRACT"
  | "SERVE"
  | "EVOLVE"
  | "GOVERN"
  | "MASTER";

export interface NodeMetadata {
  duration_minutes?: number;
  energy_level?: EnergyLevel;
  executor_type?: ExecutorType;
  assigned_agent?: MasAgentType;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  preconditions?: string;
  postconditions?: string;
  success_metrics?: string;
  emotional_load_score?: number;
}

export interface WorkflowNode {
  id: string;
  workflow_id: string;
  type: NodeType;
  label: string;
  description?: string;
  position: { x: number; y: number };
  metadata: NodeMetadata;
  created_at?: string;
  updated_at?: string;
}

export interface WorkflowEdge {
  id: string;
  workflow_id: string;
  source_node_id: string;
  target_node_id: string;
  label?: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

export interface Workflow {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  phase: WorkflowPhase;
  industry?: string;
  status: WorkflowStatus;
  health_score?: number;
  created_at?: string;
  updated_at?: string;
  nodes?: WorkflowNode[];
  edges?: WorkflowEdge[];
}

export interface WorkflowSummaryViews {
  sop: string;
  taskList: string[];
  summary: string;
}

export interface WorkflowGovernanceWarning {
  id: string;
  message: string;
  severity: "info" | "warning" | "error";
}

export interface WorkflowWithStructure extends Workflow {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}
