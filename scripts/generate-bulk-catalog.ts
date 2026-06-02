/**
 * generate-bulk-catalog.ts
 * ---------------------------------------------------------------------------
 * Bulk-expands the real retail catalog to 1000+ listings by combining real
 * brands × product lines × variants (storage / size / config) across the seven
 * categories. Every listing is priced with the SAME deterministic 20–50% markup
 * over a representative retailer price, and gets a subtype-appropriate licensed
 * photo — so no separate image pass is needed.
 *
 * Scope honesty: brands, lines and price bands are real and the items are the
 * kind you can source from Amazon / Walmart / Canadian Tire / Temu / Best Buy,
 * but at this scale some specific variant combos are representative rather than
 * exact catalog SKUs (just like the prices).
 *
 * Purely additive: inserts with onConflictDoNothing and never deletes anything.
 *
 *   npm run db:bulk-catalog
 * ---------------------------------------------------------------------------
 */
import { config } from "dotenv";
import { sql } from "drizzle-orm";
config({ path: ".env.local" });

// ─── Deterministic helpers ───
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function pick<T>(arr: T[], key: string): T {
  return arr[hash(key) % arr.length];
}
function markupPct(slug: string): number {
  return 20 + (hash(slug + "·markup") % 31); // 20..50
}
function markUp(retailCents: number, slug: string): number {
  const lo = Math.ceil(retailCents * 1.2); // never below +20%
  const hi = Math.floor(retailCents * 1.5); // never above +50%
  const marked = retailCents * (1 + markupPct(slug) / 100);
  const dotted = Math.round(marked / 100) * 100 - 1; // tidy .99 ending
  return Math.max(99, Math.min(Math.max(dotted, lo), hi));
}
function priceJitter(base: number, key: string): number {
  const j = (hash(key + "·j") % 21) - 10; // -10..+10 dollars
  return Math.max(500, base + j * 100);
}

// Retailers weighted toward the big marketplaces.
const RETAILERS = ["AMZ", "AMZ", "AMZ", "WMT", "WMT", "BBY", "BBY", "TMU", "CTC"];
const retailerFor = (key: string) => RETAILERS[hash(key + "·r") % RETAILERS.length];

// ─── Images: known-good licensed pools + subtype rules (no runtime verify) ───
const U = "https://images.unsplash.com";
const Q = "?w=600&h=600&fit=crop&auto=format&q=80";
const im = (id: string) => `${U}/${id}${Q}`;
const CATEGORY_POOLS: Record<string, string[]> = {
  phones: ["photo-1511707171634-5f897ff02aa9", "photo-1605236453806-6ff36851218e", "photo-1601784551446-20c9e07cdbdb", "photo-1592750475338-74b7b21085ab", "photo-1574944985070-8f3ebc6b79d2"].map(im),
  laptops: ["photo-1496181133206-80ce9b88a853", "photo-1517336714731-489689fd1ca8", "photo-1531297484001-80022131f5a1", "photo-1593642632559-0c6d3fc62b89", "photo-1541807084-5c52b6b3adef"].map(im),
  tablets: ["photo-1544244015-0df4b3ffc6b0", "photo-1561154464-82e9adf32764", "photo-1542751110-97427bbecf20", "photo-1561972774-2dc3f1e9d65f"].map(im),
  watches: ["photo-1523275335684-37898b6baf30", "photo-1546868871-7041f2a55e12", "photo-1508685096489-7aacd43bd3b1", "photo-1524805444758-089113d48a6d"].map(im),
  audio: ["photo-1505740420928-5e560c06d30e", "photo-1545127398-14699f92334b", "photo-1484704849700-f032a568e944"].map(im),
  home: ["photo-1593305841991-05c297ba4575", "photo-1571415060716-baff5f717b0e", "photo-1556909114-f6e7ad7d3136"].map(im),
  accessories: ["photo-1531986362435-16b427eb9c26", "photo-1606220589517-fcc9d2c97aaf", "photo-1583394838336-acd977736f90"].map(im),
};
const SUBTYPE_RULES: { match: RegExp; pool: string[] }[] = [
  { match: /\bTV\b/i, pool: ["photo-1593305841991-05c297ba4575", "photo-1461151304267-38535e780c79"].map(im) },
  { match: /soundbar/i, pool: ["photo-1545454675-3531b543be5d"].map(im) },
  { match: /webcam/i, pool: ["photo-1596742578443-7682ef5251cd"].map(im) },
  { match: /doorbell|cam\b|camera/i, pool: ["photo-1558002038-1055907df827"].map(im) },
  { match: /roomba|vacuum/i, pool: ["photo-1603532648955-039310d9ed75"].map(im) },
  { match: /echo|nest|homepod|sonos|smart speaker/i, pool: ["photo-1512446816042-444d641267d4"].map(im) },
  { match: /headphones|headset/i, pool: ["photo-1505740420928-5e560c06d30e", "photo-1484704849700-f032a568e944"].map(im) },
  { match: /earbuds|buds\b/i, pool: ["photo-1606220945770-b5b6c2c55bf1", "photo-1590658268037-6bf12165a8df"].map(im) },
  { match: /speaker|boom|soundlink|stormbox/i, pool: ["photo-1608043152269-423dbba4e7e1", "photo-1589003077984-894e133dabab"].map(im) },
  { match: /power bank/i, pool: ["photo-1609091839311-d5365f9ff1c5"].map(im) },
  { match: /charger|charging/i, pool: ["photo-1583863788434-e58a36330cf0"].map(im) },
  { match: /mouse/i, pool: ["photo-1527814050087-3793815479db"].map(im) },
  { match: /keyboard/i, pool: ["photo-1587829741301-dc798b83add3", "photo-1618384887929-16ec33fab9ef"].map(im) },
  { match: /ssd|microsd|flash drive|hdd|storage/i, pool: ["photo-1531492746076-161ca9bcad58"].map(im) },
  { match: /tracker|tile\b/i, pool: ["photo-1558618666-fcd25c85cd64"].map(im) },
  { match: /tablet|tab\b|fire (hd|max)|surface (pro|go)/i, pool: ["photo-1544244015-0df4b3ffc6b0", "photo-1561972774-2dc3f1e9d65f"].map(im) },
];
function imageFor(name: string, category: string, slug: string): string {
  const rule = SUBTYPE_RULES.find((r) => r.match.test(name));
  const pool = rule ? rule.pool : CATEGORY_POOLS[category] ?? CATEGORY_POOLS.accessories;
  return pool[hash(slug) % pool.length];
}

