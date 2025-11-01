import type { AdminTask } from "../../lib/types";

export const importQueue: AdminTask[] = [
  {
    id: "import-reviews",
    title: "Review backlog sync",
    owner: "Data Ops",
    status: "in-progress",
    notes: "Processing 12 new partner reviews",
  },
  {
    id: "import-playbooks",
    title: "Playbook catalog refresh",
    owner: "Enablement",
    status: "pending",
    notes: "Awaiting QA on beta templates",
  },
];

export const publishingTasks: AdminTask[] = [
  {
    id: "publish-navigator",
    title: "Publish Navigator review",
    owner: "Editorial",
    status: "pending",
    notes: "Need final approval from research",
  },
  {
    id: "publish-stack",
    title: "Launch Growth Foundation stack",
    owner: "Programs",
    status: "in-progress",
  },
];

export const scoringTasks: AdminTask[] = [
  {
    id: "refresh-metrics",
    title: "Refresh scoring weights",
    owner: "Systems Research",
    status: "in-progress",
    notes: "Validating against recent telemetry",
  },
  {
    id: "audit-criteria",
    title: "Audit criteria coverage",
    owner: "Quality",
    status: "pending",
  },
];

export const backlogItems: AdminTask[] = [
  {
    id: "platform-requests",
    title: "New platform evaluation requests",
    owner: "Partnerships",
    status: "pending",
    notes: "Seven vendors in triage",
  },
  {
    id: "flow-ideas",
    title: "Community-submitted flows",
    owner: "Community Ops",
    status: "in-progress",
    notes: "Synthesizing 18 submissions",
  },
];
