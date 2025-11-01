import type { CommunityHighlights } from "../../lib/types";
import {
  CommunityHighlightsSchema,
  validateSingleton,
} from "../../lib/validateData";

const rawCommunityHighlights: CommunityHighlights = {
  spotlight: {
    name: "Signals Guild",
    description:
      "Operators from growth, research, and revenue teams co-designing the next generation of flows.",
    membership: 480,
    programs: ["Quarterly showcases", "Mentor circles", "Flow teardown labs"],
  },
  rituals: [
    {
      name: "Systems Studio",
      cadence: "Weekly",
      focus: "Live build sessions translating research into working flows.",
    },
    {
      name: "Enablement Exchange",
      cadence: "Monthly",
      focus: "Playbook swaps and capability benchmarking.",
    },
    {
      name: "Navigator Briefings",
      cadence: "Bi-weekly",
      focus: "Signals, trends, and upcoming releases distilled for operators.",
    },
  ],
  contributions: [
    "Shared 26 new playbooks last quarter",
    "Expanded benchmark library to 14 industries",
    "Opened 8 mentor tracks focused on enablement",
  ],
};

export const communityHighlights = validateSingleton<CommunityHighlights>(
  "communityHighlights",
  CommunityHighlightsSchema,
  rawCommunityHighlights
);
