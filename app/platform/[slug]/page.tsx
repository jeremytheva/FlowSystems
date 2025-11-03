import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Section } from "@/components/Section";
import { PlatformCapabilities } from "@/components/platform/PlatformCapabilities";
import { PlatformHero } from "@/components/platform/PlatformHero";
import { PlatformIntegrations } from "@/components/platform/PlatformIntegrations";
import { PlatformMetrics } from "@/components/platform/PlatformMetrics";
import { PlatformOverview } from "@/components/platform/PlatformOverview";
import { PlatformPlans } from "@/components/platform/PlatformPlans";
import { platforms } from "@/data/catalog/platforms";

export const dynamic = "force-dynamic";

type PlatformPageParams = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  try {
    return platforms.map((platform) => ({ slug: platform.id }));
  } catch (error) {
    console.error("[build] Failed to load platforms:", error);
    return [];
  }
}

export async function generateMetadata({ params }: PlatformPageParams): Promise<Metadata> {
  const platform = platforms.find((item) => item.id === params.slug);

  if (!platform) {
    return {
      title: "Platform not found • FlowSystems",
      description: "The requested platform is not available in the FlowSystems catalog.",
    };
  }

  return {
    title: `${platform.name} • FlowSystems platform profile`,
    description: platform.tagline,
  };
}

export default function PlatformPage({ params }: PlatformPageParams) {
  const platform = platforms.find((item) => item.id === params.slug);

  if (!platform) {
    notFound();
  }

  const platformProfile = platform;

  return (
    <main className="mx-auto max-w-6xl space-y-12 px-6 py-12 sm:space-y-16 lg:px-8 lg:py-16">
      <PlatformHero platform={platformProfile} />

      <Section
        eyebrow="Overview"
        title="What this platform enables"
        description="Snapshot of the core jobs to be done and why operators choose it for this stack."
      >
        <PlatformOverview platform={platformProfile} />
      </Section>

      <Section
        eyebrow="Capabilities"
        title="How the platform delivers outcomes"
        description="These capabilities map to the evaluations FlowSystems conducts with operators."
        contentClassName="mt-6"
      >
        <PlatformCapabilities capabilities={platformProfile.capabilities} />
      </Section>

      <Section
        eyebrow="Live Signals"
        title="Adoption metrics we monitor"
        description="Directional data illustrates how we benchmark traction, sentiment, and execution velocity."
        contentClassName="mt-6"
      >
        <PlatformMetrics metrics={platformProfile.metrics} />
      </Section>

      <Section
        eyebrow="Plans"
        title="Pricing & deployment modes"
        description="Choose the plan that matches your operating complexity."
        contentClassName="mt-6"
      >
        <PlatformPlans plans={platformProfile.plans} />
      </Section>

      <Section
        eyebrow="Ecosystem"
        title="Integrations operators rely on"
        description="Shared integrations keep teams aligned without introducing glue work."
        contentClassName="mt-6"
      >
        <PlatformIntegrations integrations={platformProfile.integrations} />
      </Section>
    </main>
  );
}
