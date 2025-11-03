import type { ValueLayer } from "../lib/types";
import { ValueStackSchema, validateData } from "../lib/validateData";

const rawValueStack: ValueLayer[] = [
  {
    title: "Foundation",
    description:
      "Codify system primitives—data contracts, rituals, and KPIs—that every flow builds on.",
    examples: ["Baseline observability", "Governed experimentation", "Integrated knowledge base"],
  },
  {
    title: "Activation",
    description:
      "Compose flows that compound impact across marketing, product, and operations teams.",
    examples: ["Orchestrated journeys", "Closed-loop enablement", "Dynamic playbooks"],
  },
  {
    title: "Evolution",
    description:
      "Adapt the operating model with scenario planning, capability scoring, and community input.",
    examples: ["Modelled futures", "Capability benchmarks", "Shared learning cadences"],
  },
];

export const valueStack = validateData(
  "valueStack",
  ValueStackSchema,
  rawValueStack
);
