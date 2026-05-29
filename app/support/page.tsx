import Link from "next/link";

const PRODUCT_TILES = [
  { label: "iPhone", icon: "iphone" as const },
  { label: "Mac", icon: "mac" as const },
  { label: "iPad", icon: "ipad" as const },
  { label: "Apple Watch", icon: "watch" as const },
  { label: "Apple Vision Pro", icon: "vision" as const },
  { label: "AirPods", icon: "airpods" as const },
  { label: "Music", icon: "music" as const },
  { label: "TV", icon: "tv" as const },
  { label: "Apple ID", icon: "id" as const },
];

const QUICK_ACTIONS = [
  {
    title: "Reset Apple Account password",
    body: "Forgot your password? Reset it in a few steps.",
    icon: "lock" as const,
  },
  {
    title: "Change a subscription",
    body: "Manage Apple TV+, Apple Music, iCloud+ and more.",
    icon: "calendar" as const,
  },
  {
    title: "Billing and payments",
    body: "View receipts, update payment methods and refunds.",
    icon: "receipt" as const,
  },
];

const HELP_TOPICS = [
  { title: "Forgot your Apple Account password?", body: "Reset it from any device you trust." },
  { title: "Trade in your device", body: "Get an estimate for your old device in seconds." },
  { title: "Track a repair", body: "Check on the status of a repair in progress." },
  { title: "Set up family sharing", body: "Share purchases, storage and screen time with up to six people." },
  { title: "Find my Apple Watch", body: "Use Find My to locate your watch if it's misplaced." },
  { title: "Get an AppleCare plan", body: "Extended coverage and 24/7 priority support." },
];

const EXPLORE_TILES = [
  {
    title: "Apple Support on YouTube",
    body: "Short videos that walk you through everyday tasks on every Apple device.",
    cta: "Visit Apple Support on YouTube",
    icon: "play" as const,
  },
  {
    title: "Today at Apple",
    body: "Free hands-on sessions at any Apple Store — learn photography, music production, design and more.",
    cta: "Sign up",
    icon: "store" as const,
  },
];

const SERVICE_PROGRAMS = [
  "Mac mini Service Program for No Power Issue",
  "iPhone 14 Plus Service Program for Rear Camera Issue",
  "15-inch MacBook Pro Battery Recall Program",
];

const ALERTS = [
  {
    title: "Beware of counterfeit parts",
    body: "Some counterfeit and third-party power adapters and batteries may not be designed properly and can result in safety issues. Always look for genuine Apple parts.",
    icon: "shield" as const,
  },
  {
    title: "Be aware of gift card scams",
    body: "If anyone asks you to pay with Apple Gift Cards outside of Apple's services, it's likely a scam. Don't share gift-card codes with strangers.",
    icon: "alert" as const,
  },
];

