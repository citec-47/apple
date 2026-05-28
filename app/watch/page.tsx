import Link from "next/link";
import HotlinkImage from "@/components/HotlinkImage";
import GetToKnowMac, { type Topic } from "@/components/GetToKnowMac";
import WhyBuyMac, { type WhyBuyItem } from "@/components/WhyBuyMac";
import LineupCarousel, { type LineupModel } from "@/components/LineupCarousel";
import WatchSubNav from "@/components/WatchSubNav";
import { img } from "@/lib/img";

const APPLE = "https://www.apple.com";

const SERIES_11_SRC = `${APPLE}/v/apple-watch-series-11/c/images/overview/welcome/hero__d4bput78wzu6_xlarge.jpg`;
const SE_3_SRC = `${APPLE}/v/apple-watch-se-3/b/images/overview/welcome/hero_startframe__c03sf8dwd1si_large.jpg`;
const ULTRA_3_SRC = `${APPLE}/v/apple-watch-ultra-3/b/images/overview/welcome/hero_endframe__e4ls9pihykya_large.jpg`;

const MODELS: LineupModel[] = [
  {
    id: "ultra-3",
    name: "Apple Watch Ultra 3",
    tagline: "The ultimate sports and adventure watch.",
    isNew: true,
    colors: ["#9a8e7d", "#1d1d1f"],
    src: ULTRA_3_SRC,
    fallback: img(800, 600, "Apple Watch Ultra 3", "gray"),
    href: "#",
    price: "From $799",
    monthly: "or $66.58/mo. for 12 mo.◊",
  },
  {
    id: "series-11",
    name: "Apple Watch Series 11",
    tagline: "The ultimate way to watch your health.",
    isNew: true,
    colors: ["#1d1d1f", "#c8c9cc", "#e8b9a7", "#0a0a0a", "#d4b990", "#e0c89f", "#737881"],
    src: SERIES_11_SRC,
    fallback: img(800, 600, "Apple Watch Series 11", "gray"),
    href: "#",
    price: "From $399",
    monthly: "or $33.25/mo. for 12 mo.◊",
  },
  {
    id: "se-3",
    name: "Apple Watch SE 3",
    tagline: "Essential health features at a great value.",
    isNew: true,
    colors: ["#1d1d1f", "#e4d7c5"],
    src: SE_3_SRC,
    fallback: img(800, 600, "Apple Watch SE 3", "gray"),
    href: "#",
    price: "From $249",
    monthly: "or $20.75/mo. for 12 mo.◊",
  },
];

// Why Apple is the best place to buy Apple Watch — reuses generic Mac images
// where the subject doesn't need to be Watch-specific.
const IMG_TRADE_IN = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_191119_e46e4490-1957-469c-9903-cd1ad0de4762.png";
const IMG_EDU = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_172740_1d2e2e1f-9860-411c-a165-4948316ef7da.png";
const IMG_DELIVERY = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_173400_86e67b2c-18ee-415f-8f27-afde90b957d9.png";
const IMG_SETUP = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_173051_19daec2a-7ec9-49bf-91a9-b292e494f871.png";
const IMG_GUIDED = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_173610_7cc507ae-053b-4a60-b559-898a72d100fe.png";
const IMG_STORE_APP = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_173923_51a593a2-b365-45f7-8858-144008ee2989.png";