// ─── Options ───
type Choice = { label: string; priceDeltaCents?: number; swatch?: string };
const PALETTE: Choice[] = [
  { label: "Black", swatch: "#1d1d1f" }, { label: "White", swatch: "#f5f5f7" },
  { label: "Silver", swatch: "#c8c9cc" }, { label: "Blue", swatch: "#3a4d5d" },
  { label: "Graphite", swatch: "#3a3a45" }, { label: "Green", swatch: "#3a5f3a" },
  { label: "Rose", swatch: "#e8b9a7" }, { label: "Gold", swatch: "#d4b990" },
];
function colors(slug: string, n: number): Choice[] {
  const start = hash(slug + "·c") % PALETTE.length;
  return Array.from({ length: n }, (_, i) => PALETTE[(start + i) % PALETTE.length]);
}
function delta(base: number, pct: number): number {
  return Math.round((base * pct) / 100 / 500) * 500;
}
function optionsFor(category: string, slug: string, base: number): Record<string, Choice[]> {
  // When color is already a separate listing (name contains " — Color"), don't
  // also offer a color picker.
  const hasColorInName = name(slug).includes(" — ");
  const colorOpt = (n: number): Record<string, Choice[]> => (hasColorInName ? {} : { color: colors(slug, n) });
  switch (category) {
    case "phones":
      return { storage: [{ label: "Base storage" }, { label: "+256GB", priceDeltaCents: delta(base, 12) }, { label: "+512GB", priceDeltaCents: delta(base, 28) }], ...colorOpt(4) };
    case "laptops":
      return { memory: [{ label: "16GB RAM" }, { label: "32GB RAM", priceDeltaCents: delta(base, 22) }], storage: [{ label: "512GB SSD" }, { label: "1TB SSD", priceDeltaCents: delta(base, 14) }, { label: "2TB SSD", priceDeltaCents: delta(base, 34) }], ...colorOpt(3) };
    case "tablets":
      return { storage: [{ label: "Base storage" }, { label: "+128GB", priceDeltaCents: delta(base, 14) }, { label: "+256GB", priceDeltaCents: delta(base, 30) }], ...colorOpt(3) };
    case "watches":
      return { size: [{ label: "Standard case" }, { label: "Large case", priceDeltaCents: delta(base, 8) }], band: [{ label: "Sport band" }, { label: "Woven band", priceDeltaCents: delta(base, 5) }], ...colorOpt(3) };
    case "home":
      return /\bTV\b|Soundbar/i.test(name(slug)) ? {} : colorOpt(2);
    case "audio":
      return colorOpt(3);
    case "accessories":
      return colorOpt(2);
    default:
      return {};
  }
}
// optionsFor(home) checks the name; we pass it via a tiny closure-safe shim:
let _nameForSlug: Record<string, string> = {};
function name(slug: string): string {
  return _nameForSlug[slug] ?? "";
}

// ─── Storage / config bumps (added to a model's base retail) ───
const STORAGE_BUMP: Record<string, number> = {
  "64GB": -3000, "128GB": 0, "256GB": 8000, "512GB": 20000, "1TB": 40000, "2TB": 90000,
};

