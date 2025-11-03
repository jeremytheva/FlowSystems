"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

import { moduleRegistry } from "@modules/index";
import { cn } from "@/lib/utils";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/modules", label: "Modules" },
  ...moduleRegistry.map((module) => ({
    href: `/modules/${module.slug}`,
    label: module.name,
  })),
];

const primaryCta = { href: "/newsletter", label: "Weekly Briefing" };

export function MainNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navItems = useMemo(() => navLinks, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  return (
    <nav className="relative">
      <div className="flex items-center justify-between gap-6 rounded-full border border-slate-200/60 bg-white/80 px-5 py-3 shadow-lg shadow-slate-900/5 supports-[backdrop-filter]:backdrop-blur">
        <Link className="flex items-center gap-2 text-base font-semibold text-slate-900" href="/">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-sky-400 to-emerald-400 text-white shadow-md shadow-indigo-500/30">
            FS
          </span>
          FlowSystems
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-1 text-sm font-medium text-slate-600">
            {navItems.map((link) => (
              <li key={link.href}>
                <Link
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3.5 py-2 transition-colors",
                    isActive(link.href)
                      ? "bg-slate-900 text-white shadow-inner shadow-slate-900/20"
                      : "text-slate-600 hover:bg-slate-900/5",
                  )}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/40 transition hover:bg-slate-700"
            href={primaryCta.href}
          >
            {primaryCta.label}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <button
          aria-controls="primary-navigation"
          aria-expanded={isOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/60 bg-white/70 text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          type="button"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle navigation</span>
        </button>
      </div>
      <div
        className={cn(
          "absolute left-0 right-0 top-[calc(100%+0.75rem)] origin-top rounded-3xl border border-slate-200/70 bg-white/95 p-6 text-sm shadow-2xl shadow-slate-900/10 transition-all duration-300 md:hidden",
          isOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0",
        )}
        id="primary-navigation"
      >
        <ul className="space-y-2">
          {navItems.map((link) => (
            <li key={link.href}>
              <Link
                className={cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3 font-medium transition",
                  isActive(link.href) ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-900/5",
                )}
                href={link.href}
              >
                <span>{link.label}</span>
                {isActive(link.href) ? <ArrowUpRight className="h-4 w-4" /> : null}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 rounded-2xl bg-slate-900 px-4 py-4 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Stay in the loop</p>
          <p className="mt-2 text-base font-semibold">Subscribe to the FlowSystems briefing</p>
          <Link className="mt-3 inline-flex items-center gap-2 text-sm font-semibold" href={primaryCta.href}>
            {primaryCta.label}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
