"use client";

import clsx from "clsx";

export type ViewMode = "FLOW" | "SOP" | "TASKS" | "TIMELINE";

interface Props {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const modes: { label: string; value: ViewMode }[] = [
  { label: "Flow", value: "FLOW" },
  { label: "SOP", value: "SOP" },
  { label: "Tasks", value: "TASKS" },
  { label: "Timeline", value: "TIMELINE" },
];

export function ViewModeToggle({ value, onChange }: Props) {
  return (
    <div className="inline-flex rounded-md border bg-white shadow-sm">
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => onChange(mode.value)}
          className={clsx(
            "px-3 py-2 text-sm font-medium",
            value === mode.value
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
