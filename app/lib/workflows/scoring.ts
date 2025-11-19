// scoring.ts

import type { WorkflowWithStructure, WorkflowPhase } from "./types";
import { resolveDefaultProfileForWorkflow } from "./profiles";
// ./profiles because profiles/ sits beside scoring.ts
/**
 * High-level categories for workflows.
 * Extend as needed – keep these business-facing.
 */
export type WorkflowCategory =
  | "Client_Onboarding"
  | "Content_System"
  | "Sales_Pipeline"
  | "Service_Delivery"
  | "Internal_Operations"
  | "Project_Lifecycle"
  | "Custom";

/**
 * Logical dimension / lens a criterion belongs to.
 * Useful for radar charts, filtering, grouped advice, etc.
 */
export type ScoringDimension =
  | "structure"
  | "timeline"
  | "behaviour"
  | "governance"
  | "automation"
  | "clarity";

/**
 * How a criterion is evaluated.
 * - "builtin": handled by internal logic in scoring.ts (fast, deterministic)
 * - "ai": optional future mode, evaluated via LLM (e.g. clarity of wording)
 */
export type CriterionEvaluationMode = "builtin" | "ai";

/**
 * A single scoring rule.
 * Example: "Has at least one qualification step".
 */
export interface ScoringCriterion {
  /** Stable identifier, e.g. "client_onboarding.has_qualification_step" */
  id: string;
  /** Human-readable label for UI. */
  label: string;
  /** Helpful description or intent of the rule. */
  description: string;
  /** Which dimension this contributes to (structure, behaviour, etc.). */
  dimension: ScoringDimension;
  /**
   * Weight for this criterion (0–1).
   * The profile should be normalised or normalisable (we’ll handle that).
   */
  weight: number;
  /**
   * Evaluation mode.
   * For now, recommend "builtin" only.
   */
  mode: CriterionEvaluationMode;
  /**
   * Optional: reference to a builtin rule implementation.
   * e.g. "has_trigger_and_end", "has_kickoff_meeting"
   */
  builtinRuleId?: string;
}

/**
 * User/workspace-specific override for a criterion.
 */
export interface CriterionOverride {
  /** Set to false to disable this criterion entirely. */
  enabled?: boolean;
  /** Override weight (0–1). */
  weight?: number;
}

/**
 * A scoring profile for a specific workflow “type”.
 * There can be:
 * - global defaults (system-maintained)
 * - workspace-specific profiles
 * - user-specific profiles (advanced)
 */
export interface ScoringProfile {
  id: string;
  name: string;
  description?: string;
  /** Category of workflow (onboarding, content, etc.). */
  category: WorkflowCategory;
  /** Optional phase filter (Define / Attract / Serve / Evolve / Govern). */
  phase?: WorkflowPhase;
  /** Optional industry tag (e.g. "Consulting", "Therapy", "Coaching"). */
  industry?: string;
  /** Criteria that make up this profile. */
  criteria: ScoringCriterion[];
  /**
   * Optional per-criterion overrides.
   * Key: criterion.id
   */
  overrides?: Record<string, CriterionOverride>;
}

/**
 * Result of evaluating one criterion for a specific workflow.
 */
export interface CriterionResult {
  criterionId: string;
  label: string;
  dimension: ScoringDimension;
  /** Raw score for this criterion, 0–1. */
  score: number;
  /** Effective weight after overrides, 0–1. */
  weight: number;
  /** Weighted contribution: score * weight. */
  weightedScore: number;
  /** Whether this criterion is effectively enabled. */
  enabled: boolean;
  /**
   * Optional message / advice.
   * Example: "No qualification step found; consider adding a call to filter leads."
   */
  message?: string;
}

/**
 * Aggregated scoring breakdown.
 */
