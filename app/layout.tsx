import "./globals.css";
import type { ReactNode } from "react";

import { Layout } from "./components/Layout";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
