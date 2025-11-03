import type { ModuleDescriptor } from "../types";

const proposalTemplates: string[] = ["Strategy brief", "Implementation roadmap"];

const ServeFlow: ModuleDescriptor = {
  name: "ServeFlow",
  slug: "serveflow",
  summary: "Client portal and proposal generator foundations for delivery teams.",
  description:
    "Creates the connective tissue between internal workflows and client-facing experiences, starting with proposals and shared workspaces.",
  status: "mvp",
  plannedFeatures: [
    "Client portal spaces with permissions",
    "Proposal composer with FlowBot guided sections",
    "Engagement telemetry feeding GovernFlow",
  ],
  integrationPoints: [
    "FlowBotCore template rendering",
    "WorkflowFlow automation triggers",
    "EvolveFlow knowledge sync",
  ],
  primaryActions: ["createProposal", "listClientSpaces"],
  init() {
    console.info("[ServeFlow] ready");
  },
  async loadData() {
    return undefined;
  },
  async runAction(action, payload) {
    switch (action) {
      case "createProposal": {
        const template = (payload as { template?: string })?.template ?? proposalTemplates[0];
        return {
          template,
          sections: ["Executive Summary", "Objectives", "Next Steps"],
        };
      }
      case "listClientSpaces": {
        return [
          { name: "Acme Corp", status: "draft" },
          { name: "Waypoint Ventures", status: "active" },
        ];
      }
      default: {
        return { action, status: "pending-implementation" };
      }
    }
  },
};

export default ServeFlow;
export { ServeFlow };
