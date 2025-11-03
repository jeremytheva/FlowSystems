import "./globals.css";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import { Layout } from "./components/Layout";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
