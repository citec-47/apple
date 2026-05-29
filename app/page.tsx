import Link from "next/link";
import HotlinkImage from "@/components/HotlinkImage";
import { img } from "@/lib/img";

const APPLE = "https://www.apple.com";

interface Section {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctas?: { label: string; href: string; variant?: "primary" | "ghost" | "link" }[];
  bg: string;
  fallback: string;
  alt: string;
  theme?: "light" | "dark";
  align?: "top" | "bottom";
}

const HEROES: Section[] = [
  {
    eyebrow: "iPhone 17 Pro",
    title: "All out Pro.",
    ctas: [
      { label: "Learn more", href: "/iphone", variant: "link" },
      { label: "Buy", href: "/shop/buy/iphone-17-pro", variant: "link" },
    ],
    bg: `${APPLE}/v/home/cm/images/heroes/iphone-17-pro/hero_iphone_17_pro__bknyzxfk2agi_large.jpg`,
    fallback: img(2880, 1600, "iPhone 17 Pro", "dark"),
    alt: "iPhone 17 Pro",
    theme: "dark",
    align: "top",
  },
  {
    eyebrow: "MacBook Pro",
    title: "Now with M5, M5 Pro, and M5 Max.",
    ctas: [
      { label: "Learn more", href: "/mac", variant: "link" },
      { label: "Buy", href: "/shop/buy/macbook-pro", variant: "link" },
    ],
    bg: `${APPLE}/v/home/cm/images/heroes/macbook-pro/hero_macbook_pro__b4hqnjg4iuly_large.jpg`,
    fallback: img(2880, 1600, "MacBook Pro", "light"),
    alt: "MacBook Pro",
    theme: "light",
    align: "top",
  },
  {
    eyebrow: "iPhone 17",
    title: "Magichromatic.",
    ctas: [
      { label: "Learn more", href: "/iphone", variant: "link" },
      { label: "Buy", href: "/shop/buy/iphone-17", variant: "link" },
    ],
    bg: `${APPLE}/v/home/cm/images/heroes/iphone-17/hero_iphone_17__c5vvimu9a20y_large.jpg`,
    fallback: img(2880, 1600, "iPhone 17", "light"),
    alt: "iPhone 17",
    theme: "light",
    align: "top",
  },
];

const PROMOS: Section[] = [
  {
    title: "Apple Worldwide Developers Conference.",
    subtitle: "Join us online June 8–12.",
    ctas: [{ label: "Learn more", href: "#", variant: "link" }],
    bg: `${APPLE}/v/home/cn/images/promos/wwdc26-announce/promo_wwdc26_announce_b__b58bcmqvfwia_large.jpg`,
    fallback: img(1440, 1000, "WWDC 26", "dark"),
    alt: "WWDC 26",
    theme: "dark",
    align: "top",
  },
  {
    eyebrow: "Apple for College",
    title: "Mac and iPad. Major in any field.",
    ctas: [{ label: "Learn more", href: "#", variant: "link" }],
    bg: `${APPLE}/v/home/cn/images/promos/college-students-2026/promo_college_students__bxqdcoxgjzw2_large.jpg`,
    fallback: img(1440, 1000, "Apple for College", "light"),
    alt: "Apple for College",
    theme: "light",
    align: "top",
  },
  {
    eyebrow: "iPad Air",
    title: "Now supercharged by M4.",
    ctas: [
      { label: "Learn more", href: "/ipad", variant: "link" },
      { label: "Buy", href: "/shop/buy/ipad-pro", variant: "link" },
    ],
    bg: `${APPLE}/v/home/cm/images/promos/ipad-air-m4/promo_ipad_air_m4__f9ie3h3pzr6m_large.jpg`,
    fallback: img(1440, 1000, "iPad Air", "light"),
    alt: "iPad Air with M4",
    theme: "light",
    align: "top",
  },
  {
    eyebrow: "Apple Card",
    title: "Special new Apple Card and AirPods Pro 3 offer.",
    subtitle: "Limitations and spend requirements apply.¹",
    ctas: [{ label: "Learn more", href: "#", variant: "link" }],
    bg: `${APPLE}/v/home/cn/images/promos/apple-card-airpods/promo_apple_card_airpods__cq0gu2a9hxkm_large.jpg`,
    fallback: img(1440, 1000, "Apple Card", "light"),
    alt: "Apple Card and AirPods Pro 3 offer",
    theme: "light",
    align: "top",
  },
  {
    eyebrow: "Apple Trade In",
    title: "Get up to $195–$695 in credit when you trade in iPhone 13 or higher.²",
    ctas: [{ label: "Get your estimate", href: "#", variant: "link" }],
    bg: `${APPLE}/v/home/cm/images/promos/iphone-tradein/promo_iphone_tradein__bugw15ka691e_large.jpg`,
    fallback: img(1440, 1000, "Apple Trade In", "light"),
    alt: "Apple Trade In",
    theme: "light",
    align: "top",
  },
  {
    title: "Any condition carrier deals are here.",
    subtitle:
      "Select carriers accept eligible trade-in devices in any condition. Other offers available.³",
    ctas: [{ label: "Find your deal", href: "#", variant: "link" }],
    bg: `${APPLE}/v/home/cm/images/promos/carriers/promo_carrier__e0izvxwqosgi_large.jpg`,
    fallback: img(1440, 1000, "Carrier deals", "light"),
    alt: "Carrier deals",
    theme: "light",
    align: "top",
  },
];

