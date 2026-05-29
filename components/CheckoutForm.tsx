"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { type CartLine, cartSubtotal, clearCart, getCart } from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import { placeOrder } from "@/lib/orders";

export default function CheckoutForm() {
  const router = useRouter();
  const [lines, setLines] = useState<CartLine[]>([]);
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setLines(getCart());
  }, []);

  if (!mounted) return null;
  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-appleWide px-6 py-20 text-center text-appleGray-700">
        Your bag is empty.
      </div>
    );
  }

  const subtotal = cartSubtotal(lines);
  const total = subtotal;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    try {
      const { orderNumber } = await placeOrder({
        email: String(fd.get("email") ?? ""),
        name: String(fd.get("name") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        notes: String(fd.get("notes") ?? ""),
        address: {
          line1: String(fd.get("line1") ?? ""),
          line2: String(fd.get("line2") ?? "") || undefined,
          city: String(fd.get("city") ?? ""),
          state: String(fd.get("state") ?? "") || undefined,
          postalCode: String(fd.get("postalCode") ?? ""),
          country: String(fd.get("country") ?? ""),
        },
        cart: lines,
      });
      clearCart();
      router.push(`/order/${orderNumber}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-appleWide px-6 py-12">
      <h1 className="text-4xl font-semibold text-appleGray-900">Checkout</h1>
      <p className="mt-2 text-appleGray-700">Enter your shipping details to place your order.</p>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {/* Contact */}
          <section className="rounded-2xl bg-white p-6 ring-1 ring-appleGray-200">
            <h2 className="text-lg font-semibold text-appleGray-900">Contact</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Email" name="email" type="email" required />
              <Field label="Full name" name="name" required />
              <Field label="Phone" name="phone" type="tel" />
            </div>
          </section>

          {/* Address */}
          <section className="rounded-2xl bg-white p-6 ring-1 ring-appleGray-200">
            <h2 className="text-lg font-semibold text-appleGray-900">Shipping address</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Address line 1" name="line1" required wide />
              <Field label="Address line 2 (optional)" name="line2" wide />
              <Field label="City" name="city" required />
              <Field label="State / Province" name="state" />
              <Field label="Postal code" name="postalCode" required />
              <Field label="Country" name="country" defaultValue="United States" required />
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-2xl bg-white p-6 ring-1 ring-appleGray-200">
            <h2 className="text-lg font-semibold text-appleGray-900">Payment</h2>
            <p className="mt-2 text-sm text-appleGray-700">
              Your order will be reserved with status <strong>Pending payment</strong>. Our team will
              email you a secure payment link once we&apos;ve confirmed inventory.
            </p>
            <div className="mt-4 space-y-2">
              <label className="flex items-start gap-3 rounded-xl border border-appleGray-200 p-4">
                <input type="radio" name="payMethod" defaultChecked className="mt-1" />
                <div>
                  <p className="text-sm font-semibold">Pay later (we email an invoice)</p>
                  <p className="text-xs text-appleGray-700">No charge today.</p>
                </div>
              </label>
              <label className="flex items-start gap-3 rounded-xl border border-appleGray-200 p-4 opacity-60">
                <input type="radio" name="payMethod" disabled className="mt-1" />
                <div>
                  <p className="text-sm font-semibold">Credit / debit card</p>
                  <p className="text-xs text-appleGray-700">Coming next — Stripe Checkout.</p>
                </div>
              </label>
              <label className="flex items-start gap-3 rounded-xl border border-appleGray-200 p-4 opacity-60">
                <input type="radio" name="payMethod" disabled className="mt-1" />
                <div>
                  <p className="text-sm font-semibold">Apple Pay</p>
                  <p className="text-xs text-appleGray-700">Coming with Stripe.</p>
                </div>
              </label>
            </div>
          </section>

          {/* Notes */}
          <section className="rounded-2xl bg-white p-6 ring-1 ring-appleGray-200">
            <h2 className="text-lg font-semibold text-appleGray-900">Notes for our team (optional)</h2>
            <textarea
              name="notes"
              rows={3}
              placeholder="Anything we should know about this order?"
              className="mt-3 block w-full rounded-lg border border-appleGray-300 p-3 text-sm"
            />
          </section>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <aside className="rounded-2xl bg-appleGray-100 p-6 lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-lg font-semibold text-appleGray-900">Your order</h2>
          <ul className="mt-4 space-y-3">
            {lines.map((line, idx) => (
              <li key={idx} className="border-b border-appleGray-300 pb-3">
                <p className="text-sm font-medium text-appleGray-900">{line.productName}</p>
                <p className="mt-0.5 text-xs text-appleGray-700">
                  {Object.values(line.configuration).join(" · ")}
                </p>
                <div className="mt-1 flex items-center justify-between text-xs text-appleGray-700">
                  <span>Qty {line.quantity}</span>
                  <span>{formatMoney(line.unitPriceCents * line.quantity)}</span>
                </div>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-appleGray-700">Subtotal</dt>
              <dd className="font-medium">{formatMoney(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-appleGray-700">Shipping</dt>
              <dd className="font-medium">Free</dd>
            </div>
            <div className="flex justify-between border-t border-appleGray-300 pt-2 text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-semibold">{formatMoney(total)}</dd>
            </div>
          </dl>
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-full bg-appleBlue px-6 py-3 text-base font-medium text-white hover:bg-[#0077ed] disabled:opacity-60"
          >
            {submitting ? "Placing order…" : "Place order"}
          </button>
        </aside>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  wide,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  wide?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className={`block ${wide ? "md:col-span-2" : ""}`}>
      <span className="text-sm font-medium text-appleGray-900">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="mt-1 block w-full rounded-lg border border-appleGray-300 px-3 py-2 text-sm focus:border-appleBlue focus:outline-none focus:ring-2 focus:ring-appleBlue/30"
      />
    </label>
  );
}