const WHY_BUY_TOPICS: WhyBuyItem[] = [
  {
    eyebrow: "Apple Trade In",
    headline: "Save on a new Apple Watch with a trade-in.",
    description: "Get credit toward your next Apple Watch when you trade in an eligible device.°",
    src: IMG_TRADE_IN,
    fallback: img(800, 1000, "Apple Trade In", "light"),
    blocks: [
      {
        heading: "Quick instant estimate.",
        body: "Tell us about your old smartwatch — model, year, condition — and get an instant trade-in offer in under a minute.",
      },
      {
        heading: "Apply credit toward anything new.",
        body: "Use the credit toward a new Apple Watch, iPhone, iPad, or Mac at the Apple Store, online, or in the Apple Store app.",
      },
      {
        heading: "Even if it isn't eligible.",
        body: "If your old device isn't eligible for credit, we'll recycle it for free — no charge, no questions.",
      },
    ],
  },
  {
    eyebrow: "Education",
    headline: "Save on Apple Watch with education pricing.",
    description: "College students and educators can save through the Apple Store.°",
    src: IMG_EDU,
    fallback: img(800, 1000, "Education", "light"),
    blocks: [
      {
        heading: "Who qualifies.",
        body: "Currently enrolled college students, their parents, and faculty and staff at higher education institutions are all eligible.",
      },
      {
        heading: "Easy verification.",
        body: "Confirm using your school email or upload a student or teacher ID — most checks are instant.",
      },
      {
        heading: "Works with Trade In.",
        body: "Stack education pricing with Apple Trade In to save even more on a new Apple Watch.",
      },
    ],
  },
  {
    eyebrow: "Delivery and Pickup",
    headline: "Get your order quickly and easily.",
    description: "Choose two-hour delivery from an Apple Store, free delivery, or easy pickup options.",
    src: IMG_DELIVERY,
    fallback: img(800, 1000, "Delivery", "light"),
    blocks: [
      {
        heading: "Two-hour delivery.",
        body: "Have your Apple Watch brought to your door from a nearby Apple Store in as little as two hours.",
      },
      {
        heading: "Free standard shipping.",
        body: "Standard delivery is included on every order. Expedited options appear at checkout.",
      },
      {
        heading: "Same-day store pickup.",
        body: "Reserve online and pick up at your local Apple Store — often within an hour of placing your order.",
      },
    ],
  },
  {
    eyebrow: "Personal Setup",
    headline: "Make the most of your Apple Watch with an online session.",
    description: "Talk one on one with a Specialist to set up your watch and discover features.",
    src: IMG_SETUP,
    fallback: img(800, 1000, "Personal Setup", "light"),
    blocks: [
      {
        heading: "Set up the right way.",
        body: "A Specialist will walk you through pairing your watch with iPhone, choosing a watch face, and adjusting key health and activity settings.",
      },
      {
        heading: "Learn the features that matter to you.",
        body: "Whether you care about sleep tracking, workouts, or watch faces, a Specialist will tailor the walkthrough to how you'll use it.",
      },
      {
        heading: "Always free.",
        body: "Personal Setup is included with every Apple Watch you buy from Apple. Schedule a session whenever you're ready.",
      },
    ],
  },
  {
    eyebrow: "Guided Video Shopping",
    headline: "Shop live with a Specialist.",
    description: "Let a Specialist help you find the right Apple Watch over video, chat, or phone.",
    src: IMG_GUIDED,
    fallback: img(800, 1000, "Guided Shopping", "light"),
    blocks: [
      {
        heading: "Shop over video.",
        body: "Connect with a Specialist on a one-way video call — you see them and the watch, they can't see you.",
      },
      {
        heading: "Get a recommendation.",
        body: "Tell a Specialist how you'll use your Apple Watch and they'll suggest the model, size, and band combination that fits.",
      },
      {
        heading: "No appointment required.",
        body: "Most sessions don't need scheduling. Just connect when you're ready — it's free.",
      },
    ],
  },
  {
    eyebrow: "Apple Store App",
    headline: "Explore a shopping experience designed around you.",
    description: "Use the Apple Store app to get a more personal way to shop.",
    src: IMG_STORE_APP,
    fallback: img(800, 1000, "Apple Store App", "light"),
    blocks: [
      {
        heading: "Personalized recommendations.",
        body: "The app surfaces watches, bands, and accessories that match the Apple devices you already use.",
      },
      {
        heading: "Compare side by side.",
        body: "Save watches you're considering and compare specs and features in one screen — no tab switching.",
      },
      {
        heading: "Order tracking built in.",
        body: "Track shipments, manage AppleCare, and continue across devices with your Apple Account.",
      },
    ],
  },
];

