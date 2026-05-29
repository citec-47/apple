import Link from "next/link";
import HotlinkImage from "@/components/HotlinkImage";
import { img } from "@/lib/img";

const APPLE = "https://www.apple.com";

// Real apple.com CDN images, with placeholder fallbacks via HotlinkImage.
const IMG_HOMEPOD = `${APPLE}/v/tv-home/q/images/overview/homepod__eam53jjm772a_large.jpg`;
const IMG_HOMEPOD_MINI = `${APPLE}/v/tv-home/q/images/overview/room_filling_sound__zagu3551kwyi_large.jpg`;
const IMG_APPLE_TV_4K = `${APPLE}/v/tv-home/q/images/overview/apple_tv_4k__b30wcqp0pdle_large.jpg`;
const IMG_HOME_APP = `${APPLE}/v/tv-home/q/images/overview/homeapp__cpc1k972xys2_large.jpg`;
const IMG_SMART_CONTROL = `${APPLE}/v/tv-home/q/images/overview/smart_control__dsa6v8m1pp0m_large.jpg`;
const IMG_SMART_CONNECT = `${APPLE}/v/tv-home/q/images/overview/smart_connect__d8o6agoqfh0m_large.jpg`;
const IMG_SECURITY_PRIVACY = `${APPLE}/v/tv-home/q/images/overview/security_and_privacy__bzlguj2x29jm_large.jpg`;
const IMG_LIGHTING = `${APPLE}/v/tv-home/q/images/overview/lighting__bwpnaru6q1w2_large.jpg`;
const IMG_SECURITY = `${APPLE}/v/tv-home/q/images/overview/security__dbctk5zp4gcy_large.jpg`;
const IMG_COMFORT = `${APPLE}/v/tv-home/q/images/overview/comfort__bnwbuouyz10i_large.jpg`;
const IMG_ENTRY = `${APPLE}/v/tv-home/q/images/overview/entry__bfom4g78kbg2_large.jpg`;
const IMG_TV_HARDWARE = `${APPLE}/v/tv-home/q/images/overview/apple_experience_hardware__bk2gaiiovh7m_large.png`;
const IMG_TV_SCREEN = `${APPLE}/v/tv-home/q/images/overview/apple_experience_screen__cdy675zpp2uq_large.jpg`;

const SUB_NAV = [
  { label: "Apple TV 4K", href: "#" },
  { label: "Apple TV app", href: "#" },
  { label: "Apple TV+", href: "#" },
  { label: "HomePod", href: "#" },
  { label: "HomePod mini", href: "#" },
  { label: "Home app", href: "#" },
  { label: "Accessories", href: "#" },
];

const SMART_HOME = [
  {
    title: "Easily control your home from anywhere with your favorite devices.",
    cta: "Learn more about the Home app",
    src: IMG_SMART_CONTROL,
  },
  {
    title: "Seamlessly connected entertainment in every room.",
    cta: "Learn more about HomePod",
    src: IMG_SMART_CONNECT,
  },
  {
    title: "Run it all with your voice.",
    cta: "Learn more about Siri",
    voiceExamples: [
      "Hey Siri, set my bedtime scene.",
      "Hey Siri, make it warmer.",
      "Hey Siri, turn off the lights downstairs.",
    ],
  },
  {
    title: "All with the security and privacy of Apple.",
    cta: "Learn more about Privacy",
    src: IMG_SECURITY_PRIVACY,
  },
];

const ACCESSORIES = [
  {
    eyebrow: "Lighting",
    title: "Put your routine on a timer. Or set the mood with bulbs and switches.",
    featured: "Featured: Nanoleaf A19 Bulb",
    cta: "Shop Lights & Bulbs, Outlets, and Switches ›",
    src: IMG_LIGHTING,
  },
  {
    eyebrow: "Security",
    title: "Keep an eye on what matters most with cameras, doorbells, and more.",
    featured: "Featured: Logitech Circle View Wired Doorbell",
    cta: "Shop Cameras and Sensors ›",
    src: IMG_SECURITY,
  },
  {
    eyebrow: "Comfort",
    title: "Turn up the heat or keep your cool with temperature controls and fans.",
    featured: "Featured: ecobee Smart Thermostat Premium",
    cta: "Shop Thermostats ›",
    src: IMG_COMFORT,
  },
  {
    eyebrow: "Entry",
    title: "Unlock more ways to access your home.",
    featured: "Featured: Level Lock+ with Home Key Support",
    cta: "Shop Sensors and Locks ›",
    src: IMG_ENTRY,
  },
];