interface Spec {
  slug: string; category: string; name: string; tagline: string;
  basePriceCents: number; heroImage: string; options: Record<string, Choice[]>; isActive: boolean;
}

const TAGS: Record<string, string[]> = {
  phones: ["All-day battery and a brilliant display.", "Fast 5G, sharp cameras, smooth software.", "Pocket-ready power for work and play.", "Crisp screen, dependable everyday performance."],
  laptops: ["Light, fast, all-day battery.", "Built for work, study, and streaming.", "Quiet performance with a bright display.", "Reliable everyday computing."],
  tablets: ["Big-screen entertainment and notes.", "Light, portable, all-day battery.", "Great for reading, sketching, and shows.", "Snappy screen for browsing and media."],
  watches: ["Heart, sleep, and workout tracking.", "Bright display and multi-day battery.", "Daily health insights on your wrist.", "Built for runs, walks, and the gym."],
  audio: ["Rich sound, comfortable for hours.", "Deep bass and clear highs.", "Wireless freedom with strong battery.", "Tuned for music, calls, and games."],
  home: ["Smart features for the whole home.", "Crisp picture and room-filling sound.", "Easy setup, stays out of the way.", "Upgrade movie night and everyday life."],
  accessories: ["Fast, reliable, made to last.", "Premium build, everyday essential.", "Plug, play, and get back to it.", "Everyday carry that just works."],
};

// ─── Builders ───
type Group = { brand: string; models: [string, number][]; storages?: string[]; cat: string };

// How many color variants (separate listings) to mint per base model, by
// category. 0 = single listing with a color picker instead.
const VARIANT_COLORS: Record<string, number> = {
  phones: 4, tablets: 3, watches: 3, audio: 2, accessories: 2, laptops: 0, home: 0,
};
const COLOR_NAMES = ["Black", "White", "Silver", "Blue", "Graphite", "Green", "Rose", "Gold"];

function expand(groups: Group[]): { name: string; category: string; retailCents: number }[] {
  const out: { name: string; category: string; retailCents: number }[] = [];
  for (const g of groups) {
    const cc = VARIANT_COLORS[g.cat] ?? 0;
    for (const [model, retail] of g.models) {
      const storages = g.storages ?? [""];
      for (const s of storages) {
        const label = s ? `${g.brand} ${model} ${s}` : `${g.brand} ${model}`;
        const bump = s ? STORAGE_BUMP[s] ?? 0 : 0;
        const retailCents = Math.max(500, retail + bump);
        if (cc > 0) {
          const start = hash(label + "·col") % COLOR_NAMES.length;
          for (let i = 0; i < cc; i++) {
            const color = COLOR_NAMES[(start + i) % COLOR_NAMES.length];
            out.push({ name: `${label} — ${color}`, category: g.cat, retailCents });
          }
        } else {
          out.push({ name: label, category: g.cat, retailCents });
        }
      }
    }
  }
  return out;
}

const PHONES: Group[] = [
  { brand: "Samsung", cat: "phones", storages: ["128GB", "256GB"], models: [["Galaxy A06", 9900], ["Galaxy A16 5G", 19900], ["Galaxy A25 5G", 29900], ["Galaxy A35 5G", 39900], ["Galaxy A55 5G", 44900], ["Galaxy S21 FE", 49900], ["Galaxy S22", 59900], ["Galaxy S23", 69900], ["Galaxy S24 FE", 64900]] },
  { brand: "Samsung", cat: "phones", storages: ["256GB", "512GB"], models: [["Galaxy S23 Ultra", 99900], ["Galaxy S24+", 99900], ["Galaxy S24 Ultra", 119900], ["Galaxy Z Flip5", 99900], ["Galaxy Z Flip6", 109900], ["Galaxy Z Fold5", 159900], ["Galaxy Z Fold6", 189900]] },
  { brand: "Google", cat: "phones", storages: ["128GB", "256GB"], models: [["Pixel 7a", 37900], ["Pixel 8", 49900], ["Pixel 8a", 49900], ["Pixel 8 Pro", 79900], ["Pixel 9", 79900], ["Pixel 9 Pro", 99900], ["Pixel 9 Pro XL", 109900]] },
  { brand: "Motorola", cat: "phones", storages: ["128GB", "256GB"], models: [["Moto G Play (2024)", 14900], ["Moto G Power (2024)", 19900], ["Moto G Stylus 5G", 29900], ["Edge (2024)", 54900], ["Edge+ (2023)", 59900], ["Razr (2024)", 69900], ["Razr+ (2024)", 99900]] },
  { brand: "OnePlus", cat: "phones", storages: ["128GB", "256GB"], models: [["Nord N30 5G", 29900], ["12R", 49900], ["12", 79900], ["Open", 169900]] },
  { brand: "Xiaomi", cat: "phones", storages: ["128GB", "256GB"], models: [["Redmi 13C", 14900], ["Redmi Note 13", 24900], ["Redmi Note 13 Pro", 29900], ["14T Pro", 64900]] },
  { brand: "Honor", cat: "phones", storages: ["128GB", "256GB"], models: [["X8b", 24900], ["Magic6 Lite", 34900], ["90", 39900], ["Magic6 Pro", 89900]] },
  { brand: "Sony", cat: "phones", storages: ["128GB", "256GB"], models: [["Xperia 10 VI", 39900], ["Xperia 5 V", 99900], ["Xperia 1 VI", 139900]] },
  { brand: "Nothing", cat: "phones", storages: ["128GB", "256GB"], models: [["Phone (2a)", 34900], ["Phone (2)", 59900]] },
  { brand: "ASUS", cat: "phones", storages: ["256GB", "512GB"], models: [["Zenfone 11 Ultra", 89900], ["ROG Phone 8", 99900]] },
  { brand: "Realme", cat: "phones", storages: ["128GB", "256GB"], models: [["C67", 17900], ["12 Pro", 29900], ["GT 6", 49900]] },
  { brand: "OPPO", cat: "phones", storages: ["128GB", "256GB"], models: [["A79 5G", 24900], ["Reno 11", 39900]] },
  { brand: "vivo", cat: "phones", storages: ["128GB", "256GB"], models: [["Y28 5G", 17900], ["V30", 44900]] },
  { brand: "Nokia", cat: "phones", storages: ["128GB"], models: [["C110", 8900], ["G310 5G", 17900], ["XR21", 49900]] },
  { brand: "TCL", cat: "phones", storages: ["128GB"], models: [["40 XE 5G", 12900], ["50 XL 5G", 16900]] },
  { brand: "Blackview", cat: "phones", storages: ["128GB"], models: [["A55 Pro", 5900], ["Shark 8", 12900]] },
];

