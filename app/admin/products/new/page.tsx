import Link from "next/link";
import { createProductAction } from "@/lib/products";

const EXAMPLE_OPTIONS = `{
  "storage": [
    { "label": "256GB" },
    { "label": "512GB", "priceDeltaCents": 20000 }
  ],
  "color": [
    { "label": "Black", "swatch": "#1d1d1f" },
    { "label": "Silver", "swatch": "#c8c9cc" }
  ],
  "applecare": [
    { "label": "No AppleCare+" },
    { "label": "AppleCare+ (2 years)", "priceDeltaCents": 14900 }
  ]
}`;

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/admin/products" className="text-sm text-appleBlue hover:underline">
        ‹ All products
      </Link>
      <h1 className="mt-3 text-3xl font-semibold text-appleGray-900">Add product</h1>
      <p className="mt-2 text-appleGray-700">
        Fill in the basics. The product will appear on the public shop at{" "}
        <code className="rounded bg-appleGray-100 px-1.5 py-0.5 text-xs">/shop/buy/&lt;slug&gt;</code>{" "}
        as soon as you save.
      </p>

      <form action={createProductAction} className="mt-10 space-y-6">
        <section className="rounded-2xl bg-white p-6 ring-1 ring-appleGray-200">
          <h2 className="text-base font-semibold text-appleGray-900">Basics</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Name" name="name" required />
            <Field
              label="Category"
              name="category"
              type="select"
              required
              options={["mac", "ipad", "iphone", "watch", "vision", "airpods", "tv", "accessories"]}
            />
            <Field label="Slug (auto if blank)" name="slug" placeholder="e.g. macbook-air" />
            <Field label="From price ($, not cents)" name="basePrice" type="number" required step="0.01" />
            <Field label="Tagline (one line)" name="tagline" wide />
            <Field label="Hero image URL" name="heroImage" wide placeholder="https://…" />
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 ring-1 ring-appleGray-200">
          <h2 className="text-base font-semibold text-appleGray-900">Options (JSON)</h2>
          <p className="mt-1 text-sm text-appleGray-700">
            Configure picker choices. Keys can be{" "}
            <code className="text-xs">chip</code>, <code className="text-xs">memory</code>,{" "}
            <code className="text-xs">storage</code>, <code className="text-xs">color</code>,{" "}
            <code className="text-xs">size</code>, <code className="text-xs">band</code>,{" "}
            <code className="text-xs">applecare</code>. Each entry needs a{" "}
            <code className="text-xs">label</code> and may set{" "}
            <code className="text-xs">priceDeltaCents</code> or <code className="text-xs">swatch</code>.
          </p>
          <textarea
            name="options"
            defaultValue={EXAMPLE_OPTIONS}
            rows={14}
            className="mt-4 block w-full rounded-lg border border-appleGray-300 bg-appleGray-50 p-3 font-mono text-xs"
          />
        </section>

        <div className="flex items-center gap-3">
          <button type="submit" className="rounded-full bg-appleBlue px-6 py-2.5 text-sm font-medium text-white hover:bg-[#0077ed]">
            Create product
          </button>
          <Link href="/admin/products" className="text-sm text-appleBlue hover:underline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  wide,
  placeholder,
  step,
  options,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  wide?: boolean;
  placeholder?: string;
  step?: string;
  options?: string[];
}) {
  if (type === "select" && options) {
    return (
      <label className={`block ${wide ? "md:col-span-2" : ""}`}>
        <span className="text-sm font-medium text-appleGray-900">{label}</span>
        <select
          name={name}
          required={required}
          defaultValue=""
          className="mt-1 block w-full rounded-lg border border-appleGray-300 bg-white px-3 py-2 text-sm"
        >
          <option value="" disabled>Choose…</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </label>
    );
  }
  return (
    <label className={`block ${wide ? "md:col-span-2" : ""}`}>
      <span className="text-sm font-medium text-appleGray-900">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        step={step}
        className="mt-1 block w-full rounded-lg border border-appleGray-300 px-3 py-2 text-sm focus:border-appleBlue focus:outline-none focus:ring-2 focus:ring-appleBlue/30"
      />
    </label>
  );
}
