import Link from "next/link";
import HotlinkImage from "@/components/HotlinkImage";
import GetToKnowMac, { type Topic } from "@/components/GetToKnowMac";
import LineupCarousel, { type LineupModel } from "@/components/LineupCarousel";
import { img } from "@/lib/img";

const APPLE = "https://www.apple.com";

// Real apple.com CDN images, with placeholder fallbacks via HotlinkImage.
const IMG_MAX_HERO = `${APPLE}/v/airpods/ae/images/overview/airpods_max_purple__d9y3g3n7cnyq_large.png`;
const IMG_PRO_HERO = `${APPLE}/v/airpods/ae/images/overview/hero_endframe__calpooy4ucr6_large.jpg`;
const IMG_4_HERO = `${APPLE}/v/airpods/ae/images/overview/hero__gb4d3fd8jnu6_large.jpg`;
const IMG_HEART_RATE = `${APPLE}/v/airpods/ae/images/overview/consider/card_heart_rate_sensing__exas9s71qo4m_large.jpg`;
const IMG_LIVE_TRANSLATION = `${APPLE}/v/airpods/ae/images/overview/consider/card_live_translation__ep68h9wscbee_large.jpg`;
const IMG_ANC = `${APPLE}/v/airpods/ae/images/overview/consider/card_noise_cancellation__bcl69t06noci_large.jpg`;
const IMG_HEARING = `${APPLE}/v/airpods/ae/images/overview/consider/card_hearing_health__ss2uxyv3j5m6_large.jpg`;
const IMG_SPATIAL = `${APPLE}/v/airpods/ae/images/overview/consider/card_personalized_spatial_audio__d9ghs2utja82_large.jpg`;
const IMG_MUSIC = `${APPLE}/v/airpods/ae/images/overview/music/music_album_stack__bi4gk5n0vwb6_large.png`;

const MODELS: LineupModel[] = [
  {
    id: "airpods-4",
    name: "AirPods 4",
    tagline: "The next evolution of sound and comfort.",
    colors: [],
    src: IMG_4_HERO,
    fallback: img(800, 600, "AirPods 4", "light"),
    href: "#",
    price: "From $129",
    monthly: "or $10.75/mo. for 12 mo.◊",
  },
  {
    id: "airpods-4-anc",
    name: "AirPods 4 with Active Noise Cancellation",
    tagline: "The next evolution of sound, comfort, and noise control.",
    colors: [],
    src: IMG_4_HERO,
    fallback: img(800, 600, "AirPods 4 with ANC", "light"),
    href: "#",
    price: "From $179",
    monthly: "or $14.91/mo. for 12 mo.◊",
  },
  {
    id: "airpods-pro-3",
    name: "AirPods Pro 3",
    tagline:
      "The world's best in-ear Active Noise Cancellation, with heart rate sensing during workouts.",
    colors: [],
    src: IMG_PRO_HERO,
    fallback: img(800, 600, "AirPods Pro 3", "light"),
    href: "#",
    price: "$249",
    monthly: "or $20.75/mo. for 12 mo.◊",
  },
  {
    id: "airpods-max-2",
    name: "AirPods Max 2",
    tagline: "The ultimate over-ear personal listening experience.",
    isNew: true,
    colors: ["#a563b9", "#c8a8d4", "#e8884f", "#4a6f9e", "#1d1d1f"],
    src: IMG_MAX_HERO,
    fallback: img(800, 600, "AirPods Max 2", "light"),
    href: "#",
    price: "$549",
    monthly: "or $45.75/mo. for 12 mo.◊",
  },
];

