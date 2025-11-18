"use client";

interface Props {
  value: "SIMPLE" | "ADVANCED";
  onChange: (mode: "SIMPLE" | "ADVANCED") => void;
}

export function SimpleAdvancedModeToggle({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">Mode</label>
      <div className="inline-flex rounded-md border bg-white shadow-sm">
        <button
          onClick={() => onChange("SIMPLE")}
          className={`px-3 py-2 text-sm ${
            value === "SIMPLE" ? "bg-indigo-600 text-white" : "text-gray-700"
          }`}
        >
          Simple
        </button>
        <button
          onClick={() => onChange("ADVANCED")}
          className={`px-3 py-2 text-sm ${
            value === "ADVANCED" ? "bg-indigo-600 text-white" : "text-gray-700"
          }`}
        >
          Advanced
        </button>
      </div>
    </div>
  );
}
