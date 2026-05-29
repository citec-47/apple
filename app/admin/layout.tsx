import Link from "next/link";
import { auth } from "@/lib/auth";
import { logoutAction } from "./actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-appleGray-50">
      {/* Admin top bar — only when logged in */}
      {session?.user && (
        <header className="border-b border-appleGray-200 bg-white">
          <div className="mx-auto flex max-w-appleWide items-center justify-between px-6 py-4">
            <div className="flex items-center gap-6">
              <Link href="/admin" className="text-base font-semibold text-appleGray-900">
                Apple Storefront Admin
              </Link>
              <nav className="hidden items-center gap-5 text-sm text-appleGray-700 md:flex">
                <Link href="/admin" className="hover:text-appleGray-900">Dashboard</Link>
                <Link href="/admin#products" className="hover:text-appleGray-900">Products</Link>
                <Link href="/admin#media" className="hover:text-appleGray-900">Media</Link>
                <Link href="/admin#users" className="hover:text-appleGray-900">Users</Link>
              </nav>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="hidden text-appleGray-700 sm:inline">
                {session.user.email}
              </span>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-full border border-appleGray-300 px-4 py-1.5 text-sm font-medium text-appleGray-900 hover:bg-appleGray-100"
                >
                  Log out
                </button>
              </form>
            </div>
          </div>
        </header>
      )}
      <main>{children}</main>
    </div>
  );
}
