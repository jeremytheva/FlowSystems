export type SystemMetric = {
  label: string;
  value: string;
  caption: string;
  trend?: string;
};

export type FlowCategory = {
  slug: string;
  name: string;
  description: string;
  focusAreas: string[];
};

export type FlowProgram = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  outcomes: string[];
  maturity: "pilot" | "scaling" | "production";
};

export type ValueLayer = {
  name: string;
  mission: string;
  signals: string[];
};

export type ReleaseItem = {
  title: string;
  eta: string;
  owner: string;
  focus: string;
};

export type Principle = {
  title: string;
  description: string;
};

export type DeliveryPhase = {
  phase: string;
  purpose: string;
  questions: string[];
};

export type ResearchStream = {
  name: string;
  cadence: string;
  keyQuestion: string;
  artifact: string;
};

export const systemMetrics: SystemMetric[] = [
  {
    label: "Operational Flows",
    value: "128",
    caption: "Automations actively orchestrating cross-team outcomes.",
    trend: "+14% QoQ",
  },
  {
    label: "Validated Frameworks",
    value: "42",
    caption: "Battle-tested blueprints covering strategy, delivery, and enablement.",
    trend: "+7 new this month",
  },
  {
    label: "Community Practitioners",
    value: "3.1k",
    caption: "Leaders sharing playbooks, metrics, and growth stories.",
    trend: "+480 since last release",
  },
  {
    label: "Avg Time-to-Value",
    value: "23 days",
    caption: "From discovery to measurable impact on core KPIs.",
  },
];

export const categories: FlowCategory[] = [
  {
    slug: "intelligence-ops",
    name: "Intelligence Ops",
    description: "Research automation, signal routing, and governance for knowledge-heavy orgs.",
    focusAreas: ["Decision intelligence", "Research pipelines", "Knowledge graphs"],
  },
  {
    slug: "growth-systems",
    name: "Growth Systems",
    description: "End-to-end activation, retention, and lifecycle experimentation flows.",
    focusAreas: ["Lifecycle orchestration", "Revenue enablement", "Partner motion"],
  },
  {
    slug: "product-delivery",
    name: "Product Delivery",
    description: "Integrated delivery frameworks that align product, design, and GTM teams.",
    focusAreas: ["Portfolio health", "Discovery rituals", "Telemetry"],
  },
];

export const featuredPrograms: FlowProgram[] = [
  {
    slug: "insight-hub",
    name: "Insight Hub",
    category: "Intelligence Ops",
    summary:
      "Synthesis engine connecting qualitative research, telemetry, and executive briefings.",
    outcomes: [
      "Weekly executive intelligence digests",
      "Dynamic research backlog visibility",
      "Faster decision readiness for strategic bets",
    ],
    maturity: "production",
  },
  {
    slug: "rev-acceleration-loop",
    name: "Revenue Acceleration Loop",
    category: "Growth Systems",
    summary:
      "Predictive scoring, journey personalization, and frontline enablement in one flow.",
    outcomes: [
      "33% lift in qualified pipeline velocity",
      "Automated insights for partner managers",
      "Adaptive lifecycle experiments",
    ],
    maturity: "scaling",
  },
  {
    slug: "delivery-observatory",
    name: "Delivery Observatory",
    category: "Product Delivery",
    summary:
      "Live delivery telemetry, cross-team reviews, and capability assessments.",
    outcomes: [
      "Shared view of delivery health",
      "Automated nudges for ritual hygiene",
      "Early detection of capacity gaps",
    ],
    maturity: "pilot",
  },
];

export const valueStack: ValueLayer[] = [
  {
    name: "Foundation",
    mission: "Codify system primitives—data contracts, rituals, and KPIs—that every flow builds on.",
    signals: ["Baseline observability", "Governed experimentation", "Integrated knowledge base"],
  },
  {
    name: "Activation",
    mission: "Compose flows that compound impact across marketing, product, and operations teams.",
    signals: ["Orchestrated journeys", "Closed-loop enablement", "Dynamic playbooks"],
  },
  {
    name: "Evolution",
    mission: "Adapt the operating model with scenario planning, capability scoring, and community input.",
    signals: ["Modelled futures", "Capability benchmarks", "Shared learning cadences"],
  },
];

export const upcomingReleases: ReleaseItem[] = [
  {
    title: "Navigator 2.0",
    eta: "July 2024",
    owner: "Systems Research",
    focus: "Adaptive journey scoring aligned to new ICP clusters.",
  },
  {
    title: "Telemetry Mesh",
    eta: "August 2024",
    owner: "Product Intelligence",
    focus: "Unified pipeline for product analytics, voice of customer, and experimentation data.",
  },
  {
    title: "Partner Catalyst",
    eta: "September 2024",
    owner: "Ecosystem Ops",
    focus: "Solution design templates and enablement loops for channel teams.",
  },
];

export const principles: Principle[] = [
  {
    title: "Outcomes Before Artifacts",
    description: "Every deliverable anchors on measurable business outcomes and leading indicators.",
  },
  {
    title: "Community as a Source of Truth",
    description: "Practitioner feedback tightens the loop between research, delivery, and enablement.",
  },
  {
    title: "Composable by Default",
    description: "Flows are modular, API-first, and ready to integrate with existing platforms.",
  },
  {
    title: "Evidence-Weighted Decisions",
    description: "We use telemetry, interviews, and experiments to drive prioritization.",
  },
];

export const deliveryPhases: DeliveryPhase[] = [
  {
    phase: "Discover",
    purpose: "Map current-state systems, friction, and desired outcomes.",
    questions: [
      "What decisions are under-served today?",
      "Which signals do teams trust to act?",
      "Where do handoffs stall progress?",
    ],
  },
  {
    phase: "Design",
    purpose: "Compose flows and models that align data, people, and activation moments.",
    questions: [
      "How might we codify new rituals?",
      "What automation accelerates value without breaking trust?",
      "Which metrics prove we're on track?",
    ],
  },
  {
    phase: "Deploy",
    purpose: "Instrument the flow, roll out enablement, and capture adoption signals.",
    questions: [
      "What needs to be true for launch?",
      "Who stewards the flow once operational?",
      "How do we reinforce the new way of working?",
    ],
  },
  {
    phase: "Evolve",
    purpose: "Continuously iterate based on telemetry, feedback, and market shifts.",
    questions: [
      "Where are we over-optimizing?",
      "Which experiments unlock the next growth ceiling?",
      "How do we share learnings across the community?",
    ],
  },
];

export const researchStreams: ResearchStream[] = [
  {
    name: "Executive Systems Council",
    cadence: "Monthly",
    keyQuestion: "Which growth and efficiency bets are operators prioritizing next quarter?",
    artifact: "Council brief & scenario library",
  },
  {
    name: "Practitioner Diaries",
    cadence: "Bi-weekly",
    keyQuestion: "How do frontline teams experience the flows day-to-day?",
    artifact: "Journey narratives & service blueprints",
  },
  {
    name: "Telemetry Reviews",
    cadence: "Continuous",
    keyQuestion: "What do adoption, sentiment, and impact trends tell us to refine?",
    artifact: "Live dashboards & anomaly alerts",
  },
];

export const communityHighlights = {
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
