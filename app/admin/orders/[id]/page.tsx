import Link from "next/link";
import { notFound } from "next/navigation";
import { eq, inArray } from "drizzle-orm";
import { db } from "@/db/client";
import { orders, orderItems, products } from "@/db/schema";
import { formatMoney } from "@/lib/money";
import { updateOrderStatusAction } from "@/lib/orders";
import HotlinkImage from "@/components/HotlinkImage";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  pending_payment: "bg-yellow-100 text-yellow-800",
  paid: "bg-blue-100 text-blue-800",
  fulfilled: "bg-green-100 text-green-800",
  cancelled: "bg-appleGray-200 text-appleGray-700",
  refunded: "bg-red-100 text-red-800",
};

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orderId = Number(id);
  if (!orderId) notFound();

  const order = await db.query.orders.findFirst({ where: eq(orders.id, orderId) });
  if (!order) notFound();

  // Opening the order clears its "new" sign for the admin.
  if (!order.viewedAt) {
    await db.update(orders).set({ viewedAt: new Date() }).where(eq(orders.id, orderId));
  }

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));

  // Look up the live products behind each line so we can show the image and a
  // link to the live product page. Orders store a slug snapshot, so a product
  // could have been removed — fall back gracefully when that happens.
  const slugs = Array.from(new Set(items.map((i) => i.productSlug)));
  const prodRows = slugs.length
    ? await db
        .select({ slug: products.slug, heroImage: products.heroImage, isActive: products.isActive, category: products.category })
        .from(products)
        .where(inArray(products.slug, slugs))
    : [];
  const prodBySlug = new Map(prodRows.map((p) => [p.slug, p]));

  return (
    <div className="mx-auto max-w-appleWide px-6 py-12">
      <Link href="/admin/orders" className="text-sm text-appleBlue hover:underline">
        ← Back to orders
      </Link>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">Order</p>
          <h1 className="mt-1 font-mono text-3xl font-semibold text-appleGray-900">{order.orderNumber}</h1>
          <p className="mt-2 text-appleGray-700">
            Placed {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[order.status] ?? "bg-appleGray-200 text-appleGray-700"}`}>
            {order.status.replace("_", " ")}
          </span>
          <Link
            href={`/order/${order.orderNumber}`}
            target="_blank"
            className="rounded-full border border-appleGray-300 px-4 py-1.5 text-xs font-medium hover:bg-appleGray-100"
          >
            Customer receipt ↗
          </Link>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Line items with product images + live links */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-appleGray-200">
            <div className="border-b border-appleGray-200 px-6 py-4">
              <h2 className="text-base font-semibold text-appleGray-900">
                Products ordered ({items.length})
              </h2>
              <p className="mt-0.5 text-xs text-appleGray-500">
                Click an image or “View live product” to open what the customer ordered.
              </p>
            </div>
            <ul className="divide-y divide-appleGray-200">
              {items.map((it) => {
                const prod = prodBySlug.get(it.productSlug);
                const liveHref = `/shop/buy/${it.productSlug}`;
                const config = Object.values((it.configuration as Record<string, string>) ?? {}).filter(Boolean);
                return (
                  <li key={it.id} className="flex items-start gap-4 px-6 py-5">
                    {prod ? (
                      <Link
                        href={liveHref}
                        target="_blank"
                        title="View live product"
                        className="group relative block h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-appleGray-100 ring-1 ring-appleGray-200"
                      >
                        <HotlinkImage
                          src={prod.heroImage ?? ""}
                          fallback={`https://picsum.photos/seed/${it.productSlug}/200/200`}
                          alt={it.productName}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          loading="lazy"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-xs font-medium text-white opacity-0 transition-opacity group-hover:bg-black/40 group-hover:opacity-100">
                          View ↗
                        </span>
                      </Link>
                    ) : (
                      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-appleGray-100 text-center text-[10px] text-appleGray-500 ring-1 ring-appleGray-200">
                        No longer listed
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-appleGray-900">{it.productName}</p>
                      {config.length > 0 && (
                        <p className="mt-1 text-xs text-appleGray-700">{config.join(" · ")}</p>
                      )}
                      <p className="mt-1 text-xs text-appleGray-500">
                        Qty {it.quantity} · {formatMoney(it.unitPriceCents)} each
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        {prod ? (
                          <Link href={liveHref} target="_blank" className="text-xs font-medium text-appleBlue hover:underline">
                            View live product ↗
                          </Link>
                        ) : (
                          <span className="text-xs text-appleGray-500">Product removed from catalog</span>
                        )}
                        {prod && (
                          <Link
                            href={`/shop/category/${prod.category}`}
                            target="_blank"
                            className="text-xs text-appleGray-500 hover:underline"
                          >
                            in {prod.category}
                          </Link>
                        )}
                      </div>
                    </div>

                    <p className="shrink-0 text-sm font-semibold text-appleGray-900">
                      {formatMoney(it.unitPriceCents * it.quantity)}
                    </p>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center justify-between border-t border-appleGray-200 px-6 py-4">
              <span className="text-sm font-semibold text-appleGray-900">Order total</span>
              <span className="text-lg font-semibold text-appleGray-900">{formatMoney(order.totalCents)}</span>
            </div>
          </div>
        </div>

        {/* Customer + fulfilment */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-6 ring-1 ring-appleGray-200">
            <h3 className="text-sm font-semibold text-appleGray-900">Customer</h3>
            <p className="mt-2 text-sm text-appleGray-900">{order.customerName}</p>
            <p className="text-sm text-appleGray-700">{order.customerEmail}</p>
            {order.customerPhone && <p className="text-sm text-appleGray-700">{order.customerPhone}</p>}
            <h3 className="mt-5 text-sm font-semibold text-appleGray-900">Shipping to</h3>
            <address className="mt-2 not-italic text-sm text-appleGray-700">
              {order.shippingAddress.line1}<br />
              {order.shippingAddress.line2 && <>{order.shippingAddress.line2}<br /></>}
              {order.shippingAddress.city}, {order.shippingAddress.state ?? ""} {order.shippingAddress.postalCode}<br />
              {order.shippingAddress.country}
            </address>
            {order.notes && (
              <>
                <h3 className="mt-5 text-sm font-semibold text-appleGray-900">Notes</h3>
                <p className="mt-2 text-sm text-appleGray-700">{order.notes}</p>
              </>
            )}
          </div>

          <div className="rounded-2xl bg-white p-6 ring-1 ring-appleGray-200">
            <h3 className="text-sm font-semibold text-appleGray-900">Update status</h3>
            <form action={updateOrderStatusAction} className="mt-3 flex items-center gap-2">
              <input type="hidden" name="id" value={order.id} />
              <select
                name="status"
                defaultValue={order.status}
                aria-label="Order status"
                className="flex-1 rounded-lg border border-appleGray-300 bg-white px-3 py-2 text-sm"
              >
                <option value="pending_payment">Pending payment</option>
                <option value="paid">Paid</option>
                <option value="fulfilled">Fulfilled</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
              <button type="submit" className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
