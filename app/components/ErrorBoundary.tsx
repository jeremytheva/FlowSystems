"use client";

import React from "react";

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="p-6 bg-red-50 border border-red-200 text-red-800 rounded">
      <h2 className="font-bold">⚠️ Render Error</h2>
      <p>{error.message}</p>
      {process.env.NODE_ENV === "development" && (
        <pre className="mt-2 text-xs text-red-600 whitespace-pre-wrap break-words">
          {error.stack}
        </pre>
      )}
    </div>
  );
}
