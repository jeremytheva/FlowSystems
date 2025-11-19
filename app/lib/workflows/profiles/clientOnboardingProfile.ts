import type {
  ScoringProfile,
  WorkflowCategory,
  ScoringDimension,
} from "../scoring"; // ../ because profiles/ is one level deeper
import type { WorkflowPhase } from "../types";

/**
 * Convenience constants so we don't hard-code strings everywhere.
 */
export const CLIENT_ONBOARDING_CATEGORY: WorkflowCategory = "Client_Onboarding";

// You can tweak these if you want slightly different emphasis later.
const STRUCTURE: ScoringDimension = "structure";
const BEHAVIOUR: ScoringDimension = "behaviour";
const GOVERNANCE: ScoringDimension = "governance";

/**
 * Profile: Client Onboarding – General Consulting/Services
 *
 * Assumptions:
 * - Used primarily in ATTRACT + SERVE phases
 * - Focuses on clarity of flow, qualification, expectation-setting, and feedback
 */
export const clientOnboardingProfile: ScoringProfile = {
  id: "client_onboarding_v1",
  name: "Client Onboarding (General Services)",
  description:
    "Ensures client onboarding workflows have clear start/end, qualification, expectations, kickoff, and feedback.",
  category: CLIENT_ONBOARDING_CATEGORY,
  // Optional defaults (you can override when using it)
  phase: undefined as WorkflowPhase | undefined,
  industry: undefined,
  criteria: [
    {
      id: "structure.has_trigger_and_end",
      label: "Has TRIGGER and END nodes",
      description:
        "Ensures the workflow has a clear starting trigger and a defined end state.",
      dimension: STRUCTURE,
      weight: 0.2,
      mode: "builtin",
      builtinRuleId: "structure.has_trigger_and_end",
    },
    {
      id: "client_onboarding.has_qualification_step",
      label: "Includes a qualification step",
      description:
        "Screens or qualifies clients early to avoid misaligned engagements.",
      dimension: STRUCTURE,
      weight: 0.2,
      mode: "builtin",
      builtinRuleId: "client_onboarding.has_qualification_step",
    },
    {
      id: "client_onboarding.has_expectations_step",
      label: "Sets expectations and scope",
      description:
        "Includes at least one step where expectations, scope, or boundaries are clearly communicated.",
      dimension: GOVERNANCE,
      weight: 0.2,
      mode: "builtin",
      builtinRuleId: "client_onboarding.has_expectations_step",
    },
    {
      id: "client_onboarding.has_kickoff_step",
      label: "Has a kickoff session or start signal",
      description:
        "Includes a kickoff call/meeting or explicit 'start of engagement' step.",
      dimension: BEHAVIOUR,
      weight: 0.2,
      mode: "builtin",
      builtinRuleId: "client_onboarding.has_kickoff_step",
    },
    {
      id: "client_onboarding.has_feedback_or_survey_step",
      label: "Captures feedback at the end",
      description:
        "Includes a survey, feedback request, or review step at the end of onboarding.",
      dimension: GOVERNANCE,
      weight: 0.2,
      mode: "builtin",
      builtinRuleId: "client_onboarding.has_feedback_or_survey_step",
    },
  ],
  overrides: {},
};
