import type { AdminTask } from "../../lib/types";
import { AdminTaskSchema, validateData } from "../../lib/validateData";

const rawImportQueue: AdminTask[] = [
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

const rawPublishingTasks: AdminTask[] = [
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

const rawScoringTasks: AdminTask[] = [
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

const rawBacklogItems: AdminTask[] = [
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

export const importQueue = validateData(
  "importQueue",
  AdminTaskSchema,
  rawImportQueue
);

export const publishingTasks = validateData(
  "publishingTasks",
  AdminTaskSchema,
  rawPublishingTasks
);

export const scoringTasks = validateData(
  "scoringTasks",
  AdminTaskSchema,
  rawScoringTasks
);

export const backlogItems = validateData(
  "backlogItems",
  AdminTaskSchema,
  rawBacklogItems
);
