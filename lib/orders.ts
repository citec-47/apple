"use server";

import { redirect } from "next/navigation";
import { db } from "@/db/client";
import { orders, orderItems, type ShippingAddress } from "@/db/schema";
import type { CartLine } from "./cart";

function makeOrderNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `W${year}${random}`;
}

export interface PlaceOrderInput {
  email: string;
  name: string;
  phone?: string;
  address: ShippingAddress;
  notes?: string;
  cart: CartLine[];
}

export async function placeOrder(input: PlaceOrderInput): Promise<{ orderNumber: string }> {
  if (input.cart.length === 0) throw new Error("Cart is empty.");

  const subtotalCents = input.cart.reduce(
    (sum, l) => sum + l.unitPriceCents * l.quantity,
    0
  );
  const taxCents = 0;
  const shippingCents = 0;
  const totalCents = subtotalCents + taxCents + shippingCents;
  const orderNumber = makeOrderNumber();

  const [order] = await db
    .insert(orders)
    .values({
      orderNumber,
      status: "pending_payment",
      customerEmail: input.email.trim().toLowerCase(),
      customerName: input.name.trim(),
      customerPhone: input.phone?.trim() || null,
      shippingAddress: input.address,
      notes: input.notes?.trim() || null,
      subtotalCents,
      taxCents,
      shippingCents,
      totalCents,
    })
    .returning({ id: orders.id });

  await db.insert(orderItems).values(
    input.cart.map((l) => ({
      orderId: order.id,
      productSlug: l.productSlug,
      productName: l.productName,
      configuration: l.configuration,
      unitPriceCents: l.unitPriceCents,
      quantity: l.quantity,
    }))
  );

  return { orderNumber };
}

export async function updateOrderStatusAction(
  formData: FormData
): Promise<void> {
  const { eq } = await import("drizzle-orm");
  const id = Number(formData.get("id"));
  const status = String(formData.get("status") ?? "");
  if (!id || !["pending_payment", "paid", "fulfilled", "cancelled", "refunded"].includes(status)) {
    return;
  }
  await db
    .update(orders)
    .set({ status, updatedAt: new Date() })
    .where(eq(orders.id, id));
  redirect("/admin/orders");
}
