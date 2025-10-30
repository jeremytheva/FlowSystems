export type FactorDirection = 'normal' | 'inverted';

export interface PlatformFactor {
  key: string;
  label: string;
  description: string;
  weight: number;
  score: number;
  direction: FactorDirection;
}

export interface Platform {
  id: string;
  slug: string;
  name: string;
  headline: string;
  summary: string;
  website: string;
  categories: string[];
  factors: PlatformFactor[];
  highlights: string[];
}

export const platforms: Platform[] = [
  {
    id: 'platform-flowos',
    slug: 'flowos',
    name: 'FlowOS',
    headline: 'Automation-first workspace for lean teams',
    summary:
      'FlowOS combines CRM, project tracking, and lightweight automations so a 3-person team can run an entire customer lifecycle in one surface.',
    website: 'https://flowos.example.com',
    categories: ['crm', 'automation', 'ops'],
    highlights: [
      'Prebuilt automations trigger from CRM updates or inbox events.',
      'Opinionated onboarding checklist reaches value in under a week.',
      'CLI + API unlock deeper integration once the team grows.',
    ],
    factors: [
      {
        key: 'time-to-value',
        label: 'Time-to-Value',
        description: 'How quickly the average customer sees measurable impact.',
        weight: 0.3,
        score: 8.5,
        direction: 'normal',
      },
      {
        key: 'setup-effort',
        label: 'Setup Effort',
        description: 'Initial configuration and data import complexity.',
        weight: 0.25,
        score: 7,
        direction: 'inverted',
      },
      {
        key: 'ecosystem',
        label: 'Ecosystem',
        description: 'Available integrations and community traction.',
        weight: 0.2,
        score: 7.8,
        direction: 'normal',
      },
      {
        key: 'support',
        label: 'Support',
        description: 'Responsiveness of support and quality of documentation.',
        weight: 0.15,
        score: 8.8,
        direction: 'normal',
      },
      {
        key: 'pricing',
        label: 'Pricing',
        description: 'Affordability for solo operators and micro teams.',
        weight: 0.1,
        score: 6.5,
        direction: 'normal',
      },
    ],
  },
  {
    id: 'platform-sprintkit',
    slug: 'sprintkit',
    name: 'SprintKit',
    headline: 'Modern client services OS',
    summary:
      'SprintKit gives agencies a client portal, scoped project templates, and payment automation without needing a heavy ERP.',
    website: 'https://sprintkit.example.com',
    categories: ['project-management', 'client-services'],
    highlights: [
      'Opinionated project templates tuned for agencies.',
      'Auto-generated client portal surfaces deliverables instantly.',
      'Usage-based pricing scales smoothly with retainers.',
    ],
    factors: [
      {
        key: 'time-to-value',
        label: 'Time-to-Value',
        description: 'How quickly the average customer sees measurable impact.',
        weight: 0.3,
        score: 7.2,
        direction: 'normal',
      },
      {
        key: 'setup-effort',
        label: 'Setup Effort',
        description: 'Initial configuration and data import complexity.',
        weight: 0.25,
        score: 8.2,
        direction: 'inverted',
      },
      {
        key: 'ecosystem',
        label: 'Ecosystem',
        description: 'Available integrations and community traction.',
        weight: 0.2,
        score: 6.1,
        direction: 'normal',
      },
      {
        key: 'support',
        label: 'Support',
        description: 'Responsiveness of support and quality of documentation.',
        weight: 0.15,
        score: 7.5,
        direction: 'normal',
      },
      {
        key: 'pricing',
        label: 'Pricing',
        description: 'Affordability for solo operators and micro teams.',
        weight: 0.1,
        score: 8.9,
        direction: 'normal',
      },
    ],
  },
];

export function getPlatformBySlug(slug: string): Platform | undefined {
  return platforms.find((platform) => platform.slug === slug);
}

export function getPlatformsByCategory(category: string): Platform[] {
  return platforms.filter((platform) => platform.categories.includes(category));
}
