import type { SystemMetric } from "../lib/types";
import { SystemMetricSchema, validateData } from "../lib/validateData";

const rawSystemMetrics: SystemMetric[] = [
  {
    label: "Operational Flows",
    value: "128",
    caption: "Automations actively orchestrating cross-team outcomes.",
    trend: "+14% QoQ",
  },
  {
    label: "Validated Frameworks",
    value: "42",
    caption: "Battle-tested blueprints covering strategy, delivery, and enablement.",
    trend: "+7 new this month",
  },
  {
    label: "Community Practitioners",
    value: "3.1k",
    caption: "Leaders sharing playbooks, metrics, and growth stories.",
    trend: "+480 since last release",
  },
  {
    label: "Avg Time-to-Value",
    value: "23 days",
    caption: "From discovery to measurable impact on core KPIs.",
  },
];

export const systemMetrics = validateData(
  "systemMetrics",
  SystemMetricSchema,
  rawSystemMetrics
);
