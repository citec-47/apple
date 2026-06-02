import { isNull, count } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db/client";
import { orders } from "@/db/schema";
import AdminSidebar from "@/components/AdminSidebar";
import { logoutAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Public auth routes (login/signup) render bare — no sidebar.
  if (!session?.user) {
    return <div className="min-h-screen bg-appleGray-50">{children}</div>;
  }

  const [{ c: unreadOrders }] = await db
    .select({ c: count() })
    .from(orders)
    .where(isNull(orders.viewedAt));

  return (
    <div className="min-h-screen bg-appleGray-50">
      <AdminSidebar
        email={session.user.email}
        role={session.user.role}
        initialUnreadOrders={Number(unreadOrders)}
        logoutAction={logoutAction}
      />
      <div className="lg:pl-64">
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}
