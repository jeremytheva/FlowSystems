import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';

import { mdxComponents } from '@/mdx-components';

export interface ReviewFrontMatter {
  title: string;
  slug: string;
  platformId: string;
  score: number;
  status: 'draft' | 'published';
  tags: string[];
  factors: Array<{
    key: string;
    raw: number;
    direction: 'normal' | 'inverted';
    weight: number;
  }>;
  summary: string;
  verdict: string;
  evidence: Array<{
    factor: string;
    quote: string;
    source: string;
  }>;
  chooseIf: string[];
  skipIf: string[];
}

export interface CompiledReview {
  frontMatter: ReviewFrontMatter;
  content: ReactNode;
}

const reviewsDirectory = path.join(process.cwd(), 'content', 'reviews');

async function loadMDX(
  filePath: string,
  components?: MDXComponents,
): Promise<CompiledReview> {
  const raw = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(raw);

  const frontMatter = data as ReviewFrontMatter;
  const scope = {
    frontMatter,
    factors: frontMatter.factors,
    evidenceByFactor: frontMatter.evidence,
  };

  const { content: compiledContent } = await compileMDX({
    source: content,
    scope,
    components: {
      ...mdxComponents,
      ...components,
    },
  });

  return {
    frontMatter,
    content: compiledContent,
  };
}

export async function getReviewSlugs(): Promise<string[]> {
  const entries = await fs.readdir(reviewsDirectory);
  return entries.filter((file) => file.endsWith('.mdx')).map((file) => file.replace(/\.mdx$/, ''));
}

export async function getReviewBySlug(slug: string): Promise<CompiledReview | undefined> {
  const filePath = path.join(reviewsDirectory, `${slug}.mdx`);
  try {
    await fs.access(filePath);
  } catch {
    return undefined;
  }

  return loadMDX(filePath);
}

export async function getAllReviews(): Promise<CompiledReview[]> {
  const slugs = await getReviewSlugs();
  const reviews = await Promise.all(slugs.map((slug) => getReviewBySlug(slug)));
  return reviews.filter(Boolean) as CompiledReview[];
}
