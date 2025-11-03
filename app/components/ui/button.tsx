"use client";

import clsx from "clsx";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-strong focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
  secondary:
    "bg-accent text-white hover:bg-accent-strong focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2",
  ghost:
    "bg-transparent text-primary hover:bg-primary-soft focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
};

export function Button({ variant = "primary", className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
