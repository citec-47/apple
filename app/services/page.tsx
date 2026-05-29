import Link from "next/link";
import HotlinkImage from "@/components/HotlinkImage";
import { img } from "@/lib/img";

const APPLE = "https://www.apple.com";

// Real apple.com CDN images (wrapped in HotlinkImage with fallbacks).
const IMG_APPLE_ONE_LOGO = `${APPLE}/v/services/j/images/services/overview/services/apple-one-banner/logo_apple_one__cftfcy53dtsi_large.png`;
const IMG_CHICLET_MUSIC = `${APPLE}/v/services/j/images/services/overview/services/apple-one-banner/chiclet_music__czz4szrg9qc2_large.png`;
const IMG_CHICLET_TV = `${APPLE}/v/services/j/images/services/overview/services/apple-one-banner/chiclet_apple_tv__e3uyhyy0a4sy_large.png`;
const IMG_CHICLET_ARCADE = `${APPLE}/v/services/j/images/services/overview/services/apple-one-banner/chiclet_arcade__pg8i0s94i322_large.png`;
const IMG_CHICLET_NEWS = `${APPLE}/v/services/j/images/services/overview/services/apple-one-banner/chiclet_news__ftl0tja5yv2i_large.png`;
const IMG_CHICLET_FITNESS = `${APPLE}/v/services/j/images/services/overview/services/apple-one-banner/chiclet_activity__glcodp6au92e_large.png`;
const IMG_CHICLET_ICLOUD = `${APPLE}/v/services/j/images/services/overview/services/apple-one-banner/chiclet_icloud__cg2fz3fj3nau_large.png`;

const IMG_TV_HERO = `${APPLE}/v/services/j/images/services/overview/services/service-headers/services_tv_startframe__dsqpuhmpr9aq_large.jpg`;
const IMG_MUSIC_HERO = `${APPLE}/v/services/j/images/services/overview/services/service-headers/music_2024_startframe__gkhou3rh32um_large.jpg`;
const IMG_ARCADE_HERO = `${APPLE}/v/services/j/images/services/overview/services/service-headers/arcade_startframe_2024__cb6o2uwuqpaq_xlarge.jpg`;
const IMG_FITNESS_HERO = `${APPLE}/v/services/j/images/services/overview/services/service-headers/hero_services_startframe__buktptg7pn36_large.jpg`;

const IMG_APPLE_ONE_LOGOS = `${APPLE}/v/services/j/images/services/overview/apple-one/apple_services_logos__egjjf8y4n4sy_large.png`;
const IMG_APPLE_ONE_BANNER = `${APPLE}/v/services/j/images/services/overview/apple-one/apple_services_apple_one__b80olquewa2u_large.png`;

interface Service {
  eyebrow: string;
  logoSrc?: string;
  headline: string;
  description: string;
  ctas: { label: string; primary?: boolean }[];
  heroSrc: string;
  theme?: "light" | "dark";
  bgClass?: string;
}

