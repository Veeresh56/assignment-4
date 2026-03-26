import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "assigment-4",
  description: "Next.js feedback form with Server Actions",
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