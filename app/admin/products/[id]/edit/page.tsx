import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { products } from "@/db/schema";
import { updateProductAction } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await db.query.products.findFirst({
    where: eq(products.id, Number(id)),
  });
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/admin/products" className="text-sm text-appleBlue hover:underline">
        ‹ All products
      </Link>
      <h1 className="mt-3 text-3xl font-semibold text-appleGray-900">Edit product</h1>
      <p className="mt-2 text-appleGray-700">
        Save to update the public shop instantly. Public URL:{" "}
        <code className="rounded bg-appleGray-100 px-1.5 py-0.5 text-xs">
          /shop/buy/{product.slug}
        </code>
      </p>

      <form action={updateProductAction} className="mt-10 space-y-6">
        <input type="hidden" name="id" value={product.id} />

        <section className="rounded-2xl bg-white p-6 ring-1 ring-appleGray-200">
          <h2 className="text-base font-semibold text-appleGray-900">Basics</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Name" name="name" required defaultValue={product.name} />
            <Field
              label="Category"
              name="category"
              type="select"
              required
              defaultValue={product.category}
              options={["mac", "ipad", "iphone", "watch", "vision", "airpods", "tv", "accessories"]}
            />
            <Field label="Slug" name="slug" required defaultValue={product.slug} />
            <Field
              label="From price ($)"
              name="basePrice"
              type="number"
              required
              step="0.01"
              defaultValue={(product.basePriceCents / 100).toFixed(2)}
            />
            <Field label="Tagline" name="tagline" wide defaultValue={product.tagline ?? ""} />
            <Field label="Hero image URL" name="heroImage" wide defaultValue={product.heroImage ?? ""} />
          </div>
          <label className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={product.isActive}
              className="rounded border-appleGray-300"
            />
            <span className="text-sm text-appleGray-900">Show on public shop</span>
          </label>
        </section>

        <section className="rounded-2xl bg-white p-6 ring-1 ring-appleGray-200">
          <h2 className="text-base font-semibold text-appleGray-900">Options (JSON)</h2>
          <p className="mt-1 text-sm text-appleGray-700">
            Keys: chip, memory, storage, color, size, band, applecare. Each entry needs a label
            and may set priceDeltaCents or swatch.
          </p>
          <textarea
            name="options"
            defaultValue={JSON.stringify(product.options, null, 2)}
            rows={18}
            className="mt-4 block w-full rounded-lg border border-appleGray-300 bg-appleGray-50 p-3 font-mono text-xs"
          />
        </section>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-full bg-appleBlue px-6 py-2.5 text-sm font-medium text-white hover:bg-[#0077ed]"
          >
            Save changes
          </button>
          <Link href="/admin/products" className="text-sm text-appleBlue hover:underline">
            Cancel
          </Link>
          <Link
            href={`/shop/buy/${product.slug}`}
            target="_blank"
            className="ml-auto text-sm text-appleBlue hover:underline"
          >
            View on public shop ↗
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
  defaultValue,
  step,
  options,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  wide?: boolean;
  defaultValue?: string;
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
          defaultValue={defaultValue}
          className="mt-1 block w-full rounded-lg border border-appleGray-300 bg-white px-3 py-2 text-sm"
        >
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
        defaultValue={defaultValue}
        step={step}
        className="mt-1 block w-full rounded-lg border border-appleGray-300 px-3 py-2 text-sm focus:border-appleBlue focus:outline-none focus:ring-2 focus:ring-appleBlue/30"
      />
    </label>
  );
}
