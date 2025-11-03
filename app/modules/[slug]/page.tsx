import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getModuleBySlug, moduleRegistry } from "@modules/index";

interface ModulePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return moduleRegistry.map((module) => ({ slug: module.slug }));
}

export function generateMetadata({ params }: ModulePageProps): Metadata {
  const flowModule = getModuleBySlug(params.slug);

  if (!flowModule) {
    return { title: "Module not found" };
  }

  return {
    title: `${flowModule.name} | Flow Systems`,
    description: flowModule.summary,
  };
}

export default function ModuleDetailPage({ params }: ModulePageProps) {
  const flowModule = getModuleBySlug(params.slug);

  if (!flowModule) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Flow module</p>
        <h1 className="text-3xl font-bold text-slate-900">{flowModule.name}</h1>
        <p className="max-w-3xl text-base text-slate-600">{flowModule.description}</p>
      </header>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Planned Features</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          {flowModule.plannedFeatures.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Integration Touchpoints</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {flowModule.integrationPoints.map((integration) => (
              <li key={integration}>{integration}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Primary Actions</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {flowModule.primaryActions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
