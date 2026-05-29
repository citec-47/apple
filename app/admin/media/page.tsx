import Link from "next/link";

export default function MediaPage() {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "(not set)";

  return (
    <div className="mx-auto max-w-appleWide px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">
            Media
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-appleGray-900">Media library</h1>
          <p className="mt-2 text-appleGray-700">
            Upload product images, hero shots, and banners. Cloudinary handles storage, resizing
            and CDN delivery.
          </p>
        </div>
        <button
          type="button"
          disabled
          className="rounded-full bg-appleBlue px-5 py-2.5 text-sm font-medium text-white opacity-60"
          title="Coming in Phase 3"
        >
          ↑ Upload
        </button>
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 ring-1 ring-appleGray-200">
        <p className="text-xs font-semibold uppercase tracking-widest text-appleGray-500">
          Connected Cloudinary account
        </p>
        <p className="mt-2 font-mono text-sm text-appleGray-900">{cloud}</p>
        <Link
          href="https://cloudinary.com/console"
          target="_blank"
          className="mt-3 inline-block text-xs text-appleBlue hover:underline"
        >
          Open Cloudinary console →
        </Link>
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-appleGray-300 bg-white p-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-appleBlue/10 text-appleBlue">
          <ImageIcon />
        </div>
        <h2 className="mt-5 text-xl font-semibold text-appleGray-900">No media uploaded yet</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-appleGray-700">
          Phase 3 will wire up a drag-and-drop upload widget here. Images will go directly to your
          Cloudinary account and become available for any product.
        </p>
      </div>

      <div className="mt-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-appleGray-500">
          What you'll be able to do here
        </p>
        <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            "Drag-and-drop upload directly to Cloudinary",
            "Auto-format and quality optimization",
            "Browse and search every image you've uploaded",
            "Copy a public CDN URL with one click",
            "Replace an image without breaking page references",
            "Delete old assets you no longer need",
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

function ImageIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 18l5-5 4 4 4-4 5 5" />
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
