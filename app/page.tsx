import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { products } from "@/db/schema";
import { BRAND, CATEGORIES } from "@/lib/brand";
import { formatMoney } from "@/lib/money";
import HotlinkImage from "@/components/HotlinkImage";
import { HOMEPAGE_HERO, CATEGORY_HEROES } from "@/lib/hero-images";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await db
    .select()
    .from(products)
    .where(eq(products.isActive, true))
    .orderBy(desc(products.createdAt))
    .limit(8);

  return (
    <div className="bg-white">
      {/* Hero with real product photo background */}
      <section className="relative overflow-hidden bg-[#0a0a1a] text-white">
        <img
          src={HOMEPAGE_HERO}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a]/90 via-[#1a1a3a]/70 to-[#2a1a4a]/80" />
        <div className="relative mx-auto max-w-appleWide px-6 py-20 md:py-32">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
            {BRAND.name} · {BRAND.year}
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              {BRAND.tagline}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            {BRAND.longDescription}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/shop/category/phones"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
            >
              Shop the lineup
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Browse everything
            </Link>
          </div>
        </div>
      </section>

      {/* Category tiles */}
      <section className="bg-appleGray-100 py-16">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="text-2xl font-semibold text-appleGray-900">Shop by category</h2>
          <p className="mt-2 text-appleGray-700">Six categories. Hand-picked devices.</p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-7">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/shop/category/${c.slug}`}
                className="group relative aspect-square overflow-hidden rounded-3xl text-white transition-transform hover:scale-[1.02]"
              >
                <HotlinkImage
                  src={CATEGORY_HEROES[c.slug] ?? ""}
                  fallback={`https://picsum.photos/seed/${c.slug}-tile/600/600`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 mix-blend-multiply opacity-70"
                  style={{ backgroundColor: c.accent }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <p className="text-base font-semibold drop-shadow-lg">{c.label}</p>
                  <div>
                    <p className="text-xs text-white/90 drop-shadow">{c.tagline}</p>
                    <p className="mt-2 text-2xl opacity-90 transition-opacity group-hover:opacity-100">→</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products from DB */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-appleGray-900">Featured this week</h2>
              <p className="mt-2 text-appleGray-700">Live from our shop. Tap to configure.</p>
            </div>
            <Link href="/search" className="hidden text-sm font-medium text-[#5b8def] hover:underline md:inline">
              See all →
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => (
              <Link
                key={p.id}
                href={`/shop/buy/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl bg-appleGray-100 p-5 transition-shadow hover:shadow-lg"
              >
                <div className="aspect-square overflow-hidden rounded-2xl bg-white">
                  <HotlinkImage
                    src={p.heroImage ?? ""}
                    fallback={`https://picsum.photos/seed/${p.slug}/600/600`}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 flex flex-1 flex-col">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#5b8def]">{p.category}</p>
                  <h3 className="mt-1 text-base font-semibold text-appleGray-900">{p.name}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-appleGray-700">{p.tagline ?? ""}</p>
                  <p className="mt-3 text-sm font-semibold text-appleGray-900">From {formatMoney(p.basePriceCents)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value props strip */}
      <section className="bg-appleGray-900 py-14 text-white">
        <div className="mx-auto grid max-w-appleWide grid-cols-1 gap-8 px-6 md:grid-cols-3">
          <div>
            <p className="text-2xl">🚚</p>
            <p className="mt-3 text-sm font-semibold">Free 2-day delivery</p>
            <p className="mt-1 text-xs text-white/70">On every order, no minimum. Same-day in select cities.</p>
          </div>
          <div>
            <p className="text-2xl">↩️</p>
            <p className="mt-3 text-sm font-semibold">30-day returns</p>
            <p className="mt-1 text-xs text-white/70">Change your mind? Send it back, free. No questions.</p>
          </div>
          <div>
            <p className="text-2xl">🔒</p>
            <p className="mt-3 text-sm font-semibold">2-year warranty</p>
            <p className="mt-1 text-xs text-white/70">Every {BRAND.name} device comes with built-in coverage.</p>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-appleGray-900 md:text-5xl">
            Find what you need in seconds.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-appleGray-700">
            Use search to jump straight to a product, a category, or an accessory.
          </p>
          <form action="/search" className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-full border border-appleGray-300 bg-white px-5 py-3 shadow-sm focus-within:border-[#5b8def]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-appleGray-500" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="M21 21l-4-4" />
            </svg>
            <input
              name="q"
              type="search"
              placeholder="Try “phone”, “laptop”, “watch”…"
              className="flex-1 bg-transparent text-base outline-none placeholder:text-appleGray-500"
            />
            <button type="submit" className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white hover:bg-black/80">
              Search
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
