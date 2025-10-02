import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Mi Portfolio",
  description: "Portfolio personal con Next.js y Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
        <Header />
        <main className="pt-20 max-w-6xl mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
