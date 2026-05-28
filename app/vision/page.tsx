import Link from "next/link";
import HotlinkImage from "@/components/HotlinkImage";
import GetToKnowMac, { type Topic } from "@/components/GetToKnowMac";

const APPLE = "https://www.apple.com";

const HERO_SRC = `${APPLE}/v/apple-vision-pro/k/images/overview/hero/hero__cvgr5aj1ttsi_large.jpg`;

// AI-generated image placeholders. Filled in as generations complete.
const IMG_HERO_GEN = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_203923_58d54932-2f79-4a5d-a5cb-10e745638ffc.png";
const IMG_DESIGN = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_204552_15903848-b3ee-451d-a25a-f0f3da32b54d.png";
const IMG_BAND = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_211714_5f87e912-8dac-4728-a1a0-cc5e013addbf.png";
const IMG_BATTERY = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_204827_f1e15b10-7e69-48d3-ae85-c0bef71572e8.png";
const IMG_ENTERTAINMENT = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_212006_7874a672-1486-4770-9864-f3f10f458c4f.png";
const IMG_PRODUCTIVITY = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_212258_4f6029a6-9c39-4056-b53f-cf15ea866728.png";
const IMG_PERSONA = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_205304_ed61e884-17f5-4705-9c06-d9089c948f19.png";
const IMG_VISIONOS = "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_205719_45f0e02f-66fc-49d7-9782-03a96797b70d.png";

const SUB_NAV = [
  { label: "Overview", href: "/vision" },
  { label: "Tech Specs", href: "#" },
  { label: "visionOS", href: "#" },
];

// Design carousel — 8 cards
const DESIGN_TOPICS: Topic[] = [
  {
    title: "Design innovation",
    sub: "Where craftsmanship meets engineering.",
    bg: "#2a2a35",
    src: IMG_DESIGN,
    fallback: IMG_DESIGN,
    blocks: [
      {
        heading: "Decades of advances, fused.",
        body: "The design draws on years of work in mobile silicon, wearables, optical systems and materials science — refined into a single product you wear on your face.",
        image: { src: IMG_DESIGN, fallback: IMG_DESIGN, alt: "Design" },
      },
      {
        heading: "An aluminum-alloy frame.",
        body: "A precision-milled aluminum frame gives the headset its rigidity and finish, while curving gently to follow the geometry of your face.",
      },
      {
        heading: "A laminated glass front.",
        body: "The seamless front panel doubles as an optical surface for the outward-facing cameras and a window for the front display.",
      },
    ],
  },
  {
    title: "Dual Knit Band",
    sub: "Comfort that distributes weight evenly.",
    bg: "#3a3a45",
    src: IMG_BAND,
    fallback: IMG_BAND,
    blocks: [
      {
        heading: "Soft, breathable straps.",
        body: "The dual upper-and-back strap design counterbalances the weight of the front module, so the headset feels secure without pressing into your face.",
        image: { src: IMG_BAND, fallback: IMG_BAND, alt: "Dual Knit Band" },
      },
      {
        heading: "Knit for stretch and grip.",
        body: "A 3D-knit pattern delivers stretch where you need it and grip where you don't — without separate plastic pieces.",
      },
    ],
  },
  {
    title: "Fit Dial",
    sub: "Fine-tune the fit on the fly.",
    bg: "#46474f",
    src: IMG_BAND,
    fallback: IMG_BAND,
    blocks: [
      {
        heading: "Two-axis adjustment.",
        body: "A dual-function dial tightens the upper and back straps independently so you can dial in the exact balance for your head shape.",
      },
      {
        heading: "Adjust without looking.",
        body: "The dial is large, tactile and within easy reach, so you can rebalance the headset without taking it off.",
      },
    ],
  },
  {
    title: "Light Seal",
    sub: "Magnetic, soft and shape-flexible.",
    bg: "#52535b",
    src: IMG_DESIGN,
    fallback: IMG_DESIGN,
    blocks: [
      {
        heading: "Attaches magnetically.",
        body: "The Light Seal clicks into the aluminum frame with magnets — easy to remove for cleaning or swapping sizes.",
      },
      {
        heading: "Flexes to fit you.",
        body: "Soft foam contours adapt to a wide range of face shapes and block out ambient light without uncomfortable pressure.",
      },
    ],
  },
  {
    title: "Digital Crown",
    sub: "Control immersion with a turn.",
    bg: "#1d1d1f",
    src: IMG_DESIGN,
    fallback: IMG_DESIGN,
    blocks: [
      {
        heading: "Press for Home View.",
        body: "A single press of the crown brings up the Home View — your launchpad for apps, widgets and environments.",
      },
      {
        heading: "Turn for immersion.",
        body: "Roll the crown to smoothly dial in how much of an Environment you want to see, from a sliver to a full 360°.",
      },
    ],
  },
  {
    title: "Audio Strap",
    sub: "Spatial Audio close to your ears.",
    bg: "#3b3b44",
    src: IMG_BAND,
    fallback: IMG_BAND,
    blocks: [
      {
        heading: "Speakers in the straps.",
        body: "Dual-driver audio pods sit just above each ear, projecting sound that feels like it belongs in your room.",
      },
      {
        heading: "Personalized sound.",
        body: "Audio is tailored to the geometry of your head and ears, so what you hear lands accurately in space.",
      },
    ],
  },
  {
    title: "External Battery",
    sub: "Pocketable power, all-day flexibility.",
    bg: "#2a2a35",
    src: IMG_BATTERY,
    fallback: IMG_BATTERY,
    blocks: [
      {
        heading: "Aluminum-cased pack.",
        body: "The battery lives in a thin pack you can slip into a pocket, keeping the headset itself lighter on your face.",
        image: { src: IMG_BATTERY, fallback: IMG_BATTERY, alt: "Battery" },
      },
      {
        heading: "Up to 2.5 hours general use.",
        body: "Use Vision Pro for up to 2.5 hours of typical activity on a single charge, or up to 3 hours of video playback. Plug into power for all-day sessions.",
      },
    ],
  },
  {
    title: "ZEISS Optical Inserts",
    sub: "Made for prescription wearers.",
    bg: "#46474f",
    src: IMG_DESIGN,
    fallback: IMG_DESIGN,
    blocks: [
      {
        heading: "Snap-in lenses.",
        body: "Custom ZEISS Optical Inserts can be ordered to match your prescription and magnetically attach to the displays.",
      },
      {
        heading: "Crisp text and pin-sharp UI.",
        body: "With the right inserts, text, UI and content stay crisp at every distance — no glasses required underneath.",
      },
    ],
  },
];

