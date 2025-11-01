import { DeliveryPhaseSchema, validateData } from "../../lib/validateData";

const rawDeliveryPhases = [
  {
    phase: "Discover",
    purpose: "Map current-state systems, friction, and desired outcomes.",
    questions: [
      "What decisions are under-served today?",
      "Which signals do teams trust to act?",
      "Where do handoffs stall progress?",
    ],
  },
  {
    phase: "Design",
    purpose: "Compose flows and models that align data, people, and activation moments.",
    questions: [
      "How might we codify new rituals?",
      "What automation accelerates value without breaking trust?",
      "Which metrics prove we're on track?",
    ],
  },
  {
    phase: "Deploy",
    purpose: "Instrument the flow, roll out enablement, and capture adoption signals.",
    questions: [
      "What needs to be true for launch?",
      "Who stewards the flow once operational?",
      "How do we reinforce the new way of working?",
    ],
  },
  {
    phase: "Evolve",
    purpose: "Continuously iterate based on telemetry, feedback, and market shifts.",
    questions: [
      "Where are we over-optimizing?",
      "Which experiments unlock the next growth ceiling?",
      "How do we share learnings across the community?",
    ],
  },
];

export const deliveryPhases = validateData(
  "deliveryPhases",
  DeliveryPhaseSchema,
  rawDeliveryPhases
);
