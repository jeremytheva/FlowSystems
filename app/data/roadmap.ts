import type { ReleaseItem } from "../lib/types";
import { ReleaseItemSchema, validateData } from "../lib/validateData";

const rawUpcomingReleases: ReleaseItem[] = [
  {
    title: "Navigator 2.0",
    eta: "July 2024",
    owner: "Systems Research",
    focus: "Adaptive journey scoring aligned to new ICP clusters.",
  },
  {
    title: "Telemetry Mesh",
    eta: "August 2024",
    owner: "Product Intelligence",
    focus: "Unified pipeline for product analytics, voice of customer, and experimentation data.",
  },
  {
    title: "Partner Catalyst",
    eta: "September 2024",
    owner: "Ecosystem Ops",
    focus: "Solution design templates and enablement loops for channel teams.",
  },
];

export const upcomingReleases = validateData<ReleaseItem>(
  "upcomingReleases",
  ReleaseItemSchema,
  rawUpcomingReleases
);
