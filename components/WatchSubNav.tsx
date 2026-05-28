"use client";

import Link from "next/link";
import { useRef } from "react";

type IconKey =
  | "series"
  | "se"
  | "ultra"
  | "nike"
  | "hermes"
  | "compare"
  | "bands"
  | "accessories"
  | "fitness"
  | "shop";

interface Item {
  label: string;
  href: string;
  icon: IconKey;
  isNew?: boolean;
}

const ITEMS: Item[] = [
  { label: "Apple Watch Series 11", href: "#", icon: "series" },
  { label: "Apple Watch SE 3", href: "#", icon: "se" },
  { label: "Apple Watch Ultra 3", href: "#", icon: "ultra" },
  { label: "Apple Watch Nike", href: "#", icon: "nike" },
  { label: "Apple Watch Hermès", href: "#", icon: "hermes" },
  { label: "Compare", href: "#", icon: "compare" },
  { label: "Bands", href: "#", icon: "bands", isNew: true },
  { label: "Accessories", href: "#", icon: "accessories" },
  { label: "Apple Fitness+", href: "#", icon: "fitness" },
  { label: "Shop Watch", href: "#", icon: "shop" },
];

export default function WatchSubNav() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollBy = (amount: number) => {
    scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <nav className="border-b border-appleGray-200 bg-white">
      <div className="relative mx-auto max-w-appleWide">
        <div
          ref={scrollerRef}
          className="overflow-x-auto px-6 py-6 scroll-smooth"
        >
          <ul className="flex min-w-max items-start gap-2">
            {ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="group flex w-[110px] flex-col items-center text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center text-appleGray-900 transition-transform group-hover:scale-105">
                    <NavIcon icon={item.icon} />
                  </div>
                  <p className="mt-2 text-[13px] font-medium leading-tight text-appleGray-900">
                    {item.label}
                  </p>
                  {item.isNew && (
                    <p className="mt-0.5 text-[11px] font-semibold text-orange-500">
                      New
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => scrollBy(280)}
          aria-label="Scroll right"
          className="absolute right-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-appleGray-700 shadow-md hover:text-appleGray-900 lg:flex"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

function NavIcon({ icon }: { icon: IconKey }) {
  const props = {
    width: 48,
    height: 48,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (icon) {
    case "series":
    case "se":
      return (
        <svg {...props}>
          <path d="M20 5h8v5h-8z" />
          <path d="M20 38h8v5h-8z" />
          <rect x="15" y="10" width="18" height="28" rx="5" />
          <line x1="33" y1="18" x2="36" y2="18" />
          <line x1="33" y1="22" x2="36" y2="22" />
        </svg>
      );
    case "ultra":
      return (
        <svg {...props}>
          <path d="M19 4h10v6h-10z" />
          <path d="M19 38h10v6h-10z" />
          <rect x="13" y="10" width="22" height="28" rx="3" />
          <rect x="34" y="17" width="3" height="6" />
          <line x1="34" y1="27" x2="37" y2="27" />
        </svg>
      );
    case "nike":
      return (
        <svg {...props}>
          <path d="M20 5h8v5h-8z" />
          <path d="M20 38h8v5h-8z" />
          <rect x="15" y="10" width="18" height="28" rx="5" />
          <circle cx="22" cy="7" r="0.7" fill="currentColor" stroke="none" />
          <circle cx="26" cy="7" r="0.7" fill="currentColor" stroke="none" />
          <circle cx="22" cy="40" r="0.7" fill="currentColor" stroke="none" />
          <circle cx="26" cy="40" r="0.7" fill="currentColor" stroke="none" />
          <path d="M18 24 q5 -4 12 -2" />
        </svg>
      );
    case "hermes":
      return (
        <svg {...props}>
          <path d="M19 5h10v5h-10z" />
          <path d="M21 38c-1 5-3 5-3 5h12s-2 0-3-5z" />
          <rect x="15" y="10" width="18" height="28" rx="5" />
        </svg>
      );
    case "compare":
      return (
        <svg {...props}>
          <path d="M10 9h6v3h-6z" />
          <path d="M10 35h6v3h-6z" />
          <rect x="7" y="12" width="12" height="23" rx="3" />
          <g strokeDasharray="2 2">
            <path d="M32 9h6v3h-6z" />
            <path d="M32 35h6v3h-6z" />
            <rect x="29" y="12" width="12" height="23" rx="3" />
          </g>
        </svg>
      );
    case "bands":
      return (
        <svg {...props}>
          <path d="M20 4h8v40h-8z" />
          <line x1="20" y1="14" x2="28" y2="14" />
          <line x1="20" y1="20" x2="28" y2="20" />
          <line x1="20" y1="26" x2="28" y2="26" />
          <line x1="20" y1="32" x2="28" y2="32" />
        </svg>
      );
    case "accessories":
      return (
        <svg {...props}>
          <circle cx="24" cy="20" r="9" />
          <circle cx="24" cy="20" r="3" />
          <path d="M24 29v9" />
          <circle cx="24" cy="40" r="2" />
        </svg>
      );
    case "fitness":
      return (
        <svg {...props}>
          <circle cx="24" cy="24" r="15" />
          <circle cx="24" cy="24" r="10" />
          <circle cx="24" cy="24" r="5" />
        </svg>
      );
    case "shop":
      return (
        <svg {...props}>
          <path d="M9 9h7v3h-7z" />
          <path d="M9 36h7v3h-7z" />
          <rect x="6" y="12" width="13" height="24" rx="3" />
          <path d="M30 9h7v3h-7z" />
          <path d="M30 36h7v3h-7z" />
          <rect x="27" y="12" width="13" height="24" rx="3" />
        </svg>
      );
  }
}
