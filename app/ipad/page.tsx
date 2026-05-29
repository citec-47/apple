import Link from "next/link";
import HotlinkImage from "@/components/HotlinkImage";
import GetToKnowMac, { type Topic } from "@/components/GetToKnowMac";
import WhyBuyMac, { type WhyBuyItem } from "@/components/WhyBuyMac";
import LineupCarousel, { type LineupModel } from "@/components/LineupCarousel";
import { img } from "@/lib/img";

const APPLE = "https://www.apple.com";

const IPAD_PRO_SRC = `${APPLE}/v/ipad-pro/aw/images/overview/hero/hero_endframe__du5kcy4qnxkm_large.jpg`;
const IPAD_AIR_SRC = `${APPLE}/v/ipad-air/ah/images/overview/hero/hero_endframe__6gl84bccyaqi_large.png`;
const IPAD_SRC = `${APPLE}/v/ipad-11/d/images/overview/hero/hero__crzh9misvcuq_large.jpg`;
const IPAD_MINI_SRC = `${APPLE}/v/ipad-mini/v/images/overview/hero/landscape__gxui1v022sae_large.png`;

const MODELS: LineupModel[] = [
  {
    id: "ipad-pro",
    name: "iPad Pro",
    tagline: "The ultimate iPad experience with the most advanced technology.",
    colors: ["#1d1d1f", "#c8c9cc"],
    src: IPAD_PRO_SRC,
    fallback: img(800, 600, "iPad Pro", "gray"),
    href: "#",
    buyHref: "/shop/buy/ipad-pro",
    price: "From $999",
    monthly: "or $83.25/mo. for 12 mo.◊",
  },
  {
    id: "ipad-air",
    name: "iPad Air",
    tagline: "Serious performance in a thin and light design.",
    isNew: true,
    colors: ["#5a5a5a", "#4a6f9e", "#9a7caa", "#e4d7c5"],
    src: IPAD_AIR_SRC,
    fallback: img(800, 600, "iPad Air", "gray"),
    href: "#",
    buyHref: "/shop/buy/ipad-pro",
    price: "From $599",
    monthly: "or $49.91/mo. for 12 mo.◊",
  },
  {
    id: "ipad",
    name: "iPad",
    tagline: "The colorful, all-screen iPad for the things you do every day.",
    colors: ["#5688be", "#e6a6b7", "#e6d36b", "#c8c9cc"],
    src: IPAD_SRC,
    fallback: img(800, 600, "iPad", "gray"),
    href: "#",
    buyHref: "/shop/buy/ipad-pro",
    price: "From $349",
    monthly: "or $29.08/mo. for 12 mo.◊",
  },
  {
    id: "ipad-mini",
    name: "iPad mini",
    tagline: "The full iPad experience in an ultraportable design.",
    colors: ["#5a5a5a", "#4a6f9e", "#9a7caa", "#e4d7c5"],
    src: IPAD_MINI_SRC,
    fallback: img(800, 600, "iPad mini", "gray"),
    href: "#",
    buyHref: "/shop/buy/ipad-pro",
    price: "From $499",
    monthly: "or $41.58/mo. for 12 mo.◊",
  },
];

// Why Apple is the best place to buy iPad — reuses generated images where the
// subject is generic enough (Education, Personal Setup, Delivery, Guided
// Shopping, Apple Store App) and adds two new ones (Trade In, Engraving).
const IMG_TRADE_IN = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_191119_e46e4490-1957-469c-9903-cd1ad0de4762.png";
const IMG_EDU_LAPTOPS = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_172740_1d2e2e1f-9860-411c-a165-4948316ef7da.png";
const IMG_SETUP = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_173051_19daec2a-7ec9-49bf-91a9-b292e494f871.png";
const IMG_DELIVERY = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_173400_86e67b2c-18ee-415f-8f27-afde90b957d9.png";
const IMG_ENGRAVING = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_192120_df02195f-fcc2-4bb3-9745-cec385e8af46.png";
const IMG_GUIDED = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_173610_7cc507ae-053b-4a60-b559-898a72d100fe.png";
const IMG_STORE_APP = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_173923_51a593a2-b365-45f7-8858-144008ee2989.png";

