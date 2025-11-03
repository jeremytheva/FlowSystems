"use client";

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "../lib/utils";

type BaseProps<T extends ElementType> = {
  as?: T;
  title: string;
  description?: string;
  eyebrow?: string;
  children?: ReactNode;
  contentClassName?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "title">;

export function Section<T extends ElementType = "section">({
  as,
  title,
  description,
  eyebrow,
  children,
  className,
  contentClassName,
  ...rest
}: BaseProps<T>) {
  if (!children) {
    return null;
  }

  const Component = (as ?? "section") as ElementType;

  return (
    <Component
      className={cn(
        "space-y-4 rounded-xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur",
        className,
      )}
      {...rest}
    >
      <header className="space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{eyebrow}</p>
        ) : null}
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        {description ? <p className="max-w-2xl text-sm text-slate-600">{description}</p> : null}
      </header>
      <div className={cn(contentClassName ?? "space-y-4")}>{children}</div>
    </Component>
  );
}
