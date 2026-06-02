import Link from "next/link";
import { desc, eq, sql, count } from "drizzle-orm";
import { db } from "@/db/client";
import { orders, orderItems } from "@/db/schema";
import { formatMoney } from "@/lib/money";
import { updateOrderStatusAction } from "@/lib/orders";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  pending_payment: "bg-yellow-100 text-yellow-800",
  paid: "bg-blue-100 text-blue-800",
  fulfilled: "bg-green-100 text-green-800",
  cancelled: "bg-appleGray-200 text-appleGray-700",
  refunded: "bg-red-100 text-red-800",
};

export default async function OrdersPage() {
  const all = await db.select().from(orders).orderBy(desc(orders.createdAt));

  const stats = await db.execute<{ status: string; n: number; total: number }>(sql`
    SELECT status, count(*)::int AS n, sum(total_cents)::bigint AS total
    FROM orders GROUP BY status;
  `);

  const totalRevenue = (stats.rows ?? []).reduce(
    (sum, r) => sum + Number(r.total ?? 0),
    0
  );
  const pendingCount = (stats.rows ?? []).find((r) => r.status === "pending_payment")?.n ?? 0;
  const fulfilledCount = (stats.rows ?? []).find((r) => r.status === "fulfilled")?.n ?? 0;

  const itemsByOrder = await db
    .select({ orderId: orderItems.orderId, c: count() })
    .from(orderItems)
    .groupBy(orderItems.orderId);
  const itemCount = new Map(itemsByOrder.map((r) => [r.orderId, Number(r.c)]));

  return (
    <div className="mx-auto max-w-appleWide px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">Orders</p>
          <h1 className="mt-1 text-3xl font-semibold text-appleGray-900">Customer orders</h1>
          <p className="mt-2 text-appleGray-700">Live data from Neon. Update status from each row.</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Pending payment" value={pendingCount.toString()} tone="bg-yellow-100 text-yellow-800" />
        <StatCard label="Fulfilled" value={fulfilledCount.toString()} tone="bg-green-100 text-green-800" />
        <StatCard label="Total revenue" value={formatMoney(totalRevenue)} tone="bg-appleBlue/10 text-appleBlue" />
      </div>

      {all.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-appleGray-300 bg-white p-12 text-center">
          <p className="text-appleGray-700">No orders yet. They&apos;ll appear here in real time as customers check out.</p>
        </div>
      ) : (
        <div className="mt-10 overflow-hidden rounded-2xl bg-white ring-1 ring-appleGray-200">
          <table className="w-full text-sm">
            <thead className="bg-appleGray-100 text-left text-xs uppercase tracking-widest text-appleGray-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Order</th>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Items</th>
                <th className="px-5 py-3 font-semibold">Total</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Placed</th>
                <th className="px-5 py-3 font-semibold text-right">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-appleGray-200">
              {all.map((o) => (
                <tr key={o.id} className="hover:bg-appleGray-50">
                  <td className="px-5 py-4">
                    <Link href={`/admin/orders/${o.id}`} className="font-mono text-xs font-semibold text-appleBlue hover:underline">
                      {o.orderNumber}
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-appleGray-900">{o.customerName}</p>
                      <p className="text-xs text-appleGray-700">{o.customerEmail}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Link href={`/admin/orders/${o.id}`} className="text-appleBlue hover:underline">
                      {itemCount.get(o.id) ?? 0} {(itemCount.get(o.id) ?? 0) === 1 ? "item" : "items"} →
                    </Link>
                  </td>
                  <td className="px-5 py-4 font-semibold">{formatMoney(o.totalCents)}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[o.status] ?? "bg-appleGray-200 text-appleGray-700"}`}>
                      {o.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-appleGray-700">
                    {new Date(o.createdAt).toLocaleString()}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <form action={updateOrderStatusAction} className="inline-flex items-center gap-2">
                      <input type="hidden" name="id" value={o.id} />
                      <select
                        name="status"
                        defaultValue={o.status}
                        className="rounded-lg border border-appleGray-300 bg-white px-2 py-1 text-xs"
                      >
                        <option value="pending_payment">Pending payment</option>
                        <option value="paid">Paid</option>
                        <option value="fulfilled">Fulfilled</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="refunded">Refunded</option>
                      </select>
                      <button type="submit" className="rounded-lg border border-appleGray-300 px-3 py-1 text-xs font-medium hover:bg-appleGray-100">
                        Save
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-appleGray-200">
      <p className="text-xs font-semibold uppercase tracking-widest text-appleGray-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-appleGray-900">{value}</p>
      <span className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${tone}`}>live count</span>
    </div>
  );
}
