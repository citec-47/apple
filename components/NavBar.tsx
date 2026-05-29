"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BRAND, CATEGORIES } from "@/lib/brand";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sync = () => {
      try {
        const raw = window.localStorage.getItem("apple-storefront-cart-v1");
        const arr = raw ? JSON.parse(raw) : [];
        const n = Array.isArray(arr)
          ? arr.reduce((s: number, l: { quantity?: number }) => s + (l.quantity ?? 1), 0)
          : 0;
        setCartCount(n);
      } catch {
        setCartCount(0);
      }
    };
    sync();
    window.addEventListener("cart:changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("cart:changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 50);
  }, [searchOpen]);

  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const q = String(fd.get("q") ?? "").trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black text-white">
      <nav aria-label="Global" className="mx-auto flex h-14 max-w-appleWide items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#5b8def] to-[#7b5fee]">
            <svg width="14" height="14" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M9 22V10h2l8 8.4V10h2v12h-2L11 13.6V22z" fill="#fff" />
            </svg>
          </span>
          {BRAND.name}
        </Link>

        <ul className="hidden flex-1 items-center justify-center gap-7 text-[13px] lg:flex">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link href={`/shop/category/${c.slug}`} className="opacity-80 transition-opacity hover:opacity-100">
                {c.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/support" className="opacity-80 transition-opacity hover:opacity-100">
              Support
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10"
          >
            <SearchIcon />
          </button>
          <Link href="/cart" aria-label={`Cart, ${cartCount} items`} className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10">
            <BagIcon />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#5b8def] px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open ? "true" : "false"}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10 lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {searchOpen && (
        <div className="border-t border-white/10 bg-black px-5 py-4">
          <form onSubmit={submitSearch} className="mx-auto flex max-w-2xl items-center gap-3 rounded-full bg-white/10 px-5 py-3">
            <SearchIcon />
            <input
              ref={searchRef}
              name="q"
              type="search"
              placeholder={`Search ${BRAND.name}…`}
              className="flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/50"
            />
            <button type="submit" className="rounded-full bg-[#5b8def] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#4a7ad8]">
              Search
            </button>
          </form>
        </div>
      )}

      {open && (
        <div className="border-t border-white/10 bg-black lg:hidden">
          <ul className="mx-auto max-w-appleWide divide-y divide-white/10 px-5">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop/category/${c.slug}`} onClick={() => setOpen(false)} className="block py-3 text-base">
                  {c.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/support" onClick={() => setOpen(false)} className="block py-3 text-base">
                Support
              </Link>
            </li>
            <li>
              <Link href="/admin/login" onClick={() => setOpen(false)} className="block py-3 text-base text-white/70">
                Admin sign in
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M21 21l-4-4" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M6 7h12l-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7z" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