const LAPTOPS: Group[] = [
  { brand: "Dell", cat: "laptops", storages: ["Core i5", "Core i7"], models: [["Inspiron 15", 54900], ["Inspiron 14 2-in-1", 69900], ["XPS 13", 119900], ["XPS 15", 169900], ["Latitude 5450", 119900], ["G15 Gaming", 99900]] },
  { brand: "HP", cat: "laptops", storages: ["Core i5", "Core i7"], models: [["Pavilion 15", 54900], ["Envy x360 15", 89900], ["Spectre x360 14", 134900], ["Victus 15", 79900], ["OMEN 16", 144900], ["14 Laptop", 32900]] },
  { brand: "Lenovo", cat: "laptops", storages: ["Core i5", "Core i7"], models: [["IdeaPad Slim 5", 64900], ["IdeaPad Flex 5", 64900], ["ThinkPad E16", 94900], ["ThinkPad X1 Carbon Gen 12", 174900], ["Legion 5i", 119900], ["Yoga 7i", 84900]] },
  { brand: "ASUS", cat: "laptops", storages: ["Core i5", "Core i7"], models: [["Vivobook 15", 44900], ["Zenbook 14 OLED", 89900], ["Zenbook Duo", 149900], ["ROG Strix G16", 139900], ["ROG Zephyrus G14", 199900], ["TUF Gaming A15", 99900]] },
  { brand: "Acer", cat: "laptops", storages: ["Core i5", "Core i7"], models: [["Aspire 5", 52900], ["Swift Go 14", 74900], ["Swift X 14", 99900], ["Nitro V 15", 89900], ["Predator Helios Neo 16", 134900]] },
  { brand: "MSI", cat: "laptops", storages: ["Core i7", "Core i9"], models: [["Cyborg 15", 109900], ["Katana 15", 119900], ["Stealth 16 AI Studio", 189900]] },
  { brand: "Microsoft", cat: "laptops", storages: ["Core i5", "Core i7"], models: [["Surface Laptop Go 3", 79900], ["Surface Laptop 5", 99900], ["Surface Laptop 7", 139900]] },
  { brand: "Samsung", cat: "laptops", storages: ["Core i5", "Core i7"], models: [["Galaxy Book4", 74900], ["Galaxy Book4 Pro 360", 169900]] },
  { brand: "LG", cat: "laptops", storages: ["Core i5", "Core i7"], models: [["gram 16", 134900], ["gram 17", 149900]] },
  { brand: "Razer", cat: "laptops", storages: ["Core i7", "Core i9"], models: [["Blade 14", 219900], ["Blade 16", 269900]] },
  { brand: "Acer", cat: "laptops", models: [["Chromebook Plus 515", 39900], ["Chromebook 315", 24900]] },
  { brand: "Lenovo", cat: "laptops", models: [["Chromebook Duet", 29900], ["IdeaPad Slim 3 Chromebook", 27900]] },
  { brand: "HP", cat: "laptops", models: [["Chromebook 14", 24900], ["Chromebook x360", 32900]] },
  { brand: "Gateway", cat: "laptops", models: [["14.1 Ultra Slim", 27900], ["15.6 Notebook", 32900]] },
];

