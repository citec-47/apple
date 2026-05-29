"use server";

import { headers } from "next/headers";
import { db } from "@/db/client";
import { visitors } from "@/db/schema";

interface GeoLookup {
  country?: string;
  countryName?: string;
  city?: string;
  region?: string;
}

async function geo(ip: string): Promise<GeoLookup | null> {
  if (!ip || ip === "::1" || ip === "127.0.0.1") return null;
  try {
    const res = await fetch(
      `https://ipapi.co/${encodeURIComponent(ip)}/json/`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data: {
      country_code?: string;
      country_name?: string;
      city?: string;
      region?: string;
    } = await res.json();
    return {
      country: data.country_code ?? undefined,
      countryName: data.country_name ?? undefined,
      city: data.city ?? undefined,
      region: data.region ?? undefined,
    };
  } catch {
    return null;
  }
}

export async function trackVisit(path: string): Promise<void> {
  try {
    const h = await headers();
    const ip =
      h.get("x-forwarded-for")?.split(",")[0].trim() ??
      h.get("x-real-ip") ??
      h.get("cf-connecting-ip") ??
      "";
    const userAgent = h.get("user-agent") ?? "";

    // Vercel provides geo headers for free on hosted deploys
    const vercelCountry = h.get("x-vercel-ip-country") ?? undefined;
    const vercelCity = h.get("x-vercel-ip-city")
      ? decodeURIComponent(h.get("x-vercel-ip-city")!)
      : undefined;
    const vercelRegion = h.get("x-vercel-ip-country-region") ?? undefined;

    let country = vercelCountry;
    let countryName: string | undefined;
    let city = vercelCity;
    let region = vercelRegion;

    if (!country && ip) {
      const g = await geo(ip);
      if (g) {
        country = g.country;
        countryName = g.countryName;
        city = g.city;
        region = g.region;
      }
    }

    await db.insert(visitors).values({
      ip: ip || null,
      country: country?.slice(0, 4) || null,
      countryName: countryName || null,
      city: city || null,
      region: region || null,
      path: path.slice(0, 500),
      userAgent: userAgent || null,
    });
  } catch (err) {
    console.error("trackVisit failed:", err);
  }
}