const WHY_BUY_TOPICS: WhyBuyItem[] = [
  {
    eyebrow: "Apple Trade In",
    headline: "Save with Apple Trade In.",
    description: "Get credit toward your next iPad when you trade in an eligible device.°",
    src: IMG_TRADE_IN,
    fallback: img(800, 1000, "Apple Trade In", "light"),
    blocks: [
      {
        heading: "Trade in any condition.",
        body: "Bring in your old tablet — even with cracks, dents, or a worn battery — and get an instant estimate. If it isn't eligible for credit, we'll recycle it for free.",
      },
      {
        heading: "Trade up to almost anything.",
        body: "Apply your trade-in credit toward any new iPad, Mac, iPhone or Watch — at the Apple Store, online, or in the Apple Store app.",
      },
      {
        heading: "Easy from start to finish.",
        body: "Print a free shipping label, drop your old device in the box, and your credit applies as soon as it's received and inspected.",
      },
    ],
  },
  {
    eyebrow: "Education",
    headline: "Save on iPad with education pricing.",
    description: "College students and educators can save through the Apple Store.",
    src: IMG_EDU_LAPTOPS,
    fallback: img(800, 1000, "Education", "light"),
    blocks: [
      {
        heading: "Who qualifies.",
        body: "Currently enrolled college students, their parents, and teachers and staff at higher-education institutions can all save on a new iPad.",
      },
      {
        heading: "Bundled accessories.",
        body: "From time to time, Apple includes free AirPods or other accessories when you buy an iPad through the education store.",
      },
      {
        heading: "Fast eligibility check.",
        body: "Confirm with your school email or upload an ID — most checks finish in a few seconds.",
      },
    ],
  },
  {
    eyebrow: "Personal Setup",
    headline: "Meet your new iPad with Personal Setup.",
    description: "Online sessions with a Specialist to set up your iPad and explore new features.",
    src: IMG_SETUP,
    fallback: img(800, 1000, "Personal Setup", "light"),
    blocks: [
      {
        heading: "One-on-one walkthrough.",
        body: "A Specialist will help you sign in to your Apple Account, set up Wi-Fi, transfer your data and customize your iPad to fit how you work.",
      },
      {
        heading: "Find the apps you'll love.",
        body: "Get personalized suggestions for productivity, creative and entertainment apps based on what you want to do with your iPad.",
      },
      {
        heading: "Included with every iPad.",
        body: "Personal Setup is free when you buy an iPad from Apple. Book a session online or by phone whenever is convenient.",
      },
    ],
  },
  {
    eyebrow: "Delivery and Pickup",
    headline: "Get flexible delivery and easy pickup.",
    description: "Choose two-hour delivery from an Apple Store, free delivery, or easy pickup options.",
    src: IMG_DELIVERY,
    fallback: img(800, 1000, "Delivery", "light"),
    blocks: [
      {
        heading: "Two-hour delivery.",
        body: "Have your new iPad brought to your door from a nearby Apple Store in as little as two hours, with real-time driver tracking.",
      },
      {
        heading: "Free standard delivery.",
        body: "Standard shipping is included on all orders. Need it sooner? Expedited options appear at checkout.",
      },
      {
        heading: "Pickup at your Apple Store.",
        body: "Reserve online and pick up in store — often within an hour of placing your order.",
      },
    ],
  },
  {
    eyebrow: "Engraving",
    headline: "Personalize your iPad for free.",
    description: "Engrave your new iPad with a mix of emoji, names, initials and numbers.",
    src: IMG_ENGRAVING,
    fallback: img(800, 1000, "Engraving", "light"),
    blocks: [
      {
        heading: "Make it unmistakably yours.",
        body: "Add up to a few lines of text or emoji to the back of your iPad — perfect for personal use or as a gift.",
      },
      {
        heading: "Free and quick.",
        body: "Engraving is included at no extra cost and usually ships in the same window as a non-engraved iPad.",
      },
      {
        heading: "Available on every model.",
        body: "Personalize an iPad Pro, iPad Air, iPad or iPad mini — and any AirPods you add to the order.",
      },
    ],
  },
  {
    eyebrow: "Guided Shopping",
    headline: "Shop live with a Specialist.",
    description: "Get help over video, chat or phone — find the right iPad and answer any questions.",
    src: IMG_GUIDED,
    fallback: img(800, 1000, "Guided Shopping", "light"),
    blocks: [
      {
        heading: "Shop over video.",
        body: "Connect with an Apple Specialist on a one-way video call. You can see them and the product; they can't see you.",
      },
      {
        heading: "Chat or phone.",
        body: "Prefer text or voice? Specialists are also available by chat and phone to help you compare models and choose the right setup.",
      },
      {
        heading: "Free, on your schedule.",
        body: "Guided shopping is always free, with most sessions available without an appointment — just connect when you're ready.",
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
        heading: "Tailored recommendations.",
        body: "The app surfaces products and accessories that match the Apple devices you already use.",
      },
      {
        heading: "Save and compare.",
        body: "Keep a wishlist, compare specs side by side, and revisit products without leaving the app.",
      },
      {
        heading: "Track your orders.",
        body: "Get real-time order status, manage subscriptions, and continue across devices with your Apple Account.",
      },
    ],
  },
];

