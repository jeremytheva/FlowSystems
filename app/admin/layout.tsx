import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { href: "/admin/import", label: "Import" },
  { href: "/admin/publishing", label: "Publishing" },
  { href: "/admin/scoring", label: "Scoring" },
  { href: "/admin/backlog", label: "Backlog" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 border-r border-slate-200 bg-white px-4 py-6">
        <h1 className="text-lg font-semibold text-slate-900">Admin Console</h1>
        <p className="mt-2 text-sm text-slate-500">Manage imports, publishing, scoring, and backlog workflows.</p>
        <nav className="mt-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 px-8 py-10">{children}</main>
    </div>
  );
}
