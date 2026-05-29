import Link from "next/link";
import AccessoryBrowser from "@/components/AccessoryBrowser";

const CATEGORIES = [
  { label: "Mac", href: "/mac", icon: "mac" as const },
  { label: "iPad", href: "/ipad", icon: "ipad" as const },
  { label: "iPhone", href: "/iphone", icon: "iphone" as const },
  { label: "Apple Watch", href: "/watch", icon: "watch" as const },
  { label: "Apple Vision Pro", href: "/vision", icon: "vision" as const },
  { label: "AirPods", href: "/airpods", icon: "airpods" as const },
  { label: "TV & Home", href: "/tv", icon: "tv" as const },
  { label: "Beats", href: "#", icon: "beats" as const },
];

const FILTER_CHIPS = [
  "Accessibility",
  "AirTag and Accessories",
  "Apple Vision Pro",
  "Apple Watch Bands",
  "Cases & Protection",
  "Charging Essentials",
  "Creative Tools",
  "Gaming",
  "Headphones & Speakers",
  "Health & Fitness",
  "Home Office",
  "MagSafe",
  "Mice & Keyboards",
  "New Arrivals",
  "Photography",
  "Smart Home Accessories",
  "Software",
  "Storage",
];

const THEMED_SECTIONS = [
  {
    eyebrow: "Style in a Snap",
    title: "Cases, sleeves and skins for every device.",
    body:
      "From clear MagSafe cases for iPhone to leather sleeves for MacBook, dress the gear you carry every day in something that fits how you live.",
    cta: "Shop Cases & Protection",
    bg: "from-[#f7e8cf] via-[#f4d4c0] to-[#e5c4d2]",
    accent: "#1d1d1f",
  },
  {
    eyebrow: "Charging Essentials",
    title: "Cables, adapters and chargers — always have one handy.",
    body:
      "USB-C, MagSafe, Lightning, the wall, the car, the desk: find the right charging solution for every device in every room.",
    cta: "Shop Charging Essentials",
    bg: "from-[#d6f0ff] via-[#bce4ff] to-[#9ccbff]",
    accent: "#0b3a66",
  },
  {
    eyebrow: "Home Office",
    title: "Set up your workspace just right.",
    body:
      "Stands, hubs, monitors, lights, microphones and keyboards — the gear that turns a corner of the kitchen into a real workspace.",
    cta: "Shop Home Office",
    bg: "from-[#e8e2f4] via-[#d0c0e8] to-[#b39ddb]",
    accent: "#3c1f5e",
  },
  {
    eyebrow: "Creative Tools",
    title: "Bring the creative gear with you.",
    body:
      "Apple Pencil, drawing pads, color-true monitors, audio interfaces and the cables to glue it all together — for the work you make.",
    cta: "Shop Creative Tools",
    bg: "from-[#ffe3d6] via-[#ffc4a5] to-[#ff8b6e]",
    accent: "#5a1f0a",
  },
  {
    eyebrow: "Health & Fitness",
    title: "Move better with the right gear.",
    body:
      "Apple Watch bands for the workout, the office and the trail — plus scales, heart-rate monitors, mounts and more from the brands you trust.",
    cta: "Shop Health & Fitness",
    bg: "from-[#d4f0d6] via-[#a8d8a7] to-[#7ac09a]",
    accent: "#1d4a2a",
  },
  {
    eyebrow: "Sound Essentials",
    title: "Headphones and speakers for every kind of listening.",
    body:
      "From AirPods Pro for focus, to HomePod for the whole room, to over-ear cans for the studio — find the sound that fits how you listen.",
    cta: "Shop Headphones and Speakers",
    bg: "from-[#1d1d1f] via-[#2a2a35] to-[#0a0a0a]",
    accent: "#ffffff",
    dark: true,
  },
];

const BENEFITS = [
  {
    title: "Fast delivery or pickup",
    body: "Two-hour delivery from an Apple Store, free standard delivery, or easy in-store pickup.",
    cta: "Learn more ›",
    icon: "truck" as const,
  },
  {
    title: "Free and easy returns",
    body: "Complete your return online or take it to any Apple Store. We make it simple.",
    cta: "Learn more ›",
    icon: "return" as const,
  },
  {
    title: "Shop with Apple Card",
    body: "Get 3% Daily Cash back when you shop at Apple with Apple Card.",
    cta: "Learn more ›",
    icon: "card" as const,
  },
];

