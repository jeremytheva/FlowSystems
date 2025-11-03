export interface Module {
  init(): void;
  loadData(): Promise<void>;
  runAction(action: string, payload?: unknown): Promise<unknown>;
  exportData?(format: "json" | "md" | "pdf"): Promise<File>;
}

export type ModuleStatus = "core" | "mvp" | "planned";

export interface ModuleDescriptor extends Module {
  name: string;
  slug: string;
  summary: string;
  description: string;
  status: ModuleStatus;
  plannedFeatures: string[];
  integrationPoints: string[];
  primaryActions: string[];
}
