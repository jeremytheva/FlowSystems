import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

console.log("[build] Page.tsx loaded successfully");

const heroHighlights = [
  "Wizard complete → Outcomes library unlocked",
  "Navigator orchestrations sync every operating rhythm",
  "Signals and telemetry unify enablement + execution",
  "Community drops new activation recipes weekly",
];

export default function Page() {
  return (
    <div className="relative mx-auto max-w-7xl space-y-16 px-6 py-16">
      <header className="relative overflow-hidden rounded-[calc(var(--fs-radius-lg)*1.2)] border border-white/10 bg-slate-950 text-slate-100 shadow-[0_35px_80px_-40px_rgba(15,23,42,0.9)]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-80" style={{ background: "var(--fs-gradient-surface)" }} />
          <div className="animate-hero-orbit absolute -right-32 top-10 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/40 via-sky-400/30 to-emerald-400/40 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </div>
        <div className="relative space-y-10 px-8 py-14 sm:px-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
            FlowSystems Operating Graph
          </div>
          <div className="space-y-6">
            <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
              Build, scale, and evolve flows that move the entire business forward.
            </h1>
            <p className="max-w-2xl text-lg text-slate-200 sm:text-xl">
              Align growth, product, and operations teams around compound flows. FlowSystems unifies research, telemetry, and enablement so operators can launch confident moves in weeks—not quarters.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-slate-100">
            {heroHighlights.map((highlight, index) => (
              <span
                key={highlight}
                className="chip-fade inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 shadow-lg shadow-slate-900/30"
                style={{ animationDelay: `${index * 1.5}s` }}
              >
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-sky-400 to-emerald-300" />
                {highlight}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/40 transition hover:shadow-2xl"
              href="/platform/navigator"
            >
              Launch the Navigator
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/50 hover:bg-white/20"
              href="/community"
            >
              Explore community fieldkits
            </Link>
          </div>
        </div>
      </header>

      <Section
        eyebrow="Snapshot"
        title="The system is live across teams and industries"
        description="Key metrics we monitor to ensure flows stay healthy and outcomes keep compounding."
        className="bg-white/85 shadow-xl supports-[backdrop-filter]:backdrop-blur-md"
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
        className="border-none bg-gradient-to-br from-white via-slate-50 to-sky-50/70 shadow-xl"
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
        className="border-none bg-gradient-to-br from-white via-emerald-50/70 to-cyan-50 shadow-xl"
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
        className="bg-white/85 shadow-xl supports-[backdrop-filter]:backdrop-blur-md"
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
        className="bg-white/85 shadow-xl supports-[backdrop-filter]:backdrop-blur-md"
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
        className="border-none bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-xl"
        contentClassName="space-y-4"
      >
        <CommunitySpotlight community={communityHighlights} />
      </Section>
    </div>
  );
}
