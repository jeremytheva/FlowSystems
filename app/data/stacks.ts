import type { StackPlay } from "../lib/types";
import { StackPlaySchema, validateData } from "../lib/validateData";

const rawStacks: StackPlay[] = [
  {
    slug: "growth-foundation",
    name: "Growth Foundation Stack",
    focus: "Jumpstart activation for new market entry",
    description:
      "A cross-functional stack aligning research, lifecycle marketing, and success teams around a new ICP.",
    highlights: [
      "Unified signal routing from Navigator",
      "Activation briefs generated in Insight Hub",
      "Revenue playbooks orchestrated via Rev Acceleration Loop",
    ],
    platforms: ["navigator", "pulse"],
    metrics: [
      { label: "Activation Rate", value: "41%", change: "+11 pts" },
      { label: "Time-to-Signal", value: "3 days", change: "-4 days" },
    ],
    recommendedFlows: [
      "Lifecycle experiment orchestration",
      "Executive weekly outcome review",
      "Partner activation sync",
    ],
  },
  {
    slug: "product-evolution",
    name: "Product Evolution Stack",
    focus: "Keep product delivery rituals humming at scale",
    description:
      "Blends Delivery Observatory with knowledge ops and enablement layers for rapid iteration.",
    highlights: [
      "Delivery Observatory telemetry surfaced in weekly ops reviews",
      "Capability scoring integrated with Navigator insights",
      "Enablement tracks published through Community hub",
    ],
    platforms: ["observatory", "navigator"],
    metrics: [
      { label: "Decision Latency", value: "-23%", change: "Improving" },
      { label: "Ritual Coverage", value: "87%", change: "+12 pts" },
    ],
    recommendedFlows: [
      "Ritual health automation",
      "Capability benchmarking cadence",
      "Executive signals digest",
    ],
  },
];

export const stacks = validateData(
  "stacks",
  StackPlaySchema,
  rawStacks
);