const SERVICES = [
  {
    eyebrow: "Apple TV+",
    title: "Stream award-winning Apple Originals on every screen.",
    ctas: [
      { label: "Try it free", primary: true },
      { label: "Learn more ›", primary: false },
    ],
    bg: "bg-appleGray-100",
  },
  {
    eyebrow: "Apple Music",
    title: "All music. Highest audio quality. Zero ads.",
    ctas: [
      { label: "Try it free", primary: true },
      { label: "Learn more ›", primary: false },
    ],
    bg: "bg-appleGray-100",
  },
  {
    eyebrow: "Apple Arcade",
    title: "Best collection of mobile games for every player.",
    ctas: [
      { label: "Get started", primary: true },
      { label: "Learn more ›", primary: false },
    ],
    bg: "bg-appleGray-100",
  },
  {
    eyebrow: "Apple Fitness+",
    title: "From HIIT to Meditation, there's something for everyone.",
    ctas: [
      { label: "Try it free", primary: true },
      { label: "Learn more ›", primary: false },
    ],
    bg: "bg-appleGray-100",
  },
];

const FOOTER_CARDS = [
  {
    title: "Fast, free delivery",
    body: "Or pick up available items at an Apple Store.",
    cta: "Learn more ›",
  },
  {
    title: "Get help buying",
    body: "Have a question? Call a Specialist or chat online.",
    cta: "Contact us ›",
  },
];

