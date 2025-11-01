import { z } from "zod";

// 1️⃣ Define schemas
export const CapabilitySchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
});

export const MetricSchema = z.object({
  label: z.string(),
  value: z.string(),
  trend: z.string().optional(),
});

export const PlanSchema = z.object({
  tier: z.string(),
  price: z.string(),
  bestFor: z.string(),
});

export const PlatformSchema = z.object({
  id: z.string(),
  name: z.string(),
  tagline: z.string(),
  category: z.string(),
  overview: z.string(),
  website: z.string().url(),
  tags: z.array(z.string()),
  capabilities: z.array(CapabilitySchema),
  metrics: z.array(MetricSchema),
  plans: z.array(PlanSchema),
  integrations: z.array(z.string()),
});

export const ValueStackSchema = z.object({
  title: z.string(),
  description: z.string(),
  examples: z.array(z.string()).optional(),
});

export const StringSchema = z.string();

export const SystemMetricSchema = MetricSchema.extend({
  caption: z.string(),
});

export const FlowCategorySchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  focusAreas: z.array(z.string()),
  heroStatement: z.string(),
});

export const FlowProgramSchema = z.object({
  slug: z.string(),
  name: z.string(),
  category: z.string(),
  categorySlug: z.string(),
  summary: z.string(),
  outcomes: z.array(z.string()),
  maturity: z.enum(["pilot", "scaling", "production"]),
  recommendedSignals: z.array(z.string()),
});

export const PrincipleSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const ReleaseItemSchema = z.object({
  title: z.string(),
  eta: z.string(),
  owner: z.string(),
  focus: z.string(),
});

export const CommunityHighlightsSchema = z.object({
  spotlight: z.object({
    name: z.string(),
    description: z.string(),
    membership: z.number(),
    programs: z.array(z.string()),
  }),
  rituals: z.array(
    z.object({
      name: z.string(),
      cadence: z.string(),
      focus: z.string(),
    })
  ),
  contributions: z.array(z.string()),
});

export const DeliveryPhaseSchema = z.object({
  phase: z.string(),
  purpose: z.string(),
  questions: z.array(z.string()),
});

export const ResearchStreamSchema = z.object({
  name: z.string(),
  cadence: z.string(),
  keyQuestion: z.string(),
  artifact: z.string(),
});

export const DashboardMetricSchema = z.object({
  title: z.string(),
  value: z.string(),
  change: z.string(),
  status: z.enum(["up", "down", "steady"]),
});

export const DashboardWorkstreamSchema = z.object({
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  progress: z.number(),
  nextAction: z.string(),
});

export const AdminTaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  owner: z.string(),
  status: z.enum(["pending", "in-progress", "blocked", "done"]),
  notes: z.string().optional(),
});

export const StackMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
  change: z.string(),
});

export const StackPlaySchema = z.object({
  slug: z.string(),
  name: z.string(),
  focus: z.string(),
  description: z.string(),
  highlights: z.array(z.string()),
  platforms: z.array(z.string()),
  metrics: z.array(StackMetricSchema),
  recommendedFlows: z.array(z.string()),
});

export const ComparisonFactorSchema = z.object({
  label: z.string(),
  left: z.string(),
  right: z.string(),
  edge: z.enum(["left", "right", "even"]),
});

export const ComparisonMatrixSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  leftPlatform: z.string(),
  rightPlatform: z.string(),
  factors: z.array(ComparisonFactorSchema),
});

export const SearchResultSchema = z.object({
  id: z.string(),
  type: z.string(),
  title: z.string(),
  summary: z.string(),
  href: z.string(),
});

// 2️⃣ Generic validator
export function validateData<T>(
  name: string,
  schema: z.ZodType<T>,
  data: unknown[]
): T[] {
  try {
    const result = z.array(schema).parse(data);
    console.log(`✅ [validateData] ${name} validated successfully (${result.length} items).`);
    return result;
  } catch (error: any) {
    console.error(`❌ [validateData] Error in ${name}:`, error.errors);
    throw new Error(`[validateData] ${name} failed validation`);
  }
}

export function validateSingleton<T>(
  name: string,
  schema: z.ZodType<T>,
  data: unknown
): T {
  try {
    const result = schema.parse(data);
    console.log(`✅ [validateData] ${name} validated successfully.`);
    return result;
  } catch (error: any) {
    console.error(`❌ [validateData] Error in ${name}:`, error.errors ?? error);
    throw new Error(`[validateData] ${name} failed validation`);
  }
}
