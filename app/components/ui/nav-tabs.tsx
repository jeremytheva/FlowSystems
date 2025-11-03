import clsx from "clsx";
import Link from "next/link";

interface NavTabsProps {
  tabs: { name: string; href: string; current?: boolean }[];
}

export function NavTabs({ tabs }: NavTabsProps) {
  return (
    <nav aria-label="Phase navigation" className="flex space-x-4 overflow-x-auto border-b border-slate-200 pb-1">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={clsx(
            "whitespace-nowrap border-b-2 px-1 pb-2 text-sm font-medium transition",
            tab.current
              ? "border-primary text-primary"
              : "border-transparent text-slate-500 hover:border-primary hover:text-primary",
          )}
        >
          {tab.name}
        </Link>
      ))}
    </nav>
  );
}
