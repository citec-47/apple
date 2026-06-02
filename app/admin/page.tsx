import Link from "next/link";
import { sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db/client";
import { users, products, orders, visitors } from "@/db/schema";
import { formatMoney } from "@/lib/money";

export const dynamic = "force-dynamic";

function displayNameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  const clean = local.replace(/[._-]+/g, " ").trim();
  if (!clean) return "there";
  return clean
    .split(" ")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

export default async function AdminDashboard() {
  const session = await auth();
  const email = session?.user?.email ?? "";
  const role = session?.user?.role ?? "editor";
  const name = displayNameFromEmail(email);

  const [u] = await db.select({ n: sql<number>`count(*)::int` }).from(users);
  const [p] = await db.select({ n: sql<number>`count(*)::int` }).from(products);
  const [o] = await db.select({
    n: sql<number>`count(*)::int`,
    // Net revenue: refunded and cancelled orders are excluded (money not kept).
    total: sql<number>`coalesce(sum(total_cents) filter (where status not in ('refunded','cancelled')), 0)::bigint`,
  }).from(orders);
  const [v] = await db.select({ n: sql<number>`count(*)::int` }).from(visitors);

  return (
    <div className="mx-auto max-w-appleWide px-6 py-12">
      <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">
        Dashboard
      </p>
      <h1 className="mt-2 text-4xl font-semibold text-appleGray-900">
        Welcome, {name}.
      </h1>
      <p className="mt-3 text-appleGray-700">
        Signed in as <span className="font-medium text-appleGray-900">{email}</span> · role <span className="font-medium text-appleGray-900">{role}</span>
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Products" value={String(p?.n ?? 0)} href="/admin/products" />
        <StatCard label="Orders" value={String(o?.n ?? 0)} href="/admin/orders" />
        <StatCard label="Revenue" value={formatMoney(Number(o?.total ?? 0))} href="/admin/orders" />
        <StatCard label="Visitors" value={String(v?.n ?? 0)} href="/admin/visitors" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        <QuickLink href="/admin/products/new" title="Add a product" body="Create a new product. Appears on the storefront immediately." />
        <QuickLink href="/admin/orders" title="See recent orders" body="Every checkout lands here in real time." />
        <QuickLink href="/admin/visitors" title="Who's visiting" body="Live geo data on every page view." />
      </div>

      <p className="mt-10 text-xs text-appleGray-500">{u?.n ?? 0} admin user{(u?.n ?? 0) === 1 ? "" : "s"} total.</p>
    </div>
  );
}

function StatCard({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <Link href={href} className="rounded-2xl border border-appleGray-200 bg-white p-5 hover:border-appleBlue/50 hover:shadow-sm transition-all">
      <p className="text-xs font-semibold uppercase tracking-widest text-appleGray-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-appleGray-900">{value}</p>
    </Link>
  );
}
function QuickLink({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link href={href} className="rounded-2xl border border-appleGray-200 bg-white p-6 hover:border-appleBlue/50 hover:shadow-sm transition-all">
      <h2 className="text-lg font-semibold text-appleGray-900">{title}</h2>
      <p className="mt-2 text-sm text-appleGray-700">{body}</p>
      <p className="mt-4 text-sm text-appleBlue">Go ›</p>
    </Link>
  );
}