// Get to know iPad — image URLs are filled in as generations complete.
const IMG_IPADOS = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_184149_3569ffff-7330-4099-bf57-0029a61e2b3b.png";
const IMG_AI = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_184429_47429fbe-93fe-4d01-86c1-7217e4708fba.png";
const IMG_PRODUCTIVITY = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_184759_82e76152-57ba-4d43-800c-703be084cf36.png";
const IMG_CREATIVITY = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_185046_3632d898-f1ae-4517-ae25-b067a5cad4e8.png";
const IMG_LEARNING = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_185307_ea99f4de-9e14-42a7-a315-087d792b3655.png";
const IMG_ENTERTAINMENT = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_185437_f916a326-00c7-4cc5-8ac1-5c9b16246c57.png";
const IMG_PENCIL = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_185529_1a5938d5-6fac-46ff-8c36-05a16d0e6dcf.png";

const TOPICS: Topic[] = [
  {
    title: "iPadOS + Apps",
    sub: "Flexible windowing. A multitasker's delight.",
    bg: "#3c8bcc",
    src: IMG_IPADOS,
    fallback: img(600, 800, "iPadOS", "light"),
    blocks: [
      {
        heading: "Resize, arrange, organize.",
        body: "iPadOS lets you stack windows, snap them side by side, and float them in stages — so you can keep three or four tasks in view without losing your place.",
        image: { src: IMG_IPADOS, fallback: IMG_IPADOS, alt: "iPadOS windowing" },
      },
      {
        heading: "Apps built for the screen.",
        body: "Top iPad apps — like Procreate, Microsoft Office, Notion and Final Cut Pro — take full advantage of the larger canvas with multi-column layouts and split views.",
      },
      {
        heading: "Updates every year.",
        body: "Major iPadOS releases come free and add new features for years after you buy your iPad.",
      },
    ],
  },
  {
    title: "Apple Intelligence",
    sub: "Effortlessly helpful every day.",
    bg: "#a463f2",
    src: IMG_AI,
    fallback: img(600, 800, "Apple Intelligence", "light"),
    blocks: [
      {
        heading: "Smart writing, on tap.",
        body: "Rewrite, summarize, proofread and tone-shift text in any app — Mail, Notes, third-party apps — without copying anything into another tool.",
        image: { src: IMG_AI, fallback: IMG_AI, alt: "On-device intelligence" },
      },
      {
        heading: "Image creation.",
        body: "Generate fresh images, custom emoji and stickers right where you need them, with output that fits the moment.",
      },
      {
        heading: "Private by design.",
        body: "Most processing happens on your device. When more power is needed, dedicated cloud infrastructure handles it without storing your data.",
      },
    ],
  },
  {
    title: "Productivity",
    sub: "Your workplace can be any place.",
    bg: "#1f5f5a",
    src: IMG_PRODUCTIVITY,
    fallback: img(600, 800, "Productivity", "light"),
    blocks: [
      {
        heading: "Type, click, draw.",
        body: "Pair iPad with Magic Keyboard for fast typing and a trackpad, or use Apple Pencil for handwriting and markup. iPad adapts to whatever input you reach for.",
        image: { src: IMG_PRODUCTIVITY, fallback: IMG_PRODUCTIVITY, alt: "iPad for work" },
      },
      {
        heading: "Office apps that feel native.",
        body: "Word, Excel, PowerPoint, Slack, Zoom, Google Docs and Notion all run natively, with touch and stylus support that goes beyond what a laptop offers.",
      },
      {
        heading: "Work alongside your Mac.",
        body: "Use iPad as a second display for your Mac with Sidecar, or take over with Universal Control to work between the two seamlessly.",
      },
    ],
  },
  {
    title: "Creativity",
    sub: "Take your inner artist out and about.",
    bg: "#c54a6a",
    src: IMG_CREATIVITY,
    fallback: img(600, 800, "Creativity", "light"),
    blocks: [
      {
        heading: "Draw, paint, design.",
        body: "Apple Pencil's pressure and tilt sensitivity make iPad a serious tool for digital art — sketch on the train, paint in the park, or storyboard on the couch.",
        image: { src: IMG_CREATIVITY, fallback: IMG_CREATIVITY, alt: "iPad for creative work" },
      },
      {
        heading: "Edit photos and video.",
        body: "Run Lightroom, Photoshop, LumaFusion and Final Cut Pro right on iPad. Color-grade footage, retouch photos and finish projects on the go.",
      },
      {
        heading: "Make music anywhere.",
        body: "Multi-track music production with GarageBand, Logic Pro and Ableton Note works beautifully on iPad — record, mix and finish songs from your lap.",
      },
    ],
  },
  {
    title: "Learning",
    sub: "Your classroom can be anywhere.",
    bg: "#3c8bcc",
    src: IMG_LEARNING,
    fallback: img(600, 800, "Learning", "light"),
    blocks: [
      {
        heading: "Take richer notes.",
        body: "Handwrite, type, sketch diagrams and record audio in the same note. Apps like Notability, GoodNotes and Notes turn iPad into a flexible study companion.",
        image: { src: IMG_LEARNING, fallback: IMG_LEARNING, alt: "iPad for learning" },
      },
      {
        heading: "Reading, made better.",
        body: "Textbooks, articles and PDFs come to life with markup, dictionary lookup and translate, plus accessibility features that adjust text size and contrast.",
      },
      {
        heading: "Built for the classroom.",
        body: "Schoolwork and Schoolwide Workshops give educators tools to assign, share and grade activities — and let students focus.",
      },
    ],
  },
  {
    title: "Entertainment",
    sub: "Kick back. Tune in. Game on.",
    bg: "#1a0a2e",
    src: IMG_ENTERTAINMENT,
    fallback: img(600, 800, "Entertainment", "dark"),
    blocks: [
      {
        heading: "Brilliant screens for movies and shows.",
        body: "The Liquid Retina and Ultra Retina XDR displays on iPad render rich colors and deep blacks — perfect for a movie on the plane or a series at bedtime.",
        image: { src: IMG_ENTERTAINMENT, fallback: IMG_ENTERTAINMENT, alt: "iPad for entertainment" },
      },
      {
        heading: "Console-quality gaming.",
        body: "iPad runs demanding titles smoothly and pairs with your favorite Xbox or PlayStation controller. Apple Arcade gives you hundreds of premium games with no ads.",
      },
      {
        heading: "All your music and podcasts.",
        body: "Apple Music, Spotify and your podcast library are right at hand, with great speakers and AirPlay support to fill the room.",
      },
    ],
  },
  {
    title: "Apple Pencil",
    sub: "Dream it up. Jot it down.",
    bg: "#e3a4b7",
    src: IMG_PENCIL,
    fallback: img(600, 800, "Apple Pencil", "light"),
    blocks: [
      {
        heading: "Natural handwriting.",
        body: "Apple Pencil feels like a real pen on iPad — low latency, pressure sensitivity, palm rejection — so handwriting feels natural and ideas land fast.",
        image: { src: IMG_PENCIL, fallback: IMG_PENCIL, alt: "Apple Pencil" },
      },
      {
        heading: "Markup anything.",
        body: "Sign documents, annotate PDFs, sketch a floor plan, or scribble a note on a screenshot — Apple Pencil works system-wide.",
      },
      {
        heading: "Multiple Pencils for every iPad.",
        body: "From Apple Pencil Pro and Apple Pencil with USB-C to the second-generation Apple Pencil, there's a model designed for every iPad in the lineup.",
      },
    ],
  },
];

