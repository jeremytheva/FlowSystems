import path from 'path';
import { promises as fs } from 'fs';

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

const REVIEW_TEMPLATE_PATH = path.join(
  process.cwd(),
  'content',
  'templates',
  'review.template.mdx'
);

const REVIEW_TEMPLATE_SECTION = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;

let cachedTemplate: { frontMatter: string; body: string } | null = null;

export class InvalidReviewSlugError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidReviewSlugError';
  }
}

async function loadReviewTemplate() {
  if (cachedTemplate) {
    return cachedTemplate;
  }

  const raw = await fs.readFile(REVIEW_TEMPLATE_PATH, 'utf8');
  const match = raw.match(REVIEW_TEMPLATE_SECTION);

  if (!match) {
    throw new Error(
      `Invalid review template structure at ${REVIEW_TEMPLATE_PATH}`
    );
  }

  cachedTemplate = {
    frontMatter: match[1],
    body: match[2],
  };

  return cachedTemplate;
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

function parseList(value: string) {
  if (!value.trim()) {
    return [] as string[];
  }

  return value
    .split(',')
    .map((item) => item.trim().replace(/^"|"$/g, ''))
    .filter(Boolean);
}

function parseFrontMatter(source: string) {
  const extractString = (key: string) => {
    const match = source.match(new RegExp(`${key}:\s*"([^"]*)"`));
    return match ? match[1] : '';
  };

  const extractNumber = (key: string) => {
    const match = source.match(new RegExp(`${key}:\s*([0-9.]+)`));
    return match ? Number(match[1]) : 0;
  };

  const tagsMatch = source.match(/tags:\s*\[([^\]]*)\]/);
  const tags = tagsMatch ? parseList(tagsMatch[1]) : [];

  const factors: ReviewFactor[] = [];
  const factorRegex = /-\s*key:\s*"([^"]+)"\s*raw:\s*([0-9.]+)\s*direction:\s*"([^"]+)"\s*weight:\s*([0-9.]+)/g;
  let factorMatch: RegExpExecArray | null;

  while ((factorMatch = factorRegex.exec(source)) !== null) {
    factors.push({
      key: factorMatch[1],
      raw: Number(factorMatch[2]),
      direction: factorMatch[3] as ReviewFactorDirection,
      weight: Number(factorMatch[4]),
    });
  }

  return {
    title: extractString('title'),
    slug: extractString('slug'),
    platformId: extractString('platformId'),
    score: extractNumber('score'),
    status: extractString('status'),
    tags,
    factors,
  };
}

export async function buildReviewFromTemplate(slug: string): Promise<ReviewContent> {
  if (!slug || !slug.endsWith('-review')) {
    throw new InvalidReviewSlugError(`Unknown review slug: ${slug}`);
  }

  const baseSlug = slug.replace(/-review$/, '');

  if (!baseSlug) {
    throw new InvalidReviewSlugError(`Unknown review slug: ${slug}`);
  }

  const { frontMatter, body } = await loadReviewTemplate();
  const platformName = toTitleCase(baseSlug);
  const defaultCategory = baseSlug.includes('-')
    ? baseSlug.split('-')[0]
    : 'general';

  const replacements: Record<string, string> = {
    '<Platform>': platformName,
    '<platform>': baseSlug,
    '<cat>': defaultCategory,
    'uuid-platform': `platform-${baseSlug}`,
  };

  const frontMatterWithValues = applyReplacements(frontMatter, replacements);
  const parsedFrontMatter = parseFrontMatter(frontMatterWithValues);
  const renderedBody = applyReplacements(body.trim(), replacements);

  return {
    ...parsedFrontMatter,
    body: renderedBody,
    summary: {
      headline: `FlowSystems review snapshot for ${platformName}`,
      platform: platformName,
      generatedAt: new Date().toISOString(),
    },
  };
}
