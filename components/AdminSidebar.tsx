"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: IconKey;
}

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Products", href: "/admin/products", icon: "box" },
  { label: "Orders", href: "/admin/orders", icon: "receipt" },
  { label: "Visitors", href: "/admin/visitors", icon: "globe" },
  { label: "Media", href: "/admin/media", icon: "image" },
  { label: "Users", href: "/admin/users", icon: "users" },
  { label: "Settings", href: "/admin/settings", icon: "gear" },
];

interface Props {
  email: string;
  role: string;
  logoutAction: () => Promise<void>;
}

export default function AdminSidebar({ email, role, logoutAction }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <header className="flex items-center justify-between border-b border-appleGray-200 bg-white px-4 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="rounded-lg p-2 text-appleGray-900 hover:bg-appleGray-100"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <p className="text-base font-semibold text-appleGray-900">Apple Storefront Admin</p>
        <form action={logoutAction}>
          <button type="submit" aria-label="Log out" className="rounded-lg p-2 text-appleGray-900 hover:bg-appleGray-100">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </button>
        </form>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          role="presentation"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-appleGray-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between border-b border-appleGray-200 px-6 py-5">
          <Link href="/admin" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-appleBlue text-white">
              <svg viewBox="0 0 14 44" width="14" height="18" fill="currentColor" aria-hidden="true">
                <path d="M13.0729 17.6825a3.61 3.61 0 0 0-1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1-1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.6125-.63c-1.2179 0-1.6493.6507-2.6408.6507s-1.6852-.9089-2.4787-2.0243a9.7842 9.7842 0 0 1-1.6493-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.6299 0 1.6118-.7333 2.8093-.7333a3.7579 3.7579 0 0 1 3.1532 1.5802zm-3.7284-2.8927a3.5615 3.5615 0 0 0 .8489-2.22 1.5353 1.5353 0 0 0-.031-.32 3.5159 3.5159 0 0 0-2.3098 1.1879 3.4124 3.4124 0 0 0-.8799 2.1585 1.419 1.419 0 0 0 .031.2892 1.19 1.19 0 0 0 .2169.0207 3.0501 3.0501 0 0 0 2.1239-1.1163z" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight text-appleGray-900">Storefront</p>
              <p className="text-[10px] uppercase tracking-widest text-appleGray-500">Admin</p>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="rounded-lg p-1.5 text-appleGray-700 hover:bg-appleGray-100 lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5">
            {NAV.map((item) => {
              const isActive =
                item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-appleBlue/10 text-appleBlue"
                        : "text-appleGray-700 hover:bg-appleGray-100 hover:text-appleGray-900"
                    }`}
                  >
                    <NavIcon icon={item.icon} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 px-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-appleGray-500">
              Shortcuts
            </p>
            <ul className="mt-2 space-y-0.5">
              <li>
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-appleGray-700 hover:bg-appleGray-100"
                >
                  <NavIcon icon="external" />
                  <span>View site</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Footer — account + logout */}
        <div className="border-t border-appleGray-200 p-4">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-appleGray-200 text-sm font-semibold text-appleGray-900">
              {email.slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-appleGray-900">{email}</p>
              <p className="text-[11px] uppercase tracking-widest text-appleGray-500">{role}</p>
            </div>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-appleGray-300 px-3 py-2 text-sm font-medium text-appleGray-900 hover:bg-appleGray-100"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Log out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}

type IconKey =
  | "dashboard"
  | "box"
  | "image"
  | "receipt"
  | "users"
  | "gear"
  | "external"
  | "database"
  | "globe";

function NavIcon({ icon }: { icon: IconKey }) {
  const props = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (icon) {
    case "dashboard":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="7" height="9" rx="1.5" />
          <rect x="14" y="3" width="7" height="5" rx="1.5" />
          <rect x="14" y="12" width="7" height="9" rx="1.5" />
          <rect x="3" y="16" width="7" height="5" rx="1.5" />
        </svg>
      );
    case "box":
      return (
        <svg {...props}>
          <path d="M3 7l9-4 9 4-9 4-9-4z" />
          <path d="M3 7v10l9 4 9-4V7" />
          <path d="M12 11v10" />
        </svg>
      );
    case "image":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="10" r="2" />
          <path d="M3 18l5-5 4 4 4-4 5 5" />
        </svg>
      );
    case "receipt":
      return (
        <svg {...props}>
          <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="9" y1="12" x2="15" y2="12" />
        </svg>
      );
    case "users":
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "gear":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case "external":
      return (
        <svg {...props}>
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      );
    case "database":
      return (
        <svg {...props}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
        </svg>
      );
    case "globe":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
  }
}