const ENTERTAINMENT_TOPICS: Topic[] = [
  {
    title: "Apple Immersive Video",
    sub: "180-degree 3D, 8K, with Spatial Audio.",
    bg: "#1d1d1f",
    src: IMG_ENTERTAINMENT,
    fallback: IMG_ENTERTAINMENT,
    blocks: [
      {
        heading: "Step into the scene.",
        body: "Apple Immersive Video is a high-resolution capture format that surrounds you with the content — concerts, sports, documentaries shot for spatial.",
        image: { src: IMG_ENTERTAINMENT, fallback: IMG_ENTERTAINMENT, alt: "Immersive Video" },
      },
      {
        heading: "8K detail, 180°.",
        body: "8K resolution per eye plus a 180-degree field of view make subtle textures and depth feel astonishingly real.",
      },
    ],
  },
  {
    title: "Spatial Gallery",
    sub: "An evolving collection of spatial content.",
    bg: "#2a2a35",
    src: IMG_ENTERTAINMENT,
    fallback: IMG_ENTERTAINMENT,
    blocks: [
      {
        heading: "Curated for spatial.",
        body: "The Spatial Gallery app collects photos, videos and immersive scenes selected for the strengths of the headset.",
      },
    ],
  },
  {
    title: "Gaming",
    sub: "Play with the space around you.",
    bg: "#3a1f4a",
    src: IMG_ENTERTAINMENT,
    fallback: IMG_ENTERTAINMENT,
    blocks: [
      {
        heading: "Hand tracking up to 90Hz.",
        body: "Reach, point, throw and tap directly in the world around you — no controller required for many titles.",
      },
      {
        heading: "Controller support.",
        body: "For games that want it, you can pair compatible controllers including PlayStation VR2 Sense for six-degrees-of-freedom play.",
      },
    ],
  },
  {
    title: "Multiview",
    sub: "Watch up to five games at once.",
    bg: "#1f3a5f",
    src: IMG_ENTERTAINMENT,
    fallback: IMG_ENTERTAINMENT,
    blocks: [
      {
        heading: "Five streams, one space.",
        body: "Stream multiple MLS Season Pass or Friday Night Baseball games side by side and resize each to what matters most.",
      },
    ],
  },
  {
    title: "3D Movies",
    sub: "Real depth, sharp motion.",
    bg: "#2a2a35",
    src: IMG_ENTERTAINMENT,
    fallback: IMG_ENTERTAINMENT,
    blocks: [
      {
        heading: "Built for the format.",
        body: "Vision Pro brings 3D titles to life with depth that doesn't feel forced — and motion that stays crisp during action scenes.",
      },
    ],
  },
  {
    title: "Travel Mode",
    sub: "Smooth viewing on the move.",
    bg: "#1d1d1f",
    src: IMG_ENTERTAINMENT,
    fallback: IMG_ENTERTAINMENT,
    blocks: [
      {
        heading: "Designed for planes and trains.",
        body: "Travel Mode adjusts the sensor systems for in-cabin motion, so your content stays anchored and comfortable.",
      },
    ],
  },
];

