"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "../actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <div className="flex min-h-screen items-center justify-center bg-appleGray-100 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-sm">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-appleBlue text-white">
            <LockIcon />
          </div>
          <h1 className="mt-6 text-2xl font-semibold text-appleGray-900">
            Sign in to Admin
          </h1>
          <p className="mt-2 text-sm text-appleGray-700">
            Use your Apple Storefront admin credentials.
          </p>
        </div>

        <form action={formAction} className="mt-8 space-y-4">
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
              autoComplete="current-password"
              required
              className="mt-1 block w-full rounded-lg border border-appleGray-300 px-4 py-2.5 text-base focus:border-appleBlue focus:outline-none focus:ring-2 focus:ring-appleBlue/30"
            />
          </div>

          {state.error && (
            <p role="alert" className="text-sm text-red-600">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-appleBlue py-2.5 text-base font-medium text-white transition-colors hover:bg-[#0077ed] disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-appleGray-500">
          Trouble signing in?{" "}
          <Link href="/support" className="text-appleBlue hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  );
}
