export type ReviewFactorDirection = 'normal' | 'inverted';

export interface ReviewFactor {
  key: string;
  raw: number;
  direction: ReviewFactorDirection;
  weight: number;
}

export interface ReviewContent {
  title: string;
  slug: string;
  platformId: string;
  score: number;
  status: string;
  tags: string[];
  factors: ReviewFactor[];
  body: string;
  summary: {
    headline: string;
    platform: string;
    generatedAt: string;
  };
}

const REVIEW_TITLE_TEMPLATE = '<Platform> Review: Who it\'s best for';
const REVIEW_PLATFORM_ID_TEMPLATE = 'uuid-platform';
const REVIEW_STATUS_TEMPLATE = 'draft';
const REVIEW_TAG_TEMPLATES = ['category:<cat>', 'stage:solo'];
const REVIEW_FACTORS_TEMPLATE: ReviewFactor[] = [
  { key: 'TimeToValue', raw: 3, direction: 'normal', weight: 0.1 },
  { key: 'SetupEffort', raw: 2, direction: 'inverted', weight: 0.1 },
];

const REVIEW_BODY_TEMPLATE = `# <Platform> Review: Who it's best for

> TL;DR Verdict: <one-sentence verdict here>

## What jobs <Platform> solves
Explain the job-to-be-done for solos/micro-SMBs.

## Setup & Onboarding (Setup Effort)
Cover signup, imports, initial configuration, and pitfalls.

## What you get in week 1 (Time-to-Value)
Concrete outcomes and quick wins.

## Pricing & Plans
Summarize plans and gotchas.

## Integrations & Ecosystem
Key integrations and usage patterns.

## Support & Docs
Docs quality, support channels, and community.

## Factor Breakdown
<FactorTable factors={frontMatter.factors} />

## Pros & Cons
- **Pros:** ...
- **Cons:** ...

## Alternatives
Link 2–3 close alternatives with a short rationale.

## Verdict — Should you pick <Platform>?
Clear decision with “choose if / skip if” bullets.

<EvidenceDrawer items={evidenceByFactor} />
<SetupEstimator defaults={{ imports: 1, automations: 1, users: 1 }} />
<SnapshotPoll question="Was this helpful?" options={["Yes","No"]} />`;

export class InvalidReviewSlugError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidReviewSlugError';
  }
}

function toTitleCase(slugPart: string) {
  return slugPart
    .split('-')
    .filter(Boolean)
    .map((segment) => segment[0].toUpperCase() + segment.slice(1))
    .join(' ');
}

function applyReplacements(source: string, replacements: Record<string, string>) {
  return Object.entries(replacements).reduce((result, [needle, value]) => {
    return result.split(needle).join(value);
  }, source);
}

function normaliseSlug(slug: string) {
  if (!slug || !slug.endsWith('-review')) {
    throw new InvalidReviewSlugError(`Unknown review slug: ${slug}`);
  }

  const baseSlug = slug.replace(/-review$/, '');

  if (!baseSlug) {
    throw new InvalidReviewSlugError(`Unknown review slug: ${slug}`);
  }

  return baseSlug;
}

export async function buildReviewFromTemplate(slug: string): Promise<ReviewContent> {
  const baseSlug = normaliseSlug(slug);
  const platformName = toTitleCase(baseSlug);
  const defaultCategory = baseSlug.includes('-')
    ? baseSlug.split('-')[0]
    : 'general';

  const replacements: Record<string, string> = {
    '<Platform>': platformName,
    '<platform>': baseSlug,
    '<cat>': defaultCategory,
    [REVIEW_PLATFORM_ID_TEMPLATE]: `platform-${baseSlug}`,
  };

  return {
    title: applyReplacements(REVIEW_TITLE_TEMPLATE, replacements),
    slug,
    platformId: applyReplacements(REVIEW_PLATFORM_ID_TEMPLATE, replacements),
    score: 0,
    status: REVIEW_STATUS_TEMPLATE,
    tags: REVIEW_TAG_TEMPLATES.map((tag) => applyReplacements(tag, replacements)),
    factors: REVIEW_FACTORS_TEMPLATE.map((factor) => ({ ...factor })),
    body: applyReplacements(REVIEW_BODY_TEMPLATE.trim(), replacements),
    summary: {
      headline: `FlowSystems review snapshot for ${platformName}`,
      platform: platformName,
      generatedAt: new Date().toISOString(),
    },
  };
}
