import { config } from "dotenv";
import { sql } from "drizzle-orm";
config({ path: ".env.local" });

// ─── Deterministic helpers (no Math.random; we want reproducible seeds) ───
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function pick<T>(arr: T[], key: string): T {
  return arr[hash(key) % arr.length];
}
function priceJitter(baseCents: number, key: string): number {
  const j = (hash(key) % 41) - 20; // -20..+20
  return Math.max(900, baseCents + j * 100); // never below $9.00
}
function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ─── Image URL builder ───
// Picsum serves a real, deterministic photograph per seed (Unsplash-licensed).
// Swap this single function to a different source (Unsplash, Pexels, Cloudinary)
// if you ever want category-specific imagery — see scripts/update-images.ts.
function imageFor(slug: string): string {
  return `https://picsum.photos/seed/${encodeURIComponent(slug)}/600/600`;
}

interface Spec {
  slug: string;
  category: string;
  name: string;
  tagline: string;
  basePriceCents: number;
  heroImage: string;
  options: Record<string, { label: string; priceDeltaCents?: number; swatch?: string }[]>;
  isActive: boolean;
}

const COLORS = [
  { label: "Midnight", swatch: "#1a1a2e" },
  { label: "Snow", swatch: "#f5f5f7" },
  { label: "Aurora", swatch: "#7b5fee" },
  { label: "Sky", swatch: "#5b8def" },
  { label: "Sand", swatch: "#e4d7c5" },
  { label: "Forest", swatch: "#3a5f3a" },
  { label: "Coral", swatch: "#e87a6a" },
  { label: "Slate", swatch: "#3a3a45" },
];

const STORAGE_PHONE = [
  { label: "128GB", priceDeltaCents: 0 },
  { label: "256GB", priceDeltaCents: 10000 },
  { label: "512GB", priceDeltaCents: 30000 },
  { label: "1TB", priceDeltaCents: 60000 },
];
const STORAGE_LAPTOP = [
  { label: "512GB", priceDeltaCents: 0 },
  { label: "1TB", priceDeltaCents: 20000 },
  { label: "2TB", priceDeltaCents: 50000 },
  { label: "4TB", priceDeltaCents: 110000 },
];
const MEMORY_LAPTOP = [
  { label: "16GB", priceDeltaCents: 0 },
  { label: "32GB", priceDeltaCents: 20000 },
  { label: "64GB", priceDeltaCents: 50000 },
];
const STORAGE_TAB = STORAGE_PHONE;
const SIZE_WATCH = [
  { label: "40mm", priceDeltaCents: 0 },
  { label: "44mm", priceDeltaCents: 3000 },
];
const CASE_WATCH = [
  { label: "Aluminum", priceDeltaCents: 0 },
  { label: "Stainless steel", priceDeltaCents: 20000 },
  { label: "Titanium", priceDeltaCents: 50000 },
];
const BAND_WATCH = [
  { label: "Sport band", priceDeltaCents: 0 },
  { label: "Woven loop", priceDeltaCents: 2000 },
  { label: "Steel mesh", priceDeltaCents: 8000 },
  { label: "Leather", priceDeltaCents: 5000 },
];
const APPLECARE = [
  { label: "No coverage", priceDeltaCents: 0 },
  { label: "2-year coverage", priceDeltaCents: 9900 },
  { label: "3-year coverage", priceDeltaCents: 14900 },
];

// ─── Per-category recipes ───

function phones(): Spec[] {
  const series = ["Pulse", "Orbit", "Halo", "Edge", "Lumen", "Spark", "Arc", "Vista", "Solar", "Prism", "Flux", "Wave", "Zenith", "Nebula", "Comet", "Nova", "Apex", "Quantum"];
  const tiers = [
    { label: "Lite", mult: 0.55 },
    { label: "Mini", mult: 0.7 },
    { label: "Standard", mult: 1.0 },
    { label: "Plus", mult: 1.2 },
    { label: "Pro", mult: 1.55 },
    { label: "Pro Max", mult: 1.85 },
    { label: "Ultra", mult: 2.2 },
    { label: "Titan", mult: 2.6 },
  ];
  const years = ["2024", "2025", "2026"];
  const taglines = [
    "Pocket power, redefined for the way you live.",
    "Lightning-fast neural chip, all-day battery.",
    "Capture more, faster, sharper.",
    "Cinema in your hand, every single tap.",
    "Built tough, runs cool, looks sharp.",
    "A vivid display you'll never want to put down.",
  ];
  const colors = COLORS.slice(0, 6);
  const out: Spec[] = [];
  const seen = new Set<string>();
  for (const s of series) {
    for (const t of tiers) {
      for (const y of years) {
        const name = `Nova ${s} Phone ${t.label} (${y})`;
        const slug = slugify(`${s}-phone-${t.label}-${y}`);
        if (seen.has(slug)) continue;
        seen.add(slug);
        const base = priceJitter(Math.round(30000 * t.mult), slug);
        out.push({
          slug,
          category: "phones",
          name,
          tagline: pick(taglines, slug),
          basePriceCents: base,
          heroImage: imageFor(slug),
          options: { storage: STORAGE_PHONE, color: colors, applecare: APPLECARE },
          isActive: true,
        });
      }
    }
  }
  return out;
}

