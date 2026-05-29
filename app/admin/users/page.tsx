import { desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db/client";
import { users } from "@/db/schema";

export default async function UsersPage() {
  const session = await auth();
  const isOwner = session?.user?.role === "owner";

  const list = await db.select().from(users).orderBy(desc(users.createdAt));

  return (
    <div className="mx-auto max-w-appleWide px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">
            Users
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-appleGray-900">Admin team</h1>
          <p className="mt-2 text-appleGray-700">
            Everyone who can sign in to this dashboard. Owners can invite editors.
          </p>
        </div>
        <button
          type="button"
          disabled
          title={isOwner ? "Coming next" : "Only owners can invite editors"}
          className="rounded-full bg-appleBlue px-5 py-2.5 text-sm font-medium text-white opacity-60"
        >
          + Invite editor
        </button>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl bg-white ring-1 ring-appleGray-200">
        <table className="w-full text-sm">
          <thead className="bg-appleGray-100 text-left text-xs uppercase tracking-widest text-appleGray-500">
            <tr>
              <th className="px-6 py-3 font-semibold">Email</th>
              <th className="px-6 py-3 font-semibold">Role</th>
              <th className="px-6 py-3 font-semibold">Joined</th>
              <th className="px-6 py-3 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-appleGray-200">
            {list.map((u) => (
              <tr key={u.id} className="hover:bg-appleGray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-appleGray-200 text-xs font-semibold text-appleGray-900">
                      {u.email.slice(0, 1).toUpperCase()}
                    </div>
                    <span className="font-medium text-appleGray-900">{u.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      u.role === "owner"
                        ? "bg-appleBlue/10 text-appleBlue"
                        : "bg-appleGray-200 text-appleGray-700"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-appleGray-700">
                  {new Date(u.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-2xl bg-appleGray-100 p-4 text-sm text-appleGray-700">
        <p>
          <span className="font-semibold text-appleGray-900">Tip:</span> If you need to add a
          teammate before the invite UI is built, use the terminal:
          <code className="ml-1 rounded bg-white px-1.5 py-0.5 text-xs">
            npm run create-admin -- teammate@example.com TheirPassword123
          </code>
        </p>
      </div>
    </div>
  );
}