// Feature cards — Get to know AirPods
const FEATURES: Topic[] = [
  {
    title: "Heart Rate Sensing",
    sub: "Track your heart rate during workouts.",
    bg: "#c54a6a",
    src: IMG_HEART_RATE,
    fallback: img(600, 800, "Heart Rate Sensing", "dark"),
    blocks: [
      {
        heading: "Invisible-light pulses, 256 times a second.",
        body:
          "Tiny LEDs project light into your ear and read your heart rate from blood-flow changes. Combined with the on-board accelerometers, AirPods Pro 3 reports accurate cardio data from the treadmill to the trail.",
        image: { src: IMG_HEART_RATE, fallback: IMG_HEART_RATE, alt: "Heart rate sensing" },
      },
      {
        heading: "Workout-ready.",
        body:
          "Start a workout from your Apple Watch or iPhone and your AirPods quietly feed live heart-rate and calorie data into the same session.",
      },
      {
        heading: "No extra wearable required.",
        body:
          "If you don't have an Apple Watch, AirPods Pro 3 alone can give you reliable cardio data — perfect for runs, cycles, and gym sessions.",
      },
    ],
  },
  {
    title: "Live Translation",
    sub: "Easily communicate across languages.",
    bg: "#3c8bcc",
    src: IMG_LIVE_TRANSLATION,
    fallback: img(600, 800, "Live Translation", "light"),
    blocks: [
      {
        heading: "Real-time, both ways.",
        body:
          "Have a conversation in another language and hear it translated into your language in your AirPods — while your iPhone displays your reply in theirs.",
        image: { src: IMG_LIVE_TRANSLATION, fallback: IMG_LIVE_TRANSLATION, alt: "Live Translation" },
      },
      {
        heading: "Works with AirPods Max 2, Pro 3, or 4 with ANC.",
        body:
          "The supported AirPods models hand off audio to your iPhone, which does the translation work, then routes the spoken result back to your ear.",
      },
    ],
  },
  {
    title: "Active Noise Cancellation",
    sub: "Control what you hear. And what you don't.",
    bg: "#1d1d1f",
    src: IMG_ANC,
    fallback: img(600, 800, "Active Noise Cancellation", "dark"),
    blocks: [
      {
        heading: "Quiet on demand.",
        body:
          "Active Noise Cancellation mutes ambient noise so you can focus, sleep on a flight, or just listen to music the way it was meant to sound.",
        image: { src: IMG_ANC, fallback: IMG_ANC, alt: "Active Noise Cancellation" },
      },
      {
        heading: "Transparency, when you need it.",
        body:
          "Tap and switch to Transparency mode to hear voices, traffic and announcements naturally — without taking your AirPods out.",
      },
      {
        heading: "Adaptive Audio blends the two.",
        body:
          "Adaptive Audio dynamically mixes ANC and Transparency based on what's around you, so your AirPods adjust without you thinking about it.",
      },
    ],
  },
  {
    title: "Hearing Health",
    sub: "Keep in touch with your hearing.",
    bg: "#1f5f5a",
    src: IMG_HEARING,
    fallback: img(600, 800, "Hearing Health", "light"),
    blocks: [
      {
        heading: "Take a Hearing Test on AirPods Pro 3.",
        body:
          "A scientifically validated test runs right in your ears and gives you a personal hearing profile — backed by clinical research.",
        image: { src: IMG_HEARING, fallback: IMG_HEARING, alt: "Hearing Health" },
      },
      {
        heading: "Hearing Aid feature.",
        body:
          "Use AirPods Pro 3 as a clinical-grade over-the-counter hearing aid for mild to moderate hearing loss, with improved voice clarity and longer battery life in Transparency.",
      },
      {
        heading: "Hearing Protection.",
        body:
          "AirPods automatically reduce exposure to loud environmental noise like concerts, traffic and machinery — without blocking the sounds you want to hear.",
      },
    ],
  },
  {
    title: "Personalized Spatial Audio",
    sub: "Immersive sound. Fine-tuned to you.",
    bg: "#a463f2",
    src: IMG_SPATIAL,
    fallback: img(600, 800, "Personalized Spatial Audio", "light"),
    blocks: [
      {
        heading: "Sound that surrounds.",
        body:
          "Personalized Spatial Audio uses the geometry of your ears to render a 3D soundstage tuned just to you — so music, movies and games feel like they're playing in the room around you.",
        image: { src: IMG_SPATIAL, fallback: IMG_SPATIAL, alt: "Personalized Spatial Audio" },
      },
      {
        heading: "Dynamic head tracking.",
        body:
          "Move your head and the audio anchors to the screen, so dialog stays in front of you and effects move accurately.",
      },
    ],
  },
];

const BENEFITS = [
  {
    title: "Fast delivery or pickup",
    body: "Two-hour delivery from an Apple Store, free standard delivery, or in-store pickup — your call.",
    cta: "Learn more",
  },
  {
    title: "Pay monthly at 0% APR",
    body: "Split your purchase into equal monthly payments at checkout with Apple Card Monthly Installments.◊",
    cta: "Learn more",
  },
  {
    title: "Get help buying",
    body: "Talk to a Specialist by phone or chat to pick the right AirPods for how you'll use them.",
    cta: "Contact us",
  },
  {
    title: "Make them yours",
    body: "Engrave initials, a meaningful number or your favorite emoji on AirPods — free, only at Apple.",
    cta: "Learn more",
  },
];