export default function AccessoriesPage() {
  return (
    <div className="bg-white">
      {/* Page title */}
      <section className="bg-appleGray-100 pt-16 pb-10">
        <div className="mx-auto max-w-appleWide px-6">
          <h1 className="headline-xl reveal">Accessories</h1>
          <p className="mt-4 text-lg text-appleGray-700 reveal delay-1">
            Find the perfect accessories for every Apple device.
          </p>
        </div>
      </section>

      {/* Shop by product category */}
      <section className="section-light py-16">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="text-2xl font-semibold text-appleGray-900 reveal">
            Shop by product.
          </h2>
          <div className="-mx-6 mt-8 overflow-x-auto px-6">
            <ul className="flex min-w-max gap-4">
              {CATEGORIES.map((c, i) => (
                <li
                  key={c.label}
                  className={`shrink-0 parallax-up delay-${(i % 4) + 1}`}
                >
                  <Link
                    href={c.href}
                    className="group flex w-[150px] flex-col items-center text-center"
                  >
                    <div className="flex h-[140px] w-[140px] items-center justify-center rounded-3xl bg-appleGray-100 transition-transform group-hover:scale-105">
                      <CategoryIcon icon={c.icon} />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-appleGray-900">
                      {c.label}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Shop by category chips */}
      <section className="bg-appleGray-100 py-12">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="text-2xl font-semibold text-appleGray-900 reveal">
            Shop by category.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3 reveal delay-1">
            {FILTER_CHIPS.map((chip) => (
              <Link
                key={chip}
                href="#"
                className="rounded-full bg-white px-5 py-2.5 text-sm text-appleGray-900 hover:bg-appleGray-200 transition-colors"
              >
                {chip}
              </Link>
            ))}
            <Link
              href="#"
              className="rounded-full bg-appleGray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-black"
            >
              Browse all ›
            </Link>
          </div>
        </div>
      </section>

      {/* Tabbed browse interface */}
      <AccessoryBrowser />

      {/* Themed promotional sections */}
      <section className="section-light py-12">
        <div className="mx-auto max-w-appleWide px-6 space-y-6">
          {THEMED_SECTIONS.map((s, i) => (
            <article
              key={s.eyebrow}
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${s.bg} px-10 py-16 reveal delay-${(i % 4) + 1}`}
              style={{ color: s.accent }}
            >
              <div className="relative max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
                  {s.eyebrow}
                </p>
                <h3 className={`mt-3 headline-lg ${s.dark ? "text-white" : ""}`}>
                  {s.title}
                </h3>
                <p className={`mt-4 text-base leading-relaxed ${s.dark ? "text-white/80" : "opacity-80"}`}>
                  {s.body}
                </p>
                <Link
                  href="#"
                  className={`mt-6 inline-flex items-center gap-1 text-base font-medium hover:underline ${
                    s.dark ? "text-white" : ""
                  }`}
                >
                  {s.cta} ›
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Apple Card offer banner */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-appleWide px-6">
          <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7ac09a] via-[#f7c79b] to-[#e892b5] p-12 reveal">
            <div className="relative max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-900/80">
                Apple Card Limited-Time Offer
              </p>
              <h3 className="mt-3 headline-lg text-appleGray-900">
                Get a new Apple Card. Buy AirPods Pro 3 at Apple. Earn back the cost, up to $250 Daily Cash.◊
              </h3>
              <p className="mt-3 text-sm text-appleGray-900/70">
                Limitations and spend requirements apply.
              </p>
              <Link
                href="#"
                className="mt-6 inline-flex btn-pill btn-pill-primary"
              >
                Learn more
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Benefits 3-up */}
      <section className="section-light py-20">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <article
                key={b.title}
                className={`rounded-2xl bg-appleGray-100 p-8 hover-lift reveal delay-${i + 1}`}
              >
                <BenefitIcon icon={b.icon} />
                <h3 className="mt-4 text-lg font-semibold text-appleGray-900">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm text-appleGray-700">{b.body}</p>
                <Link
                  href="#"
                  className="mt-4 inline-block text-sm text-appleBlue hover:underline"
                >
                  {b.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* --------------------------------- Icons --------------------------------- */

type CatIcon =
  | "mac"
  | "ipad"
  | "iphone"
  | "watch"
  | "vision"
  | "airpods"
  | "tv"
  | "beats";

function CategoryIcon({ icon }: { icon: CatIcon }) {
  const props = {
    width: 64,
    height: 64,
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
    case "iphone":
      return (
        <svg {...props}>
          <rect x="20" y="6" width="24" height="52" rx="5" />
          <line x1="28" y1="11" x2="36" y2="11" />
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
    case "tv":
      return (
        <svg {...props}>
          <rect x="14" y="10" width="36" height="34" rx="2" />
          <path d="M24 50h16" />
        </svg>
      );
    case "beats":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <circle cx="32" cy="32" r="12" />
        </svg>
      );
  }
}

type BIcon = "truck" | "return" | "card";

function BenefitIcon({ icon }: { icon: BIcon }) {
  const props = {
    width: 36,
    height: 36,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    className: "text-appleBlue",
    "aria-hidden": true,
  };
  switch (icon) {
    case "truck":
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      );
    case "return":
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      );
    case "card":
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
      );
  }
}
