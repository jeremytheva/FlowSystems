import type { FlowCategory } from "../../lib/types";

export const categories: FlowCategory[] = [
  {
    slug: "intelligence-ops",
    name: "Intelligence Ops",
    description: "Research automation, signal routing, and governance for knowledge-heavy orgs.",
    focusAreas: ["Decision intelligence", "Research pipelines", "Knowledge graphs"],
    heroStatement: "Spin up an insight engine that keeps execs and operators in lockstep.",
  },
  {
    slug: "growth-systems",
    name: "Growth Systems",
    description: "End-to-end activation, retention, and lifecycle experimentation flows.",
    focusAreas: ["Lifecycle orchestration", "Revenue enablement", "Partner motion"],
    heroStatement: "Build loops that convert signals into revenue momentum.",
  },
  {
    slug: "product-delivery",
    name: "Product Delivery",
    description: "Integrated delivery frameworks aligning product, design, and GTM teams.",
    focusAreas: ["Portfolio health", "Discovery rituals", "Telemetry"],
    heroStatement: "Give crews the rituals and data they need to ship confidently.",
  },
  {
    slug: "customer-experience",
    name: "Customer Experience",
    description: "Unified service, success, and support flows with proactive telemetry.",
    focusAreas: ["Success enablement", "Feedback routing", "Playbook automation"],
    heroStatement: "Design journeys that make every touchpoint feel orchestrated.",
  },
];
