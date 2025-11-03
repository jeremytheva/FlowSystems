import { Section } from "@/components/Section";

/**
 * Skeleton mirrors the platform layout so route transitions feel cohesive while data loads.
 */
export default function LoadingPlatformPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-12 px-6 py-12 sm:space-y-16 lg:px-8 lg:py-16">
      <div className="animate-pulse space-y-4 rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-inner shadow-slate-900/5 sm:p-10 lg:p-12">
        <div className="h-4 w-24 rounded-full bg-slate-200" />
        <div className="h-10 w-2/3 rounded bg-slate-200" />
        <div className="h-5 w-1/2 rounded bg-slate-200" />
        <div className="flex flex-wrap gap-2 pt-4">
          {[...Array(5).keys()].map((item) => (
            <div key={item} className="h-6 w-20 rounded-full bg-slate-200" />
          ))}
        </div>
        <div className="h-10 w-40 rounded-full bg-slate-200" />
      </div>

      <Section eyebrow="Overview" title="Loading platform overview" contentClassName="space-y-4">
        <div className="space-y-3">
          {[...Array(2).keys()].map((item) => (
            <div key={item} className="h-4 w-full rounded bg-slate-200" />
          ))}
        </div>
      </Section>

      <Section eyebrow="Capabilities" title="Loading capabilities" contentClassName="grid gap-4 sm:grid-cols-2">
        {[...Array(4).keys()].map((item) => (
          <div key={item} className="h-32 rounded-2xl bg-slate-200" />
        ))}
      </Section>

      <Section eyebrow="Live Signals" title="Loading metrics" contentClassName="grid gap-4 sm:grid-cols-2">
        {[...Array(4).keys()].map((item) => (
          <div key={item} className="h-32 rounded-2xl bg-slate-200" />
        ))}
      </Section>

      <Section eyebrow="Plans" title="Loading plans" contentClassName="grid gap-4 sm:grid-cols-3">
        {[...Array(3).keys()].map((item) => (
          <div key={item} className="h-36 rounded-2xl bg-slate-200" />
        ))}
      </Section>
    </main>
  );
}
