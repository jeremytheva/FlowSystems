import type { ReactNode } from "react";

export const metadata = {
  title: "Flow Systems",
  description: "Flow Systems knowledge base and evaluation playground",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
