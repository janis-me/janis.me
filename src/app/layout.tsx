import type { Metadata } from "next";

import { Header } from "$/components/ui/Header";

import "$/styles/globals.scss";

export const metadata: Metadata = {
  title: "janis.me",
  description: "Janis Jansen - Home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