const PRODUCTIVITY_TOPICS: Topic[] = [
  {
    title: "Mac Virtual Display",
    sub: "Your Mac, ultrawide, in space.",
    bg: "#1f4a5f",
    src: IMG_PRODUCTIVITY,
    fallback: IMG_PRODUCTIVITY,
    blocks: [
      {
        heading: "Wireless screen extension.",
        body: "Mirror or extend your Mac wirelessly with a massive ultrawide display you can place anywhere in your room.",
        image: { src: IMG_PRODUCTIVITY, fallback: IMG_PRODUCTIVITY, alt: "Mac Virtual Display" },
      },
      {
        heading: "Keep your peripherals.",
        body: "Use your Mac's keyboard, trackpad and apps as normal — Vision Pro just adds more pixels.",
      },
    ],
  },
  {
    title: "Widgets",
    sub: "Arrange info around the room.",
    bg: "#3c8bcc",
    src: IMG_PRODUCTIVITY,
    fallback: IMG_PRODUCTIVITY,
    blocks: [
      {
        heading: "Pin widgets in space.",
        body: "Place clocks, photos, calendars and music widgets in your environment — they stay where you put them across sessions.",
      },
    ],
  },
  {
    title: "Apple Intelligence",
    sub: "Writing Tools, on the canvas.",
    bg: "#a463f2",
    src: IMG_PRODUCTIVITY,
    fallback: IMG_PRODUCTIVITY,
    blocks: [
      {
        heading: "Refine your writing.",
        body: "Proofread, rewrite, summarize and adjust the tone of text in Mail and Notes — without leaving the headset.",
      },
    ],
  },
  {
    title: "Bluetooth accessories",
    sub: "Keyboards and trackpads, on demand.",
    bg: "#1d1d1f",
    src: IMG_PRODUCTIVITY,
    fallback: IMG_PRODUCTIVITY,
    blocks: [
      {
        heading: "Plug-and-play input.",
        body: "Pair Magic Keyboard, Magic Trackpad and other Bluetooth accessories the same way you would on any Apple device.",
      },
    ],
  },
  {
    title: "Enterprise",
    sub: "Hands-on, anywhere on the planet.",
    bg: "#3a3a45",
    src: IMG_PRODUCTIVITY,
    fallback: IMG_PRODUCTIVITY,
    blocks: [
      {
        heading: "Built for teams.",
        body: "Collaborate across time zones with spatial whiteboards, 3D models, training scenarios and remote assistance — all in the same shared space.",
      },
    ],
  },
];

const PHOTOS_TOPICS: Topic[] = [
  {
    title: "Spatial conversion",
    sub: "Turn 2D photos into spatial scenes.",
    bg: "#c54a6a",
    src: IMG_PRODUCTIVITY,
    fallback: IMG_PRODUCTIVITY,
    blocks: [
      {
        heading: "Lean into the memory.",
        body: "Instantly convert flat photos from your library into spatial scenes with believable depth — no extra capture required.",
      },
    ],
  },
  {
    title: "Spatial photos and videos",
    sub: "Capture moments with depth.",
    bg: "#3c8bcc",
    src: IMG_PRODUCTIVITY,
    fallback: IMG_PRODUCTIVITY,
    blocks: [
      {
        heading: "Look around the moment.",
        body: "Spatial photos and videos preserve real depth so you can feel like you're back in the scene rather than looking at a flat picture.",
      },
    ],
  },
  {
    title: "Memory movies",
    sub: "Curated highlight reels.",
    bg: "#5f3a1f",
    src: IMG_PRODUCTIVITY,
    fallback: IMG_PRODUCTIVITY,
    blocks: [
      {
        heading: "Built with intelligence.",
        body: "Search your library by content and build short, cinematic memory movies from photos and clips — without manual editing.",
      },
    ],
  },
  {
    title: "360° playback",
    sub: "Native action camera support.",
    bg: "#1f5f5a",
    src: IMG_PRODUCTIVITY,
    fallback: IMG_PRODUCTIVITY,
    blocks: [
      {
        heading: "Wide and immersive.",
        body: "Play 360°, 180° and ultra-wide footage from popular action cameras natively, with smooth handling and crisp playback.",
      },
    ],
  },
];

