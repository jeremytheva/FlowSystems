import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  description?: string;
  eyebrow?: string;
  children: ReactNode;
}

export function Section({ title, description, eyebrow, children }: SectionProps) {
  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
      <header className="space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        {description ? (
          <p className="max-w-2xl text-sm text-slate-600">{description}</p>
        ) : null}
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