function laptops(): Spec[] {
  const series = ["Aero", "Studio", "Forge", "Vista", "Pulse", "Lumen", "Halo", "Solar", "Apex", "Zenith", "Edge", "Nova"];
  const tiers = [
    { label: "Lite", mult: 0.7 },
    { label: "Air", mult: 1.0 },
    { label: "Pro", mult: 1.6 },
    { label: "Pro Max", mult: 2.2 },
    { label: "Workstation", mult: 3.2 },
  ];
  const sizes = [13, 14, 15, 16, 17];
  const taglines = [
    "All-day creativity, take it anywhere.",
    "Studio-grade performance with silent fans.",
    "Built for code, video, and 3D.",
    "Featherweight aluminum, full-day battery.",
    "Pro display, pro chip, no compromises.",
  ];
  const chips = [
    { label: "Nova N5", priceDeltaCents: 0 },
    { label: "Nova N7", priceDeltaCents: 30000 },
    { label: "Nova N9", priceDeltaCents: 80000 },
  ];
  const colors = [COLORS[0], COLORS[1], COLORS[7]];
  const out: Spec[] = [];
  const seen = new Set<string>();
  for (const s of series) {
    for (const t of tiers) {
      for (const size of sizes) {
        const name = `Nova ${s} Laptop ${t.label} ${size}"`;
        const slug = slugify(`${s}-laptop-${t.label}-${size}`);
        if (seen.has(slug)) continue;
        seen.add(slug);
        const base = priceJitter(Math.round(70000 * t.mult), slug);
        out.push({
          slug,
          category: "laptops",
          name,
          tagline: pick(taglines, slug),
          basePriceCents: base,
          heroImage: imageFor(slug),
          options: { chip: chips, memory: MEMORY_LAPTOP, storage: STORAGE_LAPTOP, color: colors, applecare: APPLECARE },
          isActive: true,
        });
      }
    }
  }
  return out;
}

function tablets(): Spec[] {
  const series = ["Pulse", "Orbit", "Halo", "Lumen", "Spark", "Arc", "Vista", "Wave", "Apex", "Nebula", "Zenith", "Nova", "Edge", "Solar"];
  const tiers = [
    { label: "Lite", mult: 0.45 },
    { label: "Mini", mult: 0.6 },
    { label: "Standard", mult: 1.0 },
    { label: "Plus", mult: 1.4 },
    { label: "Pro", mult: 2.0 },
  ];
  const sizes = [9, 11, 12.9, 13];
  const taglines = [
    "Ultra-thin canvas for drawing, editing, and ideas.",
    "Cinema in your hands.",
    "Lightweight reading, sketching, and notes.",
    "Studio-grade screen, all-day battery.",
  ];
  const colors = COLORS.slice(0, 5);
  const connectivity = [
    { label: "Wi-Fi", priceDeltaCents: 0 },
    { label: "Wi-Fi + Cellular", priceDeltaCents: 20000 },
  ];
  const out: Spec[] = [];
  const seen = new Set<string>();
  for (const s of series) {
    for (const t of tiers) {
      for (const sz of sizes) {
        const name = `Nova ${s} Tab ${t.label} ${sz}"`;
        const slug = slugify(`${s}-tab-${t.label}-${sz}`);
        if (seen.has(slug)) continue;
        seen.add(slug);
        const base = priceJitter(Math.round(30000 * t.mult), slug);
        out.push({
          slug,
          category: "tablets",
          name,
          tagline: pick(taglines, slug),
          basePriceCents: base,
          heroImage: imageFor(slug),
          options: { storage: STORAGE_TAB, color: colors, applecare: APPLECARE },
          isActive: true,
        });
      }
    }
  }
  // Layer in connectivity by injecting it into options
  for (const p of out) p.options.connectivity = connectivity;
  return out;
}

