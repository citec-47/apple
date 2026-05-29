"use client";

import Link from "next/link";
import { useState } from "react";

type TabKey = "product" | "category";

const BY_PRODUCT = [
  { name: "Mac Accessories", count: "210+", bg: "#e8e2f4" },
  { name: "iPad Accessories", count: "180+", bg: "#d6f0ff" },
  { name: "iPhone Accessories", count: "260+", bg: "#ffe3d6" },
  { name: "Apple Watch Bands", count: "120+", bg: "#d4f0d6" },
  { name: "AirPods Accessories", count: "60+", bg: "#f7e8cf" },
  { name: "Vision Pro Accessories", count: "20+", bg: "#1d1d1f", dark: true },
];

const BY_CATEGORY = [
  { name: "Cases & Protection", count: "320+", bg: "#ffe3d6" },
  { name: "Charging Essentials", count: "150+", bg: "#d6f0ff" },
  { name: "Headphones & Speakers", count: "90+", bg: "#1d1d1f", dark: true },
  { name: "Photography", count: "65+", bg: "#f7e8cf" },
  { name: "MagSafe", count: "85+", bg: "#e892b5" },
  { name: "Smart Home", count: "70+", bg: "#d4f0d6" },
  { name: "Mice & Keyboards", count: "45+", bg: "#e8e2f4" },
  { name: "Storage", count: "55+", bg: "#bce4ff" },
];

export default function AccessoryBrowser() {
  const [tab, setTab] = useState<TabKey>("product");
  const items = tab === "product" ? BY_PRODUCT : BY_CATEGORY;

  return (
    <section className="section-light py-16">
      <div className="mx-auto max-w-appleWide px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-appleGray-900 reveal">
            Find a product.
          </h2>
          <div className="flex gap-2 rounded-full bg-appleGray-100 p-1">
            <button
              type="button"
              onClick={() => setTab("product")}
              aria-pressed={tab === "product"}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                tab === "product"
                  ? "bg-appleGray-900 text-white"
                  : "text-appleGray-900 hover:bg-appleGray-200"
              }`}
            >
              Browse by Product
            </button>
            <button
              type="button"
              onClick={() => setTab("category")}
              aria-pressed={tab === "category"}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                tab === "category"
                  ? "bg-appleGray-900 text-white"
                  : "text-appleGray-900 hover:bg-appleGray-200"
              }`}
            >
              Browse by Category
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, i) => (
            <Link
              key={item.name}
              href="#"
              className={`group relative flex aspect-square flex-col justify-between overflow-hidden rounded-2xl p-6 hover-lift parallax-up delay-${(i % 4) + 1}`}
              style={{ backgroundColor: item.bg }}
            >
              <div className={item.dark ? "text-white" : "text-appleGray-900"}>
                <p className="text-xs font-semibold uppercase tracking-widest opacity-70">
                  {item.count} items
                </p>
                <h3 className="mt-2 text-xl font-semibold leading-tight">
                  {item.name}
                </h3>
              </div>
              <span
                className={`inline-flex items-center gap-1 text-sm font-medium ${
                  item.dark ? "text-white" : "text-appleGray-900"
                }`}
              >
                Shop now ›
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
