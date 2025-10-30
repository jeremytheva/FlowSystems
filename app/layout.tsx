import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/platform', label: 'Platforms' },
  { href: '/review', label: 'Reviews' },
  { href: '/compare', label: 'Comparisons' },
  { href: '/about', label: 'About' },
  { href: '/community', label: 'Community' },
];

export const metadata: Metadata = {
  title: {
    default: 'FlowSystems — The modern ops platform guide',
    template: '%s · FlowSystems',
  },
  description:
    'FlowSystems curates evaluations of operational tooling for solos and small teams. Browse platforms, deep-dive reviews, and real migration stories.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold text-primary-700">
              FlowSystems
            </Link>
            <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-primary-600">
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/newsletter"
              className="rounded-full bg-primary-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
            >
              Join newsletter
            </Link>
          </div>
        </div>
        <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>
        <footer className="border-t border-slate-200 bg-white/60 py-8 text-sm text-slate-500">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} FlowSystems. Curated by operators for operators.</p>
            <div className="flex gap-4">
              <Link href="/stack">Platform stack</Link>
              <Link href="/search">Search</Link>
              <Link href="/community">Community</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
