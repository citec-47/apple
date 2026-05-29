"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackVisit } from "@/lib/visitor";

export default function VisitorPing() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    trackVisit(pathname).catch(() => undefined);
  }, [pathname]);

  return null;
}
