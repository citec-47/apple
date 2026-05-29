import Link from "next/link";
import { notFound } from "next/navigation";
import { eq, and, desc } from "drizzle-orm";
import { db } from "@/db/client";
import { products } from "@/db/schema";
import { BRAND, CATEGORIES } from "@/lib/brand";
import { formatMoney } from "@/lib/money";
import HotlinkImage from "@/components/HotlinkImage";
import { img } from "@/lib/img";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();

  const list = await db
    .select()
    .from(products)
    .where(and(eq(products.category, cat.slug), eq(products.isActive, true)))
    .orderBy(desc(products.createdAt));

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden text-white" style={{ backgroundColor: cat.accent }}>
        <div className="mx-auto max-w-appleWide px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
            {BRAND.name} · {cat.label}
          </p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-6xl">{cat.label}</h1>
          <p className="mt-3 max-w-xl text-lg text-white/90">{cat.tagline}</p>
        </div>
      </section>

      <section className="bg-appleGray-100 py-12">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="flex items-end justify-between">
            <p className="text-sm text-appleGray-700">
              {list.length} product{list.length === 1 ? "" : "s"} in {cat.label.toLowerCase()}.
            </p>
            <Link href="/search" className="text-sm font-medium text-[#5b8def] hover:underline">
              ← Back to search
            </Link>
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
                      fallback={img(400, 400, p.name, "light")}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4 flex flex-1 flex-col">
                    <h3 className="text-base font-semibold text-appleGray-900">{p.name}</h3>
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
