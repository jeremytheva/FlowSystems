import type { FlowProgram } from "../../lib/types";
import { FlowProgramSchema, validateData } from "../../lib/validateData";

const rawFeaturedPrograms: FlowProgram[] = [
  {
    slug: "insight-hub",
    name: "Insight Hub",
    category: "Intelligence Ops",
    categorySlug: "intelligence-ops",
    summary: "Synthesis engine connecting qualitative research, telemetry, and executive briefings.",
    outcomes: [
      "Weekly executive intelligence digests",
      "Dynamic research backlog visibility",
      "Faster decision readiness for strategic bets",
    ],
    maturity: "production",
    recommendedSignals: ["Executive signal requests", "Insight-to-action ratio"],
  },
  {
    slug: "rev-acceleration-loop",
    name: "Revenue Acceleration Loop",
    category: "Growth Systems",
    categorySlug: "growth-systems",
    summary: "Predictive scoring, journey personalization, and frontline enablement in one flow.",
    outcomes: [
      "33% lift in qualified pipeline velocity",
      "Automated insights for partner managers",
      "Adaptive lifecycle experiments",
    ],
    maturity: "scaling",
    recommendedSignals: ["Pipeline velocity", "Partner sourced revenue"],
  },
  {
    slug: "delivery-observatory",
    name: "Delivery Observatory",
    category: "Product Delivery",
    categorySlug: "product-delivery",
    summary: "Live delivery telemetry, cross-team reviews, and capability assessments.",
    outcomes: [
      "Shared view of delivery health",
      "Automated nudges for ritual hygiene",
      "Early detection of capacity gaps",
    ],
    maturity: "pilot",
    recommendedSignals: ["Ritual completion", "Decision latency"],
  },
];

export const featuredPrograms = validateData(
  "featuredPrograms",
  FlowProgramSchema,
  rawFeaturedPrograms
);