export default function SupportPage() {
  return (
    <div className="bg-appleGray-100">
      {/* Hero */}
      <section className="bg-white pt-16 pb-12 text-center">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-appleBlue text-white reveal">
            <SupportLogo />
          </div>
          <h1 className="mt-6 text-5xl font-semibold text-appleGray-900 reveal delay-1">
            Apple Support
          </h1>
          <p className="mt-4 text-xl text-appleGray-700 reveal delay-2">
            Need help? Start here.
          </p>

          {/* Search */}
          <form
            action="#"
            className="mx-auto mt-10 flex max-w-2xl items-center gap-3 rounded-full border border-appleGray-200 bg-white px-6 py-4 shadow-sm focus-within:border-appleBlue reveal delay-3"
          >
            <SearchIcon />
            <input
              type="search"
              placeholder="Search Support"
              aria-label="Search Support"
              className="w-full bg-transparent text-base outline-none placeholder:text-appleGray-500"
            />
          </form>
        </div>
      </section>

      {/* Product tiles */}
      <section className="bg-appleGray-100 py-16">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="text-2xl font-semibold text-appleGray-900 text-center reveal">
            Browse by product.
          </h2>
          <div className="mt-12 grid grid-cols-3 gap-6 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9">
            {PRODUCT_TILES.map((t, i) => (
              <Link
                key={t.label}
                href="#"
                className={`group flex flex-col items-center text-center hover-lift parallax-up delay-${(i % 4) + 1}`}
              >
                <div className="flex h-[120px] w-[120px] items-center justify-center rounded-3xl bg-white shadow-sm transition-transform group-hover:scale-105">
                  <ProductIcon icon={t.icon} />
                </div>
                <p className="mt-3 text-sm font-semibold text-appleGray-900">{t.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="text-2xl font-semibold text-appleGray-900 reveal">
            Quick actions.
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {QUICK_ACTIONS.map((q, i) => (
              <Link
                key={q.title}
                href="#"
                className={`group flex items-start gap-4 rounded-2xl border border-appleGray-200 p-6 hover:bg-appleGray-100 transition-colors reveal delay-${i + 1}`}
              >
                <div className="shrink-0 text-appleBlue">
                  <QuickIcon icon={q.icon} />
                </div>
                <div>
                  <p className="text-base font-semibold text-appleGray-900 group-hover:text-appleBlue">
                    {q.title} ›
                  </p>
                  <p className="mt-1 text-sm text-appleGray-700">{q.body}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Help topics */}
      <section className="bg-appleGray-100 py-16">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="text-2xl font-semibold text-appleGray-900 reveal">
            Helpful topics.
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HELP_TOPICS.map((t, i) => (
              <Link
                key={t.title}
                href="#"
                className={`rounded-2xl bg-white p-6 hover-lift reveal delay-${(i % 4) + 1}`}
              >
                <p className="text-base font-semibold text-appleGray-900">{t.title}</p>
                <p className="mt-2 text-sm text-appleGray-700">{t.body}</p>
                <span className="mt-3 inline-block text-sm text-appleBlue">Learn more ›</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AppleCare + Repair 2-up */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-appleWide px-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="rounded-3xl bg-gradient-to-br from-appleBlue to-[#005bbb] p-10 text-white reveal">
            <p className="text-sm font-semibold uppercase tracking-widest opacity-90">
              AppleCare
            </p>
            <h3 className="mt-3 text-3xl font-semibold">Handled with AppleCare.</h3>
            <p className="mt-4 text-base leading-relaxed text-white/90">
              Every AppleCare plan provides one-stop service and support from Apple experts. Quick, easy repairs, 24/7 priority access, and battery service when you need it.
            </p>
            <Link
              href="#"
              className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-appleGray-900 hover:bg-appleGray-100"
            >
              Learn more
            </Link>
          </article>
          <article className="rounded-3xl bg-appleGray-100 p-10 reveal delay-1">
            <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">
              Apple Repair
            </p>
            <h3 className="mt-3 text-3xl font-semibold text-appleGray-900">
              Apple Repair and Service.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-appleGray-700">
              We can help you find an Apple-authorized repair shop, mail your device in, or visit the Genius Bar — all with genuine Apple parts.
            </p>
            <Link
              href="#"
              className="mt-6 inline-flex btn-pill btn-pill-primary"
            >
              Start a repair
            </Link>
          </article>
        </div>
      </section>

      {/* Explore */}
      <section className="bg-appleGray-100 py-16">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="text-2xl font-semibold text-appleGray-900 reveal">Explore.</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {EXPLORE_TILES.map((t, i) => (
              <article
                key={t.title}
                className={`flex items-start gap-5 rounded-2xl bg-white p-8 hover-lift reveal delay-${i + 1}`}
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-appleBlue/10 text-appleBlue">
                  <ExploreIcon icon={t.icon} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-appleGray-900">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-appleGray-700">{t.body}</p>
                  <Link
                    href="#"
                    className="mt-3 inline-block text-sm text-appleBlue hover:underline"
                  >
                    {t.cta} ›
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Service programs */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="text-2xl font-semibold text-appleGray-900 reveal">
            Apple Service Programs.
          </h2>
          <ul className="mt-8 divide-y divide-appleGray-200 border-y border-appleGray-200">
            {SERVICE_PROGRAMS.map((p) => (
              <li key={p}>
                <Link
                  href="#"
                  className="flex items-center justify-between gap-4 py-5 hover:bg-appleGray-100 transition-colors px-4 -mx-4 rounded-lg"
                >
                  <span className="text-base text-appleGray-900">{p}</span>
                  <span className="text-appleBlue text-xl" aria-hidden="true">›</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#"
            className="mt-6 inline-block text-sm text-appleBlue hover:underline"
          >
            See all programs ›
          </Link>
        </div>
      </section>

      {/* Alerts */}
      <section className="bg-appleGray-100 py-16">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="text-2xl font-semibold text-appleGray-900 reveal">
            Stay safe.
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {ALERTS.map((a, i) => (
              <article
                key={a.title}
                className={`rounded-2xl bg-white p-8 hover-lift reveal delay-${i + 1}`}
              >
                <div className="text-orange-500">
                  <AlertIcon icon={a.icon} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-appleGray-900">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-appleGray-700">{a.body}</p>
                <Link
                  href="#"
                  className="mt-4 inline-block text-sm text-appleBlue hover:underline"
                >
                  Learn more ›
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="bg-white py-16 text-center">
        <div className="mx-auto max-w-apple px-6">
          <h2 className="text-2xl font-semibold text-appleGray-900 reveal">
            Need more help?
          </h2>
          <p className="mt-3 text-appleGray-700 reveal delay-1">
            Talk to an Apple Specialist by chat, email or phone.
          </p>
          <Link
            href="#"
            className="mt-6 inline-flex btn-pill btn-pill-primary reveal delay-2"
          >
            Contact Apple Support
          </Link>
        </div>
      </section>
    </div>
  );
}

/* --------------------------------- Icons --------------------------------- */

function SupportLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 4.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm1.5 11.5h-3v-1c.5-.1 1-.3 1-.7v-4c0-.5-.5-.7-1-.8v-1h2.5v5.8c0 .4.5.6 1 .7v1z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-appleGray-500" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
    </svg>
  );
}

type ProductIconKey =
  | "iphone"
  | "mac"
  | "ipad"
  | "watch"
  | "vision"
  | "airpods"
  | "music"
  | "tv"
  | "id";

function ProductIcon({ icon }: { icon: ProductIconKey }) {
  const props = {
    width: 56,
    height: 56,
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "text-appleGray-900",
    "aria-hidden": true,
  };
  switch (icon) {
    case "iphone":
      return (
        <svg {...props}>
          <rect x="20" y="6" width="24" height="52" rx="5" />
          <line x1="28" y1="11" x2="36" y2="11" />
          <circle cx="32" cy="52" r="1" fill="currentColor" />
        </svg>
      );
    case "mac":
      return (
        <svg {...props}>
          <rect x="8" y="14" width="48" height="30" rx="2" />
          <path d="M4 50h56l-3 4H7z" />
          <path d="M28 50h8v4h-8z" />
        </svg>
      );
    case "ipad":
      return (
        <svg {...props}>
          <rect x="14" y="6" width="36" height="52" rx="4" />
          <circle cx="32" cy="52" r="1" fill="currentColor" />
        </svg>
      );
    case "watch":
      return (
        <svg {...props}>
          <path d="M24 6h16v8h-16z" />
          <path d="M24 50h16v8h-16z" />
          <rect x="18" y="14" width="28" height="36" rx="6" />
          <line x1="46" y1="26" x2="50" y2="26" />
        </svg>
      );
    case "vision":
      return (
        <svg {...props}>
          <path d="M4 28c10-12 22-12 28-12s18 0 28 12c-2 8-10 18-28 18S6 36 4 28z" />
          <circle cx="22" cy="32" r="4" />
          <circle cx="42" cy="32" r="4" />
        </svg>
      );
    case "airpods":
      return (
        <svg {...props}>
          <path d="M20 8c-4 0-8 4-8 12 0 8 4 12 8 12 2 0 4-1 4-3V11c0-2-2-3-4-3z" />
          <path d="M44 8c4 0 8 4 8 12 0 8-4 12-8 12-2 0-4-1-4-3V11c0-2 2-3 4-3z" />
          <line x1="24" y1="32" x2="24" y2="50" />
          <line x1="40" y1="32" x2="40" y2="50" />
        </svg>
      );
    case "music":
      return (
        <svg {...props}>
          <circle cx="20" cy="48" r="6" />
          <circle cx="48" cy="44" r="6" />
          <path d="M26 48V14l28-4v34" />
        </svg>
      );
    case "tv":
      return (
        <svg {...props}>
          <rect x="14" y="10" width="36" height="34" rx="2" />
          <path d="M24 50h16" />
        </svg>
      );
    case "id":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <circle cx="32" cy="26" r="6" />
          <path d="M18 46c2-6 8-10 14-10s12 4 14 10" />
        </svg>
      );
  }
}

type QuickIconKey = "lock" | "calendar" | "receipt";

function QuickIcon({ icon }: { icon: QuickIconKey }) {
  const props = {
    width: 32,
    height: 32,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    "aria-hidden": true,
  };
  switch (icon) {
    case "lock":
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
      );
    case "receipt":
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
      );
  }
}

type ExploreIconKey = "play" | "store";

function ExploreIcon({ icon }: { icon: ExploreIconKey }) {
  const props = {
    width: 32,
    height: 32,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
  };
  if (icon === "play")
    return (
      <svg {...props}>
        <path d="M8 5v14l11-7z" />
      </svg>
    );
  return (
    <svg {...props}>
      <path d="M5 4h14a2 2 0 0 1 2 2v2H3V6a2 2 0 0 1 2-2zm-2 6h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10z" />
    </svg>
  );
}

type AlertIconKey = "shield" | "alert";

function AlertIcon({ icon }: { icon: AlertIconKey }) {
  const props = {
    width: 32,
    height: 32,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    "aria-hidden": true,
  };
  if (icon === "shield")
    return (
      <svg {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9c0-1.605.42-3.113 1.155-4.418L12 3l7.845 4.582A8.967 8.967 0 0 1 21 12Z" />
      </svg>
    );
  return (
    <svg {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
  );
}
