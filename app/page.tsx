import { CommunitySpotlight } from "./components/home/CommunitySpotlight";
import { MetricCard } from "./components/home/MetricCard";
import { CategoryCard } from "./components/home/CategoryCard";
import { ProgramCard } from "./components/home/ProgramCard";
import { ValueLayerCard } from "./components/home/ValueLayerCard";
import { RoadmapItem } from "./components/home/RoadmapItem";
import { Section } from "./components/Section";
import { communityHighlights } from "./data/community/highlights";
import { categories } from "./data/catalog/categories";
import { featuredPrograms } from "./data/library/programs";
import { systemMetrics } from "./data/metrics";
import { upcomingReleases } from "./data/roadmap";
import { valueStack } from "./data/valueStack";

const heroHighlights = [
  "Wizard complete → Outcomes library unlocked",
  "Stack opened → Composable flows ready for activation",
  "Newsletter signup → Weekly systems intelligence briefings",
];

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-6 py-12">
      <header className="space-y-6 rounded-2xl bg-slate-900 px-8 py-12 text-slate-100 shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          FlowSystems Operating Graph
        </p>
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
          Build, scale, and evolve flows that move the entire business forward.
        </h1>
        <p className="max-w-3xl text-lg text-slate-200">
          A unified system for aligning growth, product, and operations teams around the flows that compound value. We connect
          research, telemetry, and enablement so operators can make confident moves faster.
        </p>
        <div className="flex flex-col gap-3 text-sm text-slate-300 sm:flex-row">
          {heroHighlights.map((highlight) => (
            <div key={highlight} className="rounded-full bg-slate-800 px-4 py-2">
              {highlight}
            </div>
          ))}
        </div>
      </header>

      <Section
        eyebrow="Snapshot"
        title="The system is live across teams and industries"
        description="Key metrics we monitor to ensure flows stay healthy and outcomes keep compounding."
        contentClassName="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {systemMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </Section>

      <Section
        eyebrow="Categories"
        title="How we structure the FlowSystems library"
        description="Each category houses frameworks, telemetry, and enablement packages designed to solve for a core operating challenge."
        contentClassName="grid gap-6 lg:grid-cols-3"
      >
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </Section>

      <Section
        eyebrow="Programs"
        title="Featured flows operators are deploying now"
        description="These programs blend automation, enablement, and decision intelligence. Each can be adapted for your environment in weeks, not months."
        contentClassName="grid gap-6 lg:grid-cols-3"
      >
        {featuredPrograms.map((program) => (
          <ProgramCard key={program.slug} program={program} />
        ))}
      </Section>

      <Section
        eyebrow="Value Stack"
        title="Operating layers that keep flows resilient"
        description="We make value creation visible across foundation, activation, and evolution layers so leaders know where to invest next."
        contentClassName="grid gap-6 lg:grid-cols-3"
      >
        {valueStack.map((layer) => (
          <ValueLayerCard key={layer.title} layer={layer} />
        ))}
      </Section>

      <Section
        eyebrow="Roadmap"
        title="Upcoming releases on the FlowSystems roadmap"
        description="What we are shipping next to expand coverage across teams and industries."
        contentClassName="space-y-4"
        as="section"
      >
        <ul className="space-y-4">
          {upcomingReleases.map((release) => (
            <RoadmapItem key={release.title} release={release} />
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Community"
        title="Where practitioners co-create the next generation of flows"
        description="Our community programs keep the system grounded in real operator experience. Join to share playbooks, validate ideas, and see what others are shipping."
        contentClassName="space-y-4"
      >
        <CommunitySpotlight community={communityHighlights} />
      </Section>
    </div>
  );
}