const SERVICES: Service[] = [
  {
    eyebrow: "Apple TV",
    headline: "Stream award-winning Apple Originals on every screen.",
    description:
      "Severance. Silo. Foundation. Slow Horses. Shrinking. The Studio. Original series and films you'll only find on Apple TV — included with Apple One.",
    ctas: [
      { label: "Try it free", primary: true },
      { label: "Learn more", primary: false },
    ],
    heroSrc: IMG_TV_HERO,
    theme: "dark",
    bgClass: "bg-black",
  },
  {
    eyebrow: "Apple Music",
    headline: "All music. Highest audio quality. Zero ads.",
    description:
      "Over 100 million songs streaming in Lossless and Spatial Audio — plus curated playlists, live radio and music videos. Bundle it with Apple One.",
    ctas: [
      { label: "Try it free", primary: true },
      { label: "Learn more", primary: false },
    ],
    heroSrc: IMG_MUSIC_HERO,
    theme: "dark",
    bgClass: "bg-[#fa5862]",
  },
  {
    eyebrow: "Apple Arcade",
    headline: "The best collection of mobile games, now in the Apple Games app.",
    description:
      "Hundreds of premium games with no ads and no in-app purchases — playable on iPhone, iPad, Mac and Apple TV. Bundle with Apple One.",
    ctas: [
      { label: "Get the app", primary: true },
      { label: "Learn more", primary: false },
    ],
    heroSrc: IMG_ARCADE_HERO,
    theme: "dark",
    bgClass: "bg-gradient-to-br from-[#5d4cf0] to-[#2c1f7c]",
  },
  {
    eyebrow: "Apple Fitness+",
    headline: "From Strength to Meditation, there's something for everyone.",
    description:
      "Studio-quality workouts and guided meditations led by world-class trainers — with metrics from Apple Watch right on screen. Bundle with Apple One.",
    ctas: [
      { label: "Try it free", primary: true },
      { label: "Learn more", primary: false },
    ],
    heroSrc: IMG_FITNESS_HERO,
    theme: "dark",
    bgClass: "bg-[#0d1f3c]",
  },
  {
    eyebrow: "Apple News+",
    headline:
      "Hundreds of magazines and leading newspapers. One subscription.",
    description:
      "Top stories, deep features and Audio Stories — curated from the publications you already love. Bundle with Apple One.",
    ctas: [
      { label: "Try it free", primary: true },
      { label: "Learn more", primary: false },
    ],
    heroSrc: img(1600, 900, "Apple News+", "light"),
    theme: "light",
    bgClass: "bg-appleGray-100",
  },
  {
    eyebrow: "Apple Podcasts",
    headline:
      "Millions of shows, from the biggest names to the best independents.",
    description:
      "Discover, subscribe and listen to the podcasts you love — with personalized recommendations, full transcripts and chapter playback.",
    ctas: [
      { label: "Open the app", primary: true },
      { label: "Learn more", primary: false },
    ],
    heroSrc: img(1600, 900, "Apple Podcasts", "light"),
    theme: "light",
    bgClass: "bg-appleGray-100",
  },
  {
    eyebrow: "Apple Books",
    headline: "Read, listen, discover. All in one place.",
    description:
      "Millions of books and audiobooks, with reading goals, distraction-free pages and stunning typography across iPhone, iPad and Mac.",
    ctas: [
      { label: "Open the app", primary: true },
      { label: "Learn more", primary: false },
    ],
    heroSrc: img(1600, 900, "Apple Books", "light"),
    theme: "light",
    bgClass: "bg-appleGray-100",
  },
];

