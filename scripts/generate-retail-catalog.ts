/**
 * generate-retail-catalog.ts
 * ---------------------------------------------------------------------------
 * Seeds the store with real, buyable products that are widely available at
 * major retailers (Amazon, Walmart, Canadian Tire, Temu, Best Buy, etc.) and
 * lists them at a 20–50% markup over a representative retailer price.
 *
 * Notes on prices:
 *   - `retailCents` is a *representative* retail price, hand-curated from public
 *     listings. It is NOT scraped live (that would violate those retailers'
 *     terms and can't be done reliably). Update these numbers whenever you want
 *     to re-base against current pricing — the markup is recomputed from them.
 *   - The displayed price (`basePriceCents`) = retail × (1 + markup), where the
 *     markup is a deterministic 20–50% spread per product so prices look
 *     natural rather than uniform.
 *
 * It also removes the auto-generated fictional "Nova …" catalog (from
 * generate-catalog.ts) while preserving the original hand-written Apple seed
 * products (seed-products.ts). Re-running is safe and idempotent.
 *
 *   npm run db:retail-catalog
 * ---------------------------------------------------------------------------
 */
import { config } from "dotenv";
import { sql, like, and, notInArray } from "drizzle-orm";
config({ path: ".env.local" });

// The 8 hand-written seed products (seed-products.ts) — preserved even if a
// prior `db:rebrand` renamed them to "Nova …". Never delete these slugs.
const SEED_SLUGS = [
  "macbook-air",
  "macbook-pro",
  "iphone-17-pro",
  "iphone-17",
  "ipad-pro",
  "apple-watch-series-11",
  "airpods-pro-3",
  "apple-tv-4k",
];

// ─── Deterministic helpers (reproducible, no Math.random) ───
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
/** Deterministic markup in the 20–50% band, keyed off the slug. */
function markupPct(slug: string): number {
  return 20 + (hash(slug + "·markup") % 31); // 20..50
}
/** Apply markup to a retail price and round to a tidy ".99" ending. */
function markUp(retailCents: number, slug: string): number {
  const marked = retailCents * (1 + markupPct(slug) / 100);
  return Math.max(99, Math.round(marked / 100) * 100 - 1);
}
function imageFor(slug: string): string {
  return `https://picsum.photos/seed/${encodeURIComponent(slug)}/600/600`;
}

// ─── Option builders (deltas scale with the product's listed price) ───
type Choice = { label: string; priceDeltaCents?: number; swatch?: string };

const PALETTE: Choice[] = [
  { label: "Black", swatch: "#1d1d1f" },
  { label: "White", swatch: "#f5f5f7" },
  { label: "Silver", swatch: "#c8c9cc" },
  { label: "Blue", swatch: "#3a4d5d" },
  { label: "Graphite", swatch: "#3a3a45" },
  { label: "Green", swatch: "#3a5f3a" },
  { label: "Rose", swatch: "#e8b9a7" },
  { label: "Gold", swatch: "#d4b990" },
];
function colors(slug: string, n: number): Choice[] {
  const start = hash(slug + "·color") % PALETTE.length;
  const out: Choice[] = [];
  for (let i = 0; i < n; i++) out.push(PALETTE[(start + i) % PALETTE.length]);
  return out;
}
/** A price delta as a % of base, rounded to the nearest $5. */
function delta(base: number, pct: number): number {
  return Math.round((base * pct) / 100 / 500) * 500;
}

interface Raw {
  name: string;
  retailCents: number;
  retailer: string;
  tagline: string;
}