export interface WorkflowScoreResult {
  /** Overall score 0–100 (normalised). */
  overallScore: number;
  /**
   * Per-dimension breakdown, 0–100 each.
   * e.g. { structure: 85, behaviour: 60 }
   */
  dimensionScores: Partial<Record<ScoringDimension, number>>;
  /**
   * Per-criterion results, suitable for UI lists.
   */
  criteriaResults: CriterionResult[];
  /**
   * High-level recommendations derived from low-scoring criteria.
   */
  recommendations: string[];
  /**
   * The profile used (after overrides applied).
   * Useful for debugging / UI introspection.
   */
  profileId: string;
}

/**
 * Options for scoring a workflow.
 */
export interface ScoreWorkflowOptions {
  /**
   * Explicit profile to use.
   * If omitted, we’ll resolve a default based on workflow metadata
   * (category, phase, industry).
   */
  profile?: ScoringProfile;
  /**
   * Optional context to help select a default profile.
   * E.g. user’s preferred industry or category.
   */
  context?: {
    category?: WorkflowCategory;
    phase?: WorkflowPhase;
    industry?: string;
  };
}

/**
 * Main public function: score a workflow against a profile.
 * TODO: implement the real logic using builtin rules + optional AI later.
 */
export function scoreWorkflow(
  workflow: WorkflowWithStructure,
  options: ScoreWorkflowOptions = {}
): WorkflowScoreResult {
  const profile =
    options.profile ?? getDefaultProfileForWorkflow(workflow, options.context);

  const effectiveCriteria = applyOverrides(profile);

  const rawResults: CriterionResult[] = effectiveCriteria.map((criterion) =>
    evaluateCriterion(criterion, workflow)
  );

  const { overallScore, dimensionScores } = aggregateScores(rawResults);

  const recommendations = buildRecommendations(rawResults);

  return {
    overallScore,
    dimensionScores,
    criteriaResults: rawResults,
    recommendations,
    profileId: profile.id,
  };
}

/**
 * Resolve a default profile based on workflow metadata, phase, industry, etc.
 * For now, this is a stub. Implement with a registry / lookup later.
 */
function getDefaultProfileForWorkflow(
  workflow: WorkflowWithStructure,
  context?: ScoreWorkflowOptions["context"]
): ScoringProfile {
  return resolveDefaultProfileForWorkflow(workflow, {
    category: context?.category,
    phase: context?.phase,
    industry: context?.industry,
  });
}

/**
 * Apply overrides to criteria (weight + enable/disable).
 */
function applyOverrides(profile: ScoringProfile): ScoringCriterion[] {
  const { criteria, overrides } = profile;

  if (!overrides) return criteria;

  return criteria.map((criterion) => {
    const override = overrides[criterion.id];
    if (!override) return criterion;

    return {
      ...criterion,
      weight:
        typeof override.weight === "number"
          ? override.weight
          : criterion.weight,
      // We don’t remove disabled criteria entirely; we’ll mark them in results
      // by honouring enabled=false during evaluation.
    };
  });
}

/**
 * Evaluate a single criterion against the workflow.
 * For now, just dispatches to builtin rule handlers (no AI).
 */
function evaluateCriterion(
  criterion: ScoringCriterion,
  workflow: WorkflowWithStructure
): CriterionResult {
  const enabledOverride = true; // TODO: read from profile.overrides if you want per-criterion enabled flags

  if (!enabledOverride) {
    return {
      criterionId: criterion.id,
      label: criterion.label,
      dimension: criterion.dimension,
      score: 0,
      weight: 0,
      weightedScore: 0,
      enabled: false,
      message: "Criterion disabled by profile.",
    };
  }

  let score = 0;
  let message: string | undefined;

  if (criterion.mode === "builtin") {
    const builtinId = criterion.builtinRuleId ?? criterion.id;
    ({ score, message } = evaluateBuiltinRule(builtinId, workflow));
  } else {
    // Placeholder for future AI-based evaluation.
    // For now, treat as not implemented.
    score = 0;
    message = "AI-based evaluation not implemented yet.";
  }

  const weightedScore = score * criterion.weight;

  return {
    criterionId: criterion.id,
    label: criterion.label,
    dimension: criterion.dimension,
    score,
    weight: criterion.weight,
    weightedScore,
    enabled: true,
    message,
  };
}

