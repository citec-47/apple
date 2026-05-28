import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Apple",
  description: "Apple.com clone — built with Next.js, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ScrollReveal />
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