// ─── Curated catalog (representative retail prices, in USD cents) ───
// Retailers: AMZ=Amazon, WMT=Walmart, CTC=Canadian Tire, TMU=Temu, BBY=Best Buy
const CATALOG: Record<string, Raw[]> = {
  phones: [
    { name: "Samsung Galaxy S24 Ultra (256GB)", retailCents: 109900, retailer: "AMZ", tagline: "Titanium build, 200MP camera, built-in S Pen." },
    { name: "Samsung Galaxy S24 (128GB)", retailCents: 79900, retailer: "BBY", tagline: "Flagship power in a compact frame." },
    { name: "Samsung Galaxy S23 FE (128GB)", retailCents: 49900, retailer: "WMT", tagline: "Flagship features, friendlier price." },
    { name: "Samsung Galaxy A55 5G", retailCents: 39900, retailer: "AMZ", tagline: "Smooth 120Hz display, all-day battery." },
    { name: "Samsung Galaxy A15 5G", retailCents: 19900, retailer: "WMT", tagline: "5G on a budget, big AMOLED screen." },
    { name: "Google Pixel 8 Pro (128GB)", retailCents: 89900, retailer: "BBY", tagline: "Tensor G3, the best of Google AI." },
    { name: "Google Pixel 8 (128GB)", retailCents: 59900, retailer: "AMZ", tagline: "Magic Eraser, 7 years of updates." },
    { name: "Google Pixel 8a", retailCents: 49900, retailer: "BBY", tagline: "Flagship cameras, mid-range price." },
    { name: "Google Pixel 7a", retailCents: 37900, retailer: "WMT", tagline: "Clean Android, standout photos." },
    { name: "OnePlus 12 (256GB)", retailCents: 79900, retailer: "AMZ", tagline: "Snapdragon 8 Gen 3, 100W fast charging." },
    { name: "OnePlus Nord N30 5G", retailCents: 29900, retailer: "AMZ", tagline: "Fast charging, 5G, big battery." },
    { name: "Motorola Edge 50 Pro", retailCents: 54900, retailer: "AMZ", tagline: "125W charging, curved pOLED display." },
    { name: "Motorola Moto G Power (2024)", retailCents: 19900, retailer: "WMT", tagline: "Three-day battery, clean software." },
    { name: "Motorola Moto G Stylus 5G", retailCents: 29900, retailer: "WMT", tagline: "Built-in stylus, vivid display." },
    { name: "Nokia G310 5G", retailCents: 17900, retailer: "WMT", tagline: "Reliable 5G with a long support window." },
    { name: "TCL 50 XL 5G", retailCents: 16900, retailer: "WMT", tagline: "Huge screen, easy on the wallet." },
    { name: "Samsung Galaxy Z Flip5 (256GB)", retailCents: 99900, retailer: "BBY", tagline: "Foldable design that fits your pocket." },
    { name: "Xiaomi Redmi Note 13 Pro", retailCents: 29900, retailer: "AMZ", tagline: "200MP camera, AMOLED, killer value." },
  ],
  laptops: [
    { name: "Dell XPS 13 (Core Ultra 7)", retailCents: 119900, retailer: "BBY", tagline: "InfinityEdge display, machined aluminum." },
    { name: "Dell Inspiron 15 (Core i5)", retailCents: 59900, retailer: "WMT", tagline: "Dependable everyday productivity." },
    { name: "HP Spectre x360 14", retailCents: 134900, retailer: "BBY", tagline: "2-in-1 OLED convertible, premium feel." },
    { name: "HP Pavilion 15 (Ryzen 5)", retailCents: 54900, retailer: "WMT", tagline: "Balanced performance for work and play." },
    { name: "HP 14 Laptop (Intel N305)", retailCents: 32900, retailer: "WMT", tagline: "Light, affordable, all-day battery." },
    { name: "Lenovo ThinkPad E16 (Ryzen 7)", retailCents: 94900, retailer: "AMZ", tagline: "Business-grade keyboard and durability." },
    { name: "Lenovo IdeaPad Slim 5 (16\")", retailCents: 64900, retailer: "AMZ", tagline: "Big screen, slim chassis, great value." },
    { name: "Lenovo Chromebook Duet", retailCents: 29900, retailer: "BBY", tagline: "Detachable ChromeOS tablet-laptop." },
    { name: "ASUS Zenbook 14 OLED", retailCents: 89900, retailer: "BBY", tagline: "Stunning OLED, featherweight build." },
    { name: "ASUS ROG Strix G16 (RTX 4060)", retailCents: 139900, retailer: "BBY", tagline: "High-refresh gaming muscle." },
    { name: "ASUS Vivobook 15 (Core i3)", retailCents: 44900, retailer: "WMT", tagline: "Everyday computing made easy." },
    { name: "Acer Aspire 5 (Ryzen 5)", retailCents: 52900, retailer: "AMZ", tagline: "Reliable performance, sharp price." },
    { name: "Acer Swift Go 14 OLED", retailCents: 74900, retailer: "BBY", tagline: "Thin metal body, brilliant OLED panel." },
    { name: "Acer Nitro V 15 (RTX 4050)", retailCents: 89900, retailer: "BBY", tagline: "Entry gaming that punches above its price." },
    { name: "Microsoft Surface Laptop Go 3", retailCents: 79900, retailer: "BBY", tagline: "Light, polished, touchscreen Windows." },
    { name: "MSI Cyborg 15 (RTX 4060)", retailCents: 109900, retailer: "AMZ", tagline: "Translucent gamer styling, real power." },
    { name: "Samsung Galaxy Book4 (15.6\")", retailCents: 74900, retailer: "BBY", tagline: "Crisp display, slim and connected." },
    { name: "Gateway 14.1 Ultra Slim", retailCents: 27900, retailer: "WMT", tagline: "Budget-friendly daily driver." },
  ],
  tablets: [
    { name: "Samsung Galaxy Tab S9 (128GB)", retailCents: 79900, retailer: "BBY", tagline: "AMOLED display, S Pen in the box." },
    { name: "Samsung Galaxy Tab S9 FE", retailCents: 44900, retailer: "AMZ", tagline: "Big-screen entertainment, water-resistant." },
    { name: "Samsung Galaxy Tab A9+ (5G)", retailCents: 27900, retailer: "WMT", tagline: "Family tablet with a quad-speaker setup." },
    { name: "Amazon Fire Max 11", retailCents: 22900, retailer: "AMZ", tagline: "Bigger, faster Fire tablet for media." },
    { name: "Amazon Fire HD 10 (2023)", retailCents: 13900, retailer: "AMZ", tagline: "1080p screen, hands-free Alexa." },
    { name: "Amazon Fire HD 8 Kids", retailCents: 9900, retailer: "AMZ", tagline: "Kid-proof case and parental controls." },
    { name: "Lenovo Tab P12", retailCents: 34900, retailer: "AMZ", tagline: "12.7\" 3K display with included pen." },
    { name: "Lenovo Tab M11", retailCents: 16900, retailer: "WMT", tagline: "Everyday streaming and browsing." },
    { name: "Microsoft Surface Pro 9", retailCents: 99900, retailer: "BBY", tagline: "Laptop-class 2-in-1 with a kickstand." },
    { name: "Microsoft Surface Go 4", retailCents: 57900, retailer: "BBY", tagline: "Pocketable Windows on the go." },
    { name: "TCL Tab 10 NextPaper", retailCents: 24900, retailer: "AMZ", tagline: "Paper-like display, easy on the eyes." },
    { name: "Onn. 10.1\" Tablet Pro", retailCents: 9900, retailer: "WMT", tagline: "Walmart's budget all-rounder." },
    { name: "Nokia T21 Tablet", retailCents: 18900, retailer: "AMZ", tagline: "2K display, sturdy aluminum body." },
    { name: "Headwolf FPad 5", retailCents: 13900, retailer: "TMU", tagline: "Affordable Android tablet for media." },
  ],
  watches: [
    { name: "Samsung Galaxy Watch6 (40mm)", retailCents: 29900, retailer: "BBY", tagline: "Advanced sleep and heart tracking." },
    { name: "Samsung Galaxy Watch6 Classic (47mm)", retailCents: 39900, retailer: "AMZ", tagline: "Rotating bezel, premium stainless build." },
    { name: "Samsung Galaxy Watch FE", retailCents: 19900, retailer: "WMT", tagline: "Wellness essentials at a friendly price." },
    { name: "Google Pixel Watch 2", retailCents: 34900, retailer: "BBY", tagline: "Fitbit health, sleek round design." },
    { name: "Garmin Forerunner 165", retailCents: 24900, retailer: "AMZ", tagline: "AMOLED running watch with smart pacing." },
    { name: "Garmin Venu 3", retailCents: 44900, retailer: "BBY", tagline: "Full health suite, all-day battery." },
    { name: "Garmin Instinct 2", retailCents: 29900, retailer: "CTC", tagline: "Rugged, solar-ready adventure watch." },
    { name: "Fitbit Charge 6", retailCents: 15900, retailer: "AMZ", tagline: "Heart rate, GPS, Google apps on board." },
    { name: "Fitbit Versa 4", retailCents: 19900, retailer: "WMT", tagline: "Daily readiness and built-in GPS." },
    { name: "Fitbit Inspire 3", retailCents: 9900, retailer: "AMZ", tagline: "Slim tracker with 10-day battery." },
    { name: "Amazfit GTR 4", retailCents: 19900, retailer: "AMZ", tagline: "14-day battery, dual-band GPS." },
    { name: "Amazfit Bip 5", retailCents: 8900, retailer: "AMZ", tagline: "Big screen smartwatch on a budget." },
    { name: "Fossil Gen 6 Smartwatch", retailCents: 25900, retailer: "AMZ", tagline: "Classic design, fast charging." },
    { name: "Withings ScanWatch Light", retailCents: 24900, retailer: "AMZ", tagline: "Hybrid watch with quiet health tracking." },
    { name: "TicWatch Pro 5", retailCents: 34900, retailer: "AMZ", tagline: "Dual-display, multi-day battery." },
    { name: "Coros Pace 3", retailCents: 22900, retailer: "AMZ", tagline: "Lightweight, marathon-grade GPS." },
  ],
  audio: [
    { name: "Sony WH-1000XM5 Headphones", retailCents: 39900, retailer: "BBY", tagline: "Class-leading noise cancellation." },
    { name: "Sony WH-CH720N Headphones", retailCents: 14900, retailer: "AMZ", tagline: "Lightweight ANC for everyday." },
    { name: "Sony WF-1000XM5 Earbuds", retailCents: 29900, retailer: "BBY", tagline: "Tiny buds, huge sound and quiet." },
    { name: "Bose QuietComfort Ultra Headphones", retailCents: 42900, retailer: "BBY", tagline: "Immersive spatial audio, deep quiet." },
    { name: "Bose QuietComfort Earbuds II", retailCents: 27900, retailer: "AMZ", tagline: "Personalized noise cancellation." },
    { name: "Bose SoundLink Flex Speaker", retailCents: 14900, retailer: "AMZ", tagline: "Rugged, waterproof, big sound." },
    { name: "JBL Flip 6 Speaker", retailCents: 12900, retailer: "WMT", tagline: "Bold portable sound, IP67 rugged." },
    { name: "JBL Charge 5 Speaker", retailCents: 17900, retailer: "AMZ", tagline: "20-hour battery and a power bank." },
    { name: "JBL Tune 770NC Headphones", retailCents: 9900, retailer: "WMT", tagline: "Adaptive ANC at a great price." },
    { name: "JBL Go 4 Speaker", retailCents: 4900, retailer: "AMZ", tagline: "Pocket-size, all-day fun." },
    { name: "Beats Studio Pro Headphones", retailCents: 34900, retailer: "BBY", tagline: "Rich sound, lossless USB-C audio." },
    { name: "Beats Studio Buds +", retailCents: 16900, retailer: "AMZ", tagline: "Punchy ANC buds for any phone." },
    { name: "Sennheiser Momentum 4", retailCents: 34900, retailer: "AMZ", tagline: "60-hour battery, audiophile tuning." },
    { name: "Sennheiser Accentum Plus", retailCents: 22900, retailer: "AMZ", tagline: "Refined sound and adaptive ANC." },
    { name: "Anker Soundcore Space One", retailCents: 9900, retailer: "AMZ", tagline: "40-hour ANC headphones, budget hero." },
    { name: "Anker Soundcore Motion Boom", retailCents: 7900, retailer: "AMZ", tagline: "Outdoor speaker with titanium drivers." },
    { name: "Marshall Emberton II Speaker", retailCents: 16900, retailer: "BBY", tagline: "Iconic look, room-filling 360 sound." },
    { name: "Sonos Era 100 Speaker", retailCents: 24900, retailer: "BBY", tagline: "Smart speaker with rich stereo." },
    { name: "Jabra Elite 8 Active", retailCents: 19900, retailer: "AMZ", tagline: "Sweatproof buds built for workouts." },
    { name: "Skullcandy Crusher ANC 2", retailCents: 22900, retailer: "AMZ", tagline: "Sensory bass you can feel." },
    { name: "Ultimate Ears WONDERBOOM 4", retailCents: 9900, retailer: "BBY", tagline: "Tiny, floatable, surprisingly loud." },
    { name: "Tribit StormBox Micro 2", retailCents: 5900, retailer: "TMU", tagline: "Clip-on speaker with big bass." },
  ],
  home: [
    { name: "TCL 55\" Q6 4K QLED TV", retailCents: 39900, retailer: "BBY", tagline: "Quantum-dot color, Google TV built in." },
    { name: "TCL 65\" S5 4K Smart TV", retailCents: 39900, retailer: "WMT", tagline: "Big-screen 4K HDR for less." },
    { name: "Hisense 55\" U6 Mini-LED TV", retailCents: 49900, retailer: "BBY", tagline: "Mini-LED brightness, Dolby Vision." },
    { name: "Hisense 75\" A6 4K TV", retailCents: 54900, retailer: "WMT", tagline: "Cinematic size, smart everything." },
    { name: "Samsung 65\" CU8000 Crystal UHD", retailCents: 59900, retailer: "BBY", tagline: "4K upscaling and slim design." },
    { name: "LG 55\" B4 OLED TV", retailCents: 119900, retailer: "BBY", tagline: "Perfect blacks, gamer-grade OLED." },
    { name: "Vizio 50\" V-Series 4K TV", retailCents: 27900, retailer: "WMT", tagline: "Affordable 4K with smart apps." },
    { name: "Roku Streaming Stick 4K", retailCents: 4900, retailer: "WMT", tagline: "Fast 4K HDR streaming, simple remote." },
    { name: "Amazon Fire TV Stick 4K Max", retailCents: 5900, retailer: "AMZ", tagline: "Wi-Fi 6E streaming with Alexa." },
    { name: "Google Chromecast with Google TV 4K", retailCents: 4900, retailer: "BBY", tagline: "Personalized 4K streaming hub." },
    { name: "Amazon Echo Dot (5th Gen)", retailCents: 4900, retailer: "AMZ", tagline: "Compact smart speaker with Alexa." },
    { name: "Amazon Echo Show 8", retailCents: 14900, retailer: "AMZ", tagline: "Smart display for calls and recipes." },
    { name: "Google Nest Hub (2nd Gen)", retailCents: 9900, retailer: "BBY", tagline: "Smart display with sleep sensing." },
    { name: "Google Nest Thermostat", retailCents: 12900, retailer: "CTC", tagline: "Energy savings, easy install." },
    { name: "Ring Video Doorbell (2nd Gen)", retailCents: 9900, retailer: "AMZ", tagline: "See, hear, and talk at your door." },
    { name: "Ring Indoor Cam (2nd Gen)", retailCents: 5900, retailer: "AMZ", tagline: "Compact plug-in security camera." },
    { name: "Wyze Cam v4", retailCents: 3900, retailer: "AMZ", tagline: "2.5K security cam on a budget." },
    { name: "Blink Outdoor 4 (2-Cam)", retailCents: 13900, retailer: "AMZ", tagline: "Wire-free cams, two-year battery." },
    { name: "Samsung HW-B650 Soundbar", retailCents: 24900, retailer: "BBY", tagline: "3.1ch sound with wireless subwoofer." },
    { name: "Vizio M-Series 5.1 Soundbar", retailCents: 24900, retailer: "WMT", tagline: "Dolby Atmos on a budget." },
    { name: "iRobot Roomba i3+ EVO", retailCents: 39900, retailer: "AMZ", tagline: "Self-emptying robot vacuum." },
    { name: "Govee Smart LED Strip (32.8ft)", retailCents: 2900, retailer: "AMZ", tagline: "Color-changing room lighting." },
  ],
  accessories: [
    { name: "Anker 737 Power Bank (24,000mAh)", retailCents: 14900, retailer: "AMZ", tagline: "140W charging for laptops and phones." },
    { name: "Anker PowerCore 10K Power Bank", retailCents: 2900, retailer: "AMZ", tagline: "Pocket-size backup for any phone." },
    { name: "Anker 735 GaN 65W Charger", retailCents: 5900, retailer: "AMZ", tagline: "Charge three devices from one plug." },
    { name: "Anker USB-C to USB-C Cable (6ft, 2-pack)", retailCents: 1900, retailer: "AMZ", tagline: "Durable 100W fast-charge cables." },
    { name: "Logitech MX Master 3S Mouse", retailCents: 9900, retailer: "BBY", tagline: "Quiet clicks, precision scroll wheel." },
    { name: "Logitech MX Keys S Keyboard", retailCents: 10900, retailer: "AMZ", tagline: "Backlit, comfortable, multi-device." },
    { name: "Logitech M720 Triathlon Mouse", retailCents: 3900, retailer: "WMT", tagline: "Connect to three devices, two-year battery." },
    { name: "Logitech C920x HD Webcam", retailCents: 6900, retailer: "AMZ", tagline: "Crisp 1080p for calls and streams." },
    { name: "SanDisk Extreme 1TB Portable SSD", retailCents: 11900, retailer: "BBY", tagline: "Rugged, pocketable, blazing transfers." },
    { name: "SanDisk Ultra 256GB microSD", retailCents: 2900, retailer: "WMT", tagline: "Expand phones, tablets, and cameras." },
    { name: "Samsung T7 Shield 1TB SSD", retailCents: 9900, retailer: "AMZ", tagline: "Drop- and water-resistant storage." },
    { name: "Tile Mate (2024) Tracker", retailCents: 2400, retailer: "AMZ", tagline: "Find keys, bags, and more." },
    { name: "Belkin 3-in-1 Wireless Charger", retailCents: 9900, retailer: "BBY", tagline: "Charge phone, watch, and buds at once." },
    { name: "Razer DeathAdder V3 Mouse", retailCents: 6900, retailer: "AMZ", tagline: "Ergonomic esports-grade sensor." },
    { name: "Keychron K8 Wireless Keyboard", retailCents: 8900, retailer: "AMZ", tagline: "Hot-swappable mechanical typing." },
    { name: "UGREEN 9-in-1 USB-C Hub", retailCents: 4900, retailer: "AMZ", tagline: "HDMI, Ethernet, and card readers." },
    { name: "Anker 521 Charging Station", retailCents: 4500, retailer: "AMZ", tagline: "Outlets and USB-C in one block." },
    { name: "Spigen Tough Armor Phone Case", retailCents: 1900, retailer: "AMZ", tagline: "Military-grade drop protection." },
    { name: "PopSockets MagSafe Grip", retailCents: 1500, retailer: "WMT", tagline: "Magnetic grip and stand." },
    { name: "Joby GorillaPod Phone Tripod", retailCents: 3900, retailer: "AMZ", tagline: "Bendable legs grip anywhere." },
    { name: "Baseus 100W Car Charger", retailCents: 2900, retailer: "TMU", tagline: "Fast dual-port charging on the road." },
    { name: "Stylus Pen for Touchscreens", retailCents: 1200, retailer: "TMU", tagline: "Universal capacitive stylus." },
    { name: "Cable Organizer Box & Clips Set", retailCents: 1500, retailer: "TMU", tagline: "Tame the desk cable chaos." },
    { name: "Roku Voice Remote Pro", retailCents: 2900, retailer: "WMT", tagline: "Hands-free voice and lost-remote finder." },
  ],
};

