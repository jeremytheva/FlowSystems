import clsx from "clsx";
import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className }: CardProps) {
  return (
    <div className={clsx("card bg-surface shadow-sm border border-slate-200 p-4", className)}>
      {title ? <h2 className="mb-2 text-lg font-semibold text-slate-900">{title}</h2> : null}
      <div>{children}</div>
    </div>
  );
}
