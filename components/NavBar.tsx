"use client";

import Link from "next/link";
import { useState } from "react";

type MenuLink = { label: string; href: string; large?: boolean };
type MenuColumn = { title: string; links: MenuLink[]; footer?: MenuLink[] };

const NAV: { label: string; href: string; menu: string }[] = [
  { label: "Store", href: "/store", menu: "store" },
  { label: "Mac", href: "/mac", menu: "mac" },
  { label: "iPad", href: "/ipad", menu: "ipad" },
  { label: "iPhone", href: "/iphone", menu: "iphone" },
  { label: "Watch", href: "/watch", menu: "watch" },
  { label: "Vision", href: "/vision", menu: "vision" },
  { label: "AirPods", href: "/airpods", menu: "airpods" },
  { label: "TV & Home", href: "/tv", menu: "tv" },
  { label: "Entertainment", href: "/services", menu: "entertainment" },
  { label: "Accessories", href: "/accessories", menu: "accessories" },
  { label: "Support", href: "/support", menu: "support" },
];

const MENUS: Record<string, MenuColumn[]> = {
  store: [
    {
      title: "Shop",
      links: [
        { label: "Shop the Latest", href: "/store", large: true },
        { label: "Mac", href: "/mac", large: true },
        { label: "iPad", href: "/ipad", large: true },
        { label: "iPhone", href: "/iphone", large: true },
        { label: "Apple Watch", href: "/watch", large: true },
        { label: "Apple Vision Pro", href: "#", large: true },
        { label: "AirPods", href: "/airpods", large: true },
        { label: "Accessories", href: "#", large: true },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Find a Store", href: "#" },
        { label: "Order Status", href: "#" },
        { label: "Apple Trade In", href: "#" },
        { label: "Financing", href: "#" },
        { label: "Personal Setup", href: "#" },
      ],
    },
    {
      title: "Shop Special Stores",
      links: [
        { label: "Certified Refurbished", href: "#" },
        { label: "Education", href: "#" },
        { label: "Business", href: "#" },
        { label: "Veterans and Military", href: "#" },
        { label: "Government", href: "#" },
      ],
    },
  ],
  mac: [
    {
      title: "Explore Mac",
      links: [
        { label: "Explore All Mac", href: "/mac", large: true },
        { label: "MacBook Neo", href: "#", large: true },
        { label: "MacBook Air", href: "/mac", large: true },
        { label: "MacBook Pro", href: "/mac/macbook-pro", large: true },
        { label: "iMac", href: "#", large: true },
        { label: "Mac mini", href: "#", large: true },
        { label: "Mac Studio", href: "#", large: true },
        { label: "Displays", href: "#", large: true },
      ],
      footer: [
        { label: "Compare Mac", href: "#" },
        { label: "Switch from PC to Mac", href: "#" },
      ],
    },
    {
      title: "Shop Mac",
      links: [
        { label: "Shop Mac", href: "/mac" },
        { label: "Help Me Choose", href: "#" },
        { label: "Mac Accessories", href: "#" },
        { label: "Apple Trade In", href: "#" },
        { label: "Financing", href: "#" },
        { label: "Personal Setup", href: "#" },
      ],
    },
    {
      title: "More from Mac",
      links: [
        { label: "Mac Support", href: "#" },
        { label: "AppleCare", href: "#" },
        { label: "macOS Tahoe", href: "#" },
        { label: "Apple Intelligence", href: "#" },
        { label: "Apps by Apple", href: "#" },
        { label: "Apple Creator Studio", href: "#" },
        { label: "Better with iPhone", href: "#" },
        { label: "iCloud+", href: "#" },
        { label: "Mac for Business", href: "#" },
        { label: "Education", href: "#" },
      ],
    },
  ],
  ipad: [
    {
      title: "Explore iPad",
      links: [
        { label: "Explore All iPad", href: "/ipad", large: true },
        { label: "iPad Pro", href: "/ipad", large: true },
        { label: "iPad Air", href: "/ipad", large: true },
        { label: "iPad", href: "/ipad", large: true },
        { label: "iPad mini", href: "/ipad", large: true },
        { label: "Apple Pencil", href: "#", large: true },
        { label: "Keyboards", href: "#", large: true },
      ],
      footer: [{ label: "Compare iPad", href: "#" }],
    },
    {
      title: "Shop iPad",
      links: [
        { label: "Shop iPad", href: "/ipad" },
        { label: "iPad Accessories", href: "#" },
        { label: "Apple Trade In", href: "#" },
        { label: "Financing", href: "#" },
        { label: "Personal Setup", href: "#" },
      ],
    },
    {
      title: "More from iPad",
      links: [
        { label: "iPad Support", href: "#" },
        { label: "AppleCare", href: "#" },
        { label: "iPadOS 26", href: "#" },
        { label: "Apple Intelligence", href: "#" },
        { label: "Apps by Apple", href: "#" },
        { label: "Apple Creator Studio", href: "#" },
        { label: "iCloud+", href: "#" },
        { label: "Education", href: "#" },
      ],
    },
  ],
  iphone: [
    {
      title: "Explore iPhone",
      links: [
        { label: "Explore All iPhone", href: "/iphone", large: true },
        { label: "iPhone 17 Pro", href: "/iphone/15-pro", large: true },
        { label: "iPhone Air", href: "#", large: true },
        { label: "iPhone 17", href: "/iphone", large: true },
        { label: "iPhone 17e", href: "#", large: true },
        { label: "iPhone 16", href: "#", large: true },
      ],
      footer: [
        { label: "Compare iPhone", href: "#" },
        { label: "Switch from Android", href: "#" },
      ],
    },
    {
      title: "Shop iPhone",
      links: [
        { label: "Shop iPhone", href: "/iphone" },
        { label: "iPhone Accessories", href: "#" },
        { label: "Apple Trade In", href: "#" },
        { label: "Carrier Deals at Apple", href: "#" },
        { label: "Financing", href: "#" },
        { label: "Personal Setup", href: "#" },
      ],
    },
    {
      title: "More from iPhone",
      links: [
        { label: "iPhone Support", href: "#" },
        { label: "AppleCare", href: "#" },
        { label: "iOS 26", href: "#" },
        { label: "Apple Intelligence", href: "#" },
        { label: "Apps by Apple", href: "#" },
        { label: "iPhone Privacy", href: "#" },
        { label: "Better with Mac", href: "#" },
        { label: "iCloud+", href: "#" },
        { label: "Wallet, Pay, Card", href: "#" },
        { label: "Siri", href: "#" },
      ],
    },
  ],
  watch: [
    {
      title: "Explore Watch",
      links: [
        { label: "Explore All Apple Watch", href: "/watch", large: true },
        { label: "Apple Watch Series 11", href: "/watch", large: true },
        { label: "Apple Watch SE 3", href: "/watch", large: true },
        { label: "Apple Watch Ultra 3", href: "/watch", large: true },
        { label: "Apple Watch Nike", href: "#", large: true },
        { label: "Apple Watch Hermès", href: "#", large: true },
      ],
      footer: [
        { label: "Compare Watch", href: "#" },
        { label: "Why Apple Watch", href: "#" },
      ],
    },
    {
      title: "Shop Watch",
      links: [
        { label: "Shop Apple Watch", href: "/watch" },
        { label: "Apple Watch Bands", href: "#" },
        { label: "Apple Watch Accessories", href: "#" },
        { label: "Apple Trade In", href: "#" },
        { label: "Financing", href: "#" },
        { label: "Personal Setup", href: "#" },
      ],
    },
    {
      title: "More from Watch",
      links: [
        { label: "Apple Watch Support", href: "#" },
        { label: "AppleCare", href: "#" },
        { label: "watchOS 26", href: "#" },
        { label: "Apple Watch For Your Kids", href: "#" },
        { label: "Apps by Apple", href: "#" },
        { label: "Apple Fitness+", href: "#" },
        { label: "Education", href: "#" },
      ],
    },
  ],
  vision: [
    {
      title: "Explore Vision",
      links: [{ label: "Explore Apple Vision Pro", href: "#", large: true }],
      footer: [{ label: "Tech Specs", href: "#" }],
    },
    {
      title: "Shop Vision",
      links: [
        { label: "Shop Apple Vision Pro", href: "#" },
        { label: "Apple Vision Pro Accessories", href: "#" },
        { label: "Book a Demo", href: "#" },
        { label: "Financing", href: "#" },
        { label: "Personal Setup", href: "#" },
      ],
    },
    {
      title: "More from Vision",
      links: [
        { label: "Apple Vision Pro Support", href: "#" },
        { label: "AppleCare", href: "#" },
        { label: "visionOS 26", href: "#" },
        { label: "Apple Vision Pro for Enterprise", href: "#" },
      ],
    },
  ],
  airpods: [
    {
      title: "Explore AirPods",
      links: [
        { label: "Explore All AirPods", href: "/airpods", large: true },
        { label: "AirPods 4", href: "/airpods", large: true },
        { label: "AirPods Pro 3", href: "/airpods", large: true },
        { label: "AirPods Max 2", href: "/airpods", large: true },
      ],
      footer: [{ label: "Compare AirPods", href: "#" }],
    },
    {
      title: "Shop AirPods",
      links: [
        { label: "Shop AirPods", href: "/airpods" },
        { label: "AirPods Accessories", href: "#" },
      ],
    },
    {
      title: "More from AirPods",
      links: [
        { label: "AirPods Support", href: "#" },
        { label: "AppleCare", href: "#" },
        { label: "Hearing Health", href: "#" },
        { label: "Apple Music", href: "#" },
        { label: "Apple Fitness+", href: "#" },
      ],
    },
  ],
  tv: [
    {
      title: "Explore TV & Home",
      links: [
        { label: "Explore TV & Home", href: "/tv", large: true },
        { label: "Apple TV 4K", href: "/tv", large: true },
        { label: "HomePod", href: "/tv", large: true },
        { label: "HomePod mini", href: "/tv", large: true },
      ],
    },
    {
      title: "Shop TV & Home",
      links: [
        { label: "Shop Apple TV 4K", href: "/tv" },
        { label: "Shop HomePod", href: "/tv" },
        { label: "Shop HomePod mini", href: "/tv" },
        { label: "Shop Siri Remote", href: "#" },
        { label: "TV & Home Accessories", href: "#" },
      ],
    },
    {
      title: "More from TV & Home",
      links: [
        { label: "Apple TV Support", href: "#" },
        { label: "HomePod Support", href: "#" },
        { label: "AppleCare for Apple TV", href: "#" },
        { label: "AppleCare for HomePod", href: "#" },
        { label: "Apple TV app", href: "#" },
        { label: "Apple TV", href: "/tv" },
        { label: "Home app", href: "#" },
        { label: "Apple Music", href: "#" },
        { label: "Siri", href: "#" },
        { label: "AirPlay", href: "#" },
      ],
    },
  ],
  entertainment: [
    {
      title: "Explore Entertainment",
      links: [
        { label: "Explore Entertainment", href: "#", large: true },
        { label: "Apple One", href: "#", large: true },
        { label: "Apple TV", href: "/tv", large: true },
        { label: "Apple Music", href: "#", large: true },
        { label: "Apple Arcade", href: "#", large: true },
        { label: "Apple Fitness+", href: "#", large: true },
        { label: "Apple News+", href: "#", large: true },
        { label: "Apple Podcasts", href: "#", large: true },
        { label: "Apple Books", href: "#", large: true },
        { label: "App Store", href: "#", large: true },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Apple TV Support", href: "#" },
        { label: "Apple Music Support", href: "#" },
      ],
    },
  ],
  accessories: [
    {
      title: "Shop Accessories",
      links: [
        { label: "Shop All Accessories", href: "#", large: true },
        { label: "Mac", href: "/mac", large: true },
        { label: "iPad", href: "/ipad", large: true },
        { label: "iPhone", href: "/iphone", large: true },
        { label: "Apple Watch", href: "/watch", large: true },
        { label: "Apple Vision Pro", href: "#", large: true },
        { label: "AirPods", href: "/airpods", large: true },
        { label: "TV & Home", href: "/tv", large: true },
      ],
    },
    {
      title: "Explore Accessories",
      links: [
        { label: "Made by Apple", href: "#" },
        { label: "Beats", href: "#" },
        { label: "AirTag", href: "#" },
        { label: "Assistive Technologies", href: "#" },
      ],
    },
  ],
  support: [
    {
      title: "Explore Support",
      links: [
        { label: "iPhone", href: "/support", large: true },
        { label: "Mac", href: "/support", large: true },
        { label: "iPad", href: "/support", large: true },
        { label: "Watch", href: "/support", large: true },
        { label: "Apple Vision Pro", href: "/support", large: true },
        { label: "AirPods", href: "/support", large: true },
        { label: "Music", href: "/support", large: true },
        { label: "TV", href: "/support", large: true },
      ],
      footer: [{ label: "Explore Support", href: "/support" }],
    },
    {
      title: "Get Help",
      links: [
        { label: "Community", href: "#" },
        { label: "Check Coverage", href: "#" },
        { label: "Genius Bar", href: "#" },
        { label: "Repair", href: "#" },
      ],
    },
    {
      title: "Helpful Topics",
      links: [
        { label: "Get AppleCare", href: "#" },
        { label: "Apple Account and Password", href: "#" },
        { label: "Billing & Subscriptions", href: "#" },
        { label: "Accessibility", href: "#" },
      ],
    },
  ],
};