// ─── Build full product specs with markup + options ───
interface Spec {
  slug: string;
  category: string;
  name: string;
  tagline: string;
  basePriceCents: number;
  heroImage: string;
  options: Record<string, Choice[]>;
  isActive: boolean;
}

function optionsFor(category: string, slug: string, base: number): Record<string, Choice[]> {
  switch (category) {
    case "phones":
      return {
        storage: [
          { label: "128GB" },
          { label: "256GB", priceDeltaCents: delta(base, 12) },
          { label: "512GB", priceDeltaCents: delta(base, 28) },
        ],
        color: colors(slug, 4),
      };
    case "laptops":
      return {
        memory: [
          { label: "16GB RAM" },
          { label: "32GB RAM", priceDeltaCents: delta(base, 22) },
        ],
        storage: [
          { label: "512GB SSD" },
          { label: "1TB SSD", priceDeltaCents: delta(base, 14) },
          { label: "2TB SSD", priceDeltaCents: delta(base, 34) },
        ],
        color: colors(slug, 3),
      };
    case "tablets":
      return {
        storage: [
          { label: "128GB" },
          { label: "256GB", priceDeltaCents: delta(base, 14) },
          { label: "512GB", priceDeltaCents: delta(base, 30) },
        ],
        color: colors(slug, 3),
      };
    case "watches":
      return {
        size: [
          { label: "Standard case" },
          { label: "Large case", priceDeltaCents: delta(base, 8) },
        ],
        band: [
          { label: "Sport band" },
          { label: "Woven band", priceDeltaCents: delta(base, 5) },
          { label: "Leather band", priceDeltaCents: delta(base, 9) },
        ],
        color: colors(slug, 3),
      };
    case "home":
      // TVs/streamers carry their size in the name; offer a finish on the rest.
      return /\bTV\b|Soundbar/i.test(slug) ? {} : { color: colors(slug, 2) };
    case "audio":
      return { color: colors(slug, 3) };
    case "accessories":
      return { color: colors(slug, 2) };
    default:
      return {};
  }
}