const ENTERTAINMENT = [
  { title: "Maximum Pleasure Guaranteed", brand: "Apple TV", img: img(800, 450, "Maximum Pleasure", "dark") },
  { title: "Margo's Got Money Troubles", brand: "Apple TV", img: img(800, 450, "Margo's Got Money", "dark") },
  { title: "F1 on Apple TV", brand: "Apple TV", img: img(800, 450, "F1 on Apple TV", "dark") },
  { title: "Widows Bay", brand: "Apple TV", img: img(800, 450, "Widows Bay", "dark") },
  { title: "MLS on Apple TV", brand: "Apple TV", img: img(800, 450, "MLS on Apple TV", "dark") },
  { title: "Your Friends & Neighbors", brand: "Apple TV", img: img(800, 450, "Friends & Neighbors", "dark") },
  { title: "Friday Night Baseball", brand: "Apple TV", img: img(800, 450, "Friday Night Baseball", "dark") },
  { title: "Imperfect Women", brand: "Apple TV", img: img(800, 450, "Imperfect Women", "dark") },
  { title: "Ted Lasso", brand: "Apple TV", img: img(800, 450, "Ted Lasso", "dark") },
];

function HeroSection({ s, full }: { s: Section; full: boolean }) {
  const dark = s.theme === "dark";
  const align = s.align ?? "top";
  return (
    <article
      className={`relative overflow-hidden ${
        full ? "min-h-[692px] md:min-h-[692px]" : "min-h-[580px]"
      } reveal`}
    >
      <HotlinkImage
        src={s.bg}
        fallback={s.fallback}
        alt={s.alt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div
        className={`relative z-10 mx-auto flex h-full max-w-appleWide flex-col items-center px-6 ${
          align === "top" ? "pt-12 md:pt-16" : "justify-end pb-12 md:pb-16"
        } text-center ${dark ? "text-white" : "text-appleGray-900"}`}
        style={{ minHeight: full ? 692 : 580 }}
      >
        {s.eyebrow && (
          <p className="text-base md:text-xl font-semibold tracking-tight">{s.eyebrow}</p>
        )}
        <h2
          className={`mt-1 ${full ? "headline-xl" : "headline-lg"} max-w-3xl`}
        >
          {s.title}
        </h2>
        {s.subtitle && (
          <p className="mt-3 max-w-2xl text-sm md:text-base opacity-90">{s.subtitle}</p>
        )}
        {s.ctas && s.ctas.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {s.ctas.map((c, i) => (
              <Link
                key={c.label + i}
                href={c.href}
                className={
                  c.variant === "primary"
                    ? "btn-pill btn-pill-primary"
                    : c.variant === "ghost"
                    ? "btn-pill btn-pill-ghost"
                    : "text-appleBlue text-base hover:underline"
                }
              >
                {c.label}
                {c.variant === "link" || c.variant === undefined ? " ›" : ""}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <div className="bg-appleGray-100">
      {/* Full-width heroes */}
      <div className="flex flex-col gap-3 bg-appleGray-100">
        {HEROES.map((s) => (
          <HeroSection key={s.title} s={s} full />
        ))}

        {/* Promo grid — pairs */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {PROMOS.slice(0, 2).map((s) => (
            <HeroSection key={s.title} s={s} full={false} />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {PROMOS.slice(2, 4).map((s) => (
            <HeroSection key={s.title} s={s} full={false} />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {PROMOS.slice(4, 6).map((s) => (
            <HeroSection key={s.title} s={s} full={false} />
          ))}
        </div>
      </div>

      {/* Endless Entertainment carousel */}
      <section className="section-light py-20 mt-3">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="headline-lg reveal">
            Endless entertainment, all on Apple devices.
          </h2>
          <p className="mt-3 text-appleGray-700 reveal delay-1">
            From blockbuster TV to live sports, music, and more.
          </p>
          <div className="-mx-6 mt-10 overflow-x-auto px-6 pb-4 scrollbar-thin">
            <div className="flex gap-4 snap-x snap-mandatory">
              {ENTERTAINMENT.map((e, i) => (
                <div
                  key={e.title}
                  className={`snap-start shrink-0 w-[300px] md:w-[420px] overflow-hidden rounded-2xl bg-black hover-lift parallax-up delay-${(i % 4) + 1}`}
                >
                  <img
                    src={e.img}
                    alt={e.title}
                    className="aspect-video w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-4 text-white">
                    <p className="text-xs uppercase tracking-widest opacity-70">{e.brand}</p>
                    <p className="mt-1 text-base font-medium">{e.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