const CONNECT_TOPICS: Topic[] = [
  {
    title: "Persona",
    sub: "A natural, expressive on-screen you.",
    bg: "#46474f",
    src: IMG_PERSONA,
    fallback: IMG_PERSONA,
    blocks: [
      {
        heading: "Move and emote in real time.",
        body: "Your Persona mirrors your facial expressions and hand movements, so others see you — not a static avatar — in calls.",
        image: { src: IMG_PERSONA, fallback: IMG_PERSONA, alt: "Persona" },
      },
    ],
  },
  {
    title: "FaceTime",
    sub: "Calls that float around you.",
    bg: "#3c8bcc",
    src: IMG_PERSONA,
    fallback: IMG_PERSONA,
    blocks: [
      {
        heading: "Resize and arrange.",
        body: "Each participant lives in their own resizable tile that you can place anywhere in your space — small for background chats or large for focused talks.",
      },
    ],
  },
  {
    title: "SharePlay",
    sub: "Watch and play, together.",
    bg: "#a463f2",
    src: IMG_PERSONA,
    fallback: IMG_PERSONA,
    blocks: [
      {
        heading: "Synced media, anywhere.",
        body: "Stream shows, play multiplayer games and explore Environments at the same time as friends, no matter where they are.",
      },
    ],
  },
  {
    title: "Image Playground",
    sub: "Create images and Genmoji in seconds.",
    bg: "#e3a4b7",
    src: IMG_PERSONA,
    fallback: IMG_PERSONA,
    blocks: [
      {
        heading: "Play with style.",
        body: "Generate fun images and personalized emoji in different styles right inside Messages, Notes and other apps.",
      },
    ],
  },
];

const VISIONOS_TOPICS: Topic[] = [
  {
    title: "Apps in space",
    sub: "Windows that breathe with the room.",
    bg: "#3c8bcc",
    src: IMG_VISIONOS,
    fallback: IMG_VISIONOS,
    blocks: [
      {
        heading: "Beyond the boundary of a screen.",
        body: "App windows can sit on a wall, hover next to your desk, or stack across your kitchen — placed and resized exactly how you want them.",
        image: { src: IMG_VISIONOS, fallback: IMG_VISIONOS, alt: "visionOS apps" },
      },
    ],
  },
  {
    title: "Environments",
    sub: "Step into a 360° scene.",
    bg: "#1f5f5a",
    src: IMG_VISIONOS,
    fallback: IMG_VISIONOS,
    blocks: [
      {
        heading: "Make any room calm.",
        body: "Environments wrap you in a 360° place — a lakeside, a forest, the moon — to focus, work or unwind on your own terms.",
      },
    ],
  },
  {
    title: "EyeSight",
    sub: "Stay connected to the people around you.",
    bg: "#46474f",
    src: IMG_VISIONOS,
    fallback: IMG_VISIONOS,
    blocks: [
      {
        heading: "Eyes when you're free.",
        body: "When you're in pass-through mode, others can see your eyes through the front of the headset, making it easier to talk and connect.",
      },
      {
        heading: "A subtle visual cue.",
        body: "When you're fully immersed, EyeSight switches to a calming visual pattern so people know not to interrupt.",
      },
    ],
  },
  {
    title: "Guest User",
    sub: "Easily hand it over.",
    bg: "#1d1d1f",
    src: IMG_VISIONOS,
    fallback: IMG_VISIONOS,
    blocks: [
      {
        heading: "Made for sharing.",
        body: "Set up Guest User in moments so a friend or family member can try Vision Pro without overwriting your personalization.",
      },
    ],
  },
  {
    title: "Eye-based navigation",
    sub: "Look at it. That's the click.",
    bg: "#3c8bcc",
    src: IMG_VISIONOS,
    fallback: IMG_VISIONOS,
    blocks: [
      {
        heading: "Highlight without pointing.",
        body: "visionOS knows what your eyes are looking at and uses that to highlight buttons, text fields and elements with no cursor required.",
      },
    ],
  },
  {
    title: "Hand gestures",
    sub: "Tap, flick, swipe.",
    bg: "#3a3a45",
    src: IMG_VISIONOS,
    fallback: IMG_VISIONOS,
    blocks: [
      {
        heading: "Small motions, big results.",
        body: "Tap two fingers together to select and flick to scroll — gestures that work whether your hands are resting in your lap or out in front of you.",
      },
    ],
  },
  {
    title: "Voice and Siri",
    sub: "Dictate, search and command.",
    bg: "#a463f2",
    src: IMG_VISIONOS,
    fallback: IMG_VISIONOS,
    blocks: [
      {
        heading: "Hands-free everything.",
        body: "Dictate text into search fields, open apps and play media using just your voice — no setup needed.",
      },
    ],
  },
];