function watches(): Spec[] {
  const series = ["Pulse", "Orbit", "Halo", "Edge", "Lumen", "Spark", "Arc", "Vista", "Solar", "Prism", "Flux", "Wave", "Apex", "Zenith", "Nebula", "Nova"];
  const tiers = [
    { label: "Lite", mult: 0.45 },
    { label: "Light", mult: 0.6 },
    { label: "Active", mult: 1.0 },
    { label: "Pro", mult: 1.6 },
    { label: "Ultra", mult: 2.4 },
  ];
  const editions = ["", " Sport", " Elegance", " Adventure", " Classic"];
  const taglines = [
    "Heart, sleep, and movement on your wrist.",
    "Always-on display, all-day battery.",
    "Sapphire crystal, titanium feel.",
    "Workouts, walks, weekends — covered.",
  ];
  const colors = [COLORS[0], COLORS[1], COLORS[7], COLORS[3]];
  const out: Spec[] = [];
  const seen = new Set<string>();
  for (const s of series) {
    for (const t of tiers) {
      for (const e of editions) {
        const name = `Nova ${s} Watch ${t.label}${e}`;
        const slug = slugify(`${s}-watch-${t.label}${e}`);
        if (seen.has(slug)) continue;
        seen.add(slug);
        const base = priceJitter(Math.round(20000 * t.mult), slug);
        out.push({
          slug,
          category: "watches",
          name,
          tagline: pick(taglines, slug),
          basePriceCents: base,
          heroImage: imageFor(slug),
          options: { size: SIZE_WATCH, case: CASE_WATCH, band: BAND_WATCH, color: colors, applecare: APPLECARE },
          isActive: true,
        });
      }
    }
  }
  return out;
}

function audio(): Spec[] {
  const subtypes = [
    { id: "buds", label: "Buds", base: 6000 },
    { id: "headphones", label: "Headphones", base: 18000 },
    { id: "speaker", label: "Speaker", base: 12000 },
    { id: "soundbar", label: "Soundbar", base: 30000 },
    { id: "earbuds-sport", label: "Sport Buds", base: 5000 },
    { id: "microphone", label: "Microphone", base: 11000 },
    { id: "monitor", label: "Studio Monitor", base: 25000 },
  ];
  const series = ["Pulse", "Orbit", "Halo", "Lumen", "Spark", "Arc", "Vista", "Wave", "Apex", "Zenith", "Nova", "Nebula"];
  const tiers = [
    { label: "Lite", mult: 0.6 },
    { label: "Standard", mult: 1.0 },
    { label: "Plus", mult: 1.4 },
    { label: "Pro", mult: 1.9 },
    { label: "Studio", mult: 2.6 },
  ];
  const taglines = [
    "Lossless audio in your ears.",
    "Adaptive noise cancellation, room-by-room.",
    "Studio-grade drivers, road-ready build.",
    "Room-filling sound from a pocket-size device.",
    "Bluetooth 6, multi-point, hot-swappable.",
  ];
  const colors = COLORS.slice(0, 4);
  const out: Spec[] = [];
  const seen = new Set<string>();
  for (const st of subtypes) {
    for (const s of series) {
      for (const t of tiers) {
        const name = `Nova ${s} ${st.label} ${t.label}`;
        const slug = slugify(`${s}-${st.id}-${t.label}`);
        if (seen.has(slug)) continue;
        seen.add(slug);
        const base = priceJitter(Math.round(st.base * t.mult), slug);
        out.push({
          slug,
          category: "audio",
          name,
          tagline: pick(taglines, slug),
          basePriceCents: base,
          heroImage: imageFor(slug),
          options: { color: colors, applecare: APPLECARE },
          isActive: true,
        });
      }
    }
  }
  return out;
}

function home(): Spec[] {
  const subtypes = [
    { id: "tv", label: "TV", base: 80000, sizes: [43, 50, 55, 65, 75, 85, 98] },
    { id: "soundbar", label: "Soundbar", base: 35000, sizes: [0] },
    { id: "hub", label: "Smart Hub", base: 12000, sizes: [0] },
    { id: "speaker", label: "Speaker", base: 18000, sizes: [0] },
    { id: "camera", label: "Camera", base: 9000, sizes: [0] },
    { id: "doorbell", label: "Doorbell", base: 14000, sizes: [0] },
    { id: "light", label: "Smart Light", base: 4500, sizes: [0] },
    { id: "sensor", label: "Sensor", base: 3900, sizes: [0] },
    { id: "thermostat", label: "Thermostat", base: 19900, sizes: [0] },
  ];
  const series = ["Cinema", "Lumen", "Pulse", "Halo", "Spark", "Vista", "Apex", "Zenith"];
  const tiers = [
    { label: "Lite", mult: 0.6 },
    { label: "Standard", mult: 1.0 },
    { label: "Plus", mult: 1.4 },
    { label: "Pro", mult: 2.0 },
    { label: "Studio", mult: 2.8 },
    { label: "Reference", mult: 3.6 },
  ];
  const taglines = [
    "Cinema in your living room, no soundbar needed.",
    "4K HDR, fast OS, smart home built in.",
    "Privacy-first smart hub for every room.",
    "Crystal-clear audio, room-by-room.",
    "Set it up in minutes. Stays out of the way.",
  ];
  const colors = [COLORS[0], COLORS[1], COLORS[7]];
  const out: Spec[] = [];
  const seen = new Set<string>();
  for (const st of subtypes) {
    for (const s of series) {
      for (const t of tiers) {
        for (const sz of st.sizes) {
          const sizeSuffix = sz > 0 ? ` ${sz}"` : "";
          const name = `Nova ${s} ${st.label}${sizeSuffix} ${t.label}`;
          const slug = slugify(`${s}-${st.id}${sz > 0 ? "-" + sz : ""}-${t.label}`);
          if (seen.has(slug)) continue;
          seen.add(slug);
          const base = priceJitter(Math.round(st.base * t.mult), slug);
          out.push({
            slug,
            category: "home",
            name,
            tagline: pick(taglines, slug),
            basePriceCents: base,
            heroImage: imageFor(slug),
            options: { color: colors, applecare: APPLECARE },
            isActive: true,
          });
        }
      }
    }
  }
  return out;
}

