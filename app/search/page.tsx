import Link from "next/link";
import { ilike, or, eq, and, desc } from "drizzle-orm";
import { db } from "@/db/client";
import { products } from "@/db/schema";
import { BRAND, CATEGORIES } from "@/lib/brand";
import { formatMoney } from "@/lib/money";
import HotlinkImage from "@/components/HotlinkImage";
import { img } from "@/lib/img";

export const dynamic = "force-dynamic";

export const metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q: rawQ } = await searchParams;
  const q = (rawQ ?? "").trim();

  let results = q
    ? await db
        .select()
        .from(products)
        .where(
          and(
            eq(products.isActive, true),
            or(
              ilike(products.name, `%${q}%`),
              ilike(products.tagline, `%${q}%`),
              ilike(products.category, `%${q}%`),
              ilike(products.slug, `%${q}%`)
            )
          )
        )
        .orderBy(desc(products.createdAt))
    : [];

  // When no query, show top picks so the page isn't empty
  if (!q) {
    results = await db
      .select()
      .from(products)
      .where(eq(products.isActive, true))
      .orderBy(desc(products.createdAt))
      .limit(12);
  }

  return (
    <div className="bg-white">
      <section className="bg-appleGray-100 py-12">
        <div className="mx-auto max-w-appleWide px-6">
          <h1 className="text-3xl font-semibold text-appleGray-900">
            {q ? `Results for “${q}”` : "Browse everything"}
          </h1>
          <p className="mt-2 text-appleGray-700">
            {q
              ? `${results.length} matching ${results.length === 1 ? "product" : "products"} on ${BRAND.name}.`
              : `Every product we carry. Filter by category or use search.`}
          </p>

          <form action="/search" className="mt-6 flex max-w-2xl items-center gap-3 rounded-full border border-appleGray-300 bg-white px-5 py-3 shadow-sm focus-within:border-[#5b8def]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-appleGray-500" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="M21 21l-4-4" />
            </svg>
            <input
              name="q"
              type="search"
              defaultValue={q}
              placeholder={`Search ${BRAND.name}…`}
              className="flex-1 bg-transparent text-base outline-none placeholder:text-appleGray-500"
            />
            <button type="submit" className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white hover:bg-black/80">
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/shop/category/${c.slug}`}
                className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-appleGray-900 ring-1 ring-appleGray-300 hover:ring-[#5b8def]"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-appleWide px-6">
          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-appleGray-300 bg-appleGray-100 p-12 text-center">
              <p className="text-3xl">🔍</p>
              <h2 className="mt-3 text-xl font-semibold text-appleGray-900">
                No matches for “{q}”.
              </h2>
              <p className="mt-2 text-sm text-appleGray-700">
                Try a different keyword, or browse a category below.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/shop/category/${c.slug}`}
                    className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-appleGray-900 ring-1 ring-appleGray-300 hover:ring-[#5b8def]"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {results.map((p) => (
                <Link
                  key={p.id}
                  href={`/shop/buy/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-appleGray-100 p-5 transition-shadow hover:shadow-lg"
                >
                  <div className="aspect-square overflow-hidden rounded-2xl bg-white">
                    <HotlinkImage
                      src={p.heroImage ?? ""}
                      fallback={img(400, 400, p.name, "light")}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4 flex flex-1 flex-col">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#5b8def]">
                      {p.category}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-appleGray-900">{p.name}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-appleGray-700">{p.tagline ?? ""}</p>
                    <p className="mt-3 text-sm font-semibold text-appleGray-900">
                      From {formatMoney(p.basePriceCents)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
