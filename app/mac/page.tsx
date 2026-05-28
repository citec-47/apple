import Link from "next/link";
import HotlinkImage from "@/components/HotlinkImage";
import TabSwitcher from "@/components/TabSwitcher";
import GetToKnowMac, { type Topic } from "@/components/GetToKnowMac";
import LineupCarousel, { type LineupModel } from "@/components/LineupCarousel";
import WhyBuyMac, { type WhyBuyItem } from "@/components/WhyBuyMac";
import { img } from "@/lib/img";

const APPLE = "https://www.apple.com";

const LAPTOPS: LineupModel[] = [
  {
    id: "macbook-air",
    name: 'MacBook Air 13" and 15"',
    tagline: "Thin. Fast. Powerful and portable.",
    isNew: true,
    colors: ["#a4c6d8", "#c8c9cc", "#e4d7c5", "#36383c"],
    src: `${APPLE}/v/macbook-air/z/images/overview/hero/hero_static__c9sislzzicq6_large.png`,
    fallback: img(800, 600, "MacBook Air", "gray"),
    href: "/mac",
    price: "From $1099",
    monthly: "or $91.58/mo. for 12 mo.◊",
  },
  {
    id: "macbook-pro",
    name: 'MacBook Pro 14" and 16"',
    tagline: "The most advanced Mac laptops for demanding tasks.",
    isNew: true,
    colors: ["#1d1d1f", "#c8c9cc"],
    src: `${APPLE}/v/macbook-pro/ax/images/overview/welcome/hero_endframe__fwev9ebh42mq_xlarge.jpg`,
    fallback: img(800, 600, "MacBook Pro", "gray"),
    href: "/mac/macbook-pro",
    price: "From $1999",
    monthly: "or $166.58/mo. for 12 mo.◊",
  },
];

const DESKTOPS: LineupModel[] = [
  {
    id: "imac",
    name: "iMac",
    tagline: "An all-in-one desktop for creativity and productivity.",
    colors: ["#5b8bb8", "#a06fb1", "#e3a4b7", "#e8a76d", "#e8d36b", "#9dc59a", "#c8c9cc"],
    src: `${APPLE}/v/imac/v/images/overview/welcome/welcome_hero__f23bdvt2rzam_xlarge.jpg`,
    fallback: img(800, 600, "iMac", "gray"),
    href: "#",
    price: "From $1299",
    monthly: "or $108.25/mo. for 12 mo.◊",
  },
  {
    id: "mac-mini",
    name: "Mac mini",
    tagline: "The mini-est, most affordable Mac desktop.",
    colors: [],
    src: `${APPLE}/v/mac-mini/aa/images/overview/welcome/welcome_hero__ckmy0qsqi8ia_large.jpg`,
    fallback: img(800, 600, "Mac mini", "gray"),
    href: "#",
    price: "From $599",
    monthly: "or $49.91/mo. for 12 mo.◊",
  },
  {
    id: "mac-studio",
    name: "Mac Studio",
    tagline: "Powerful performance and connectivity for pros.",
    colors: [],
    src: `${APPLE}/v/mac-studio/m/images/overview/hero/static_front__fmvxob6uyxiu_large.jpg`,
    fallback: img(800, 600, "Mac Studio", "gray"),
    href: "#",
    price: "From $1999",
    monthly: "or $166.58/mo. for 12 mo.◊",
  },
];

const DISPLAYS: LineupModel[] = [
  {
    id: "studio-display",
    name: "Studio Display",
    tagline: "A 5K Retina display that's perfect for Mac.",
    isNew: true,
    colors: [],
    src: `${APPLE}/v/studio-display/f/images/overview/hero/static__bntadi3c3hde_large.jpg`,
    fallback: img(800, 600, "Studio Display", "gray"),
    href: "#",
    price: "From $1599",
    monthly: "or $133.25/mo. for 12 mo.◊",
  },
  {
    id: "studio-display-xdr",
    name: "Studio Display XDR",
    tagline: "The ultimate 5K Retina XDR display for creative and pro workflows.",
    isNew: true,
    colors: [],
    src: `${APPLE}/v/studio-display-xdr/b/images/overview/welcome/hero_static__b1til0h99tf6_large.jpg`,
    fallback: img(800, 600, "Studio Display XDR", "gray"),
    href: "#",
    price: "From $3299",
    monthly: "or $274.91/mo. for 12 mo.◊",
  },
];

