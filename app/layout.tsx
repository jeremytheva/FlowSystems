import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/platform/navigator", label: "Platforms" },
  { href: "/category/intelligence-ops", label: "Categories" },
  { href: "/review/navigator-review", label: "Reviews" },
  { href: "/compare", label: "Comparisons" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 font-sans text-slate-900">
        <a className="sr-only focus:not-sr-only" href="#main-content">
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link className="text-lg font-semibold text-slate-900" href="/">
                FlowSystems
              </Link>
              <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
                {navLinks.map((link) => (
                  <Link key={link.href} className="rounded-md px-3 py-2 hover:bg-slate-100" href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <footer className="border-t border-slate-200 bg-white/90">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} FlowSystems. Built for operators.</p>
              <div className="flex gap-4">
                <Link className="hover:text-slate-700" href="/newsletter">
                  Newsletter
                </Link>
                <Link className="hover:text-slate-700" href="/community">
                  Community
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
