import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hormozi Growth Engine - Graph",
  description:
    "Obsidian-style graph of the full Hormozi Harness: offers, leads, money models, sales, scaling & retention, mindset, and voice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
