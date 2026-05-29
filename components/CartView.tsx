"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HotlinkImage from "./HotlinkImage";
import {
  type CartLine,
  cartSubtotal,
  getCart,
  removeFromCart,
  updateQuantity,
} from "@/lib/cart";
import { formatMoney } from "@/lib/money";

export default function CartView() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLines(getCart());
    const handler = () => setLines(getCart());
    window.addEventListener("cart:changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("cart:changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  if (!mounted) {
    return <div className="mx-auto max-w-appleWide px-6 py-20 text-center text-appleGray-700">Loading your bag…</div>;
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-appleWide px-6 py-20 text-center">
        <h1 className="text-4xl font-semibold text-appleGray-900">Your bag is empty.</h1>
        <p className="mt-3 text-appleGray-700">Find something you love.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-base">
          <Link href="/" className="text-appleBlue hover:underline">
            Continue shopping ›
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = cartSubtotal(lines);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="mx-auto max-w-appleWide px-6 py-12">
      <h1 className="text-4xl font-semibold text-appleGray-900">Your bag</h1>
      <p className="mt-2 text-appleGray-700">
        {lines.length} item{lines.length === 1 ? "" : "s"} in your bag.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ul className="divide-y divide-appleGray-200 border-y border-appleGray-200">
            {lines.map((line, idx) => (
              <li key={idx} className="py-6">
                <div className="flex gap-6">
                  <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-appleGray-100 p-3">
                    <HotlinkImage
                      src={line.heroImage ?? ""}
                      fallback={line.heroImage ?? ""}
                      alt={line.productName}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-appleGray-900">{line.productName}</p>
                        <dl className="mt-2 space-y-0.5">
                          {Object.entries(line.configuration).map(([k, v]) => (
                            <div key={k} className="flex gap-2 text-xs text-appleGray-700">
                              <dt className="capitalize">{k}:</dt>
                              <dd>{v}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                      <p className="text-base font-semibold text-appleGray-900">
                        {formatMoney(line.unitPriceCents * line.quantity)}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <label className="flex items-center gap-2 text-sm text-appleGray-700">
                        Quantity
                        <select
                          value={line.quantity}
                          onChange={(e) => updateQuantity(idx, Number(e.target.value))}
                          className="rounded-lg border border-appleGray-300 bg-white px-3 py-1.5 text-sm"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeFromCart(idx)}
                        className="text-sm text-appleBlue hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="rounded-2xl bg-appleGray-100 p-8 lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-lg font-semibold text-appleGray-900">Order summary</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-appleGray-700">Subtotal</dt>
              <dd className="font-medium text-appleGray-900">{formatMoney(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-appleGray-700">Shipping</dt>
              <dd className="font-medium text-appleGray-900">Free</dd>
            </div>
            <div className="flex justify-between border-t border-appleGray-300 pt-3 text-base">
              <dt className="font-semibold text-appleGray-900">Total</dt>
              <dd className="font-semibold text-appleGray-900">{formatMoney(total)}</dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-6 block rounded-full bg-appleBlue px-6 py-3 text-center text-base font-medium text-white hover:bg-[#0077ed]"
          >
            Check Out
          </Link>
          <Link
            href="/"
            className="mt-3 block text-center text-sm text-appleBlue hover:underline"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
