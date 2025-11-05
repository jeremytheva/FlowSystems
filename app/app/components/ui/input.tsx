(cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/app/components/ui/input.tsx b/app/components/ui/input.tsx
deleted file mode 100644
index b12ead6f2c0dd1177f7d6e0a7bd4152ce450408c..0000000000000000000000000000000000000000
--- a/app/components/ui/input.tsx
+++ /dev/null
@@ -1,28 +0,0 @@
-"use client";
-
-import clsx from "clsx";
-import type { InputHTMLAttributes } from "react";
-
-interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
-  label?: string;
-  helperText?: string;
-}
-
-export function Input({ label, helperText, className, id, ...props }: InputProps) {
-  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
-
-  return (
-    <label className="block space-y-1" htmlFor={inputId}>
-      {label ? <span className="text-sm font-medium text-slate-700">{label}</span> : null}
-      <input
-        id={inputId}
-        className={clsx(
-          "w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500",
-          className,
-        )}
-        {...props}
-      />
-      {helperText ? <p className="text-xs text-slate-500">{helperText}</p> : null}
-    </label>
-  );
-}
 
EOF
)
