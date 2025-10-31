import { MDXRemote } from 'next-mdx-remote/rsc';
import ChooseIf from '@/components/ChooseIf';
import CompareTable from '@/components/CompareTable';
import EvidenceDrawer from '@/components/EvidenceDrawer';
import FactorTable from '@/components/FactorTable';
import MigrationGuide from '@/components/MigrationGuide';
import SetupEstimator from '@/components/SetupEstimator';
import SnapshotPoll from '@/components/SnapshotPoll';

export const mdxComponents = {
  ChooseIf,
  CompareTable,
  EvidenceDrawer,
  FactorTable,
  MigrationGuide,
  SetupEstimator,
  SnapshotPoll,
};

type RenderMdxProps = {
  source: string;
  frontMatter?: Record<string, unknown>;
};

export function RenderMdx({ source, frontMatter = {} }: RenderMdxProps) {
  const withExports = `export const frontMatter = ${JSON.stringify(frontMatter)};\n\n${source}`;
  return <MDXRemote source={withExports} components={mdxComponents} />;
}