const CHICLETS = [
  { src: IMG_CHICLET_MUSIC, alt: "Apple Music" },
  { src: IMG_CHICLET_TV, alt: "Apple TV" },
  { src: IMG_CHICLET_ARCADE, alt: "Apple Arcade" },
  { src: IMG_CHICLET_NEWS, alt: "Apple News+" },
  { src: IMG_CHICLET_FITNESS, alt: "Apple Fitness+" },
  { src: IMG_CHICLET_ICLOUD, alt: "iCloud+" },
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero intro */}
      <section className="section-light pt-20 pb-12">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <h1 className="headline-xl reveal max-w-4xl mx-auto">
            Meet the A-list of entertainment.
          </h1>
          <p className="mt-6 text-lg text-appleGray-700 leading-relaxed max-w-3xl mx-auto reveal delay-1">
            Award-winning movies. Binge-worthy shows. Music mastered in Spatial Audio.
            The most epic collection of mobile games. And the world&apos;s largest library
            of 4K Ultra HD fitness content.
          </p>
        </div>
      </section>

      {/* Apple One bundle promo strip */}
      <section className="bg-appleGray-100 py-12">
        <div className="mx-auto max-w-appleWide px-6">
          <article className="rounded-3xl bg-gradient-to-br from-[#3a3a45] to-[#1d1d1f] p-10 text-white reveal">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div>
                <HotlinkImage
                  src={IMG_APPLE_ONE_LOGO}
                  fallback={img(300, 80, "Apple One", "dark")}
                  alt="Apple One"
                  className="h-12 w-auto"
                  loading="eager"
                />
                <h2 className="mt-4 headline-lg">
                  Get up to six services in one subscription with Apple One.
                </h2>
                <Link
                  href="#"
                  className="mt-6 inline-block text-base text-white hover:underline"
                >
                  Learn more ›
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {CHICLETS.map((c) => (
                  <div
                    key={c.alt}
                    className="aspect-square overflow-hidden rounded-2xl bg-white/5 p-3"
                  >
                    <HotlinkImage
                      src={c.src}
                      fallback={img(200, 200, c.alt, "dark")}
                      alt={c.alt}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Service hero sections — stacked, each with Ken Burns animated hero */}
      {SERVICES.map((s, i) => {
        const dark = s.theme === "dark";
        return (
          <section
            key={s.eyebrow}
            className={`relative overflow-hidden ${s.bgClass} reveal`}
          >
            <div className="absolute inset-0">
              <HotlinkImage
                src={s.heroSrc}
                fallback={img(1600, 900, s.eyebrow, dark ? "dark" : "light")}
                alt={s.eyebrow}
                className="h-full w-full object-cover ken-burns opacity-90"
                loading={i === 0 ? "eager" : "lazy"}
              />
              {dark && <div className="absolute inset-0 bg-black/30" />}
            </div>
            <div
              className={`relative z-10 mx-auto flex max-w-appleWide flex-col items-center px-6 py-24 text-center md:py-32 ${
                dark ? "text-white" : "text-appleGray-900"
              }`}
            >
              <p className="text-sm font-semibold uppercase tracking-widest opacity-90">
                {s.eyebrow}
              </p>
              <h2 className="mt-3 headline-xl max-w-3xl">{s.headline}</h2>
              <p
                className={`mt-4 max-w-2xl text-base leading-relaxed ${
                  dark ? "text-white/90" : "text-appleGray-700"
                }`}
              >
                {s.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                {s.ctas.map((c) =>
                  c.primary ? (
                    <Link
                      key={c.label}
                      href="#"
                      className="btn-pill btn-pill-primary"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <Link
                      key={c.label}
                      href="#"
                      className={`text-base hover:underline ${
                        dark ? "text-white" : "text-appleBlue"
                      }`}
                    >
                      {c.label} ›
                    </Link>
                  )
                )}
              </div>
            </div>
          </section>
        );
      })}

      {/* Apple One detail showcase */}
      <section className="bg-appleGray-100 py-24">
        <div className="mx-auto max-w-appleWide px-6">
          <article className="overflow-hidden rounded-3xl bg-white p-10 reveal">
            <div className="text-center">
              <HotlinkImage
                src={IMG_APPLE_ONE_LOGO}
                fallback={img(300, 80, "Apple One", "light")}
                alt="Apple One"
                className="mx-auto h-12 w-auto"
                loading="lazy"
              />
              <h2 className="mt-6 headline-lg max-w-2xl mx-auto">
                One subscription for all the Apple services you love.
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-appleGray-700">
                Bundle Apple Music, Apple Fitness+, Apple TV, Apple News+, Apple Arcade and iCloud+ — save every month versus subscribing separately.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="#" className="btn-pill btn-pill-primary">
                  Try Apple One free
                </Link>
                <Link href="#" className="text-base text-appleBlue hover:underline">
                  Learn more ›
                </Link>
              </div>
            </div>
            <div className="mt-12 rounded-2xl overflow-hidden">
              <HotlinkImage
                src={IMG_APPLE_ONE_BANNER}
                fallback={img(1400, 600, "Apple One bundle", "light")}
                alt="Apple One bundle"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="mt-8 grid grid-cols-6 gap-4">
              {CHICLETS.map((c) => (
                <div
                  key={c.alt}
                  className="aspect-square overflow-hidden rounded-2xl bg-appleGray-100 p-3"
                >
                  <HotlinkImage
                    src={c.src}
                    fallback={img(200, 200, c.alt, "light")}
                    alt={c.alt}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