const IMG_WAYS_TO_BUY = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_171702_fa11382d-bdbe-406e-b6ca-065124bf2baf.png";
const IMG_EDUCATION = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_172740_1d2e2e1f-9860-411c-a165-4948316ef7da.png";
const IMG_PERSONAL_SETUP = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_173051_19daec2a-7ec9-49bf-91a9-b292e494f871.png";
const IMG_CUSTOMIZE = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_173223_b3465567-43d4-4df0-a85e-79c52c34483e.png";
const IMG_DELIVERY = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_173400_86e67b2c-18ee-415f-8f27-afde90b957d9.png";
const IMG_GUIDED = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_173610_7cc507ae-053b-4a60-b559-898a72d100fe.png";
const IMG_STORE_APP = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_173923_51a593a2-b365-45f7-8858-144008ee2989.png";

const WHY_BUY_TOPICS: WhyBuyItem[] = [
  {
    eyebrow: "Ways to Buy",
    headline: "Pay over time, interest-free.",
    description:
      "When you choose to check out at Apple with Apple Card Monthly Installments.◊",
    src: IMG_WAYS_TO_BUY,
    fallback: img(800, 1000, "Apple Card", "light"),
    blocks: [
      {
        heading: "Spread the cost.",
        body:
          "Split your purchase into equal monthly payments at 0% APR when you check out with Apple Card Monthly Installments — no fees, no surprises.",
      },
      {
        heading: "Daily Cash back.",
        body:
          "Earn cash back on every purchase you make with Apple Card. The cash goes straight into your Wallet, where you can spend it anywhere.",
      },
      {
        heading: "Track it all in Wallet.",
        body:
          "See exactly where your money goes, watch your payments come down, and stay in control of your spending right from the Wallet app.",
      },
    ],
  },
  {
    eyebrow: "Education",
    headline: "Save on Mac with education pricing.",
    description:
      "College students and educators can save through the Apple Store.",
    src: IMG_EDUCATION,
    fallback: img(800, 1000, "Education", "light"),
    blocks: [
      {
        heading: "Who qualifies.",
        body:
          "Current and newly accepted college students, parents shopping for them, and teachers and staff at higher-education institutions can all save on a new Mac.",
      },
      {
        heading: "Free accessories with your Mac.",
        body:
          "From time to time, Apple bundles AirPods or other accessories at no extra cost when you buy a Mac through the education store.",
      },
      {
        heading: "Easy verification.",
        body:
          "Sign in with your school email or upload a student or teacher ID to confirm your eligibility in a few clicks.",
      },
    ],
  },
  {
    eyebrow: "Personal Setup",
    headline: "Meet your new Mac with Personal Setup.",
    description:
      "Get one-on-one help with data transfer, the latest features, and more.",
    src: IMG_PERSONAL_SETUP,
    fallback: img(800, 1000, "Personal Setup", "light"),
    blocks: [
      {
        heading: "Move your data smoothly.",
        body:
          "A Specialist will walk you through transferring your files, photos, apps and accounts from your old computer — Mac or PC — to your new Mac.",
      },
      {
        heading: "Learn the essentials.",
        body:
          "Get a personalized tour of the macOS features that matter most for how you want to use your Mac, whether that's everyday tasks or creative work.",
      },
      {
        heading: "Free with every Mac.",
        body:
          "Personal Setup is included at no extra cost when you buy a Mac from Apple. Book a session online or by phone — it's quick to schedule.",
      },
    ],
  },
  {
    eyebrow: "Customize Your Mac",
    headline: "Customize your Mac.",
    description: "Choose your chip, memory, storage, even color.",
    src: IMG_CUSTOMIZE,
    fallback: img(800, 1000, "Customize", "light"),
    blocks: [
      {
        heading: "Pick the right chip.",
        body:
          "Choose between M3, M3 Pro and M3 Max chips depending on how demanding your workflow is — from light everyday use to pro creative work.",
      },
      {
        heading: "Memory and storage.",
        body:
          "Configure unified memory up to 128GB and SSD storage up to 8TB when you place your order. These are integrated for max performance.",
      },
      {
        heading: "Choose your color.",
        body:
          "Many Mac models come in multiple colors so you can pick the finish that fits your style — from classic silver to space black, sky blue and more.",
      },
    ],
  },
  {
    eyebrow: "Delivery & Pickup",
    headline: "Get flexible delivery and easy pickup.",
    description:
      "Choose from two-hour delivery, free standard shipping, or easy pickup options.",
    src: IMG_DELIVERY,
    fallback: img(800, 1000, "Delivery", "light"),
    blocks: [
      {
        heading: "Two-hour delivery.",
        body:
          "Have your Mac brought to your door from a nearby Apple Store in as little as two hours, with real-time tracking from your driver.",
      },
      {
        heading: "Free standard delivery.",
        body:
          "Free standard shipping is included on all orders. Expedited options are available if you need it sooner.",
      },
      {
        heading: "Pickup at your local Apple Store.",
        body:
          "Reserve online and pick up in store — often within an hour of placing your order — so you can start setting up your Mac right away.",
      },
    ],
  },
  {
    eyebrow: "Guided Shopping",
    headline: "Shop live with a Specialist.",
    description:
      "Get answers, recommendations and side-by-side help from an Apple Specialist — at a store or online.",
    src: IMG_GUIDED,
    fallback: img(800, 1000, "Guided Shopping", "light"),
    blocks: [
      {
        heading: "Shop over video.",
        body:
          "Connect with an Apple Specialist over a one-way video call — you can see them and the products, they can't see you. Ask anything.",
      },
      {
        heading: "By chat or phone, too.",
        body:
          "Prefer text or voice? Specialists are also available by chat, message, or phone to help you compare products and pick the right setup.",
      },
      {
        heading: "Free, no appointment needed.",
        body:
          "Guided shopping is always free, and most sessions are available without scheduling — just connect when you're ready to talk.",
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
        body:
          "The app shows you products and accessories that match the Apple devices you already use and how you use them.",
      },
      {
        heading: "Save and compare.",
        body:
          "Keep a wishlist of products you're considering, compare specs side by side, and revisit them without leaving the app.",
      },
      {
        heading: "Manage your orders.",
        body:
          "Track orders, manage subscriptions and pick up where you left off across devices with your Apple Account.",
      },
    ],
  },
];

