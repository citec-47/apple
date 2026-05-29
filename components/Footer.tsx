import Link from "next/link";
import { BRAND, CATEGORIES } from "@/lib/brand";

const COLUMNS = [
  {
    title: "Shop",
    links: CATEGORIES.map((c) => ({ label: c.label, href: `/shop/category/${c.slug}` })),
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: "/support" },
      { label: "Order status", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Warranty", href: "#" },
      { label: "Contact us", href: "/support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Press", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Sustainability", href: "#" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/admin/login" },
      { label: "Your bag", href: "/cart" },
      { label: "Track an order", href: "#" },
      { label: "Gift cards", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-appleGray-900 text-[13px] text-white/70">
      <div className="mx-auto max-w-appleWide px-6 py-14">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="text-2xl font-semibold text-white">{BRAND.name}</p>
            <p className="mt-3 max-w-xs leading-relaxed">{BRAND.shortDescription}</p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-widest text-white">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs">
          <p>© {BRAND.year} {BRAND.name}. {BRAND.tagline}</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-white">Terms</Link>
            <Link href="#" className="hover:text-white">Site Map</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
