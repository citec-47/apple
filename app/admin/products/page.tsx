import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db/client";
import { products } from "@/db/schema";
import { formatMoney } from "@/lib/money";
import { toggleProductActiveAction, deleteProductAction } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const list = await db.select().from(products).orderBy(desc(products.createdAt));

  return (
    <div className="mx-auto max-w-appleWide px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">Products</p>
          <h1 className="mt-1 text-3xl font-semibold text-appleGray-900">All products</h1>
          <p className="mt-2 text-appleGray-700">
            Click any product to edit it, toggle visibility, or delete. New products appear in the
            public shop instantly.
          </p>
        </div>
        <Link href="/admin/products/new" className="rounded-full bg-appleBlue px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0077ed]">
          + Add product
        </Link>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl bg-white ring-1 ring-appleGray-200">
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
                  No products yet. Click <strong>+ Add product</strong> to create one.
                </td>
              </tr>
            ) : (
              list.map((p) => (
                <tr key={p.id} className="hover:bg-appleGray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {p.heroImage && (
                        <span className="hidden h-10 w-10 overflow-hidden rounded-lg bg-appleGray-100 sm:block">
                          <img src={p.heroImage} alt="" className="h-full w-full object-contain" />
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
    </div>
  );
}
