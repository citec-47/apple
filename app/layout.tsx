import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import VisitorPing from "@/components/VisitorPing";

export const metadata: Metadata = {
  title: "Apple",
  description: "Apple.com clone — built with Next.js, TypeScript, and Tailwind CSS.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // The admin area renders its own layout (sidebar) with no public chrome.
  const h = await headers();
  const path = h.get("x-invoke-path") ?? h.get("next-url") ?? "";
  const isAdmin = path.startsWith("/admin");

  return (
    <html lang="en">
      <body>
        <ScrollReveal />
        <VisitorPing />
        {!isAdmin && <NavBar />}
        <main>{children}</main>
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}
