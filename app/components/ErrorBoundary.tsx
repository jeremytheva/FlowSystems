"use client";

import React from "react";

type SerializableError = {
  message: string;
  stack?: string;
};

export default function ErrorBoundary({ error }: { error: SerializableError }) {
  return (
    <div className="rounded border border-red-200 bg-red-50 p-6 text-red-800">
      <h2 className="font-bold">⚠️ Render Error</h2>
      <p>{error.message}</p>
      {process.env.NODE_ENV === "development" && error.stack && (
        <pre className="mt-2 whitespace-pre-wrap text-xs text-red-600">{error.stack}</pre>
      )}
    </div>
  );
}