/**
 * Combine individual criterion scores into overall + per-dimension scores.
 */
function aggregateScores(criteria: CriterionResult[]): {
  overallScore: number;
  dimensionScores: Partial<Record<ScoringDimension, number>>;
} {
  const enabled = criteria.filter((c) => c.enabled && c.weight > 0);

  if (!enabled.length) {
    return { overallScore: 0, dimensionScores: {} };
  }

  const totalWeight = enabled.reduce((sum, c) => sum + c.weight, 0) || 1;

  const overall = Math.round(
    (enabled.reduce((sum, c) => sum + c.weightedScore, 0) / totalWeight) *
      100
  );

  const dimensionScores: Partial<Record<ScoringDimension, number>> = {};

  const byDimension: Record<
    ScoringDimension,
    { weightSum: number; weightedScoreSum: number }
  > = {
    structure: { weightSum: 0, weightedScoreSum: 0 },
    timeline: { weightSum: 0, weightedScoreSum: 0 },
    behaviour: { weightSum: 0, weightedScoreSum: 0 },
    governance: { weightSum: 0, weightedScoreSum: 0 },
    automation: { weightSum: 0, weightedScoreSum: 0 },
    clarity: { weightSum: 0, weightedScoreSum: 0 },
  };

  for (const c of enabled) {
    const bucket = byDimension[c.dimension];
    bucket.weightSum += c.weight;
    bucket.weightedScoreSum += c.weightedScore;
  }

  (Object.keys(byDimension) as ScoringDimension[]).forEach((dim) => {
    const { weightSum, weightedScoreSum } = byDimension[dim];
    if (weightSum === 0) return;
    dimensionScores[dim] = Math.round((weightedScoreSum / weightSum) * 100);
  });

  return { overallScore: overall, dimensionScores };
}

/**
 * Construct high-level recommendations based on low-scoring criteria.
 * This is where you can map rules -> suggestions.
 */
function buildRecommendations(criteria: CriterionResult[]): string[] {
  const recommendations: string[] = [];

  for (const c of criteria) {
    if (!c.enabled || c.weight === 0) continue;
    // Heuristic: if weighted contribution is low and raw score < 0.5, suggest improvement.
    if (c.score < 0.5) {
      recommendations.push(c.message || c.label);
    }
  }

  // Deduplicate, keep it simple.
  return Array.from(new Set(recommendations));
}

/**
 * Evaluate builtin rules.
 * IMPORTANT: this is where you’ll implement specific scoring logic per criterion.
 *
 * Example builtin rules (to implement later):
 * - "structure.has_trigger_and_end"
 * - "client_onboarding.has_qualification_step"
 * - "service_delivery.has_feedback_step"
 */
// scoring.ts (inside evaluateBuiltinRule)