const IMG_PERFORMANCE = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_160415_511846b3-9a4a-41a0-a0ae-6c5617524183.png";
const IMG_AI = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_160645_9798c5ca-c303-49ee-969f-c71760d8746c.png";
const IMG_MACOS = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_161856_aaec5965-4afe-4d4f-9cd9-8915731a133c.png";
const IMG_MACIPHONE = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_162105_f57e114c-aa3a-4667-a38d-c2a788ea6f46.png";
const IMG_COMPAT = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_162357_aa7d1a79-be9f-4261-99b5-aa0eb41f526e.png";
const IMG_PRIVACY = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_162524_45e6b514-d34e-4ffc-85b6-bac13134073b.png";
const IMG_DURABILITY = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_162649_3ded78b2-8cac-4f16-ac26-b3afc46e8e65.png";
const IMG_VALUES = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_162900_c8af2a21-230c-4343-bb2a-26a475a53c91.png";

// Secondary images for the second content block of each modal. Populated as
// generation finishes; falls back to a labeled placeholder until then.
const IMG_PERFORMANCE_2 = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_164157_57004140-dacc-4f5a-84d9-5cdc7cddc1f7.png";
const IMG_AI_2 = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_164934_fc3657b1-36df-4254-bc89-9ea579285559.png";
const IMG_MACOS_2 = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_165110_e6b08730-0753-4eef-9c5a-e6bf5f099a53.png";
const IMG_MACIPHONE_2 = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_165231_06bf7bb4-ca84-4e2b-90dc-239de9dc5c5e.png";
const IMG_COMPAT_2 = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_165500_21e3554f-0165-40b1-ac06-df902b60ba4e.png";
const IMG_PRIVACY_2 = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_165733_de318996-6a24-41c0-a61e-c077bfdd4825.png";
const IMG_DURABILITY_2 = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_170141_ab384019-af43-48b7-97ea-969bc01dba65.png";
const IMG_VALUES_2 = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_170355_fbe64bb4-4684-4b99-ba9a-77386bb1e5c2.png";

