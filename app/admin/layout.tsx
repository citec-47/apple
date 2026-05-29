import { auth } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";
import { logoutAction } from "./actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Public auth routes (login/signup) render bare — no sidebar.
  if (!session?.user) {
    return <div className="min-h-screen bg-appleGray-50">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-appleGray-50">
      <AdminSidebar
        email={session.user.email}
        role={session.user.role}
        logoutAction={logoutAction}
      />
      <div className="lg:pl-64">
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}