function evaluateBuiltinRule(
  builtinRuleId: string,
  workflow: WorkflowWithStructure
): { score: number; message?: string } {
  switch (builtinRuleId) {
    case "structure.has_trigger_and_end": {
      const hasTrigger = workflow.nodes.some((n) => n.type === "TRIGGER");
      const hasEnd = workflow.nodes.some((n) => n.type === "END");
      const score = hasTrigger && hasEnd ? 1 : 0;
      const message =
        !hasTrigger || !hasEnd
          ? "Workflows should have at least one TRIGGER and one END node."
          : "Workflow has both TRIGGER and END nodes.";
      return { score, message };
    }

    case "client_onboarding.has_qualification_step": {
      // Heuristic: look for nodes that hint at qualification or discovery.
      const hasQualify = workflow.nodes.some((n) => {
        const label = n.label.toLowerCase();
        return (
          label.includes("qualif") ||
          label.includes("discovery") ||
          label.includes("fit") ||
          label.includes("screen") ||
          label.includes("assess")
        );
      });

      const score = hasQualify ? 1 : 0;
      const message = hasQualify
        ? "Qualification or discovery step detected."
        : "Consider adding a qualification step to ensure clients are a good fit.";
      return { score, message };
    }

    case "client_onboarding.has_expectations_step": {
      // Look for a node where expectations, scope or boundaries are set.
      const hasExpectations = workflow.nodes.some((n) => {
        const label = n.label.toLowerCase();
        const desc = (n.description || "").toLowerCase();
        const text = `${label} ${desc}`;
        return (
          text.includes("expectation") ||
          text.includes("scope") ||
          text.includes("agreement") ||
          text.includes("what's included") ||
          text.includes("what is included") ||
          text.includes("boundaries")
        );
      });

      const score = hasExpectations ? 1 : 0;
      const message = hasExpectations
        ? "Expectation/scope-setting step detected."
        : "Add a step to clearly set expectations and scope with the client.";
      return { score, message };
    }

    case "client_onboarding.has_kickoff_step": {
      // Look for a kickoff/launch/start-of-engagement step.
      const hasKickoff = workflow.nodes.some((n) => {
        const label = n.label.toLowerCase();
        const desc = (n.description || "").toLowerCase();
        const text = `${label} ${desc}`;
        return (
          text.includes("kickoff") ||
          text.includes("kick-off") ||
          text.includes("onboarding call") ||
          text.includes("welcome call") ||
          text.includes("first session") ||
          text.includes("start project") ||
          text.includes("project start")
        );
      });

      const score = hasKickoff ? 1 : 0;
      const message = hasKickoff
        ? "Kickoff/start-of-engagement step detected."
        : "Include a kickoff call or explicit start-of-engagement step.";
      return { score, message };
    }

    case "client_onboarding.has_feedback_or_survey_step": {
      // Look for feedback/survey/review at or near the end.
      const hasFeedbackNode = workflow.nodes.some((n) => {
        const label = n.label.toLowerCase();
        const desc = (n.description || "").toLowerCase();
        const text = `${label} ${desc}`;
        return (
          text.includes("survey") ||
          text.includes("feedback") ||
          text.includes("review") ||
          text.includes("testimonials") ||
          text.includes("nps") ||
          text.includes("check-in") ||
          text.includes("debrief")
        );
      });

      const score = hasFeedbackNode ? 1 : 0;
      const message = hasFeedbackNode
        ? "Feedback/survey step detected at the end of onboarding."
        : "Consider adding a feedback or survey step at the end of onboarding.";

      return { score, message };
    }

    default:
      return {
        score: 0,
        message: `No builtin handler for rule "${builtinRuleId}".`,
      };
  }
}

/**
 * A very simple generic profile you can use until category-specific ones are added.
 */
function getGenericCustomProfile(): ScoringProfile {
  return {
    id: "generic_custom_v1",
    name: "Generic Workflow Quality Profile",
    description:
      "Basic structural checks for any workflow (trigger + end, etc.).",
    category: "Custom",
    criteria: [
      {
        id: "structure.has_trigger_and_end",
        label: "Has TRIGGER and END nodes",
        description:
          "Ensures the workflow has a clear starting trigger and a defined end.",
        dimension: "structure",
        weight: 1,
        mode: "builtin",
        builtinRuleId: "structure.has_trigger_and_end",
      },
    ],
  };
}
// scoring.ts (ensure this is exported)

export function getGenericCustomProfile(): ScoringProfile {
  return {
    id: "generic_custom_v1",
    name: "Generic Workflow Quality Profile",
    description:
      "Basic structural checks for any workflow (trigger + end, etc.).",
    category: "Custom",
    criteria: [
      {
        id: "structure.has_trigger_and_end",
        label: "Has TRIGGER and END nodes",
        description:
          "Ensures the workflow has a clear starting trigger and a defined end.",
        dimension: "structure",
        weight: 1,
        mode: "builtin",
        builtinRuleId: "structure.has_trigger_and_end",
      },
    ],
  };
}

