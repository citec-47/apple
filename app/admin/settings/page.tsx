import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function SettingsPage() {
  const session = await auth();
  const email = session?.user?.email ?? "";
  const role = session?.user?.role ?? "editor";
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "(not set)";
  const hasSignupToken = !!process.env.ADMIN_SIGNUP_TOKEN;
  const dbUrl = process.env.DATABASE_URL ?? "";
  const dbHost = dbUrl ? new URL(dbUrl.replace("postgresql://", "https://")).hostname : "(not set)";

  return (
    <div className="mx-auto max-w-appleWide px-6 py-12">
      <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">
        Settings
      </p>
      <h1 className="mt-1 text-3xl font-semibold text-appleGray-900">Settings</h1>
      <p className="mt-2 text-appleGray-700">
        Your account, the connected services, and the dashboard configuration.
      </p>

      {hasSignupToken && (
        <div className="mt-8 rounded-2xl border border-orange-300 bg-orange-50 p-5">
          <div className="flex items-start gap-3">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0 text-orange-600" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <div>
              <p className="font-semibold text-orange-900">Signup is still open</p>
              <p className="mt-1 text-sm text-orange-800">
                The <code className="rounded bg-white px-1 text-xs">ADMIN_SIGNUP_TOKEN</code> env
                var is still set. Delete it from <code>.env.local</code> to lock the signup route.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Account card */}
      <section className="mt-8 rounded-2xl bg-white ring-1 ring-appleGray-200">
        <div className="border-b border-appleGray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-appleGray-900">Account</h2>
        </div>
        <dl className="divide-y divide-appleGray-200">
          <Row label="Email" value={email} />
          <Row label="Role" value={role} />
          <Row label="Password" value="Set during signup">
            <span className="text-xs text-appleGray-500">Change-password form coming soon</span>
          </Row>
        </dl>
      </section>

      {/* Services card */}
      <section className="mt-6 rounded-2xl bg-white ring-1 ring-appleGray-200">
        <div className="border-b border-appleGray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-appleGray-900">Connected services</h2>
        </div>
        <dl className="divide-y divide-appleGray-200">
          <Row label="Database">
            <span className="font-mono text-xs text-appleGray-900">{dbHost}</span>
            <Link href="https://console.neon.tech" target="_blank" className="ml-3 text-xs text-appleBlue hover:underline">
              Open Neon ↗
            </Link>
          </Row>
          <Row label="Cloudinary">
            <span className="font-mono text-xs text-appleGray-900">{cloud}</span>
            <Link href="https://cloudinary.com/console" target="_blank" className="ml-3 text-xs text-appleBlue hover:underline">
              Open Cloudinary ↗
            </Link>
          </Row>
          <Row label="Authentication">
            <span className="text-xs text-appleGray-900">NextAuth v5 · Credentials · JWT session</span>
          </Row>
        </dl>
      </section>

      {/* Danger zone */}
      <section className="mt-6 rounded-2xl bg-white ring-1 ring-red-200">
        <div className="border-b border-red-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-red-700">Danger zone</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-appleGray-900">Sign out of all sessions</p>
              <p className="text-xs text-appleGray-700">
                Invalidates JWTs on every device. You will need to sign in again.
              </p>
            </div>
            <button
              type="button"
              disabled
              className="rounded-lg border border-appleGray-300 px-3 py-1.5 text-sm font-medium text-appleGray-900 opacity-60"
            >
              Coming soon
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Row({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-appleGray-500">{label}</dt>
      <dd className="sm:col-span-2 text-sm text-appleGray-900">
        {value && <span>{value}</span>}
        {children}
      </dd>
    </div>
  );
}
