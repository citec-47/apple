import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { orders, orderItems } from "@/db/schema";
import { formatMoney } from "@/lib/money";

export const dynamic = "force-dynamic";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const order = await db.query.orders.findFirst({
    where: eq(orders.orderNumber, number),
  });
  if (!order) notFound();

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-appleWide px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-6 text-4xl font-semibold text-appleGray-900">Thanks for your order!</h1>
          <p className="mt-3 text-lg text-appleGray-700">
            Order <span className="font-mono font-semibold">{order.orderNumber}</span> has been
            received. We&apos;ll email <span className="font-medium">{order.customerEmail}</span>{" "}
            with shipping updates and a payment link.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-appleGray-100 p-8">
          <h2 className="text-lg font-semibold text-appleGray-900">Order summary</h2>
          <ul className="mt-4 divide-y divide-appleGray-300">
            {items.map((it) => (
              <li key={it.id} className="flex items-start justify-between gap-4 py-4">
                <div>
                  <p className="font-medium text-appleGray-900">{it.productName}</p>
                  <p className="mt-1 text-xs text-appleGray-700">
                    {Object.values(it.configuration as Record<string, string>).join(" · ")}
                  </p>
                  <p className="mt-1 text-xs text-appleGray-700">Qty {it.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-appleGray-900">
                  {formatMoney(it.unitPriceCents * it.quantity)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between border-t border-appleGray-300 pt-4 text-base">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">{formatMoney(order.totalCents)}</span>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl bg-white p-8 ring-1 ring-appleGray-200">
          <h3 className="font-semibold text-appleGray-900">Shipping to</h3>
          <address className="mt-2 not-italic text-sm text-appleGray-700">
            {order.customerName}<br />
            {order.shippingAddress.line1}<br />
            {order.shippingAddress.line2 && <>{order.shippingAddress.line2}<br /></>}
            {order.shippingAddress.city}, {order.shippingAddress.state ?? ""} {order.shippingAddress.postalCode}<br />
            {order.shippingAddress.country}
          </address>
        </div>

        <div className="mt-10 text-center">
          <Link href="/" className="btn-pill btn-pill-primary">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
