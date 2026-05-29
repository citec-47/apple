import Link from "next/link";

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-appleWide px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">
            Orders
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-appleGray-900">Customer orders</h1>
          <p className="mt-2 text-appleGray-700">
            See incoming orders, mark them as fulfilled, and respond to customer notes.
          </p>
        </div>
        <div className="flex gap-2">
          <select
            disabled
            aria-label="Filter orders"
            className="rounded-full border border-appleGray-300 bg-white px-4 py-2 text-sm text-appleGray-900 opacity-60"
          >
            <option>All orders</option>
            <option>Pending</option>
            <option>Fulfilled</option>
            <option>Refunded</option>
          </select>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Pending", value: 0, tone: "bg-yellow-100 text-yellow-800" },
          { label: "Fulfilled this month", value: 0, tone: "bg-green-100 text-green-800" },
          { label: "Total revenue", value: "$0.00", tone: "bg-appleBlue/10 text-appleBlue" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white p-6 ring-1 ring-appleGray-200">
            <p className="text-xs font-semibold uppercase tracking-widest text-appleGray-500">
              {s.label}
            </p>
            <p className="mt-2 text-3xl font-semibold text-appleGray-900">{s.value}</p>
            <span className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${s.tone}`}>
              live count
            </span>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-appleGray-300 bg-white p-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-appleBlue/10 text-appleBlue">
          <ReceiptIcon />
        </div>
        <h2 className="mt-5 text-xl font-semibold text-appleGray-900">No orders yet</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-appleGray-700">
          Once the public Buy buttons are wired up to a checkout flow, every order will land here
          with the customer's contact info and what they bought.
        </p>
        <Link href="/admin" className="mt-6 inline-block text-sm text-appleBlue hover:underline">
          ‹ Back to dashboard
        </Link>
      </div>
    </div>
  );
}

function ReceiptIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" />
      <line x1="9" y1="8" x2="15" y2="8" strokeLinecap="round" />
      <line x1="9" y1="12" x2="15" y2="12" strokeLinecap="round" />
    </svg>
  );
}
