import Link from 'next/link';
import type { ReactNode } from 'react';

const links = [
  { href: '/admin/backlog', label: 'Backlog' },
  { href: '/admin/scoring', label: 'Scoring' },
  { href: '/admin/publishing', label: 'Publishing' },
  { href: '/admin/import', label: 'Import' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900">FlowSystems admin</h1>
        <p className="text-sm text-slate-600">Internal views for planning reviews, keeping scoring fresh, and shipping updates.</p>
        <nav className="flex flex-wrap gap-3 text-sm font-semibold text-primary-700">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full bg-primary-50 px-3 py-1 hover:bg-primary-100">
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      <section>{children}</section>
    </div>
  );
}