// Get to know Apple Watch — image URLs filled in as generations complete.
const IMG_HEALTH = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_193843_ac17f358-5621-4229-8e7e-22faa901402c.png";
const IMG_FITNESS = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_194354_5ce11bdb-e5c1-4aab-9210-395c72aac68d.png";
const IMG_SAFETY = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_194926_795d60f5-9499-4bf3-a68d-8e29f587a71f.png";
const IMG_ULTRA_DETAIL = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_195617_503df93b-cee5-4201-af27-93fe45c54cf2.png";
const IMG_CONNECTIVITY = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_195954_47a74807-bac7-4b05-add1-7d5f7b906181.png";
const IMG_PERSONALIZATION = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_200204_fc365029-d201-4bda-bb3e-7f55bdf36342.png";
const IMG_KIDS = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_200505_47fdcb3d-d2b7-40d6-afad-d145c2110585.png";
const IMG_WATCH_IPHONE = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_201016_22341b16-07c8-47a3-b0c6-6615862d3a92.png";

const TOPICS: Topic[] = [
  {
    title: "Health",
    sub: "Knows you. Insights and out.",
    bg: "#c54a6a",
    src: IMG_HEALTH,
    fallback: img(600, 800, "Health", "light"),
    blocks: [
      {
        heading: "Heart, on your wrist.",
        body: "Apple Watch tracks your heart rate around the clock and can alert you to unusually high or low readings. Take an ECG anytime — straight from your wrist.",
        image: { src: IMG_HEALTH, fallback: IMG_HEALTH, alt: "Heart rate monitoring" },
      },
      {
        heading: "Sleep that makes sense.",
        body: "See sleep stages, time in bed, and trends week-over-week, so you can understand what's helping and what's hurting your rest.",
      },
      {
        heading: "Mindfulness, in moments.",
        body: "Quick breathing sessions and reflection prompts make it easy to take a break, lower stress, and check in with how you feel.",
      },
    ],
  },
  {
    title: "Fitness",
    sub: "Miles of motivation.",
    bg: "#7b5fee",
    src: IMG_FITNESS,
    fallback: img(600, 800, "Fitness", "light"),
    blocks: [
      {
        heading: "Close your rings.",
        body: "Move, Exercise, and Stand rings turn daily activity into a simple goal you can see at a glance — and a streak you'll want to keep going.",
        image: { src: IMG_FITNESS, fallback: IMG_FITNESS, alt: "Daily activity rings" },
      },
      {
        heading: "Dozens of workouts.",
        body: "From running and cycling to yoga, swimming, and HIIT, Apple Watch tracks the metrics that matter for each activity — including pace, splits, and heart-rate zones.",
      },
      {
        heading: "Fitness+ on tap.",
        body: "Stream studio-quality workout classes that sync your watch metrics on-screen, with new sessions added every week.",
      },
    ],
  },
  {
    title: "Safety",
    sub: "Keep help close at hand.",
    bg: "#1f3a5f",
    src: IMG_SAFETY,
    fallback: img(600, 800, "Safety", "dark"),
    blocks: [
      {
        heading: "Crash and fall detection.",
        body: "If Apple Watch detects a severe fall or vehicle crash, it can automatically connect you with emergency services and notify your contacts.",
        image: { src: IMG_SAFETY, fallback: IMG_SAFETY, alt: "Safety features" },
      },
      {
        heading: "Emergency SOS.",
        body: "Press and hold the side button to call for help anywhere you can connect to a cell signal, with location shared automatically.",
      },
      {
        heading: "Medical ID.",
        body: "Important medical information is accessible from the lock screen so first responders know exactly what they need.",
      },
    ],
  },
  {
    title: "Apple Watch Ultra 3",
    sub: "The ultimate sports and adventure watch.",
    bg: "#1d1d1f",
    src: IMG_ULTRA_DETAIL,
    fallback: img(600, 800, "Ultra 3", "dark"),
    blocks: [
      {
        heading: "Built for everything.",
        body: "Titanium case, sapphire crystal, and a bright always-on Retina display make Ultra ready for the trail, the ocean, and the mountain.",
        image: { src: IMG_ULTRA_DETAIL, fallback: IMG_ULTRA_DETAIL, alt: "Apple Watch Ultra 3" },
      },
      {
        heading: "Multi-day battery life.",
        body: "Get up to several days on a single charge — even with GPS workouts — so you can plan longer adventures without packing a charger.",
      },
      {
        heading: "Pro features for athletes.",
        body: "Precision dual-frequency GPS, dive-ready depth gauge, and a customizable Action button put serious tools right on your wrist.",
      },
    ],
  },
  {
    title: "Connectivity",
    sub: "The right call for staying in touch.",
    bg: "#3c8bcc",
    src: IMG_CONNECTIVITY,
    fallback: img(600, 800, "Connectivity", "light"),
    blocks: [
      {
        heading: "Calls, texts, and apps.",
        body: "Take calls, send messages, and run your favorite apps right from your wrist — even when your iPhone is elsewhere.",
        image: { src: IMG_CONNECTIVITY, fallback: IMG_CONNECTIVITY, alt: "Apple Watch connectivity" },
      },
      {
        heading: "Cellular freedom.",
        body: "Cellular models stay connected without your iPhone nearby. Go for a run, leave the house, and still pick up the call.",
      },
      {
        heading: "Quick reply, smart suggestions.",
        body: "Reply to a text by tapping, dictating, or scribbling, with suggestions tailored to the conversation.",
      },
    ],
  },
  {
    title: "Personalization",
    sub: "Make it you-nique.",
    bg: "#e3a4b7",
    src: IMG_PERSONALIZATION,
    fallback: img(600, 800, "Personalization", "light"),
    blocks: [
      {
        heading: "A watch face for every mood.",
        body: "Pick from dozens of watch face styles and tweak the complications, colors, and information layout to make the screen yours.",
        image: { src: IMG_PERSONALIZATION, fallback: IMG_PERSONALIZATION, alt: "Watch faces" },
      },
      {
        heading: "Change bands in seconds.",
        body: "Switch from a sport band to a leather strap to a metal bracelet with one easy click — no tools, no fuss.",
      },
      {
        heading: "Photo Watch face.",
        body: "Use your favorite photos as a custom watch face — pets, family, or that vacation sunset, automatically resized and animated.",
      },
    ],
  },
  {
    title: "Apple Watch For Your Kids",
    sub: "Independence for them. Peace of mind for you.",
    bg: "#5db5e8",
    src: IMG_KIDS,
    fallback: img(600, 800, "Apple Watch For Your Kids", "light"),
    blocks: [
      {
        heading: "Family Setup.",
        body: "Set up Apple Watch for a child or family member without an iPhone of their own. They get calls, texts, and apps — you stay connected.",
        image: { src: IMG_KIDS, fallback: IMG_KIDS, alt: "Apple Watch for kids" },
      },
      {
        heading: "Schooltime.",
        body: "Limit apps and complications during school hours so kids stay focused — and you can still reach them in emergencies.",
      },
      {
        heading: "Location and check-ins.",
        body: "See where they are with Find My, and ask them to share their location with a tap.",
      },
    ],
  },
  {
    title: "Apple Watch + iPhone",
    sub: "Dynamic duo.",
    bg: "#1f4a5f",
    src: IMG_WATCH_IPHONE,
    fallback: img(600, 800, "Watch + iPhone", "light"),
    blocks: [
      {
        heading: "Hand off seamlessly.",
        body: "Plan a route in Maps on iPhone, then send it to your watch for turn-by-turn directions on the trail or in the car.",
        image: { src: IMG_WATCH_IPHONE, fallback: IMG_WATCH_IPHONE, alt: "Watch and iPhone" },
      },
      {
        heading: "Unlock your iPhone.",
        body: "Wearing your Apple Watch unlocks your iPhone for you in situations Face ID can't — like wearing a mask or sunglasses.",
      },
      {
        heading: "Find your iPhone, find your watch.",
        body: "Misplaced your phone? Ping it from your watch. Lost the watch? Find My works both ways.",
      },
    ],
  },
];

