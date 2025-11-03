import type { DashboardMetric, DashboardWorkstream } from "../../lib/types";
import {
  DashboardMetricSchema,
  DashboardWorkstreamSchema,
  validateData,
} from "../../lib/validateData";

const rawDashboardMetrics: DashboardMetric[] = [
  { title: "Activation Health", value: "92", change: "+5 MoM", status: "up" },
  { title: "Revenue Influence", value: "$1.8M", change: "+$240k", status: "up" },
  { title: "Program NPS", value: "61", change: "+3", status: "steady" },
  { title: "Experiment Velocity", value: "27", change: "-4", status: "down" },
];

const rawWorkstreams: DashboardWorkstream[] = [
  {
    id: "scale-insight-hub",
    name: "Scale Insight Hub",
    owner: "Systems Research",
    progress: 72,
    nextAction: "Roll out executive decision brief format",
  },
  {
    id: "launch-pulse-desk",
    name: "Pulse Desk Expansion",
    owner: "Customer Intelligence",
    progress: 48,
    nextAction: "Pilot health score automation with beta cohort",
  },
  {
    id: "renewal-motion",
    name: "Renewal Play Revamp",
    owner: "Revenue Ops",
    progress: 34,
    nextAction: "Validate play variants with CS leadership",
  },
];

export const dashboardMetrics = validateData(
  "dashboardMetrics",
  DashboardMetricSchema,
  rawDashboardMetrics
);

export const workstreams = validateData(
  "workstreams",
  DashboardWorkstreamSchema,
  rawWorkstreams
);
