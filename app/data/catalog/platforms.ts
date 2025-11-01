import type { Platform } from "../../lib/types";

export const platforms: Platform[] = [
  {
    id: "navigator",
    name: "Navigator",
    tagline: "Customer journey intelligence for high-velocity teams",
    category: "growth-systems",
    overview:
      "Navigator unifies lifecycle telemetry, qualitative feedback, and GTM playbooks so operators can trigger the right moves at the right moment.",
    website: "https://navigator.example.com",
    tags: ["activation", "experimentation", "journey-orchestration"],
    capabilities: [
      {
        id: "signals",
        label: "Signal Mesh",
        description: "Ingests product analytics, CRM events, and support signals with out-of-the-box normalization.",
      },
      {
        id: "playbooks",
        label: "Adaptive Playbooks",
        description: "Auto-recommends lifecycle motions with guardrails based on ICP alignment.",
      },
      {
        id: "governance",
        label: "Governed Experiments",
        description: "Keeps growth experiments on track with stage gates, approvals, and metric attribution.",
      },
    ],
    metrics: [
      { label: "Teams Live", value: "68", trend: "+9 QoQ" },
      { label: "Avg TTV", value: "19 days", trend: "-4 days" },
    ],
    plans: [
      { tier: "Launch", price: "$1,200", bestFor: "Seed to Series A teams shipping first flows" },
      { tier: "Scale", price: "$2,800", bestFor: "Revenue teams coordinating multi-channel plays" },
      { tier: "Enterprise", price: "Talk to us", bestFor: "Operators spanning product, CS, and partner orgs" },
    ],
    integrations: ["Salesforce", "HubSpot", "Segment", "Amplitude", "Zendesk"],
  },
  {
    id: "observatory",
    name: "Delivery Observatory",
    tagline: "Live product delivery telemetry",
    category: "product-delivery",
    overview:
      "Observatory connects roadmap tooling, engineering signals, and enablement docs into a shared operating picture for product leaders.",
    website: "https://observatory.example.com",
    tags: ["delivery", "telemetry", "enablement"],
    capabilities: [
      {
        id: "rituals",
        label: "Ritual Tracker",
        description: "Monitors discovery, planning, and review cadences across squads.",
      },
      {
        id: "capacity",
        label: "Capacity Sensing",
        description: "Highlights saturation and skill gaps with week-level forecasts.",
      },
      {
        id: "briefings",
        label: "Executive Briefings",
        description: "Summaries focused on bets, risks, and mitigations ready for leadership reviews.",
      },
    ],
    metrics: [
      { label: "Squads Connected", value: "34", trend: "+6 MoM" },
      { label: "Decision Latency", value: "-23%", trend: "Improving" },
    ],
    plans: [
      { tier: "Studio", price: "$900", bestFor: "Product teams codifying delivery health rituals" },
      { tier: "Atlas", price: "$2,400", bestFor: "Scale-ups orchestrating multi-squad programs" },
    ],
    integrations: ["Linear", "Jira", "Notion", "Looker", "Slack"],
  },
  {
    id: "pulse",
    name: "Pulse Desk",
    tagline: "Customer success intelligence",
    category: "customer-experience",
    overview:
      "Pulse turns success, support, and revenue signals into clear plays that retain and expand accounts.",
    website: "https://pulse.example.com",
    tags: ["success", "retention", "health"],
    capabilities: [
      {
        id: "health",
        label: "Account Health",
        description: "Blends telemetry and human input into a unified health score.",
      },
      {
        id: "playmaker",
        label: "Playmaker",
        description: "Routes the best action with context, assets, and success stories.",
      },
      {
        id: "voice",
        label: "Voice of Customer",
        description: "Synthesizes feedback channels into prioritized improvement areas.",
      },
    ],
    metrics: [
      { label: "Net Revenue Retention", value: "121%", trend: "+8 pts" },
      { label: "Play Adoption", value: "87%", trend: "+5 pts" },
    ],
    plans: [
      { tier: "Teams", price: "$1,500", bestFor: "Customer success orgs under 50 seats" },
      { tier: "Impact", price: "$3,500", bestFor: "Scaled CS orgs aligning with revenue" },
    ],
    integrations: ["Gainsight", "ChurnZero", "Snowflake", "Slack", "Gong"],
  },
];
