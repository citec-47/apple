import Link from "next/link";
import HotlinkImage from "@/components/HotlinkImage";
import { img } from "@/lib/img";

const APPLE = "https://www.apple.com";

const CATEGORIES = [
  { name: "Mac", href: "/mac", icon: img(120, 120, "Mac", "light") },
  { name: "iPad", href: "/ipad", icon: img(120, 120, "iPad", "light") },
  { name: "iPhone", href: "/iphone", icon: img(120, 120, "iPhone", "light") },
  { name: "Apple Watch", href: "/watch", icon: img(120, 120, "Watch", "light") },
  { name: "Apple Vision Pro", href: "#", icon: img(120, 120, "Vision Pro", "light") },
  { name: "AirPods", href: "/airpods", icon: img(120, 120, "AirPods", "light") },
  { name: "TV & Home", href: "/tv", icon: img(120, 120, "TV", "light") },
  { name: "AirTag", href: "#", icon: img(120, 120, "AirTag", "light") },
  { name: "Accessories", href: "#", icon: img(120, 120, "Accessories", "light") },
  { name: "Gift Cards", href: "#", icon: img(120, 120, "Gift Cards", "light") },
];

const HELP_TILES = [
  {
    title: "Need shopping help?",
    subtitle: "Ask a Specialist",
    cta: "Chat with a Specialist ›",
    icon: ChatIcon,
  },
  {
    title: "Visit an Apple Store",
    subtitle: "Find one near you.",
    cta: "Find a store ›",
    icon: StoreIcon,
  },
  {
    title: "Get personalized help.",
    subtitle: "Book a free Personal Setup session.",
    cta: "Book a session ›",
    icon: PersonalIcon,
  },
];

const LATEST_PRODUCTS = [
  {
    name: "iPhone 17 Pro",
    tagline: "All out Pro.",
    price: "From $1099",
    href: "/iphone",
    src: `${APPLE}/v/home/cm/images/heroes/iphone-17-pro/hero_iphone_17_pro__bknyzxfk2agi_large.jpg`,
    fallback: img(600, 600, "iPhone 17 Pro", "dark"),
  },
  {
    name: "iPhone 17",
    tagline: "Magichromatic.",
    price: "From $799",
    href: "/iphone",
    src: `${APPLE}/v/home/cm/images/heroes/iphone-17/hero_iphone_17__c5vvimu9a20y_large.jpg`,
    fallback: img(600, 600, "iPhone 17", "light"),
  },
  {
    name: "MacBook Pro",
    tagline: "M5, M5 Pro, M5 Max.",
    price: "From $1599",
    href: "/mac/macbook-pro",
    src: `${APPLE}/v/home/cm/images/heroes/macbook-pro/hero_macbook_pro__b4hqnjg4iuly_large.jpg`,
    fallback: img(600, 600, "MacBook Pro", "light"),
  },
  {
    name: "iPad Air",
    tagline: "Supercharged by M4.",
    price: "From $599",
    href: "/ipad",
    src: `${APPLE}/v/home/cm/images/promos/ipad-air-m4/promo_ipad_air_m4__f9ie3h3pzr6m_large.jpg`,
    fallback: img(600, 600, "iPad Air", "light"),
  },
  {
    name: "Apple Watch Series 11",
    tagline: "Smarter. Brighter. Mightier.",
    price: "From $399",
    href: "/watch",
    src: img(600, 600, "Apple Watch Series 11", "gray"),
    fallback: img(600, 600, "Apple Watch Series 11", "gray"),
  },
  {
    name: "AirPods Pro 3",
    tagline: "Adaptive Audio. Heart Rate.",
    price: "$249",
    href: "/airpods",
    src: img(600, 600, "AirPods Pro 3", "light"),
    fallback: img(600, 600, "AirPods Pro 3", "light"),
  },
  {
    name: "Apple TV 4K",
    tagline: "Cinema, gaming, and more.",
    price: "From $129",
    href: "/tv",
    src: img(600, 600, "Apple TV 4K", "gray"),
    fallback: img(600, 600, "Apple TV 4K", "gray"),
  },
  {
    name: "Apple Vision Pro",
    tagline: "Welcome to spatial computing.",
    price: "From $3499",
    href: "#",
    src: img(600, 600, "Vision Pro", "dark"),
    fallback: img(600, 600, "Vision Pro", "dark"),
  },
];

const VALUE_PROPS = [
  {
    icon: TruckIcon,
    title: "Free delivery",
    desc: "And free returns. See checkout for delivery dates.",
  },
  {
    icon: PencilIcon,
    title: "Personalize for free",
    desc: "Engrave a mix of emoji, names, and numbers on AirPods and select iPad and Apple Pencil models.",
  },
  {
    icon: TradeInIcon,
    title: "Save with Apple Trade In",
    desc: "Get credit toward a new product when you trade in an eligible device.°",
  },
  {
    icon: CardIcon,
    title: "Pay over time, interest-free.",
    desc: "When you choose to check out with Apple Card Monthly Installments.◊",
  },
  {
    icon: ChatIcon,
    title: "Shop one on one with a Specialist.",
    desc: "Online or in a store.",
  },
  {
    icon: AccountIcon,
    title: "Sign in for easier shopping.",
    desc: "Faster checkout, your saves, and more.",
  },
];