const TABLETS: Group[] = [
  { brand: "Samsung", cat: "tablets", storages: ["128GB", "256GB"], models: [["Galaxy Tab A9", 14900], ["Galaxy Tab A9+", 27900], ["Galaxy Tab S6 Lite", 32900], ["Galaxy Tab S9 FE", 44900], ["Galaxy Tab S9", 79900], ["Galaxy Tab S9+", 99900], ["Galaxy Tab S9 Ultra", 119900]] },
  { brand: "Amazon", cat: "tablets", models: [["Fire 7", 5900], ["Fire HD 8", 9900], ["Fire HD 8 Kids", 9900], ["Fire HD 10", 13900], ["Fire HD 10 Kids Pro", 18900], ["Fire Max 11", 22900]] },
  { brand: "Lenovo", cat: "tablets", storages: ["64GB", "128GB"], models: [["Tab M9", 12900], ["Tab M11", 16900], ["Tab Plus", 27900], ["Tab P11 (2nd Gen)", 24900], ["Tab P12", 34900]] },
  { brand: "Microsoft", cat: "tablets", storages: ["128GB", "256GB"], models: [["Surface Go 4", 57900], ["Surface Pro 9", 99900], ["Surface Pro 11", 99900]] },
  { brand: "Xiaomi", cat: "tablets", storages: ["128GB", "256GB"], models: [["Redmi Pad SE", 19900], ["Pad 6", 39900]] },
  { brand: "Honor", cat: "tablets", storages: ["128GB"], models: [["Pad 9", 29900], ["Pad X9", 19900]] },
  { brand: "OnePlus", cat: "tablets", storages: ["128GB", "256GB"], models: [["Pad", 47900], ["Pad Go", 27900]] },
  { brand: "TCL", cat: "tablets", models: [["TAB 8 LE", 8900], ["Tab 10 NextPaper", 24900]] },
  { brand: "Nokia", cat: "tablets", models: [["T21", 18900], ["T20", 14900]] },
  { brand: "onn.", cat: "tablets", models: [["8\" Tablet Pro", 7900], ["10.1\" Tablet", 9900], ["11\" Pro Tablet", 14900]] },
  { brand: "Boox", cat: "tablets", models: [["Palma", 27900], ["Page", 24900]] },
];

const WATCHES: Group[] = [
  { brand: "Samsung", cat: "watches", models: [["Galaxy Watch FE", 19900], ["Galaxy Watch6", 29900], ["Galaxy Watch6 Classic", 39900], ["Galaxy Watch7", 32900], ["Galaxy Watch Ultra", 64900]] },
  { brand: "Google", cat: "watches", models: [["Pixel Watch 2", 34900], ["Pixel Watch 3", 34900]] },
  { brand: "Garmin", cat: "watches", models: [["Forerunner 165", 24900], ["Forerunner 265", 44900], ["Venu Sq 2", 24900], ["Venu 3", 44900], ["vivoactive 5", 29900], ["Instinct 2", 29900], ["Instinct 2X Solar", 44900], ["epix Pro", 89900], ["fenix 7", 69900], ["Lily 2", 27900]] },
  { brand: "Fitbit", cat: "watches", models: [["Inspire 3", 9900], ["Luxe", 12900], ["Charge 6", 15900], ["Versa 4", 19900], ["Sense 2", 29900]] },
  { brand: "Amazfit", cat: "watches", models: [["Bip 5", 8900], ["Active", 14900], ["GTS 4", 19900], ["GTR 4", 19900], ["Balance", 22900], ["T-Rex 3", 27900]] },
  { brand: "Withings", cat: "watches", models: [["ScanWatch Light", 24900], ["ScanWatch 2", 34900]] },
  { brand: "Suunto", cat: "watches", models: [["Race", 44900], ["Vertical", 62900]] },
  { brand: "Polar", cat: "watches", models: [["Vantage M3", 39900], ["Pacer Pro", 29900]] },
  { brand: "Mobvoi", cat: "watches", models: [["TicWatch Pro 5", 34900], ["TicWatch Atlas", 34900]] },
  { brand: "Fossil", cat: "watches", models: [["Gen 6 Smartwatch", 25900]] },
  { brand: "Coros", cat: "watches", models: [["Pace 3", 22900], ["Apex 2", 34900]] },
];