const PRIVACY_TOPICS: Topic[] = [
  {
    title: "Optic ID",
    sub: "Authentication, by iris.",
    bg: "#1d1d1f",
    src: IMG_VISIONOS,
    fallback: IMG_VISIONOS,
    blocks: [
      {
        heading: "Unique by design.",
        body: "Optic ID uses the unique patterns of your iris to unlock the headset and authorize purchases — and the data never leaves the device.",
      },
    ],
  },
  {
    title: "Camera and sensor data",
    sub: "Processed by the system, not apps.",
    bg: "#3a3a45",
    src: IMG_VISIONOS,
    fallback: IMG_VISIONOS,
    blocks: [
      {
        heading: "Apps see less by design.",
        body: "Cameras and sensors feed the system layer, not individual apps. Apps see only what they need to function — never raw video of you or your room.",
      },
    ],
  },
  {
    title: "Eye input",
    sub: "Stays on your device.",
    bg: "#46474f",
    src: IMG_VISIONOS,
    fallback: IMG_VISIONOS,
    blocks: [
      {
        heading: "Selections, not stares.",
        body: "Apps and websites receive only your final selections, never the path your eyes traveled to get there. Apple never sees this data either.",
      },
    ],
  },
  {
    title: "Accessibility",
    sub: "Inclusive by design.",
    bg: "#3c8bcc",
    src: IMG_VISIONOS,
    fallback: IMG_VISIONOS,
    blocks: [
      {
        heading: "Built-in support.",
        body: "Features for vision, motor, hearing and cognitive needs — including Live Captions, Smart Color Invert and reduced transparency — ship in the box.",
      },
    ],
  },
  {
    title: "Sustainability",
    sub: "Recycled materials at the core.",
    bg: "#1d4a2a",
    src: IMG_VISIONOS,
    fallback: IMG_VISIONOS,
    blocks: [
      {
        heading: "Lower-impact materials.",
        body: "100% recycled aluminum in the frame and battery enclosure, plus low-carbon manufacturing choices across the supply chain.",
      },
    ],
  },
];

