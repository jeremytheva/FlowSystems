import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "FlowSystems",
  description: "FlowSystems platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
