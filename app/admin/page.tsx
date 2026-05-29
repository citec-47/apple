import Link from "next/link";
import { sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db/client";
import { users } from "@/db/schema";

export default async function AdminDashboard() {
  const session = await auth();
  const email = session?.user?.email ?? "";
  const role = session?.user?.role ?? "editor";

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(users);

  return (
    <div className="mx-auto max-w-appleWide px-6 py-12">
      <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">
        Dashboard
      </p>
      <h1 className="mt-2 text-4xl font-semibold text-appleGray-900">
        Welcome back, {email}.
      </h1>
      <p className="mt-3 text-appleGray-700">
        Role: <span className="font-medium text-appleGray-900">{role}</span> · Admin users: {count}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <section className="rounded-2xl border border-appleGray-200 bg-white p-6">
          <h2 id="products" className="text-lg font-semibold text-appleGray-900">Products</h2>
          <p className="mt-2 text-sm text-appleGray-700">
            Phase 2 — pull product copy out of the page files into Neon so you can edit titles, taglines and prices here.
          </p>
          <p className="mt-4 text-xs font-medium uppercase tracking-widest text-appleGray-500">
            Coming next
          </p>
        </section>
        <section className="rounded-2xl border border-appleGray-200 bg-white p-6">
          <h2 id="media" className="text-lg font-semibold text-appleGray-900">Media</h2>
          <p className="mt-2 text-sm text-appleGray-700">
            Phase 3 — upload images straight to Cloudinary from this dashboard and reference them on the public pages.
          </p>
          <p className="mt-4 text-xs font-medium uppercase tracking-widest text-appleGray-500">
            Coming next
          </p>
        </section>
        <section className="rounded-2xl border border-appleGray-200 bg-white p-6">
          <h2 id="users" className="text-lg font-semibold text-appleGray-900">Users</h2>
          <p className="mt-2 text-sm text-appleGray-700">
            {role === "owner"
              ? "As an owner you'll be able to invite editors here."
              : "Only owners can invite new users."}
          </p>
          <Link
            href="#"
            className="mt-4 inline-block text-sm text-appleBlue hover:underline"
          >
            Manage users ›
          </Link>
        </section>
      </div>

      <div className="mt-12 rounded-2xl bg-appleGray-100 p-6 text-sm text-appleGray-700">
        <p className="font-semibold text-appleGray-900">Heads up:</p>
        <p className="mt-1">
          If you used a one-time signup token to create your account, remove the
          <code className="mx-1 rounded bg-white px-1.5 py-0.5 text-xs">ADMIN_SIGNUP_TOKEN</code>
          environment variable now so nobody else can open that route.
        </p>
      </div>
    </div>
  );
}
