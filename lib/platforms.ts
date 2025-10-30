export type PlatformCapability = {
  title: string;
  description: string;
};

export type PlatformIntegration = {
  name: string;
  category: string;
  note?: string;
};

export type PlatformPlan = {
  name: string;
  price: string;
  includes: string[];
};

export type PlatformGuide = {
  title: string;
  description: string;
  url: string;
};

export type Platform = {
  slug: string;
  name: string;
  tagline: string;
  categories: string[];
  bestFor: string[];
  summary: string;
  highlights: PlatformCapability[];
  capabilities: PlatformCapability[];
  plans: PlatformPlan[];
  integrations: PlatformIntegration[];
  guides: PlatformGuide[];
  scorecard: {
    automation: number;
    collaboration: number;
    governance: number;
    extensibility: number;
  };
};

export const platforms: Platform[] = [
  {
    slug: 'flowforge',
    name: 'FlowForge',
    tagline: 'Orchestrate AI-driven workflows across your entire operations stack.',
    categories: ['automation', 'ai-orchestration'],
    bestFor: [
      'RevOps leaders standardising playbooks',
      'Support teams automating tier-one triage',
      'Ops teams rolling out AI copilots safely',
    ],
    summary:
      'FlowForge gives revenue and operations teams the guardrails to automate complex, cross-tool workflows with AI agents while maintaining governance.',
    highlights: [
      {
        title: 'Agent-safe automations',
        description:
          'Design flows visually and add automated checkpoints so AI actions stay within policy.',
      },
      {
        title: 'Realtime monitoring',
        description:
          'Track execution health, hand-offs, and SLAs with minute-level observability dashboards.',
      },
      {
        title: 'Enterprise governance',
        description:
          'Approval workflows and workspace isolation keep security teams confident as adoption scales.',
      },
    ],
    capabilities: [
      {
        title: 'Workflow studio',
        description:
          'Drag-and-drop builder for human + AI steps, featuring reusable templates for revenue, support, and onboarding teams.',
      },
      {
        title: 'Runbooks & playbooks',
        description:
          'Ship guardrailed playbooks to GTM teams with embedded best-practice guidance and instant edits.',
      },
      {
        title: 'Adaptive routing',
        description:
          'Blend deterministic logic with LLM decisions by using context-aware branching and policy constraints.',
      },
    ],
    plans: [
      {
        name: 'Scale',
        price: 'Starts at $2,500/mo',
        includes: [
          'Unlimited automations',
          'SAML SSO & SCIM provisioning',
          'Dedicated solutions architect',
        ],
      },
      {
        name: 'Enterprise',
        price: 'Custom pricing',
        includes: [
          'On-premise agent runners',
          '24/7 premium support',
          'Custom security reviews',
        ],
      },
    ],
    integrations: [
      { name: 'Salesforce', category: 'CRM' },
      { name: 'Zendesk', category: 'Support' },
      { name: 'Snowflake', category: 'Data Warehouse', note: 'Read-only connectors' },
      { name: 'Slack', category: 'Collaboration' },
      { name: 'ServiceNow', category: 'ITSM' },
    ],
    guides: [
      {
        title: 'Deploying AI Tier-1 Support with FlowForge',
        description:
          'A step-by-step workbook for turning existing macros into safe AI-driven resolutions.',
        url: 'https://flowsystems.ai/guides/flowforge-support-ai',
      },
      {
        title: 'RevOps Automation Blueprint',
        description:
          'Suggested playbooks, metrics, and adoption best practices for revenue teams.',
        url: 'https://flowsystems.ai/guides/flowforge-revops-blueprint',
      },
    ],
    scorecard: {
      automation: 9,
      collaboration: 7,
      governance: 9,
      extensibility: 8,
    },
  },
  {
    slug: 'signalstack',
    name: 'SignalStack',
    tagline: 'Event-driven infrastructure for data teams shipping governed AI services.',
    categories: ['data-platform', 'ai-monitoring'],
    bestFor: [
      'Data engineers productising ML features',
      'Platform teams managing realtime pipelines',
      'Risk teams requiring full lineage and auditability',
    ],
    summary:
      'SignalStack unifies event ingestion, feature serving, and model governance so modern data teams can deliver AI experiences faster.',
    highlights: [
      {
        title: 'Realtime feature hub',
        description:
          'Publish, monitor, and iterate features in minutes with streaming-first infrastructure and strong contracts.',
      },
      {
        title: 'Integrated governance',
        description:
          'Policy packs, automated audits, and lineage across data, model, and consumer layers.',
      },
      {
        title: 'Observability',
        description:
          'Drill into drift, cost, and customer impact with prebuilt dashboards and anomaly alerts.',
      },
    ],
    capabilities: [
      {
        title: 'Event mesh',
        description:
          'Route events between warehouses, lakes, and microservices with latency-aware policies.',
      },
      {
        title: 'Feature registry',
        description:
          'Versioned, approval-gated feature store tightly integrated with CI/CD workflows.',
      },
      {
        title: 'Model monitoring',
        description:
          'Detect drift and quality regressions with managed detectors and custom KPIs.',
      },
    ],
    plans: [
      {
        name: 'Growth',
        price: 'Starts at $1,800/mo',
        includes: [
          '10M monthly events included',
          'SOC 2 Type II reports',
          'Dedicated customer success manager',
        ],
      },
      {
        name: 'Platform',
        price: 'Custom pricing',
        includes: [
          'Private cloud deployment',
          'Enterprise integration packs',
          '24/7 on-call escalation',
        ],
      },
    ],
    integrations: [
      { name: 'Databricks', category: 'Lakehouse' },
      { name: 'dbt', category: 'Transformation' },
      { name: 'PagerDuty', category: 'Incident Response' },
      { name: 'Looker', category: 'BI' },
      { name: 'Amazon SageMaker', category: 'ML Platform' },
    ],
    guides: [
      {
        title: 'SignalStack Migration Kit',
        description:
          'Evaluate workloads, map existing infrastructure, and plan phased rollouts.',
        url: 'https://flowsystems.ai/guides/signalstack-migration-kit',
      },
      {
        title: 'AI Governance Playbook',
        description:
          'Policy templates and metrics for regulated industries adopting AI.',
        url: 'https://flowsystems.ai/guides/ai-governance-playbook',
      },
    ],
    scorecard: {
      automation: 7,
      collaboration: 6,
      governance: 9,
      extensibility: 8,
    },
  },
  {
    slug: 'relaydesk',
    name: 'RelayDesk',
    tagline: 'Customer-facing AI copilots with human fallback built in from day one.',
    categories: ['support-platform', 'customer-experience'],
    bestFor: [
      'Support leaders aiming for 24/7 coverage',
      'Success teams personalising onboarding journeys',
      'Product teams experimenting with AI assistants quickly',
    ],
    summary:
      'RelayDesk packages AI-first customer support experiences with prebuilt workflows, guided training, and deep knowledge integrations.',
    highlights: [
      {
        title: 'Hybrid agent console',
        description:
          'Agent assist, AI deflection, and human takeover all visible in a single real-time workspace.',
      },
      {
        title: 'Knowledge sync',
        description:
          'Keeps articles, macros, and release notes fresh with automated syncing from your knowledge sources.',
      },
      {
        title: 'Quality assurance',
        description:
          'Conversation reviews, rubric scoring, and coaching loops help teams improve every week.',
      },
    ],
    capabilities: [
      {
        title: 'Copilot builder',
        description:
          'Design customer journeys with flows for self-service, hand-offs, and targeted upsell paths.',
      },
      {
        title: 'Voice & digital channels',
        description:
          'Omnichannel routing across chat, email, and voice with consistent customer context.',
      },
      {
        title: 'Insights & reporting',
        description:
          'Measure containment, CSAT impact, and queue health with actionable dashboards.',
      },
    ],
    plans: [
      {
        name: 'Growth',
        price: '$95/seat/mo',
        includes: ['50 AI sessions per seat', 'Knowledge base sync adapters', 'Success enablement sessions'],
      },
      {
        name: 'Enterprise',
        price: 'Custom pricing',
        includes: [
          'Voice channel add-on',
          'Advanced analytics workspace',
          'Managed change enablement',
        ],
      },
    ],
    integrations: [
      { name: 'Intercom', category: 'Messaging' },
      { name: 'HubSpot', category: 'CRM' },
      { name: 'Guru', category: 'Knowledge Base' },
      { name: 'Aircall', category: 'Telephony' },
      { name: 'Segment', category: 'CDP' },
    ],
    guides: [
      {
        title: 'RelayDesk Launch Checklist',
        description:
          'From sandbox setup to success metrics, this checklist keeps cross-functional teams aligned.',
        url: 'https://flowsystems.ai/guides/relaydesk-launch-checklist',
      },
      {
        title: 'AI Support Coaching Framework',
        description:
          'Framework for turning AI insights into coaching cadences your team will love.',
        url: 'https://flowsystems.ai/guides/ai-support-coaching',
      },
    ],
    scorecard: {
      automation: 8,
      collaboration: 8,
      governance: 7,
      extensibility: 6,
    },
  },
];

export function getPlatforms(category?: string): Platform[] {
  if (!category) {
    return platforms;
  }

  const categoryId = category.toLowerCase();
  return platforms.filter((platform) =>
    platform.categories.some((value) => value.toLowerCase() === categoryId),
  );
}

export function getPlatformBySlug(slug: string): Platform | undefined {
  const slugId = slug.toLowerCase();
  return platforms.find((platform) => platform.slug === slugId);
}