export default function VisionPage() {
  return (
    <div className="bg-white">
      {/* Sub-nav strip */}
      <nav className="border-b border-appleGray-200 bg-white">
        <div className="mx-auto flex max-w-appleWide items-center justify-between px-6 py-4">
          <Link href="/vision" className="text-base font-semibold text-appleGray-900">
            Apple Vision Pro
          </Link>
          <ul className="hidden items-center gap-6 text-sm md:flex">
            {SUB_NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-appleGray-700 hover:text-appleGray-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#"
                className="inline-flex items-center rounded-full bg-appleBlue px-4 py-1.5 text-sm font-medium text-white hover:bg-[#0077ed]"
              >
                Book a demo
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-appleBlue hover:underline">
                Buy
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-appleGray-100 pt-16 pb-12">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <p className="text-base font-semibold text-appleGray-900 reveal">Apple Vision Pro</p>
          <h1 className="mt-3 headline-xl reveal delay-1">
            New powerful M5 chip and comfortable Dual Knit Band.
          </h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5 reveal delay-2">
            <Link href="#" className="btn-pill btn-pill-primary">Book a demo</Link>
            <Link href="#" className="text-appleBlue text-base hover:underline">Buy ›</Link>
          </div>
          <div className="mt-12 reveal delay-3">
            <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-appleGray-100">
              <HotlinkImage
                src={HERO_SRC}
                fallback={IMG_HERO_GEN}
                alt="Apple Vision Pro with Dual Knit Band"
                className="block h-full w-full object-cover ken-burns"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Spatial computing intro — large stacked headlines */}
      <section className="section-light py-24">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="space-y-12 max-w-4xl">
            <p className="headline-lg text-appleGray-900 reveal">
              Apple Vision Pro seamlessly blends digital content with your physical space.
            </p>
            <p className="headline-lg text-appleGray-500 reveal delay-1">
              So you can work, watch, relive memories, and connect in ways never before possible.
            </p>
            <p className="headline-lg text-appleGray-900 reveal delay-2">
              The era of spatial computing is here.
            </p>
          </div>
        </div>
      </section>

      {/* AR teaser strip */}
      <section className="section-gray py-16">
        <div className="mx-auto max-w-apple px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500 reveal">
            Take a closer look
          </p>
          <h2 className="mt-3 headline-lg reveal delay-1">View Apple Vision Pro in your space.</h2>
          <Link
            href="#"
            className="mt-6 inline-flex btn-pill btn-pill-primary reveal delay-2"
          >
            View in your space ›
          </Link>
        </div>
      </section>

      {/* Design carousel */}
      <GetToKnowMac topics={DESIGN_TOPICS} title="Designed for everything you do." />

      {/* Entertainment */}
      <section className="section-light py-20">
        <div className="mx-auto max-w-apple px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500 reveal">
            Entertainment
          </p>
          <h2 className="mt-3 headline-xl reveal delay-1">The ultimate theater. Wherever you are.</h2>
          <p className="mt-4 text-appleGray-700 reveal delay-2">
            Turn any room into a private screening room with more pixels per eye than a 4K TV — perfect for movies, sports and immersive content.
          </p>
        </div>
      </section>
      <GetToKnowMac topics={ENTERTAINMENT_TOPICS} title="Endless ways to watch and play." />

      {/* Productivity */}
      <section className="section-light py-20">
        <div className="mx-auto max-w-apple px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500 reveal">
            Productivity
          </p>
          <h2 className="mt-3 headline-xl reveal delay-1">A workspace with infinite space.</h2>
          <p className="mt-4 text-appleGray-700 reveal delay-2">
            Apps, widgets and your Mac float anywhere you want them, with input from your hands, eyes, voice and trusted Bluetooth accessories.
          </p>
        </div>
      </section>
      <GetToKnowMac topics={PRODUCTIVITY_TOPICS} title="Get work done in space." />

      {/* Photos & Videos */}
      <section className="section-light py-20">
        <div className="mx-auto max-w-apple px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500 reveal">
            Photos &amp; Videos
          </p>
          <h2 className="mt-3 headline-xl reveal delay-1">Be in the moment. All over again.</h2>
          <p className="mt-4 text-appleGray-700 reveal delay-2">
            Capture, browse and relive your memories with the depth and detail you remember.
          </p>
        </div>
      </section>
      <GetToKnowMac topics={PHOTOS_TOPICS} title="Photos and videos, with depth." />

      {/* Connection */}
      <section className="section-light py-20">
        <div className="mx-auto max-w-apple px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500 reveal">
            Connection
          </p>
          <h2 className="mt-3 headline-xl reveal delay-1">Share quality time. And space.</h2>
          <p className="mt-4 text-appleGray-700 reveal delay-2">
            Persona, FaceTime, SharePlay and Image Playground bring the feeling of being together into the same room — even if you're worlds apart.
          </p>
        </div>
      </section>
      <GetToKnowMac topics={CONNECT_TOPICS} title="Closer, in shared space." />

      {/* visionOS */}
      <section className="section-light py-20">
        <div className="mx-auto max-w-apple px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500 reveal">
            visionOS
          </p>
          <h2 className="mt-3 headline-xl reveal delay-1">An operating system designed for spatial.</h2>
          <p className="mt-4 text-appleGray-700 reveal delay-2">
            Built on the foundations of macOS, iOS and iPadOS, visionOS powers everything you can do in your space.
          </p>
        </div>
      </section>
      <GetToKnowMac topics={VISIONOS_TOPICS} title="Get to know visionOS." />

      {/* Technology header */}
      <section className="section-dark py-24">
        <div className="mx-auto max-w-apple px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500 reveal">
            Technology
          </p>
          <h2 className="mt-3 headline-xl text-white reveal delay-1">
            Innovation you can see, hear and feel.
          </h2>
          <p className="mt-4 text-appleGray-300 reveal delay-2">
            Spatial experiences only work because every piece of the system was built to support them.
          </p>
        </div>
      </section>

      {/* Display + Audio + Eye + Chip — 4-up tech grid */}
      <section className="section-dark pb-24">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <article className="rounded-2xl bg-appleGray-900 p-8 text-white reveal">
              <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">Display</p>
              <h3 className="mt-3 text-2xl font-semibold">More pixels than a 4K TV. For each eye.</h3>
              <p className="mt-3 text-sm leading-relaxed text-appleGray-300">
                The custom micro-OLED display system delivers 23 million pixels in front of your eyes, with crisp text and rich blacks at every angle.
              </p>
            </article>
            <article className="rounded-2xl bg-appleGray-900 p-8 text-white reveal delay-1">
              <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">Spatial Audio</p>
              <h3 className="mt-3 text-2xl font-semibold">A spatial audio system that maps your room.</h3>
              <p className="mt-3 text-sm leading-relaxed text-appleGray-300">
                Dual-driver audio pods analyze the acoustic properties of the space you're in to place sounds accurately around you — with lossless support for compatible AirPods.
              </p>
            </article>
            <article className="rounded-2xl bg-appleGray-900 p-8 text-white reveal delay-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">Eye tracking</p>
              <h3 className="mt-3 text-2xl font-semibold">Responsive, precision eye tracking.</h3>
              <p className="mt-3 text-sm leading-relaxed text-appleGray-300">
                LEDs and infrared cameras project invisible light patterns onto your eyes so the system can know exactly where you're looking, all the time.
              </p>
            </article>
            <article className="rounded-2xl bg-appleGray-900 p-8 text-white reveal delay-3">
              <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">M5 + R1</p>
              <h3 className="mt-3 text-2xl font-semibold">Revolutionary dual-chip performance.</h3>
              <p className="mt-3 text-sm leading-relaxed text-appleGray-300">
                M5 runs visionOS and renders the graphics. R1 handles the sensors and delivers new images to your displays in just 12ms — well below the threshold you can perceive.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-center">
                <div>
                  <p className="text-2xl font-semibold gradient-text">120Hz</p>
                  <p className="mt-1 text-xs text-appleGray-300">refresh rate</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold gradient-text">10%</p>
                  <p className="mt-1 text-xs text-appleGray-300">more pixels</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold gradient-text">3 hr</p>
                  <p className="mt-1 text-xs text-appleGray-300">video playback</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Values & Privacy */}
      <section className="section-light py-20">
        <div className="mx-auto max-w-apple px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500 reveal">
            Values
          </p>
          <h2 className="mt-3 headline-xl reveal delay-1">Designed to make a difference.</h2>
          <p className="mt-4 text-appleGray-700 reveal delay-2">
            Privacy protections, accessibility and environmental responsibility shape every decision.
          </p>
        </div>
      </section>
      <GetToKnowMac topics={PRIVACY_TOPICS} title="Built around your privacy and values." />

      {/* Accessories CTA */}
      <section className="section-gray py-20 text-center">
        <div className="mx-auto max-w-apple px-6">
          <h2 className="headline-lg reveal">Explore Apple Vision Pro accessories.</h2>
          <p className="mt-3 text-appleGray-700 reveal delay-1">
            Bands, lens inserts, carrying solutions and more.
          </p>
          <Link
            href="#"
            className="mt-6 inline-flex btn-pill btn-pill-primary reveal delay-2"
          >
            Shop accessories
          </Link>
        </div>
      </section>

      {/* Developer CTA */}
      <section className="section-light py-20">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="rounded-3xl bg-appleGray-100 p-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500 reveal">
              For developers
            </p>
            <h2 className="mt-3 headline-lg reveal delay-1">An exciting new platform.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-appleGray-700 reveal delay-2">
              Build for Vision Pro with Xcode, SwiftUI, RealityKit, ARKit, Unity and Reality Composer Pro. The opportunities are endless.
            </p>
            <Link
              href="#"
              className="mt-6 inline-flex btn-pill btn-pill-primary reveal delay-3"
            >
              Learn more about visionOS development
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
