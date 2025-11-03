import type { ReactNode } from "react";

import { NavTabs } from "./ui/nav-tabs";

const phaseTabs = [
  { name: "Define", href: "/define" },
  { name: "Attract", href: "/attract" },
  { name: "Serve", href: "/serve" },
  { name: "Evolve", href: "/evolve" },
  { name: "Govern", href: "/govern" },
];

interface AppLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  activePath?: string;
}

export function AppLayout({ title, description, children, activePath }: AppLayoutProps) {
  const tabs = phaseTabs.map((tab) => ({ ...tab, current: activePath ? activePath === tab.href : false }));

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{title}</h1>
        {description ? <p className="text-base text-slate-600">{description}</p> : null}
      </header>
      <NavTabs tabs={tabs} />
      <div className="pt-4">{children}</div>
    </div>
  );
}
