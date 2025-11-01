import { StringSchema, validateData } from "../lib/validateData";

const rawNewsletterBenefits = [
  "Weekly operating system intelligence from active deployments",
  "Pattern libraries for rituals, dashboards, and enablement kits",
  "Signals on platforms, plays, and experiments worth watching",
];

const rawNewsletterTopics = [
  "Operator spotlights",
  "Telemetry breakdowns",
  "Flow teardowns",
  "Launch alerts",
];

export const newsletterBenefits = validateData(
  "newsletterBenefits",
  StringSchema,
  rawNewsletterBenefits
);

export const newsletterTopics = validateData(
  "newsletterTopics",
  StringSchema,
  rawNewsletterTopics
);