function accessories(): Spec[] {
  const subtypes = [
    { id: "charger", label: "Charger", base: 2900, watts: [20, 30, 65, 100, 140] },
    { id: "cable", label: "Cable", base: 1900, watts: [] },
    { id: "stand", label: "Stand", base: 4900, watts: [] },
    { id: "hub", label: "Hub", base: 5900, watts: [] },
    { id: "sleeve", label: "Sleeve", base: 3900, watts: [] },
    { id: "case", label: "Case", base: 3900, watts: [] },
    { id: "mouse", label: "Mouse", base: 7900, watts: [] },
    { id: "keyboard", label: "Keyboard", base: 12900, watts: [] },
    { id: "stylus", label: "Stylus", base: 9900, watts: [] },
    { id: "tag", label: "Tag", base: 2900, watts: [] },
    { id: "remote", label: "Remote", base: 5900, watts: [] },
    { id: "powerbank", label: "Power Bank", base: 5900, watts: [10000, 20000, 30000] },
    { id: "adapter", label: "Adapter", base: 3900, watts: [] },
    { id: "tripod", label: "Tripod", base: 4900, watts: [] },
    { id: "lens", label: "Lens Kit", base: 8900, watts: [] },
  ];
  const series = ["Pulse", "Lumen", "Spark", "Wave", "Apex", "Nova"];
  const tiers = [
    { label: "Standard", mult: 1.0 },
    { label: "Plus", mult: 1.3 },
    { label: "Pro", mult: 1.6 },
    { label: "Studio", mult: 2.4 },
  ];
  const taglines = [
    "Fast, reliable, made to last.",
    "Premium materials, minimal footprint.",
    "Plug, play, and get back to work.",
    "Built for everyday carry.",
  ];
  const colors = COLORS.slice(0, 4);
  const out: Spec[] = [];
  const seen = new Set<string>();
  for (const st of subtypes) {
    const watts = st.watts.length ? st.watts : [0];
    for (const w of watts) {
      for (const s of series) {
        for (const t of tiers) {
          const wattSuffix = w > 0 ? ` ${w}W` : "";
          const name = `Nova ${s} ${st.label}${wattSuffix} ${t.label}`;
          const slug = slugify(`${s}-${st.id}${w > 0 ? "-" + w + "w" : ""}-${t.label}`);
          if (seen.has(slug)) continue;
          seen.add(slug);
          const base = priceJitter(Math.round(st.base * t.mult), slug);
          out.push({
            slug,
            category: "accessories",
            name,
            tagline: pick(taglines, slug),
            basePriceCents: base,
            heroImage: imageFor(slug),
            options: { color: colors },
            isActive: true,
          });
        }
      }
    }
  }
  return out;
}

// ─── Insert in batches ───
async function main() {
  const { db } = await import("../db/client");
  const { products } = await import("../db/schema");

  const all: Spec[] = [
    ...phones(),
    ...laptops(),
    ...tablets(),
    ...watches(),
    ...audio(),
    ...home(),
    ...accessories(),
  ];

  console.log(`Generated ${all.length} unique product specs:`);
  const counts: Record<string, number> = {};
  for (const p of all) counts[p.category] = (counts[p.category] ?? 0) + 1;
  for (const [k, v] of Object.entries(counts)) console.log(`  ${k}: ${v}`);

  const BATCH = 100;
  let inserted = 0;
  for (let i = 0; i < all.length; i += BATCH) {
    const slice = all.slice(i, i + BATCH);
    await db
      .insert(products)
      .values(slice)
      .onConflictDoNothing({ target: products.slug });
    inserted += slice.length;
    process.stdout.write(`\r  inserted ${inserted}/${all.length}…`);
  }
  console.log("\n");

  const [{ n }] = await db.execute<{ n: number }>(sql`SELECT count(*)::int AS n FROM products;`).then((r) => r.rows ?? []) as any;
  console.log(`✓ Database now has ${n} total products.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
