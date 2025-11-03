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
        "space-y-6 rounded-[var(--fs-radius-lg)] border border-slate-200/60 bg-white/75 p-6 shadow-lg shadow-slate-900/5 supports-[backdrop-filter]:backdrop-blur",
        className,
      )}
      {...rest}
    >
      <header className="space-y-3">
        {eyebrow ? (
          <p className="inline-flex items-center rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{title}</h2>
        {description ? <p className="max-w-2xl text-sm text-slate-600 sm:text-base">{description}</p> : null}
      </header>
      <div className={cn("space-y-4", contentClassName)}>{children}</div>
    </Component>
  );
}
