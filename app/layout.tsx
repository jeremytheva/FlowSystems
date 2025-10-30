import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Flow Systems',
  description: 'Decision support for modern platforms and workflows.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-12 px-6 py-12">
          <header className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Flow Systems
            </span>
            <h1 className="text-3xl font-bold">Find, compare, and deploy the right tools faster.</h1>
            <p className="max-w-2xl text-base text-slate-600">
              A structured catalog of platforms, scored by setup effort, time to value, and integration depth.
            </p>
          </header>
          <div className="flex-1">{children}</div>
          <footer className="border-t border-slate-200 pt-6 text-xs text-slate-500">
            Built with research-backed scoring and human reviews.
          </footer>
        </main>
      </body>
    </html>
  );
}
