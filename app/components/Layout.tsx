import Link from "next/link";
import type { ReactNode } from "react";

import { CurrentYear } from "./CurrentYear";

const navigationLinks = [
  { href: "/define", label: "Define" },
  { href: "/attract", label: "Attract" },
  { href: "/serve", label: "Serve" },
  { href: "/evolve", label: "Evolve" },
  { href: "/govern", label: "Govern" },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-text">
      <a className="sr-only focus:not-sr-only" href="#main-content">
        Skip to content
      </a>
      <header className="border-b bg-surface shadow-sm">
        <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link className="text-lg font-semibold text-primary" href="/">
            Flow Systems
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium md:justify-end">
            {navigationLinks.map((link) => (
              <Link
                className="rounded-md px-2 py-1 hover:bg-primary/10 hover:text-primary"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="mx-auto flex max-w-6xl flex-1 flex-col px-4 py-8" id="main-content">
        {children}
      </main>
      <footer className="bg-slate-100 py-4 text-sm text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 md:flex-row">
          <p>
            © <CurrentYear /> Flow Systems. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link className="hover:text-primary" href="/newsletter">
              Newsletter
            </Link>
            <Link className="hover:text-primary" href="/community">
              Community
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
