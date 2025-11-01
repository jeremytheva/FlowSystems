export type PlatformCapability = {
  id: string;
  label: string;
  description: string;
};

export type PlatformMetric = {
  label: string;
  value: string;
  trend?: string;
};

export type PlatformPlan = {
  tier: string;
  price: string;
  bestFor: string;
};

export type Platform = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  overview: string;
  website: string;
  tags: string[];
  capabilities: PlatformCapability[];
  metrics: PlatformMetric[];
  plans: PlatformPlan[];
  integrations: string[];
};

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
  heroStatement: string;
};

export type FlowProgram = {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  summary: string;
  outcomes: string[];
  maturity: "pilot" | "scaling" | "production";
  recommendedSignals: string[];
};

export type ValueLayer = {
  title: string;
  description: string;
  examples?: string[];
};

export type ReleaseItem = {
  title: string;
  eta: string;
  owner: string;
  focus: string;
};

export type CommunityHighlights = {
  spotlight: {
    name: string;
    description: string;
    membership: number;
    programs: string[];
  };
  rituals: {
    name: string;
    cadence: string;
    focus: string;
  }[];
  contributions: string[];
};

export type StackPlay = {
  slug: string;
  name: string;
  focus: string;
  description: string;
  highlights: string[];
  platforms: string[];
  metrics: {
    label: string;
    value: string;
    change: string;
  }[];
  recommendedFlows: string[];
};

export type ComparisonMatrix = {
  id: string;
  title: string;
  description: string;
  leftPlatform: string;
  rightPlatform: string;
  factors: {
    label: string;
    left: string;
    right: string;
    edge: "left" | "right" | "even";
  }[];
};

export type DashboardMetric = {
  title: string;
  value: string;
  change: string;
  status: "up" | "down" | "steady";
};

export type DashboardWorkstream = {
  id: string;
  name: string;
  owner: string;
  progress: number;
  nextAction: string;
};

export type AdminTask = {
  id: string;
  title: string;
  owner: string;
  status: "pending" | "in-progress" | "blocked" | "done";
  notes?: string;
};
