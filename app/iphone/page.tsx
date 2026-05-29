import Link from "next/link";
import { IMG } from "@/lib/img";

const MODELS = [
  {
    id: "15-pro",
    name: "iPhone 15 Pro",
    tagline: "Titanium.",
    sub: "From $999 or $41.62/mo.",
    img: IMG.iphone15Pro,
    href: "/shop/buy/iphone-17-pro",
    dark: true,
  },
  {
    id: "15",
    name: "iPhone 15",
    tagline: "Newphoria.",
    sub: "From $799 or $33.29/mo.",
    img: IMG.iphone15,
    href: "/shop/buy/iphone-17",
  },
  {
    id: "14",
    name: "iPhone 14",
    tagline: "As amazing as ever.",
    sub: "From $599 or $24.95/mo.",
    img: IMG.iphone14,
    href: "/shop/buy/iphone-17",
  },
  {
    id: "se",
    name: "iPhone SE",
    tagline: "Serious power. Serious value.",
    sub: "From $429 or $17.87/mo.",
    img: IMG.iphoneSE,
    href: "/shop/buy/iphone-17",
  },
];

const FEATURES = [
  { label: "iOS 17", desc: "More expressive. More personal. More you." },
  { label: "Privacy", desc: "Designed to protect what's yours." },
  { label: "iCloud+", desc: "More storage and premium features." },
  { label: "Trade In", desc: "Get credit toward your next iPhone." },
];

export default function IPhonePage() {
  return (
    <div className="bg-white">
      {/* Hero banner */}
      <section className="bg-appleGray-100 pt-16 pb-10 text-center">
        <h1 className="headline-xxl reveal">iPhone</h1>
        <p className="mt-4 text-xl text-appleGray-700 reveal delay-1">
          Designed to be loved.
        </p>
      </section>

      {/* Featured: 15 Pro big tile */}
      <section className="section-dark py-16">
        <div className="mx-auto flex max-w-appleWide flex-col items-center px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest reveal">iPhone 15 Pro</p>
          <h2 className="mt-2 headline-xl reveal delay-1">
            <span className="gradient-text">Titanium.</span> So strong. So light. So Pro.
          </h2>
          <div className="mt-6 flex gap-4 reveal delay-2">
            <Link href="/iphone/15-pro" className="btn-pill btn-pill-primary">Learn more</Link>
            <Link href="/iphone/15-pro" className="btn-pill btn-pill-ghost">Buy</Link>
          </div>
          <img
            src={IMG.iphone15ProHero}
            alt="iPhone 15 Pro"
            className="mt-10 max-h-[520px] rounded-2xl reveal delay-3"
          />
        </div>
      </section>

      {/* Model picker */}
      <section className="section-light py-20">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="headline-lg text-center reveal">Get the latest iPhone.</h2>
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {MODELS.map((m, i) => (
              <Link
                key={m.id}
                href={m.href}
                className={`group rounded-2xl bg-appleGray-100 p-6 text-center hover-lift parallax-up delay-${i + 1}`}
              >
                <img src={m.img} alt={m.name} className="mx-auto h-56 w-auto object-contain" />
                <p className="mt-4 text-lg font-semibold">{m.name}</p>
                <p className="mt-1 text-sm text-appleGray-500">{m.tagline}</p>
                <p className="mt-4 text-sm text-appleGray-700">{m.sub}</p>
                <span className="mt-4 inline-block text-sm text-appleBlue group-hover:underline">
                  Learn more ›
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Compare strip */}
      <section className="section-gray py-20">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <h2 className="headline-lg reveal">Which iPhone is right for you?</h2>
          <p className="mt-4 text-appleGray-700 reveal delay-1">
            Compare features and find the iPhone that fits you best.
          </p>
          <Link
            href="#"
            className="mt-6 inline-flex btn-pill btn-pill-primary reveal delay-2"
          >
            Compare iPhone models
          </Link>
        </div>
      </section>

      {/* Features grid */}
      <section className="section-light py-20">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <div
                key={f.label}
                className={`rounded-2xl bg-appleGray-100 p-8 text-center reveal delay-${i + 1}`}
              >
                <p className="text-2xl font-semibold">{f.label}</p>
                <p className="mt-3 text-appleGray-700">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
