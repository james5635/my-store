import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Store | Quality Products",
  description: "Browse and purchase our unique collection of products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen flex flex-col font-sans">{children}</body>
    </html>
  );
}