const SUB_NAV = [
  { label: "iPad Pro", href: "#" },
  { label: "iPad Air", href: "#", isNew: true },
  { label: "iPad", href: "#" },
  { label: "iPad mini", href: "#" },
  { label: "Compare", href: "#" },
  { label: "Apple Pencil", href: "#" },
  { label: "Keyboards", href: "#" },
  { label: "Accessories", href: "#" },
  { label: "iPadOS 26", href: "#" },
  { label: "Shop iPad", href: "#" },
];

const SIGNIFICANT_OTHERS = [
  {
    title: "iPad and iPhone",
    body: "Hand off your video calls, shoot on iPhone and edit on iPad, and use Continuity Camera to bring an iPhone shot into a meeting on iPad in one tap.",
  },
  {
    title: "iPad and Mac",
    body: "Use iPad as a second display with Sidecar, draw and have it appear on Mac instantly, and move the cursor between both devices with Universal Control.",
  },
  {
    title: "iPad and Apple Watch",
    body: "Start a workout on Apple Watch and watch your live stats on iPad, sync activity to the Health app, and get rich notifications across both.",
  },
];

export default function IPadPage() {
  return (
    <div className="bg-white">
      {/* Education savings banner */}
      <section className="bg-appleGray-100 py-3 text-center text-sm">
        <p>
          <span className="font-semibold text-appleGray-900">Buy iPad with education savings.</span>{" "}
          <Link href="#" className="text-appleBlue hover:underline">
            Shop ›
          </Link>
        </p>
      </section>

      {/* Sub-nav */}
      <nav className="sticky top-11 z-30 border-b border-appleGray-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-appleWide items-center overflow-x-auto px-6 text-sm">
          <Link href="/ipad" className="py-3 pr-6 font-semibold text-appleGray-900">
            iPad
          </Link>
          <ul className="flex flex-1 items-center gap-6 py-3">
            {SUB_NAV.map((item) => (
              <li key={item.label} className="whitespace-nowrap">
                <Link
                  href={item.href}
                  className="text-appleGray-700 hover:text-appleGray-900"
                >
                  {item.label}
                  {item.isNew && (
                    <span className="ml-1 text-[10px] font-semibold text-orange-500">
                      New
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Page title */}
      <section className="bg-appleGray-100 pt-16 pb-12">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <h1 className="headline-xxl reveal">iPad</h1>
          <p className="mt-4 text-2xl text-appleGray-700 reveal delay-1">
            Lovable. Drawable. Magical.
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

      {/* Why Apple is the best place to buy iPad */}
      <section className="section-gray py-24">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="flex items-end justify-between gap-6 reveal">
            <h2 className="headline-lg max-w-xl">
              Why Apple is the best place to buy iPad.
            </h2>
            <Link href="#" className="hidden text-base text-appleBlue hover:underline md:inline-block">
              Shop iPad ›
            </Link>
          </div>
          <div className="mt-10">
            <WhyBuyMac items={WHY_BUY_TOPICS} />
          </div>
        </div>
      </section>

      {/* Get to know iPad */}
      <GetToKnowMac topics={TOPICS} title="Get to know iPad." />

      {/* iPad Essentials — Apple Pencil + Keyboards */}
      <section className="section-gray py-24">
        <div className="mx-auto max-w-appleWide px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500 text-center reveal">
            iPad essentials
          </p>
          <h2 className="mt-3 headline-lg text-center reveal delay-1">
            Pair your iPad with these standout accessories.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <article className="overflow-hidden rounded-2xl bg-white p-10 hover-lift parallax-up">
              <div className="aspect-[16/10] overflow-hidden rounded-xl bg-appleGray-100">
                <HotlinkImage
                  src={IMG_PENCIL}
                  fallback={img(800, 500, "Apple Pencil", "light")}
                  alt="Apple Pencil"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-6 text-xl font-semibold">Apple Pencil</h3>
              <p className="mt-2 text-base text-appleGray-700">
                Dream it up. Jot it down.
              </p>
              <Link
                href="#"
                className="mt-4 inline-block text-base text-appleBlue hover:underline"
              >
                Learn more ›
              </Link>
            </article>
            <article className="overflow-hidden rounded-2xl bg-white p-10 hover-lift parallax-up delay-1">
              <div className="aspect-[16/10] overflow-hidden rounded-xl bg-appleGray-100">
                <HotlinkImage
                  src={IMG_PRODUCTIVITY}
                  fallback={img(800, 500, "Keyboards for iPad", "light")}
                  alt="Keyboards for iPad"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-6 text-xl font-semibold">Keyboards for iPad</h3>
              <p className="mt-2 text-base text-appleGray-700">
                Type it out. Take it with you.
              </p>
              <Link
                href="#"
                className="mt-4 inline-block text-base text-appleBlue hover:underline"
              >
                Learn more ›
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Significant Others — iPad + iPhone / Mac / Watch */}
      <section className="section-light py-24">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="headline-lg text-center reveal">Significant others.</h2>
          <p className="mt-3 text-center text-appleGray-700 reveal delay-1">
            See how iPad works seamlessly with your other Apple devices.
          </p>
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {SIGNIFICANT_OTHERS.map((s, i) => (
              <article
                key={s.title}
                className={`rounded-2xl bg-appleGray-100 p-8 reveal delay-${i + 1}`}
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
    </div>
  );
}
