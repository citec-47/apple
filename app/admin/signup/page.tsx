"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { signupAction } from "../actions";

export default function SignupPage() {
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const [state, formAction, pending] = useActionState(signupAction, {});

  return (
    <div className="flex min-h-screen items-center justify-center bg-appleGray-100 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-sm">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">
            One-time setup
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-appleGray-900">
            Create the first admin
          </h1>
          <p className="mt-2 text-sm text-appleGray-700">
            This route only works once. Delete{" "}
            <code className="rounded bg-appleGray-100 px-1.5 py-0.5 text-xs">ADMIN_SIGNUP_TOKEN</code>{" "}
            from your env after you submit.
          </p>
        </div>

        <form action={formAction} className="mt-8 space-y-4">
          <input type="hidden" name="token" value={token} />

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-appleGray-900">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full rounded-lg border border-appleGray-300 px-4 py-2.5 text-base focus:border-appleBlue focus:outline-none focus:ring-2 focus:ring-appleBlue/30"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-appleGray-900">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              className="mt-1 block w-full rounded-lg border border-appleGray-300 px-4 py-2.5 text-base focus:border-appleBlue focus:outline-none focus:ring-2 focus:ring-appleBlue/30"
            />
            <p className="mt-1 text-xs text-appleGray-500">At least 8 characters.</p>
          </div>

          {!token && (
            <p role="alert" className="text-sm text-orange-600">
              No signup token present in the URL. Add <code>?token=...</code> to continue.
            </p>
          )}

          {state.error && (
            <p role="alert" className="text-sm text-red-600">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending || !token}
            className="w-full rounded-full bg-appleBlue py-2.5 text-base font-medium text-white transition-colors hover:bg-[#0077ed] disabled:opacity-60"
          >
            {pending ? "Creating account…" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
