import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const path = nextUrl.pathname;

  // Public admin sub-routes — always allowed
  const isPublic =
    path === "/admin/login" || path === "/admin/signup" || path.startsWith("/api/auth");

  if (!isPublic && path.startsWith("/admin") && !isLoggedIn) {
    const url = new URL("/admin/login", nextUrl.origin);
    url.searchParams.set("from", path);
    return NextResponse.redirect(url);
  }

  // If logged in and visiting login, bounce to dashboard
  if (isLoggedIn && path === "/admin/login") {
    return NextResponse.redirect(new URL("/admin", nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
