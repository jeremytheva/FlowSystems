# Module Architecture Overview

This document outlines the Flow Systems modular architecture introduced in the 2025 unified refactor. Each folder inside `/modules` encapsulates a core business capability and exposes a consistent `Module` interface (`init`, `loadData`, `runAction`, optional `exportData`).

## Module Scope Summaries

- **FlowBotCore** — Orchestration layer for prompts, knowledge graphs, and integration handshakes powering every other module.
- **BrandingFlow** — Houses brand identity tooling, tone assistance, and visual system exports that feed go-to-market work.
- **StrategyFlow** — Maintains goal maps, business model blueprints, and strategy canvas scaffolding for decision-makers.
- **AttractFlow** — Prepares landing pages and email cadences to activate demand once campaign automation is enabled.
- **ServeFlow** — Provides client workspace and proposal generator foundations to coordinate delivery teams.
- **WorkflowFlow** — The automation studio that sequences repeatable flows, schedules runs, and registers integrations.
- **EvolveFlow** — Knowledge hub for sharing playbooks, syncing with the knowledge graph, and exporting learnings.
- **GovernFlow** — Analytics and governance telemetry surface ensuring flows remain accountable and auditable.

## Integration Guidelines

- Every module should delegate orchestration-heavy logic to FlowBot Core when prompts or templates are required.
- WorkflowFlow acts as the automation bridge and should receive triggers from acquisition (AttractFlow) and delivery (ServeFlow).
- GovernFlow consumes metrics and logs from WorkflowFlow, StrategyFlow, and EvolveFlow to produce governance insights.
- Shared utilities should live in `/lib` or dedicated module `utils/` subfolders to avoid duplication.
