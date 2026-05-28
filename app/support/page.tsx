import Link from "next/link";

const TOPICS = [
  { name: "iPhone", emoji: "📱" },
  { name: "Mac", emoji: "💻" },
  { name: "iPad", emoji: "📲" },
  { name: "Watch", emoji: "⌚" },
  { name: "AirPods", emoji: "🎧" },
  { name: "Music", emoji: "🎵" },
  { name: "TV", emoji: "📺" },
  { name: "Apple ID", emoji: "🆔" },
  { name: "Billing & Subscriptions", emoji: "💳" },
];

const QUICK_LINKS = [
  { t: "Forgot Apple ID password", d: "Reset your password to get back in." },
  { t: "Trade in your device", d: "Get credit toward your next Apple product." },
  { t: "Track a repair", d: "Check the status of an active repair." },
  { t: "Order status", d: "Find recent orders or schedule a delivery." },
];

const RESOURCES = [
  { t: "Get AppleCare+", d: "Extended coverage and 24/7 priority support." },
  { t: "Apple Support app", d: "Personalized access to solutions for your products." },
  { t: "Apple Support community", d: "Find answers and share tips with other users." },
];

export default function SupportPage() {
  return (
    <div className="bg-appleGray-100">
      <section className="bg-appleGray-100 pt-16 pb-12 text-center">
        <p className="text-sm uppercase tracking-widest text-appleGray-500 reveal">
          Apple Support
        </p>
        <h1 className="mt-3 headline-xxl reveal delay-1">How can we help?</h1>

        <div className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-full bg-white px-6 py-4 shadow-sm reveal delay-2">
          <svg width="18" height="18" viewBox="0 0 14 44" fill="currentColor" className="text-appleGray-500" aria-hidden="true">
            <path d="M14.298 27.202l-3.87-3.87a6.92 6.92 0 1 0-.701.701l3.87 3.87a.5.5 0 0 0 .701-.701zM7.49 23.55a6 6 0 1 1 6-6 6 6 0 0 1-6 6z" />
          </svg>
          <input
            type="search"
            placeholder="Search Support, e.g. iPhone screen"
            aria-label="Search Support"
            className="w-full bg-transparent text-base outline-none placeholder:text-appleGray-500"
          />
        </div>
      </section>

      <section className="section-light py-16">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="headline-lg text-center reveal">Browse by product.</h2>
          <div className="mt-10 grid grid-cols-3 gap-4 md:grid-cols-5">
            {TOPICS.map((t, i) => (
              <Link
                key={t.name}
                href="#"
                className={`flex flex-col items-center rounded-2xl bg-appleGray-100 p-6 text-center hover-lift parallax-up delay-${(i % 4) + 1}`}
              >
                <span className="text-3xl" aria-hidden="true">{t.emoji}</span>
                <p className="mt-3 text-sm font-medium">{t.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-gray py-16">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="headline-lg text-center reveal">Quick links.</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {QUICK_LINKS.map((q, i) => (
              <div
                key={q.t}
                className={`rounded-2xl bg-white p-8 reveal delay-${(i % 4) + 1}`}
              >
                <p className="text-lg font-semibold">{q.t}</p>
                <p className="mt-2 text-sm text-appleGray-700">{q.d}</p>
                <Link href="#" className="mt-4 inline-block text-sm text-appleBlue hover:underline">
                  Get help ›
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light py-16">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="headline-lg text-center reveal">More resources.</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {RESOURCES.map((r, i) => (
              <div
                key={r.t}
                className={`rounded-2xl bg-appleGray-100 p-10 reveal delay-${i + 1}`}
              >
                <p className="text-xl font-semibold">{r.t}</p>
                <p className="mt-2 text-appleGray-700">{r.d}</p>
                <Link href="#" className="mt-4 inline-block text-sm text-appleBlue hover:underline">
                  Learn more ›
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-gray pb-20 pt-4 text-center">
        <p className="text-sm text-appleGray-700 reveal">
          Need to talk to someone? <Link href="#" className="text-appleBlue hover:underline">Contact Apple Support</Link>.
        </p>
      </section>
    </div>
  );
}
