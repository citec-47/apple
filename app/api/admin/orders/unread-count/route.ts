import { NextResponse } from "next/server";
import { isNull, count } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db/client";
import { orders } from "@/db/schema";

export const dynamic = "force-dynamic";

// Polled by the admin sidebar to drive the "new order" badge + toast.
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const [{ c }] = await db
    .select({ c: count() })
    .from(orders)
    .where(isNull(orders.viewedAt));

  return NextResponse.json(
    { count: Number(c) },
    { headers: { "Cache-Control": "no-store" } }
  );
}
