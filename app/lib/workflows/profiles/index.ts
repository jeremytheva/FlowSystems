// profiles/index.ts

import type {
  ScoringProfile,
  WorkflowCategory,
} from "../scoring";
import type { WorkflowWithStructure } from "../types";
import { clientOnboardingProfile, CLIENT_ONBOARDING_CATEGORY } from "./clientOnboardingProfile";
import { getGenericCustomProfile } from "../scoring"; // make sure this is exported

/**
 * Registry of scoring profiles by ID.
 * Extend this as you add more profiles.
 */
export const scoringProfileRegistry: Record<string, ScoringProfile> = {
  [clientOnboardingProfile.id]: clientOnboardingProfile,
};

/**
 * Convenience list if you want to browse / filter in UI.
 */
export const scoringProfiles: ScoringProfile[] = Object.values(
  scoringProfileRegistry
);

/**
 * Resolve a default profile based on workflow metadata.
 * This is intentionally simple now and can be expanded later.
 */
export function resolveDefaultProfileForWorkflow(
  workflow: WorkflowWithStructure,
  context?: {
    category?: WorkflowCategory;
    phase?: string;
    industry?: string;
  }
): ScoringProfile {
  // 1. If workflow has an explicit category, use that.
  const workflowCategory =
    (workflow as any).category ??
    workflow.metadata?.category ??
    context?.category;

  if (workflowCategory === CLIENT_ONBOARDING_CATEGORY) {
    return clientOnboardingProfile;
  }

  // 2. Fallback: generic profile.
  return getGenericCustomProfile();
}

