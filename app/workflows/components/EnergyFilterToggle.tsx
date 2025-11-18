"use client";

import clsx from "clsx";
import { EnergyLevel } from "@/app/lib/workflows/types";

export type EnergyFilter = "ALL" | EnergyLevel;

interface Props {
  value: EnergyFilter;
  onChange: (value: EnergyFilter) => void;
}

const options: { label: string; value: EnergyFilter }[] = [
  { label: "All energy", value: "ALL" },
  { label: "Low focus", value: "LOW" },
  { label: "Medium", value: "MEDIUM" },
  { label: "High", value: "HIGH" },
];

export function EnergyFilterToggle({ value, onChange }: Props) {
  return (
    <div className="inline-flex rounded-md border bg-white shadow-sm">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={clsx(
            "px-3 py-2 text-sm font-medium",
            value === option.value
              ? "bg-emerald-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