const MADE_FOR_EACH_OTHER = [
  {
    title: "Apple Watch and iPhone",
    body: "Plan a route on iPhone, then download it to your watch for turn-by-turn directions. Take incoming calls without breaking stride. Use your watch to unlock your iPhone when you're wearing a mask or sunglasses.",
  },
  {
    title: "Apple Watch and AirPods",
    body: "Pair Apple Watch and AirPods and you can leave your iPhone at home. Stream music and podcasts, take calls, and ask Siri to send a message — all from your wrist and ears.",
  },
  {
    title: "Apple Watch and Apple Fitness+",
    body: "Apple Watch beams your live heart rate, calories, and ring progress into every Fitness+ workout. Audio-guided walks, runs, and meditations make it easy to move and reset anywhere.",
  },
];

export default function WatchPage() {
  return (
    <div className="bg-white">
      {/* Icon sub-nav */}
      <WatchSubNav />

      {/* Education savings banner */}
      <section className="bg-appleGray-100 py-3 text-center text-sm">
        <p>
          Now you can buy Apple Watch<sup className="text-[10px]">1</sup> with education savings.
          <sup className="text-[10px]">±</sup>{" "}
          <Link href="#" className="text-appleBlue hover:underline">
            Shop ›
          </Link>
        </p>
      </section>

      {/* Page title */}
      <section className="bg-appleGray-100 pt-16 pb-12">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <h1 className="headline-xxl reveal">Apple Watch</h1>
          <p className="mt-4 text-2xl text-appleGray-700 reveal delay-1">
            Three watches. Endless ways to move.
          </p>
        </div>
      </section>

      {/* Explore the lineup */}
      <section className="section-light py-20">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="flex items-end justify-between gap-6 reveal">
            <h2 className="headline-lg">Explore the lineup.</h2>
            <Link href="#" className="hidden text-base text-appleBlue hover:underline md:inline-block">
              Compare all models ›
            </Link>
          </div>
          <div className="mt-10">
            <LineupCarousel models={MODELS} />
          </div>
        </div>
      </section>

      {/* Why Apple is the best place to buy Apple Watch */}
      <section className="section-gray py-24">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="flex items-end justify-between gap-6 reveal">
            <h2 className="headline-lg max-w-xl">
              Why Apple is the best place to buy Apple Watch.
            </h2>
            <Link href="#" className="hidden text-base text-appleBlue hover:underline md:inline-block">
              Shop Apple Watch ›
            </Link>
          </div>
          <div className="mt-10">
            <WhyBuyMac items={WHY_BUY_TOPICS} />
          </div>
        </div>
      </section>

      {/* Get to know Apple Watch */}
      <GetToKnowMac topics={TOPICS} title="Get to know Apple Watch." />

      {/* Color the moment — Bands */}
      <section className="section-light py-24">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-center">
            <div className="reveal">
              <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">
                Color the moment
              </p>
              <h2 className="mt-3 headline-lg">
                Explore the latest bands in fresh shades, styles, and materials.
              </h2>
              <p className="mt-4 text-appleGray-700 leading-relaxed">
                Sport bands for the workout. Leather for the office. Stainless steel for a night out. Switch bands in seconds and change the whole look of your watch.
              </p>
              <Link
                href="#"
                className="mt-6 inline-flex btn-pill btn-pill-primary"
              >
                Shop Apple Watch bands
              </Link>
            </div>
            <div className="rounded-3xl bg-appleGray-100 p-8 parallax-up">
              <HotlinkImage
                src={IMG_PERSONALIZATION}
                fallback={img(800, 600, "Apple Watch bands", "light")}
                alt="Apple Watch bands"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Made for each other */}
      <section className="section-gray py-24">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="headline-lg text-center reveal">Made for each other.</h2>
          <p className="mt-3 text-center text-appleGray-700 reveal delay-1">
            See how Apple Watch fits in with the rest of your Apple devices.
          </p>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {MADE_FOR_EACH_OTHER.map((s, i) => (
              <article
                key={s.title}
                className={`rounded-2xl bg-white p-8 hover-lift reveal delay-${i + 1}`}
              >
                <h3 className="text-xl font-semibold text-appleGray-900">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-appleGray-700">{s.body}</p>
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

      {/* Apple Watch essentials accessories teaser */}
      <section className="section-light py-20 text-center">
        <div className="mx-auto max-w-apple px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500 reveal">
            Apple Watch essentials
          </p>
          <h2 className="mt-3 headline-lg reveal delay-1">
            Chargers, bands, and more.
          </h2>
          <Link
            href="#"
            className="mt-6 inline-flex btn-pill btn-pill-primary reveal delay-2"
          >
            All Apple Watch accessories
          </Link>
        </div>
      </section>
    </div>
  );
}
