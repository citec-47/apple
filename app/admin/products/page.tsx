import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-appleWide px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">
            Products
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-appleGray-900">All products</h1>
          <p className="mt-2 text-appleGray-700">
            Edit the headlines, taglines, prices and colors that appear on the public pages.
          </p>
        </div>
        <button
          type="button"
          disabled
          className="rounded-full bg-appleBlue px-5 py-2.5 text-sm font-medium text-white opacity-60"
          title="Coming in Phase 2"
        >
          + Add product
        </button>
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-appleGray-300 bg-white p-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-appleBlue/10 text-appleBlue">
          <BoxIcon />
        </div>
        <h2 className="mt-5 text-xl font-semibold text-appleGray-900">No products yet</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-appleGray-700">
          Right now the public pages read product copy from the source files. Phase 2 will move
          everything into Neon so you can edit it here.
        </p>
        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 text-sm">
          <Link href="/admin" className="text-appleBlue hover:underline">
            ‹ Back to dashboard
          </Link>
          <span className="text-appleGray-300">·</span>
          <Link href="/" target="_blank" className="text-appleBlue hover:underline">
            View public site →
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-appleGray-500">
          What you'll be able to do here
        </p>
        <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            "Edit product names, taglines, and From-prices",
            "Change color swatches per model",
            "Reorder the model carousel",
            "Toggle the New badge on or off",
            "Upload a hero image straight to Cloudinary",
            "Preview the public page before publishing",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-lg bg-white p-4 ring-1 ring-appleGray-200"
            >
              <CheckIcon />
              <span className="text-sm text-appleGray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function BoxIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0 text-appleBlue" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