function buildSpecs(): { specs: Spec[]; byRetailer: Record<string, number> } {
  const specs: Spec[] = [];
  const byRetailer: Record<string, number> = {};
  const seen = new Set<string>();
  for (const [category, items] of Object.entries(CATALOG)) {
    for (const raw of items) {
      const slug = slugify(raw.name);
      if (seen.has(slug)) {
        console.warn(`! duplicate slug skipped: ${slug}`);
        continue;
      }
      seen.add(slug);
      const base = markUp(raw.retailCents, slug);
      byRetailer[raw.retailer] = (byRetailer[raw.retailer] ?? 0) + 1;
      specs.push({
        slug,
        category,
        name: raw.name,
        tagline: raw.tagline,
        basePriceCents: base,
        heroImage: imageFor(slug),
        options: optionsFor(category, slug, base),
        isActive: true,
      });
    }
  }
  return { specs, byRetailer };
}

async function main() {
  const { db } = await import("../db/client");
  const { products } = await import("../db/schema");

  const { specs, byRetailer } = buildSpecs();

  console.log(`Prepared ${specs.length} real-world product listings.`);
  const counts: Record<string, number> = {};
  for (const p of specs) counts[p.category] = (counts[p.category] ?? 0) + 1;
  for (const [k, v] of Object.entries(counts)) console.log(`  ${k}: ${v}`);
  console.log("  by retailer:", byRetailer);

  // 1) Remove the auto-generated fictional "Nova …" catalog, keep Apple seed.
  const del = await db
    .delete(products)
    .where(and(like(products.name, "Nova %"), notInArray(products.slug, SEED_SLUGS)));
  console.log(`\nRemoved generated Nova catalog (${del.rowCount ?? 0} rows).`);

  // 2) Insert the real catalog (idempotent on slug).
  const BATCH = 100;
  let inserted = 0;
  for (let i = 0; i < specs.length; i += BATCH) {
    const slice = specs.slice(i, i + BATCH);
    await db.insert(products).values(slice).onConflictDoNothing({ target: products.slug });
    inserted += slice.length;
    process.stdout.write(`\r  upserted ${inserted}/${specs.length}…`);
  }
  console.log("");

  const [{ n }] = (await db
    .execute<{ n: number }>(sql`SELECT count(*)::int AS n FROM products;`)
    .then((r) => r.rows ?? [])) as any;
  console.log(`\n✓ Database now has ${n} total products (Apple seed + real catalog).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
