import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import Papa from 'papaparse';

export type WeightFactor = {
  key: string;
  raw: number;
  direction: 'normal' | 'inverted';
  weight: number;
};

export type WeightStage = {
  stage: string;
  factors: WeightFactor[];
};

export type PlatformRecord = {
  id: string;
  name: string;
  category: string;
  website: string;
  tags: string[];
};

const DATA_DIR = path.join(process.cwd(), 'public', 'data');
const SEED_DIR = path.join(process.cwd(), 'seeds');
const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function readWeights(): Promise<Record<string, WeightFactor[]>> {
  const file = path.join(DATA_DIR, 'weights.json');
  const raw = await fs.readFile(file, 'utf8');
  return JSON.parse(raw) as Record<string, WeightFactor[]>;
}

export async function readWeightStage(stage: string): Promise<WeightStage | null> {
  const weights = await readWeights();
  const factors = weights[stage];
  if (!factors) return null;
  return { stage, factors };
}

export async function readPlatforms(category?: string): Promise<PlatformRecord[]> {
  const file = path.join(SEED_DIR, 'platforms.csv');
  const raw = await fs.readFile(file, 'utf8');
  const parsed = Papa.parse<PlatformRecord>(raw, {
    header: true,
    skipEmptyLines: true,
    transform: (value, field) => {
      if (field === 'tags') {
        return value ? value.split('|').map((tag) => tag.trim()) : [];
      }
      return value;
    },
  });
  const data = parsed.data.filter((platform) => platform.id && platform.name);
  return category ? data.filter((platform) => platform.category === category) : data;
}

export type MDXEntry = {
  slug: string;
  frontMatter: Record<string, unknown>;
  content: string;
};

async function readMdxFile(filePath: string): Promise<MDXEntry> {
  const raw = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug: path.basename(filePath, path.extname(filePath)),
    frontMatter: data,
    content,
  };
}

async function readLatestEntry(directory: string): Promise<MDXEntry> {
  const dir = path.join(CONTENT_DIR, directory);
  const files = (await fs.readdir(dir)).filter((file) => file.endsWith('.mdx'));
  if (files.length === 0) {
    throw new Error(`No MDX files found in content/${directory}`);
  }
  files.sort((a, b) => b.localeCompare(a));
  return readMdxFile(path.join(dir, files[0]));
}

export async function readLatestReview(): Promise<MDXEntry> {
  return readLatestEntry('reviews');
}

export async function readLatestComparison(): Promise<MDXEntry> {
  return readLatestEntry('comparisons');
}