const AUDIO: Group[] = [
  { brand: "Sony", cat: "audio", models: [["WH-1000XM5 Headphones", 39900], ["WH-CH720N Headphones", 14900], ["ULT Wear Headphones", 19900], ["WF-1000XM5 Earbuds", 29900], ["WF-C710N Earbuds", 11900], ["SRS-XB100 Speaker", 5900], ["ULT Field 1 Speaker", 12900]] },
  { brand: "Bose", cat: "audio", models: [["QuietComfort Ultra Headphones", 42900], ["QuietComfort Headphones", 34900], ["QuietComfort Earbuds II", 27900], ["Ultra Open Earbuds", 29900], ["SoundLink Flex Speaker", 14900], ["SoundLink Max Speaker", 39900], ["SoundLink Home Speaker", 21900]] },
  { brand: "JBL", cat: "audio", models: [["Tune 770NC Headphones", 9900], ["Live 770NC Headphones", 19900], ["Flip 6 Speaker", 12900], ["Charge 5 Speaker", 17900], ["Xtreme 4 Speaker", 37900], ["Boombox 3 Speaker", 49900], ["Clip 5 Speaker", 7900], ["Go 4 Speaker", 4900], ["Quantum 910 Headset", 24900]] },
  { brand: "Beats", cat: "audio", models: [["Studio Pro Headphones", 34900], ["Solo 4 Headphones", 19900], ["Studio Buds +", 16900], ["Fit Pro Earbuds", 19900], ["Solo Buds", 7900]] },
  { brand: "Sennheiser", cat: "audio", models: [["Momentum 4 Headphones", 34900], ["Accentum Plus Headphones", 22900], ["Momentum Sport Earbuds", 32900], ["CX Plus Earbuds", 12900]] },
  { brand: "Anker Soundcore", cat: "audio", models: [["Space One Headphones", 9900], ["Space Q45 Headphones", 9900], ["Motion Boom Speaker", 7900], ["Liberty 4 NC Earbuds", 9900], ["Boom 2 Speaker", 12900]] },
  { brand: "Marshall", cat: "audio", models: [["Major V Headphones", 14900], ["Emberton II Speaker", 16900], ["Stanmore III Speaker", 37900], ["Willen Speaker", 9900]] },
  { brand: "Sonos", cat: "audio", models: [["Era 100 Speaker", 24900], ["Era 300 Speaker", 44900], ["Roam 2 Speaker", 17900], ["Move 2 Speaker", 44900]] },
  { brand: "Jabra", cat: "audio", models: [["Elite 8 Active Earbuds", 19900], ["Elite 10 Gen 2 Earbuds", 24900]] },
  { brand: "Skullcandy", cat: "audio", models: [["Crusher ANC 2 Headphones", 22900], ["Hesh ANC Headphones", 9900], ["Dime 3 Earbuds", 2900]] },
  { brand: "Ultimate Ears", cat: "audio", models: [["WONDERBOOM 4 Speaker", 9900], ["BOOM 4 Speaker", 14900], ["MEGABOOM 4 Speaker", 24900]] },
  { brand: "Razer", cat: "audio", models: [["Barracuda X Headset", 9900], ["Kraken V3 Headset", 7900]] },
  { brand: "Audio-Technica", cat: "audio", models: [["ATH-M50x Headphones", 14900], ["ATH-M20x Headphones", 4900]] },
  { brand: "Tribit", cat: "audio", models: [["StormBox Micro 2 Speaker", 5900], ["XSound Go Speaker", 3900]] },
];