const HELP_LINKS = [
  { label: "Order Status", href: "#" },
  { label: "Shopping Help", href: "/support" },
  { label: "Returns", href: "#" },
  { label: "Contact Us", href: "/support" },
  { label: "Apple Store App", href: "#" },
  { label: "Sign in to Your Account", href: "#" },
  { label: "Today at Apple", href: "#" },
  { label: "Apple Store Gift Cards", href: "#" },
  { label: "Find a Store", href: "#" },
];

export default function StorePage() {
  return (
    <div className="bg-appleGray-100">
      {/* Hero header */}
      <section className="bg-appleGray-100 pt-20 pb-12">
        <div className="mx-auto max-w-appleWide px-6">
          <h1 className="headline-xl font-semibold tracking-tight reveal">Store.</h1>
          <p className="mt-3 text-2xl font-semibold text-appleGray-700 reveal delay-1">
            The best way to buy the products you love.
          </p>
        </div>
      </section>

      {/* Shopping help inline strip */}
      <section className="bg-appleGray-100 pb-8">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-appleGray-700 reveal">
            <span>Need shopping help?</span>
            <Link href="#" className="text-appleBlue hover:underline">
              Ask a Specialist ›
            </Link>
            <span className="hidden md:inline text-appleGray-300">|</span>
            <span>Visit an Apple Store.</span>
            <Link href="#" className="text-appleBlue hover:underline">
              Find one near you ›
            </Link>
          </div>
        </div>
      </section>

      {/* Category icon strip — horizontal scroll */}
      <section className="bg-appleGray-100 pb-8">
        <div className="mx-auto max-w-appleWide">
          <div className="-mx-6 overflow-x-auto px-6 pb-4">
            <ul className="flex min-w-max gap-8">
              {CATEGORIES.map((c, i) => (
                <li
                  key={c.name}
                  className={`flex-shrink-0 parallax-up delay-${(i % 4) + 1}`}
                >
                  <Link
                    href={c.href}
                    className="group flex w-[112px] flex-col items-center text-center"
                  >
                    <div className="flex h-[112px] w-[112px] items-center justify-center rounded-2xl bg-white transition-transform group-hover:scale-105">
                      <img
                        src={c.icon}
                        alt={c.name}
                        className="h-20 w-20 object-contain"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-appleGray-900">
                      {c.name}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Help tiles */}
      <section className="bg-appleGray-100 pb-8">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {HELP_TILES.map((t, i) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.title}
                  className={`rounded-2xl bg-white p-8 hover-lift parallax-up delay-${i + 1}`}
                >
                  <Icon />
                  <p className="mt-4 text-lg font-semibold text-appleGray-900">{t.title}</p>
                  <p className="mt-1 text-base text-appleGray-700">{t.subtitle}</p>
                  <Link
                    href="#"
                    className="mt-3 inline-block text-sm text-appleBlue hover:underline"
                  >
                    {t.cta}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured iPhone 17 Pro hero */}
      <section className="bg-appleGray-100 pb-3">
        <article className="relative mx-auto max-w-appleWide overflow-hidden rounded-3xl bg-black reveal">
          <HotlinkImage
            src={`${APPLE}/v/home/cm/images/heroes/iphone-17-pro/hero_iphone_17_pro__bknyzxfk2agi_large.jpg`}
            fallback={img(2400, 1200, "iPhone 17 Pro", "dark")}
            alt="iPhone 17 Pro"
            className="absolute inset-0 h-full w-full object-cover opacity-90"
            loading="lazy"
          />
          <div className="relative z-10 flex min-h-[480px] flex-col items-center justify-end px-6 pb-12 text-center text-white md:min-h-[560px]">
            <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
              iPhone 17 Pro
            </p>
            <h2 className="mt-2 headline-xl">Order yours now.</h2>
            <div className="mt-6 flex gap-6">
              <Link href="/iphone" className="text-appleBlue text-base hover:underline">
                Learn more ›
              </Link>
              <Link href="/iphone" className="text-appleBlue text-base hover:underline">
                Buy ›
              </Link>
            </div>
          </div>
        </article>
      </section>

      {/* The latest carousel */}
      <section className="section-light py-20 mt-3">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="headline-lg reveal">
            The latest. <span className="text-appleGray-500">Take a look at what&apos;s new, right now.</span>
          </h2>
          <div className="-mx-6 mt-10 overflow-x-auto px-6 pb-4">
            <ul className="flex min-w-max gap-4 snap-x">
              {LATEST_PRODUCTS.map((p, i) => (
                <li
                  key={p.name}
                  className={`snap-start shrink-0 w-[280px] md:w-[320px] parallax-up delay-${(i % 4) + 1}`}
                >
                  <Link
                    href={p.href}
                    className="group block overflow-hidden rounded-2xl bg-appleGray-100 hover-lift"
                  >
                    <div className="aspect-square overflow-hidden bg-white">
                      <HotlinkImage
                        src={p.src}
                        fallback={p.fallback}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-semibold uppercase tracking-widest text-appleBlue">
                        New
                      </p>
                      <p className="mt-1 text-lg font-semibold text-appleGray-900">
                        {p.name}
                      </p>
                      <p className="mt-1 text-sm text-appleGray-700">{p.tagline}</p>
                      <p className="mt-4 text-base font-semibold text-appleGray-900">
                        {p.price}
                      </p>
                      <span className="mt-3 inline-flex items-center text-sm text-appleBlue group-hover:underline">
                        Buy ›
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Trade In + Apple Card — 2-up */}
      <section className="bg-appleGray-100 pb-3">
        <div className="mx-auto grid max-w-appleWide grid-cols-1 gap-3 md:grid-cols-2">
          <article className="reveal overflow-hidden rounded-3xl bg-white p-10 hover-lift">
            <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">
              Apple Trade In
            </p>
            <h3 className="mt-3 headline-lg">
              Get $195–$695 in credit when you trade in iPhone 13 or higher.°
            </h3>
            <div className="mt-6 flex gap-6">
              <Link href="#" className="text-appleBlue text-base hover:underline">
                Get your estimate ›
              </Link>
              <Link href="#" className="text-appleBlue text-base hover:underline">
                Learn more ›
              </Link>
            </div>
          </article>
          <article className="reveal delay-1 overflow-hidden rounded-3xl bg-white p-10 hover-lift">
            <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">
              Apple Card
            </p>
            <h3 className="mt-3 headline-lg">
              Pay over time, interest-free, when you choose Apple Card Monthly Installments.◊
            </h3>
            <div className="mt-6 flex gap-6">
              <Link href="#" className="text-appleBlue text-base hover:underline">
                Apply now ›
              </Link>
              <Link href="#" className="text-appleBlue text-base hover:underline">
                Learn more ›
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Looking for a gift strip */}
      <section className="bg-appleGray-100 pb-3">
        <article className="relative mx-auto max-w-appleWide overflow-hidden rounded-3xl bg-appleGray-200 p-10 text-center reveal">
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">
            Apple Gift Card
          </p>
          <h3 className="mt-3 headline-lg">The gift that takes them anywhere they want to go.</h3>
          <p className="mt-3 text-appleGray-700">
            Use Apple Gift Cards to shop for products and accessories or for App Store, Apple Music, iCloud+, Apple TV+, and more.
          </p>
          <div className="mt-6 flex justify-center gap-6">
            <Link href="#" className="text-appleBlue text-base hover:underline">
              Buy now ›
            </Link>
            <Link href="#" className="text-appleBlue text-base hover:underline">
              Learn more ›
            </Link>
          </div>
        </article>
      </section>

      {/* More reasons to shop with us */}
      <section className="section-light py-24 mt-3">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="headline-lg text-center reveal">
            More reasons to shop with us.
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {VALUE_PROPS.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className={`flex gap-4 reveal delay-${(i % 4) + 1}`}
                >
                  <Icon />
                  <div>
                    <p className="text-lg font-semibold text-appleGray-900">
                      {p.title}
                    </p>
                    <p className="mt-1 text-sm text-appleGray-700">{p.desc}</p>
                    <Link
                      href="#"
                      className="mt-2 inline-block text-sm text-appleBlue hover:underline"
                    >
                      Learn more ›
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Help and services links */}
      <section className="section-gray py-20">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <h2 className="headline-lg reveal">Help is here. Whenever and however you need it.</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {HELP_LINKS.map((l, i) => (
              <Link
                key={l.label}
                href={l.href}
                className={`rounded-full bg-white px-6 py-3 text-sm font-medium text-appleGray-900 hover:bg-appleGray-200 reveal delay-${(i % 4) + 1}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* --------------------------------- Icons --------------------------------- */

function ChatIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-appleBlue" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 110 .75.375.375 0 010-.75zm0 0H8.25m.375 0h.375m4.5 0a.375.375 0 110 .75.375.375 0 010-.75zm0 0H12m.375 0h.375m4.5 0a.375.375 0 110 .75.375.375 0 010-.75zm0 0h-.375m.375 0h.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-appleBlue" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
    </svg>
  );
}

function PersonalIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-appleBlue" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-appleBlue" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-appleBlue" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
    </svg>
  );
}

function TradeInIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-appleBlue" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-appleBlue" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-appleBlue" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
