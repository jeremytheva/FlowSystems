import type { ComparisonMatrix } from "../lib/types";
import { ComparisonMatrixSchema, validateData } from "../lib/validateData";

const rawComparisons: ComparisonMatrix[] = [
  {
    id: "navigator-vs-pulse",
    title: "Navigator vs Pulse Desk",
    description: "Contrast lifecycle activation and customer success orchestration capabilities.",
    leftPlatform: "navigator",
    rightPlatform: "pulse",
    factors: [
      {
        label: "Primary Outcome",
        left: "Orchestrate activation and experimentation across the lifecycle",
        right: "Retain and expand accounts with guided success plays",
        edge: "even",
      },
      {
        label: "Telemetry Depth",
        left: "Deep product and marketing telemetry",
        right: "Customer health blended with revenue and support data",
        edge: "even",
      },
      {
        label: "Time-to-Value",
        left: "Launches first journeys in under 3 weeks",
        right: "Delivers health scoring and renewal plays in ~4 weeks",
        edge: "left",
      },
      {
        label: "Best For",
        left: "Growth and product marketing teams",
        right: "Customer success and revenue expansion teams",
        edge: "right",
      },
    ],
  },
];

export const comparisons = validateData<ComparisonMatrix>(
  "comparisons",
  ComparisonMatrixSchema,
  rawComparisons
);
