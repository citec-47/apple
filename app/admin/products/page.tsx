import Link from "next/link";
import { desc, ilike, or, eq, and, sql } from "drizzle-orm";
import { db } from "@/db/client";
import { products } from "@/db/schema";
import { formatMoney } from "@/lib/money";
import { toggleProductActiveAction, deleteProductAction } from "@/lib/products";
import { CATEGORIES } from "@/lib/brand";

export const dynamic = "force-dynamic";

const PER_PAGE = 50;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const cat = (sp.cat ?? "").trim();
  const page = Math.max(1, Number(sp.page ?? "1") || 1);
  const offset = (page - 1) * PER_PAGE;

  const filters = [];
  if (q) {
    filters.push(
      or(
        ilike(products.name, `%${q}%`),
        ilike(products.slug, `%${q}%`),
        ilike(products.tagline, `%${q}%`)
      )!
    );
  }
  if (cat) filters.push(eq(products.category, cat));
  const where = filters.length ? and(...filters) : undefined;

  const list = await db
    .select()
    .from(products)
    .where(where)
    .orderBy(desc(products.createdAt))
    .limit(PER_PAGE)
    .offset(offset);

  const [{ n: total }] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(products)
    .where(where);

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const baseQS = (overrides: Record<string, string>) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (cat) params.set("cat", cat);
    params.set("page", "1");
    for (const [k, v] of Object.entries(overrides)) {
      if (v) params.set(k, v);
      else params.delete(k);
    }
    return `?${params.toString()}`;
  };

  return (
    <div className="mx-auto max-w-appleWide px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">Products</p>
          <h1 className="mt-1 text-3xl font-semibold text-appleGray-900">All products</h1>
          <p className="mt-2 text-appleGray-700">
            {total.toLocaleString()} product{total === 1 ? "" : "s"} in the catalog. Click Edit on any row to change the price, name, or options.
          </p>
        </div>
        <Link href="/admin/products/new" className="rounded-full bg-appleBlue px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0077ed]">
          + Add product
        </Link>
      </div>

      <form action="/admin/products" className="mt-6 flex flex-wrap items-center gap-3">
        <input
          name="q"
          type="search"
          defaultValue={q}
          placeholder="Search by name, slug, tagline…"
          className="flex-1 min-w-[240px] rounded-full border border-appleGray-300 bg-white px-5 py-2.5 text-sm outline-none focus:border-appleBlue"
        />
        <select
          name="cat"
          defaultValue={cat}
          className="rounded-full border border-appleGray-300 bg-white px-4 py-2.5 text-sm"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
        <button type="submit" className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-black/80">
          Filter
        </button>
        {(q || cat) && (
          <Link href="/admin/products" className="text-sm text-appleBlue hover:underline">
            Clear
          </Link>
        )}
      </form>

      <div className="mt-6 overflow-hidden rounded-2xl bg-white ring-1 ring-appleGray-200">
        <table className="w-full text-sm">
          <thead className="bg-appleGray-100 text-left text-xs uppercase tracking-widest text-appleGray-500">
            <tr>
              <th className="px-5 py-3 font-semibold">Product</th>
              <th className="px-5 py-3 font-semibold">Category</th>
              <th className="px-5 py-3 font-semibold">From price</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-appleGray-200">
            {list.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-appleGray-700">
                  No products match. Try a different filter or{" "}
                  <Link href="/admin/products" className="text-appleBlue hover:underline">
                    clear filters
                  </Link>
                  .
                </td>
              </tr>
            ) : (
              list.map((p) => (
                <tr key={p.id} className="hover:bg-appleGray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {p.heroImage && (
                        <span className="hidden h-10 w-10 overflow-hidden rounded-lg bg-appleGray-100 sm:block">
                          <img src={p.heroImage} alt="" className="h-full w-full object-cover" />
                        </span>
                      )}
                      <div>
                        <p className="font-medium text-appleGray-900">{p.name}</p>
                        <p className="text-xs text-appleGray-700 font-mono">/shop/buy/{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-appleGray-700 capitalize">{p.category}</td>
                  <td className="px-5 py-4 font-semibold">{formatMoney(p.basePriceCents)}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${p.isActive ? "bg-green-100 text-green-800" : "bg-appleGray-200 text-appleGray-700"}`}>
                      {p.isActive ? "Live" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <Link href={`/admin/products/${p.id}/edit`} className="rounded-lg border border-appleGray-300 px-3 py-1 text-xs font-medium hover:bg-appleGray-100">
                        Edit
                      </Link>
                      <Link href={`/shop/buy/${p.slug}`} target="_blank" className="rounded-lg border border-appleGray-300 px-3 py-1 text-xs font-medium hover:bg-appleGray-100">
                        View
                      </Link>
                      <form action={toggleProductActiveAction} className="inline">
                        <input type="hidden" name="id" value={p.id} />
                        <input type="hidden" name="isActive" value={p.isActive ? "true" : "false"} />
                        <button type="submit" className="rounded-lg border border-appleGray-300 px-3 py-1 text-xs font-medium hover:bg-appleGray-100">
                          {p.isActive ? "Hide" : "Show"}
                        </button>
                      </form>
                      <form action={deleteProductAction} className="inline">
                        <input type="hidden" name="id" value={p.id} />
                        <button type="submit" className="rounded-lg border border-red-300 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-50">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between text-sm text-appleGray-700">
          <p>
            Page {page} of {totalPages} · showing {list.length} of {total.toLocaleString()}
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={baseQS({ page: String(page - 1) })} className="rounded-lg border border-appleGray-300 px-4 py-2 text-sm hover:bg-appleGray-100">
                ← Previous
              </Link>
            )}
            {page < totalPages && (
              <Link href={baseQS({ page: String(page + 1) })} className="rounded-lg border border-appleGray-300 px-4 py-2 text-sm hover:bg-appleGray-100">
                Next →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