const TOPICS: Topic[] = [
  {
    title: "Performance and Battery Life",
    sub: "Go fast. Go far.",
    bg: "#0a1838",
    src: IMG_PERFORMANCE,
    fallback: img(600, 800, "Performance and Battery", "dark"),
    blocks: [
      {
        heading: "Powered by Apple silicon.",
        body:
          "Mac is built on a custom system-on-a-chip where the CPU, GPU, memory and Neural Engine sit together on a single die. That tight integration means more speed for everyday tasks and the heaviest workloads, while sipping less power than traditional designs.",
        image: { src: IMG_PERFORMANCE, fallback: IMG_PERFORMANCE, alt: "Apple silicon performance" },
      },
      {
        heading: "All-day battery on the move.",
        body:
          "Take your Mac laptop on the road and stop worrying about the charger. A single charge can last through a flight, a workday, or a creative session at a cafe — and stays fast whether plugged in or not.",
        image: { src: IMG_PERFORMANCE_2, fallback: IMG_PERFORMANCE_2, alt: "Working away from a power outlet" },
      },
      {
        heading: "Ready for what's next.",
        body:
          "Whether you're editing video, designing in 3D, building software, or running large machine-learning models locally, Mac has the headroom to keep up with ambitious work for years to come.",
      },
    ],
  },
  {
    title: "Built for AI",
    sub: "Smart. Secure. On device.",
    bg: "#1a0a2e",
    src: IMG_AI,
    fallback: img(600, 800, "Built for AI", "dark"),
    blocks: [
      {
        heading: "Intelligence built into the chip.",
        body:
          "The Neural Engine inside every Mac runs machine-learning models locally, so features like smart writing, image creation, and contextual search work fast and don't need to send your personal content to a remote server.",
        image: { src: IMG_AI, fallback: IMG_AI, alt: "Apple silicon Neural Engine" },
      },
      {
        heading: "Private by design.",
        body:
          "When a task needs more horsepower than your device alone, dedicated cloud infrastructure handles it with the same privacy guarantees as your Mac — your data is never stored after the request and is verifiable by independent researchers.",
        image: { src: IMG_AI_2, fallback: IMG_AI_2, alt: "Private cloud compute" },
      },
      {
        heading: "Helpful in every app.",
        body:
          "Smart writing tools, summaries, and image generation are surfaced right inside the apps you already use — no copy-pasting into a separate chatbot.",
      },
    ],
  },
  {
    title: "macOS and Apple Intelligence",
    sub: "Easy to use. Easy to love.",
    bg: "#3c8bcc",
    src: IMG_MACOS,
    fallback: img(600, 800, "macOS", "light"),
    blocks: [
      {
        heading: "An interface that feels natural.",
        body:
          "macOS is designed so the things you reach for most — files, apps, calendar, weather — are always one motion away. Spotlight finds anything in seconds, Stage Manager keeps your windows tidy, and widgets surface the info you care about.",
        image: { src: IMG_MACOS, fallback: IMG_MACOS, alt: "macOS desktop with widgets" },
      },
      {
        heading: "Make it your own.",
        body:
          "Choose a wallpaper. Arrange your widgets. Set up Control Center the way you like it. macOS adapts to how you work, not the other way around.",
        image: { src: IMG_MACOS_2, fallback: IMG_MACOS_2, alt: "Customizing the desktop" },
      },
      {
        heading: "Free updates, every year.",
        body:
          "Major macOS releases roll out for several years after you buy a Mac, bringing new features, performance improvements and security fixes at no extra cost.",
      },
    ],
  },
  {
    title: "Mac + iPhone",
    sub: "Together they work wonders.",
    bg: "#c54a6a",
    src: IMG_MACIPHONE,
    fallback: img(600, 800, "Mac and iPhone", "light"),
    blocks: [
      {
        heading: "Effortless continuity.",
        body:
          "Start an email on iPhone and finish it on Mac. Copy on one device, paste on another with Universal Clipboard. Send any file in seconds with AirDrop. The handoffs feel invisible.",
        image: { src: IMG_MACIPHONE, fallback: IMG_MACIPHONE, alt: "Mac and iPhone side by side" },
      },
      {
        heading: "iPhone Mirroring.",
        body:
          "Bring your iPhone to your Mac screen. Tap into iPhone apps, drag files between devices, and respond to iPhone notifications without ever picking up your phone.",
        image: { src: IMG_MACIPHONE_2, fallback: IMG_MACIPHONE_2, alt: "iPhone Mirroring on Mac" },
      },
      {
        heading: "Unlock with your Apple Watch.",
        body:
          "Sit down at your Mac wearing your watch and it unlocks automatically. No typing, no fingerprint — just walk up and start working.",
      },
    ],
  },
  {
    title: "Compatibility",
    sub: "Mac runs your favorite apps.",
    bg: "#5db5e8",
    src: IMG_COMPAT,
    fallback: img(600, 800, "Compatibility", "light"),
    blocks: [
      {
        heading: "The apps you rely on, native on Mac.",
        body:
          "Microsoft 365, Zoom, Slack, Google Workspace, Adobe Creative Cloud, Figma — the day-to-day tools millions of people use already run beautifully on Apple silicon Mac, with great battery life and instant wake.",
        image: { src: IMG_COMPAT, fallback: IMG_COMPAT, alt: "Productivity apps on Mac" },
      },
      {
        heading: "Discover more in the App Store.",
        body:
          "The Mac App Store collects thousands of apps in one trusted place — vetted for security, easy to install, and kept up to date with a single click.",
        image: { src: IMG_COMPAT_2, fallback: IMG_COMPAT_2, alt: "Mac App Store" },
      },
      {
        heading: "Need Windows? No problem.",
        body:
          "Virtualization software like Parallels Desktop or VMware Fusion lets you run Windows side-by-side with macOS, so you don't have to choose.",
      },
    ],
  },
  {
    title: "Privacy and Security",
    sub: "Your business is nobody else's.",
    bg: "#2a2a2a",
    src: IMG_PRIVACY,
    fallback: img(600, 800, "Privacy and Security", "dark"),
    blocks: [
      {
        heading: "Privacy as a default, not an option.",
        body:
          "Mac is designed so that as much of your data as possible stays on your device. Safari blocks invasive trackers automatically, Mail hides your IP from senders, and apps must explicitly ask before reading your files.",
        image: { src: IMG_PRIVACY, fallback: IMG_PRIVACY, alt: "Privacy lock" },
      },
      {
        heading: "Touch ID, where it counts.",
        body:
          "Unlock your Mac, sign in to websites, and approve purchases with a fingerprint. The print itself is encrypted inside a dedicated chip and never leaves your machine.",
        image: { src: IMG_PRIVACY_2, fallback: IMG_PRIVACY_2, alt: "Touch ID" },
      },
      {
        heading: "Protections that quietly work.",
        body:
          "Encrypted storage by default, automatic malware protection, and regular security updates run in the background — so you can focus on what matters.",
      },
    ],
  },
  {
    title: "Durability",
    sub: "Built to stand the test of time.",
    bg: "#6b4a2a",
    src: IMG_DURABILITY,
    fallback: img(600, 800, "Durability", "dark"),
    blocks: [
      {
        heading: "Made to last.",
        body:
          "Mac is precision-machined from premium materials and tested to handle real-world use — from the daily commute to the kitchen table.",
        image: { src: IMG_DURABILITY, fallback: IMG_DURABILITY, alt: "Durable build" },
      },
      {
        heading: "Cool, quiet, and efficient.",
        body:
          "Apple silicon's efficiency means cooler internal temperatures and less fan noise, which translates to less wear on your Mac over the years.",
        image: { src: IMG_DURABILITY_2, fallback: IMG_DURABILITY_2, alt: "Mac on a workspace" },
      },
      {
        heading: "Trade in, recycle, renew.",
        body:
          "When you're ready for a new Mac, trade in your old one for credit — or recycle it through Apple Trade In at no cost.",
      },
    ],
  },
  {
    title: "Apple Values",
    sub: "Our values drive everything we do.",
    bg: "#1d4a2a",
    src: IMG_VALUES,
    fallback: img(600, 800, "Apple Values", "dark"),
    blocks: [
      {
        heading: "Better for the planet.",
        body:
          "Every Mac is made with more recycled materials, smaller packaging, and a manufacturing footprint that runs on renewable energy — part of a broader push toward carbon-neutral products.",
        image: { src: IMG_VALUES, fallback: IMG_VALUES, alt: "Planet Earth" },
      },
      {
        heading: "Designed responsibly.",
        body:
          "Ethical sourcing, fair labor practices, and supplier accountability are part of how every Mac is made — from raw materials to the box it ships in.",
        image: { src: IMG_VALUES_2, fallback: IMG_VALUES_2, alt: "Responsible design" },
      },
      {
        heading: "Accessible to everyone.",
        body:
          "Mac includes deep accessibility features for vision, hearing, motor and cognitive needs, so powerful tools are within reach for every user.",
      },
    ],
  },
];

