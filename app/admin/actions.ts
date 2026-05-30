"use server";

import { redirect } from "next/navigation";
import { eq, sql } from "drizzle-orm";
import { AuthError } from "next-auth";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { hashPassword } from "@/lib/password";
import { signIn, signOut } from "@/lib/auth";

export type ActionResult = { error?: string };

export async function loginAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Email and password are required." };

  try {
    // redirect:false prevents NextAuth from issuing its own redirect (which
    // can resolve to AUTH_URL / localhost). We then redirect manually with
    // Next.js's redirect(), which uses a relative URL the browser resolves
    // against the current origin — so it always lands on the right domain.
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: "Invalid email or password." };
    }
    throw err;
  }
  redirect("/admin");
}

export async function signupAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const token = String(formData.get("token") ?? "");

  const expected = process.env.ADMIN_SIGNUP_TOKEN;
  if (!expected || token !== expected) {
    return { error: "Invalid or missing signup token." };
  }
  if (!email || !password) return { error: "Email and password are required." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  // Allow first signup only if no users exist yet.
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(users);
  if (count > 0) {
    return { error: "Signup is closed. An admin already exists." };
  }

  const passwordHash = await hashPassword(password);
  await db.insert(users).values({
    email,
    passwordHash,
    role: "owner",
  });

  await signIn("credentials", { email, password, redirect: false });
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  // Same pattern: skip NextAuth's redirect, do it ourselves with a
  // relative URL so we land on the current origin.
  await signOut({ redirect: false });
  redirect("/admin/login");
}

export async function inviteEditorAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Email and password are required." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const existing = await db.query.users.findFirst({ where: eq(users.email, email) });
  if (existing) return { error: "A user with that email already exists." };

  await db.insert(users).values({
    email,
    passwordHash: await hashPassword(password),
    role: "editor",
  });
  redirect("/admin");
}