export default function AirPodsPage() {
  return (
    <div className="bg-white">
      {/* Promotional banner */}
      <section className="bg-appleGray-100 py-3 text-center text-sm">
        <p>
          <span className="font-semibold text-appleGray-900">
            Get a new Apple Card. Buy AirPods Pro 3 at Apple.
          </span>{" "}
          Earn back the cost, up to $250 Daily Cash.{" "}
          <Link href="#" className="text-appleBlue hover:underline">
            Learn more ›
          </Link>
        </p>
      </section>

      {/* Hero — AirPods Max 2 */}
      <section className="section-light pt-16 pb-12">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <p className="text-base font-semibold text-appleGray-900 reveal">AirPods Max 2</p>
          <h1 className="mt-3 headline-xl reveal delay-1">
            New intelligent features. More immersive listening.
          </h1>
          <div className="mt-6 flex flex-wrap justify-center gap-6 reveal delay-2">
            <Link href="#" className="btn-pill btn-pill-primary">Learn more</Link>
            <Link href="#" className="text-appleBlue text-base hover:underline">Buy ›</Link>
          </div>
          <div className="mt-12 reveal delay-3">
            <HotlinkImage
              src={IMG_MAX_HERO}
              fallback={img(1600, 900, "AirPods Max 2", "light")}
              alt="AirPods Max 2"
              className="mx-auto w-full max-w-3xl"
              loading="eager"
            />
            <div className="mt-6 flex justify-center gap-3">
              {["#a563b9", "#c8a8d4", "#e8884f", "#4a6f9e", "#1d1d1f"].map((c) => (
                <span
                  key={c}
                  className="inline-block h-5 w-5 rounded-full ring-1 ring-appleGray-300"
                  style={{ backgroundColor: c }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero — AirPods Pro 3 */}
      <section className="section-light pt-16 pb-12">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <p className="text-base font-semibold text-appleGray-900 reveal">AirPods Pro 3</p>
          <h2 className="mt-3 headline-xl reveal delay-1">
            The world&apos;s best in-ear Active Noise Cancellation.
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-6 reveal delay-2">
            <Link href="#" className="btn-pill btn-pill-primary">Learn more</Link>
            <Link href="#" className="text-appleBlue text-base hover:underline">Buy ›</Link>
          </div>
          <div className="mt-12 reveal delay-3">
            <HotlinkImage
              src={IMG_PRO_HERO}
              fallback={img(1600, 900, "AirPods Pro 3", "light")}
              alt="AirPods Pro 3"
              className="mx-auto w-full max-w-3xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Hero — AirPods 4 */}
      <section className="section-light pt-16 pb-12">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <p className="text-base font-semibold text-appleGray-900 reveal">AirPods 4</p>
          <h2 className="mt-3 headline-xl reveal delay-1">Iconic. Now supersonic.</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-6 reveal delay-2">
            <Link href="#" className="btn-pill btn-pill-primary">Learn more</Link>
            <Link href="#" className="text-appleBlue text-base hover:underline">Buy ›</Link>
          </div>
          <div className="mt-12 reveal delay-3">
            <HotlinkImage
              src={IMG_4_HERO}
              fallback={img(1600, 900, "AirPods 4", "light")}
              alt="AirPods 4"
              className="mx-auto w-full max-w-3xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Compare the lineup */}
      <section className="section-gray py-20">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="flex items-end justify-between gap-6 reveal">
            <h2 className="headline-lg max-w-xl">Pick your perfect AirPods.</h2>
            <Link href="#" className="hidden text-base text-appleBlue hover:underline md:inline-block">
              Compare all models ›
            </Link>
          </div>
          <div className="mt-10">
            <LineupCarousel models={MODELS} />
          </div>
        </div>
      </section>

      {/* Get to know AirPods — modal carousel */}
      <GetToKnowMac topics={FEATURES} title="Get to know AirPods." />

      {/* Apple Music offer strip */}
      <section className="bg-appleGray-100 py-20">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div className="reveal">
              <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">
                Apple Music
              </p>
              <h2 className="mt-3 headline-lg">
                Get 3 months of Apple Music free with your AirPods.
              </h2>
              <p className="mt-4 text-appleGray-700">
                Pair any new AirPods with your iPhone or iPad and a 3-month Apple Music subscription is on us.
                Stream over 100 million songs in Lossless and Spatial Audio.°
              </p>
              <Link href="#" className="mt-6 inline-block text-base text-appleBlue hover:underline">
                Learn more ›
              </Link>
            </div>
            <div className="parallax-up rounded-3xl bg-white p-8">
              <HotlinkImage
                src={IMG_MUSIC}
                fallback={img(800, 600, "Apple Music", "light")}
                alt="Apple Music"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits — 4-up grid */}
      <section className="section-light py-20">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b, i) => (
              <article
                key={b.title}
                className={`rounded-2xl bg-appleGray-100 p-8 hover-lift reveal delay-${(i % 4) + 1}`}
              >
                <h3 className="text-lg font-semibold text-appleGray-900">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-appleGray-700">{b.body}</p>
                <Link
                  href="#"
                  className="mt-4 inline-block text-sm text-appleBlue hover:underline"
                >
                  {b.cta} ›
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