const SEARCH_QUICK_LINKS: MenuLink[] = [
  { label: "Find a Store", href: "#" },
  { label: "Apple Vision Pro", href: "#" },
  { label: "AirPods", href: "/airpods" },
  { label: "Apple Intelligence", href: "#" },
  { label: "Apple Trade In", href: "#" },
];

export default function NavBar() {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = (key: string) => setActive(key);
  const close = () => setActive(null);

  return (
    <header
      className="sticky top-0 z-50 nav-blur-dark text-white relative"
      onMouseLeave={close}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex h-11 max-w-appleWide items-center justify-between px-4 text-[12px]"
      >
        <Link
          href="/"
          aria-label="Apple"
          className="flex h-full items-center px-2 opacity-90 hover:opacity-100"
          onMouseEnter={close}
        >
          <AppleLogo />
        </Link>

        <ul className="hidden flex-1 items-center justify-center gap-9 lg:flex">
          {NAV.map((item) => (
            <li
              key={item.label}
              onMouseEnter={() => open(item.menu)}
              className="flex h-11 items-center"
            >
              <Link
                href={item.href}
                className={`opacity-80 transition-opacity hover:opacity-100 ${
                  active === item.menu ? "opacity-100" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <button
            type="button"
            aria-label="Search"
            onMouseEnter={() => open("search")}
            onClick={() => (active === "search" ? close() : open("search"))}
            className="opacity-80 hover:opacity-100"
          >
            <SearchIcon />
          </button>
          <button type="button" aria-label="Bag" className="opacity-80 hover:opacity-100">
            <BagIcon />
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen ? "true" : "false"}
            className="px-1 lg:hidden"
          >
            <span className="block h-px w-5 bg-white" />
            <span className="mt-1 block h-px w-5 bg-white" />
          </button>
        </div>
      </nav>

      {/* Mega-menu panels */}
      {active && active !== "search" && MENUS[active] && (
        <MegaPanel columns={MENUS[active]} />
      )}
      {active === "search" && <SearchPanel />}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur">
          <ul className="mx-auto max-w-appleWide divide-y divide-white/10 px-6">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-base text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function MegaPanel({ columns }: { columns: MenuColumn[] }) {
  return (
    <div className="absolute inset-x-0 top-11 hidden border-t border-white/5 bg-black/95 backdrop-blur-md lg:block menu-in">
      <div className="mx-auto max-w-appleWide px-12 pt-10 pb-16">
        <div className="flex flex-wrap gap-x-24 gap-y-10">
          {columns.map((col, idx) => (
            <div key={col.title + idx} className="min-w-[180px]">
              <p className="mega-heading">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l, i) => (
                  <li key={l.label + i}>
                    <Link
                      href={l.href}
                      className={l.large ? "mega-link-large" : "mega-link-small"}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {col.footer && col.footer.length > 0 && (
                <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
                  {col.footer.map((l, i) => (
                    <li key={l.label + i}>
                      <Link href={l.href} className="mega-link-footer">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchPanel() {
  return (
    <div className="absolute inset-x-0 top-11 border-t border-white/5 bg-black/95 backdrop-blur-md menu-in">
      <div className="mx-auto max-w-appleWide px-6 pt-8 pb-12 md:px-12 md:pt-10 md:pb-16">
        <label className="flex items-center gap-4 border-b border-white/15 pb-3">
          <SearchIcon big />
          <input
            type="search"
            autoFocus
            placeholder="Search apple.com"
            aria-label="Search apple.com"
            className="w-full bg-transparent text-2xl text-white outline-none placeholder:text-white/60"
          />
        </label>
        <div className="mt-10">
          <p className="mega-heading">Quick Links</p>
          <ul className="space-y-3">
            {SEARCH_QUICK_LINKS.map((l) => (
              <li key={l.label} className="flex items-center gap-2">
                <span className="text-appleBlue" aria-hidden="true">
                  →
                </span>
                <Link href={l.href} className="mega-link-small">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 14 44" width="14" height="44" aria-hidden="true" fill="currentColor">
      <path d="M13.0729 17.6825a3.61 3.61 0 0 0-1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1-1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.6125-.63c-1.2179 0-1.6493.6507-2.6408.6507s-1.6852-.9089-2.4787-2.0243a9.7842 9.7842 0 0 1-1.6493-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.6299 0 1.6118-.7333 2.8093-.7333a3.7579 3.7579 0 0 1 3.1532 1.5802zm-3.7284-2.8927a3.5615 3.5615 0 0 0 .8489-2.22 1.5353 1.5353 0 0 0-.031-.32 3.5159 3.5159 0 0 0-2.3098 1.1879 3.4124 3.4124 0 0 0-.8799 2.1585 1.419 1.419 0 0 0 .031.2892 1.19 1.19 0 0 0 .2169.0207 3.0501 3.0501 0 0 0 2.1239-1.1163z" />
    </svg>
  );
}

function SearchIcon({ big = false }: { big?: boolean }) {
  const s = big ? 24 : 14;
  return (
    <svg width={s} height={s} viewBox="0 0 14 44" fill="currentColor" aria-hidden="true">
      <path d="M14.298 27.202l-3.87-3.87a6.92 6.92 0 1 0-.701.701l3.87 3.87a.5.5 0 0 0 .701-.701zM7.49 23.55a6 6 0 1 1 6-6 6 6 0 0 1-6 6z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 44" fill="currentColor" aria-hidden="true">
      <path d="M11.3535 16.0283H9.9658C9.8252 14.0635 8.34375 12.7256 6.43359 12.7256s-3.39160 1.337-3.53215 3.3027H1.5039A.4961.4961 0 0 0 1.0078 16.5244V28.9551A1.6 1.6 0 0 0 2.6 30.5547H10.2598a1.6 1.6 0 0 0 1.6-1.5996V16.5244a.4961.4961 0 0 0-.5063-.4961zm-4.92-2.3076a2.5859 2.5859 0 0 1 2.583 2.3076H3.84A2.5762 2.5762 0 0 1 6.4336 13.7207zm4.43 15.2275a.602.602 0 0 1-.6.6H2.6A.602.602 0 0 1 2 28.9482V17.0205h1.4316v1.957a.5.5 0 1 0 1 0V17.0205H8.873v1.957a.5.5 0 0 0 1 0V17.0205h.99z" />
    </svg>
  );
}