export default function TVHomePage() {
  return (
    <div className="bg-white">
      {/* Sub-nav */}
      <nav className="border-b border-appleGray-200 bg-white">
        <div className="mx-auto flex max-w-appleWide items-center overflow-x-auto px-6 py-3 text-sm">
          <Link href="/tv" className="pr-6 font-semibold text-appleGray-900">
            TV &amp; Home
          </Link>
          <ul className="flex flex-1 items-center gap-6">
            {SUB_NAV.map((item) => (
              <li key={item.label} className="whitespace-nowrap">
                <Link href={item.href} className="text-appleGray-700 hover:text-appleGray-900">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero — HomePod */}
      <section className="section-light pt-16 pb-12">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <p className="text-base font-semibold text-appleGray-900 reveal">HomePod</p>
          <h1 className="mt-3 headline-xl reveal delay-1">Profound sound.</h1>
          <div className="mt-6 flex flex-wrap justify-center gap-6 reveal delay-2">
            <Link href="#" className="btn-pill btn-pill-primary">Buy</Link>
            <Link href="#" className="text-appleBlue text-base hover:underline">Learn more ›</Link>
          </div>
          <div className="mt-12 reveal delay-3">
            <HotlinkImage
              src={IMG_HOMEPOD}
              fallback={img(1600, 900, "HomePod", "light")}
              alt="HomePod"
              className="mx-auto w-full max-w-4xl rounded-2xl"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Hero — HomePod mini */}
      <section className="section-light pt-16 pb-12">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <p className="text-base font-semibold text-appleGray-900 reveal">HomePod mini</p>
          <h2 className="mt-3 headline-xl reveal delay-1">Surprising sound for its size.</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-6 reveal delay-2">
            <Link href="#" className="btn-pill btn-pill-primary">Buy</Link>
            <Link href="#" className="text-appleBlue text-base hover:underline">Learn more ›</Link>
          </div>
          <div className="mt-12 reveal delay-3">
            <HotlinkImage
              src={IMG_HOMEPOD_MINI}
              fallback={img(1600, 900, "HomePod mini", "light")}
              alt="HomePod mini"
              className="mx-auto w-full max-w-4xl rounded-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Hero — Apple TV 4K */}
      <section className="section-light pt-16 pb-12">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <p className="text-base font-semibold text-appleGray-900 reveal">Apple TV 4K</p>
          <h2 className="mt-3 headline-xl reveal delay-1">
            The Apple experience. Cinematic in every sense.
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-6 reveal delay-2">
            <Link href="#" className="btn-pill btn-pill-primary">Buy</Link>
            <Link href="#" className="text-appleBlue text-base hover:underline">Learn more ›</Link>
          </div>
          <div className="mt-12 reveal delay-3">
            <HotlinkImage
              src={IMG_APPLE_TV_4K}
              fallback={img(1600, 900, "Apple TV 4K", "light")}
              alt="Apple TV 4K"
              className="mx-auto w-full max-w-4xl rounded-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Hero — Home app */}
      <section className="section-light pt-16 pb-12">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <p className="text-base font-semibold text-appleGray-900 reveal">Home app</p>
          <h2 className="mt-3 headline-xl reveal delay-1">
            The foundation for a smarter home.
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-6 reveal delay-2">
            <Link href="#" className="text-appleBlue text-base hover:underline">Learn more ›</Link>
          </div>
          <div className="mt-12 reveal delay-3">
            <HotlinkImage
              src={IMG_HOME_APP}
              fallback={img(1600, 900, "Home app", "light")}
              alt="Home app"
              className="mx-auto w-full max-w-4xl rounded-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Smart Home benefits — 4-up */}
      <section className="section-gray py-24">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="headline-lg text-center reveal max-w-3xl mx-auto">
            A smarter home, all in one place.
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {SMART_HOME.map((card, i) => (
              <article
                key={card.title}
                className={`rounded-3xl bg-white p-8 hover-lift parallax-up delay-${(i % 4) + 1}`}
              >
                {card.src && (
                  <div className="overflow-hidden rounded-2xl mb-6">
                    <HotlinkImage
                      src={card.src}
                      fallback={img(800, 500, card.title.slice(0, 20), "light")}
                      alt={card.title}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                )}
                {card.voiceExamples && (
                  <div className="rounded-2xl bg-appleGray-100 p-6 mb-6 space-y-3">
                    {card.voiceExamples.map((v) => (
                      <p key={v} className="text-base text-appleGray-700 italic">
                        &ldquo;{v}&rdquo;
                      </p>
                    ))}
                  </div>
                )}
                <h3 className="text-xl font-semibold text-appleGray-900">{card.title}</h3>
                <Link
                  href="#"
                  className="mt-4 inline-block text-sm text-appleBlue hover:underline"
                >
                  {card.cta} ›
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Accessories showcase */}
      <section className="section-light py-24">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="headline-lg text-center reveal">
            Add to your home with these standout accessories.
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {ACCESSORIES.map((a, i) => (
              <article
                key={a.eyebrow}
                className={`overflow-hidden rounded-3xl bg-appleGray-100 hover-lift parallax-up delay-${(i % 4) + 1}`}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <HotlinkImage
                    src={a.src}
                    fallback={img(800, 500, a.eyebrow, "light")}
                    alt={a.eyebrow}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-8">
                  <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">
                    {a.eyebrow}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-appleGray-900">{a.title}</h3>
                  <p className="mt-3 text-sm text-appleGray-700">{a.featured}</p>
                  <Link
                    href="#"
                    className="mt-4 inline-block text-sm text-appleBlue hover:underline"
                  >
                    {a.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Apple TV experience showcase */}
      <section className="section-dark py-24">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-center">
            <div className="reveal">
              <h2 className="headline-lg text-white">
                Watch, sing, play, and work out. On the big screen.
              </h2>
              <p className="mt-6 text-appleGray-300 leading-relaxed">
                Apple TV 4K turns your living room into the place for streaming, karaoke, gaming and guided workouts &mdash; all in one box, with Siri Remote in hand and your iPhone bringing it all together.
              </p>
            </div>
            <div className="parallax-up rounded-3xl overflow-hidden">
              <HotlinkImage
                src={IMG_TV_SCREEN}
                fallback={img(800, 600, "Apple TV experience", "dark")}
                alt="Apple TV experience"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 reveal delay-1 max-w-2xl mx-auto">
            <p className="text-center text-sm text-appleGray-300">The Studio</p>
            <p className="text-center text-sm text-appleGray-300">WHAT THE CLASH?</p>
            <p className="text-center text-sm text-appleGray-300">HIIT with Bakari</p>
          </div>
          <div className="mt-10 mx-auto max-w-md">
            <HotlinkImage
              src={IMG_TV_HARDWARE}
              fallback={img(600, 400, "Apple TV hardware", "dark")}
              alt="Apple TV hardware"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Services — 4 promo cards */}
      <section className="section-light py-24">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <article
                key={s.eyebrow}
                className={`rounded-3xl ${s.bg} p-8 text-center hover-lift parallax-up delay-${(i % 4) + 1}`}
              >
                <p className="text-sm font-semibold text-appleGray-900">{s.eyebrow}</p>
                <h3 className="mt-3 text-base font-semibold text-appleGray-900">{s.title}</h3>
                <div className="mt-6 flex flex-col items-center gap-3">
                  {s.ctas.map((c) => (
                    <Link
                      key={c.label}
                      href="#"
                      className={
                        c.primary
                          ? "btn-pill btn-pill-primary text-xs px-4 py-2"
                          : "text-xs text-appleBlue hover:underline"
                      }
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer trust cards */}
      <section className="section-gray py-16">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {FOOTER_CARDS.map((c, i) => (
              <article
                key={c.title}
                className={`rounded-2xl bg-white p-8 hover-lift reveal delay-${i + 1}`}
              >
                <h3 className="text-lg font-semibold text-appleGray-900">{c.title}</h3>
                <p className="mt-2 text-sm text-appleGray-700">{c.body}</p>
                <Link
                  href="#"
                  className="mt-4 inline-block text-sm text-appleBlue hover:underline"
                >
                  {c.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