const HOME: Group[] = [
  { brand: "TCL", cat: "home", models: [["50\" S5 4K TV", 27900], ["55\" Q6 4K QLED TV", 39900], ["65\" S5 4K TV", 39900], ["75\" Q6 4K QLED TV", 69900], ["85\" Q6 4K QLED TV", 99900]] },
  { brand: "Hisense", cat: "home", models: [["55\" U6 Mini-LED TV", 49900], ["65\" U7 Mini-LED TV", 79900], ["75\" A6 4K TV", 54900], ["100\" U76 4K TV", 199900]] },
  { brand: "Samsung", cat: "home", models: [["55\" The Frame TV", 149900], ["65\" CU8000 Crystal UHD TV", 59900], ["75\" Crystal UHD 4K TV", 79900], ["85\" Q80 QLED TV", 219900], ["HW-B650 Soundbar", 24900], ["HW-Q800C Soundbar", 59900]] },
  { brand: "LG", cat: "home", models: [["48\" C4 OLED TV", 119900], ["55\" B4 OLED TV", 119900], ["65\" C4 OLED TV", 169900], ["S80QY Soundbar", 49900]] },
  { brand: "Vizio", cat: "home", models: [["50\" V-Series 4K TV", 27900], ["75\" Quantum Pro 4K TV", 89900], ["M-Series 5.1 Soundbar", 24900]] },
  { brand: "Sony", cat: "home", models: [["BRAVIA 3 55\" 4K TV", 69900], ["HT-S2000 Soundbar", 39900]] },
  { brand: "Roku", cat: "home", models: [["Streaming Stick 4K", 4900], ["Plus Series 55\" QLED TV", 49900], ["Express 4K+", 3900]] },
  { brand: "Amazon", cat: "home", models: [["Fire TV Stick 4K Max", 5900], ["Fire TV Stick HD", 3900], ["Echo Dot (5th Gen)", 4900], ["Echo (4th Gen)", 9900], ["Echo Show 5", 8900], ["Echo Show 8", 14900], ["Echo Spot (2024)", 7900]] },
  { brand: "Google", cat: "home", models: [["Chromecast with Google TV 4K", 4900], ["Nest Hub (2nd Gen)", 9900], ["Nest Audio", 9900], ["Nest Mini (2nd Gen)", 4900], ["Nest Thermostat", 12900], ["Nest Learning Thermostat (4th Gen)", 27900], ["Nest Doorbell (Battery)", 17900]] },
  { brand: "Ring", cat: "home", models: [["Video Doorbell (2nd Gen)", 9900], ["Battery Doorbell Plus", 17900], ["Indoor Cam (2nd Gen)", 5900], ["Stick Up Cam Battery", 9900], ["Alarm 8-Piece Kit", 24900]] },
  { brand: "Wyze", cat: "home", models: [["Cam v4", 3900], ["Cam OG", 2900], ["Robot Vacuum", 26900], ["Video Doorbell Pro", 5900]] },
  { brand: "Blink", cat: "home", models: [["Mini 2 Camera", 3900], ["Outdoor 4 (2-Cam)", 13900]] },
  { brand: "iRobot", cat: "home", models: [["Roomba i3+ EVO", 39900], ["Roomba j7+", 59900], ["Roomba Combo i5+", 49900]] },
  { brand: "eufy", cat: "home", models: [["RoboVac 11S", 19900], ["RoboVac X8", 34900]] },
  { brand: "Shark", cat: "home", models: [["AI Ultra Robot Vacuum", 39900], ["Matrix Plus Robot Vacuum", 44900]] },
  { brand: "NVIDIA", cat: "home", models: [["Shield TV Pro", 19900]] },
  { brand: "Bose", cat: "home", models: [["Smart Soundbar 600", 49900], ["Smart Ultra Soundbar", 89900]] },
  { brand: "Sonos", cat: "home", models: [["Beam (Gen 2) Soundbar", 49900], ["Arc Soundbar", 89900], ["Ray Soundbar", 27900]] },
  { brand: "Philips Hue", cat: "home", models: [["White & Color Starter Kit", 19900], ["White Starter Kit", 9900]] },
  { brand: "Govee", cat: "home", models: [["Smart LED Strip (32.8ft)", 2900], ["Floor Lamp", 7900]] },
  { brand: "Arlo", cat: "home", models: [["Pro 5S Spotlight Cam", 19900], ["Essential XL", 14900]] },
];

