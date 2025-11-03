import FlowBotCore from "./FlowBotCore";
import BrandingFlow from "./BrandingFlow";
import StrategyFlow from "./StrategyFlow";
import AttractFlow from "./AttractFlow";
import ServeFlow from "./ServeFlow";
import WorkflowFlow from "./WorkflowFlow";
import EvolveFlow from "./EvolveFlow";
import GovernFlow from "./GovernFlow";
import type { ModuleDescriptor } from "./types";

export type { Module, ModuleDescriptor, ModuleStatus } from "./types";
export {
  FlowBotCore,
  BrandingFlow,
  StrategyFlow,
  AttractFlow,
  ServeFlow,
  WorkflowFlow,
  EvolveFlow,
  GovernFlow,
};

export const moduleRegistry: ModuleDescriptor[] = [
  FlowBotCore,
  BrandingFlow,
  StrategyFlow,
  AttractFlow,
  ServeFlow,
  WorkflowFlow,
  EvolveFlow,
  GovernFlow,
];

export function getModuleBySlug(slug: string): ModuleDescriptor | undefined {
  return moduleRegistry.find((module) => module.slug === slug);
}
