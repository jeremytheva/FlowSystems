export interface ComparisonRow {
  platform: string;
  standout: string;
  tradeoffs: string;
}

export interface Comparison {
  slug: string;
  title: string;
  summary: string;
  narrative: string;
  rows: ComparisonRow[];
}

export const comparisons: Comparison[] = [
  {
    slug: 'automation-crm-stack',
    title: 'Automation-first CRMs for service businesses',
    summary:
      'FlowOS, SprintKit, and HubSpot Starter each blend CRM with workflow automation. We compare how they onboard small teams and manage client delivery.',
    narrative:
      'Service teams balancing project delivery and account management need a workspace that keeps automations reliable. The three platforms below cover similar jobs but emphasize different playbooks.',
    rows: [
      {
        platform: 'FlowOS',
        standout: 'Automation guardrails with playbooks ready out of the box',
        tradeoffs: 'Analytics are limited and billing remains manual',
      },
      {
        platform: 'SprintKit',
        standout: 'Client portal with payment automation for agencies',
        tradeoffs: 'Rigid CRM makes bespoke sales stages harder',
      },
      {
        platform: 'HubSpot Starter',
        standout: 'Marketing toolkit plus basic automation for leads',
        tradeoffs: 'Longer onboarding with higher costs as you scale',
      },
    ],
  },
];

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((comparison) => comparison.slug === slug);
}