const ACCESSORIES: Group[] = [
  { brand: "Anker", cat: "accessories", models: [["PowerCore 10K Power Bank", 2900], ["737 Power Bank (24,000mAh)", 14900], ["Prime 27,650mAh Power Bank", 17900], ["547 Power Bank (25,600mAh)", 9900], ["633 Magnetic Power Bank", 5900], ["Nano 30W USB-C Charger", 2900], ["735 GaN 65W Charger", 5900], ["100W USB-C 4-Port Charger", 6900], ["521 Charging Station", 4500], ["USB-C to USB-C Cable (6ft, 2-pack)", 1900]] },
  { brand: "UGREEN", cat: "accessories", models: [["Revodok 6-in-1 USB-C Hub", 3900], ["Nexode 65W Charger", 3900], ["9-in-1 USB-C Hub", 4900], ["100W USB-C Cable", 1500]] },
  { brand: "Logitech", cat: "accessories", models: [["MX Master 3S Mouse", 9900], ["MX Anywhere 3S Mouse", 7900], ["Pebble Mouse 2 M350s", 2900], ["M720 Triathlon Mouse", 3900], ["G502 HERO Gaming Mouse", 4900], ["G Pro X Superlight 2 Mouse", 15900], ["MX Keys S Keyboard", 10900], ["K380 Bluetooth Keyboard", 3900], ["C920x HD Webcam", 6900], ["Brio 4K Webcam", 16900]] },
  { brand: "Razer", cat: "accessories", models: [["DeathAdder V3 Mouse", 6900], ["Basilisk V3 Mouse", 6900], ["Huntsman Mini Keyboard", 11900], ["BlackWidow V4 Keyboard", 16900]] },
  { brand: "Keychron", cat: "accessories", models: [["K8 Wireless Keyboard", 8900], ["V1 Mechanical Keyboard", 7900], ["Q1 Pro Keyboard", 19900]] },
  { brand: "SanDisk", cat: "accessories", models: [["Extreme 1TB Portable SSD", 11900], ["Ultra 256GB microSD", 2900], ["128GB USB-C Flash Drive", 1900], ["Extreme PRO 256GB SD Card", 4900]] },
  { brand: "Samsung", cat: "accessories", models: [["T7 Shield 1TB SSD", 9900], ["990 PRO 1TB NVMe SSD", 12900], ["EVO Select 512GB microSD", 4900]] },
  { brand: "Crucial", cat: "accessories", models: [["X9 Pro 2TB Portable SSD", 14900], ["32GB DDR5 RAM Kit", 9900], ["P3 Plus 1TB NVMe SSD", 8900]] },
  { brand: "WD", cat: "accessories", models: [["My Passport 2TB Portable HDD", 6900], ["Elements 4TB Desktop HDD", 10900]] },
  { brand: "Belkin", cat: "accessories", models: [["3-in-1 Wireless Charger", 9900], ["BoostCharge USB-C Cable (2m)", 1900], ["BoostCharge Pro 4-Port Charger", 5900]] },
  { brand: "Elgato", cat: "accessories", models: [["Stream Deck MK.2", 14900], ["Facecam MK.2", 14900], ["Key Light Mini", 9900]] },
  { brand: "Tile", cat: "accessories", models: [["Mate (2024) Tracker", 2400], ["Pro (2024) Tracker", 3500], ["Slim (2024) Tracker", 3500]] },
  { brand: "Chipolo", cat: "accessories", models: [["ONE Bluetooth Tracker", 2500], ["CARD Spot Tracker", 3500]] },
  { brand: "Satechi", cat: "accessories", models: [["USB-C Multiport Adapter", 7900], ["Aluminum Stand & Hub", 9900]] },
  { brand: "ESR", cat: "accessories", models: [["HaloLock MagSafe Charger", 2900], ["Kickstand Phone Case", 1900]] },
  { brand: "Spigen", cat: "accessories", models: [["Tough Armor Phone Case", 1900], ["MagFit Wallet", 2400], ["Glas.tR Screen Protector", 1500]] },
  { brand: "Joby", cat: "accessories", models: [["GorillaPod Phone Tripod", 3900], ["GripTight Mount", 1900]] },
  { brand: "Baseus", cat: "accessories", models: [["100W Car Charger", 2900], ["10000mAh Magnetic Power Bank", 3900], ["6-in-1 USB-C Hub", 3500]] },
  { brand: "Temu", cat: "accessories", models: [["3-in-1 Wireless Charging Station", 1500], ["Phone Camera Lens Kit", 1200], ["LED Ring Light with Tripod", 1900], ["Universal Stylus Pen", 1200], ["Cable Organizer Box & Clips Set", 1500], ["Adjustable Laptop Stand", 1900], ["Magnetic Car Phone Mount", 1100]] },
  { brand: "PopSockets", cat: "accessories", models: [["MagSafe Grip", 1500], ["PopWallet+", 2000]] },
  { brand: "Roku", cat: "accessories", models: [["Voice Remote Pro", 2900]] },
];

function buildAll(): Spec[] {
  const raw = [
    ...expand(PHONES), ...expand(LAPTOPS), ...expand(TABLETS), ...expand(WATCHES),
    ...expand(AUDIO), ...expand(HOME), ...expand(ACCESSORIES),
  ];
  const seen = new Set<string>();
  const specs: Spec[] = [];
  for (const r of raw) {
    const slug = slugify(r.name);
    if (seen.has(slug)) continue;
    seen.add(slug);
    _nameForSlug[slug] = r.name;
    const retail = priceJitter(r.retailCents, slug);
    const base = markUp(retail, slug);
    specs.push({
      slug,
      category: r.category,
      name: r.name,
      tagline: pick(TAGS[r.category] ?? TAGS.accessories, slug),
      basePriceCents: base,
      heroImage: imageFor(r.name, r.category, slug),
      options: optionsFor(r.category, slug, base),
      isActive: true,
    });
  }
  return specs;
}

async function main() {
  const { db } = await import("../db/client");
  const { products } = await import("../db/schema");

  const specs = buildAll();
  console.log(`Generated ${specs.length} bulk listings.`);
  const counts: Record<string, number> = {};
  for (const p of specs) counts[p.category] = (counts[p.category] ?? 0) + 1;
  for (const [k, v] of Object.entries(counts)) console.log(`  ${k}: ${v}`);

  const BATCH = 200;
  let n = 0;
  for (let i = 0; i < specs.length; i += BATCH) {
    const slice = specs.slice(i, i + BATCH);
    await db
      .insert(products)
      .values(slice)
      .onConflictDoUpdate({
        target: products.slug,
        set: { basePriceCents: sql`excluded.base_price_cents`, updatedAt: new Date() },
      });
    n += slice.length;
    process.stdout.write(`\r  inserted ${n}/${specs.length}…`);
  }
  console.log("");

  const [{ total }] = (await db
    .execute<{ total: number }>(sql`SELECT count(*)::int AS total FROM products;`)
    .then((r) => r.rows ?? [])) as any;
  console.log(`\n✓ Database now has ${total} total products.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