const UNLOCK = [
  {
    title: "Mac and iPhone",
    body:
      "Answer calls or messages from your iPhone directly on your Mac. See and control what's on your iPhone from your Mac with iPhone Mirroring and Live Activities. Use Universal Clipboard to copy images, video, or text from your iPhone, then paste into another app on your nearby Mac. And thanks to iCloud, you can access your files from either your iPhone or your Mac. And so much more.",
  },
  {
    title: "Mac and iPad",
    body:
      "Sketch on your iPad and have it appear instantly on your Mac. Or use your iPad as a second display, so you can work on one screen while you reference the other. You can even start something on your iPad — like a presentation or an email — and continue it on your Mac.",
  },
  {
    title: "Mac and Apple Watch",
    body:
      "Automatically log in to your Mac when you're wearing your Apple Watch with Auto Unlock. No password typing required.",
  },
];


export default function MacPage() {
  const allModels = [...LAPTOPS, ...DESKTOPS, ...DISPLAYS];

  return (
    <div className="bg-white">
      {/* Education savings banner */}
      <section className="bg-appleGray-100 py-3 text-center text-sm">
        <p>
          <span className="font-semibold text-appleGray-900">Buy Mac with education savings.</span>{" "}
          <Link href="#" className="text-appleBlue hover:underline">
            Shop ›
          </Link>
        </p>
      </section>

      {/* Page title */}
      <section className="bg-appleGray-100 pt-16 pb-12">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <h1 className="headline-xxl reveal">Mac</h1>
          <p className="mt-4 text-2xl text-appleGray-700 reveal delay-1">
            If you can dream it, Mac can do it.
          </p>
        </div>
      </section>

      {/* Explore the lineup */}
      <section className="section-light py-20">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="headline-lg text-center reveal">Explore the lineup.</h2>

          <div className="mt-12 reveal delay-1">
            <TabSwitcher
              tabs={[
                { id: "all", label: "All products" },
                { id: "laptops", label: "Laptops" },
                { id: "desktops", label: "Desktops" },
                { id: "displays", label: "Displays" },
              ]}
              panels={{
                all: <LineupCarousel models={allModels} />,
                laptops: <LineupCarousel models={LAPTOPS} />,
                desktops: <LineupCarousel models={DESKTOPS} />,
                displays: <LineupCarousel models={DISPLAYS} />,
              }}
            />
          </div>
        </div>
      </section>

      {/* Why Apple is the best place to buy Mac — modal carousel */}
      <section className="section-gray py-24">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="flex items-end justify-between gap-6 reveal">
            <h2 className="headline-lg max-w-xl">
              Why Apple is the best place to buy Mac.
            </h2>
            <Link href="#" className="hidden text-base text-appleBlue hover:underline md:inline-block">
              Shop Mac ›
            </Link>
          </div>
          <div className="mt-10">
            <WhyBuyMac items={WHY_BUY_TOPICS} />
          </div>
        </div>
      </section>

      {/* Get to know Mac — interactive carousel with click-to-expand modals */}
      <GetToKnowMac topics={TOPICS} />

      {/* Help me choose */}
      <section className="section-gray py-20 text-center">
        <div className="mx-auto max-w-apple px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500 reveal">
            Help me choose
          </p>
          <h2 className="mt-3 headline-lg reveal delay-1">
            Answer a few questions to find the best Mac for you.
          </h2>
          <Link
            href="#"
            className="mt-6 inline-flex btn-pill btn-pill-primary reveal delay-2"
          >
            Get started
          </Link>
        </div>
      </section>

      {/* Switch to Mac / Trade In */}
      <section className="section-light py-24">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <article className="reveal">
              <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">
                Switch to Mac
              </p>
              <h3 className="mt-3 headline-lg">Give us the old. Save on the new.</h3>
              <p className="mt-4 text-base leading-relaxed text-appleGray-700">
                With Apple Trade In, you can get a great value for your current device and apply it
                toward a new one. If your device isn&apos;t eligible for credit, we&apos;ll recycle it for
                free.
              </p>
              <Link
                href="#"
                className="mt-5 inline-block text-base text-appleBlue hover:underline"
              >
                See what your device is worth ›
              </Link>
            </article>
            <article className="reveal delay-1">
              <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">
                Mac does that
              </p>
              <h3 className="mt-3 headline-lg">See how easy it is to move to Mac.</h3>
              <p className="mt-4 text-base leading-relaxed text-appleGray-700">
                From transferring your files to picking up where you left off, Mac was made to make
                the switch from Windows or another platform feel seamless.
              </p>
              <Link
                href="#"
                className="mt-5 inline-block text-base text-appleBlue hover:underline"
              >
                Learn more ›
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Mac essentials */}
      <section className="section-gray py-24">
        <div className="mx-auto max-w-appleWide px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500 text-center reveal">
            Mac essentials
          </p>
          <h2 className="mt-3 headline-lg text-center reveal delay-1">
            Pair your Mac with these standout accessories.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <article className="overflow-hidden rounded-2xl bg-white p-10 hover-lift parallax-up">
              <div className="aspect-[16/10] overflow-hidden rounded-xl bg-appleGray-100">
                <img
                  src={img(800, 500, "Mac accessories", "light")}
                  alt="Mac accessories"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-6 text-xl font-semibold">Mac accessories</h3>
              <p className="mt-2 text-base text-appleGray-700">
                Explore keyboards, mice, and other essentials.
              </p>
              <Link
                href="#"
                className="mt-4 inline-block text-base text-appleBlue hover:underline"
              >
                Shop Mac accessories ›
              </Link>
            </article>
            <article className="overflow-hidden rounded-2xl bg-white p-10 hover-lift parallax-up delay-1">
              <div className="aspect-[16/10] overflow-hidden rounded-xl bg-appleGray-100">
                <HotlinkImage
                  src={`${APPLE}/v/studio-display/f/images/overview/hero/static__bntadi3c3hde_large.jpg`}
                  fallback={img(800, 500, "Studio Display", "light")}
                  alt="Studio Display"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-appleBlue">
                New
              </p>
              <h3 className="mt-1 text-xl font-semibold">Studio Display</h3>
              <p className="mt-2 text-base text-appleGray-700">
                The 27-inch 5K Retina display pairs beautifully with Mac.
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

      {/* Unlock the world of Apple */}
      <section className="section-light py-24">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="headline-lg text-center reveal">Unlock the world of Apple.</h2>
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {UNLOCK.map((u, i) => (
              <article
                key={u.title}
                className={`rounded-2xl bg-appleGray-100 p-8 reveal delay-${i + 1}`}
              >
                <h3 className="text-xl font-semibold text-appleGray-900">{u.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-appleGray-700">{u.body}</p>
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

/* --------------------------------- Icons --------------------------------- */

