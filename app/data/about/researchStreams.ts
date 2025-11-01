import { ResearchStreamSchema, validateData } from "../../lib/validateData";

const rawResearchStreams = [
  {
    name: "Executive Systems Council",
    cadence: "Monthly",
    keyQuestion: "Which growth and efficiency bets are operators prioritizing next quarter?",
    artifact: "Council brief & scenario library",
  },
  {
    name: "Practitioner Diaries",
    cadence: "Bi-weekly",
    keyQuestion: "How do frontline teams experience the flows day-to-day?",
    artifact: "Journey narratives & service blueprints",
  },
  {
    name: "Telemetry Reviews",
    cadence: "Continuous",
    keyQuestion: "What do adoption, sentiment, and impact trends tell us to refine?",
    artifact: "Live dashboards & anomaly alerts",
  },
];

export const researchStreams = validateData(
  "researchStreams",
  ResearchStreamSchema,
  rawResearchStreams
);
