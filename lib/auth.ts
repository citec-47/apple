import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { verifyPassword } from "./password";

// A localhost AUTH_URL/NEXTAUTH_URL (handy for local dev) would otherwise be
// treated by Auth.js as the canonical site URL in production too — sending
// every post-sign-in redirect to http://localhost:3000. In production we drop
// any localhost value so `trustHost` derives the real URL from the request.
if (process.env.NODE_ENV === "production") {
  for (const key of ["AUTH_URL", "NEXTAUTH_URL"] as const) {
    const value = process.env[key];
    if (value && /localhost|127\.0\.0\.1/.test(value)) {
      delete process.env[key];
    }
  }
}

type Role = "owner" | "editor";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: Role;
    };
  }
  interface User {
    id?: string;
    role?: Role;
  }
}

export const authConfig: NextAuthConfig = {
  // Trust the host header. On Vercel this means NextAuth auto-detects the
  // real production URL from the incoming request, so we don't need
  // AUTH_URL set as an env var. Without this, NextAuth would default to
  // localhost:3000 and every redirect after sign-in would bounce there.
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").trim().toLowerCase();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        const row = await db.query.users.findFirst({
          where: eq(users.email, email),
        });
        if (!row) return null;

        const ok = await verifyPassword(password, row.passwordHash);
        if (!ok) return null;

        return {
          id: String(row.id),
          email: row.email,
          role: row.role as Role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        (token as { role?: Role }).role = (user as { role?: Role }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      const role = (token as { role?: Role }).role;
      if (role) session.user.role = role;
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
