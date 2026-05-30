import Link from "next/link";
import { notFound } from "next/navigation";
import { eq, and, desc, asc, sql } from "drizzle-orm";
import { db } from "@/db/client";
import { products } from "@/db/schema";
import { BRAND, CATEGORIES } from "@/lib/brand";
import { formatMoney } from "@/lib/money";
import HotlinkImage from "@/components/HotlinkImage";
import { CATEGORY_HEROES } from "@/lib/hero-images";

export const dynamic = "force-dynamic";

const PER_PAGE = 36;

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; sort?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();

  const sort = sp.sort ?? "newest";
  const page = Math.max(1, Number(sp.page ?? "1") || 1);
  const offset = (page - 1) * PER_PAGE;

  const orderBy =
    sort === "price-asc"
      ? asc(products.basePriceCents)
      : sort === "price-desc"
      ? desc(products.basePriceCents)
      : sort === "name"
      ? asc(products.name)
      : desc(products.createdAt);

  const where = and(eq(products.category, cat.slug), eq(products.isActive, true));

  const list = await db
    .select()
    .from(products)
    .where(where)
    .orderBy(orderBy)
    .limit(PER_PAGE)
    .offset(offset);

  const [{ n: total }] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(products)
    .where(where);

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  const qsFor = (overrides: Record<string, string>) => {
    const params = new URLSearchParams();
    params.set("sort", sort);
    params.set("page", "1");
    for (const [k, v] of Object.entries(overrides)) params.set(k, v);
    return `?${params.toString()}`;
  };

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden text-white" style={{ backgroundColor: cat.accent }}>
        <HotlinkImage
          src={CATEGORY_HEROES[cat.slug] ?? ""}
          fallback={`https://picsum.photos/seed/${cat.slug}-hero/1600/720`}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          loading="eager"
        />
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{ backgroundColor: cat.accent, opacity: 0.55 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-appleWide px-6 py-20 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/90 drop-shadow">
            {BRAND.name} · {cat.label}
          </p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight drop-shadow-lg md:text-6xl">{cat.label}</h1>
          <p className="mt-3 max-w-xl text-lg text-white/95 drop-shadow">{cat.tagline}</p>
          <p className="mt-4 text-sm text-white/90 drop-shadow">
            {total.toLocaleString()} {total === 1 ? "product" : "products"} available
          </p>
        </div>
      </section>

      <section className="bg-appleGray-100 py-10">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter((c) => c.slug !== slug).map((c) => (
                <Link
                  key={c.slug}
                  href={`/shop/category/${c.slug}`}
                  className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-appleGray-900 ring-1 ring-appleGray-300 hover:ring-[#5b8def]"
                >
                  {c.label}
                </Link>
              ))}
            </div>
            <form action={`/shop/category/${cat.slug}`} className="flex items-center gap-2">
              <label className="text-xs text-appleGray-700">Sort</label>
              <select
                name="sort"
                aria-label="Sort products"
                defaultValue={sort}
                className="rounded-full border border-appleGray-300 bg-white px-3 py-1.5 text-xs"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="name">Name A→Z</option>
              </select>
              <button type="submit" className="rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white">
                Apply
              </button>
            </form>
          </div>

          {list.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-appleGray-300 bg-white p-12 text-center">
              <p className="text-appleGray-700">No products in this category yet. Check back soon.</p>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {list.map((p) => (
                <Link
                  key={p.id}
                  href={`/shop/buy/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-white p-5 transition-shadow hover:shadow-lg"
                >
                  <div className="aspect-square overflow-hidden rounded-2xl bg-appleGray-100">
                    <HotlinkImage
                      src={p.heroImage ?? ""}
                      fallback={`https://picsum.photos/seed/${p.slug}/600/600`}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4 flex flex-1 flex-col">
                    <h3 className="line-clamp-2 text-sm font-semibold text-appleGray-900">{p.name}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-appleGray-700">{p.tagline ?? ""}</p>
                    <p className="mt-3 text-sm font-semibold text-appleGray-900">
                      From {formatMoney(p.basePriceCents)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-between">
              <p className="text-sm text-appleGray-700">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                {page > 1 && (
                  <Link
                    href={qsFor({ page: String(page - 1) })}
                    className="rounded-full bg-white px-5 py-2 text-sm font-medium ring-1 ring-appleGray-300 hover:ring-[#5b8def]"
                  >
                    ← Previous
                  </Link>
                )}
                {page < totalPages && (
                  <Link
                    href={qsFor({ page: String(page + 1) })}
                    className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:bg-black/80"
                  >
                    Next →
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
