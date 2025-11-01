# Codex Prompt: Safe Error Logging for Flow Systems

**You are improving the Flow Systems Next.js app for better error visibility.**

For every page component in `/app/**/page.tsx`:

* Wrap the exported component in a `try/catch` block during rendering.
* If an error occurs during rendering or data import:
  * `console.error()` the error with the route path and stack trace.
  * If `process.env.NODE_ENV === "development"`, render an `<ErrorBoundary>` component that displays the message on-screen.
  * If in production, render a generic “Error loading content” fallback.

Use a reusable wrapper in `/app/components/ErrorBoundary.tsx`:

```tsx
"use client";
import React from "react";

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="p-6 bg-red-50 border border-red-200 text-red-800 rounded">
      <h2 className="font-bold">⚠️ Render Error</h2>
      <p>{error.message}</p>
      {process.env.NODE_ENV === "development" && (
        <pre className="mt-2 text-xs text-red-600">{error.stack}</pre>
      )}
    </div>
  );
}
```

Example transformation for a page:

```tsx
import ErrorBoundary from "@/app/components/ErrorBoundary";
import { platforms } from "@/app/data/catalog/platforms";

export default function PlatformPage({ params }) {
  try {
    const platform = platforms.find(p => p.id === params.slug);
    if (!platform) throw new Error(`Platform not found: ${params.slug}`);
    return <h1>{platform.name}</h1>;
  } catch (error) {
    console.error("Error rendering PlatformPage:", error);
    return <ErrorBoundary error={error as Error} />;
  }
}
```

Add this pattern automatically to all `page.tsx` files that import data arrays from `/app/data/`.
