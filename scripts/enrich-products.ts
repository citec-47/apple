/**
 * enrich-products.ts
 * ---------------------------------------------------------------------------
 * Gives every product a short description and a small image gallery (the hero
 * plus 2–3 more photos of the same product type). Deterministic and idempotent
 * — safe to re-run. Updates existing rows in place; never deletes.
 *
 *   npm run db:enrich-products
 * ---------------------------------------------------------------------------
 */
import { config } from "dotenv";
import { eq } from "drizzle-orm";
config({ path: ".env.local" });

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

// ─── Image pools (same known-good licensed photos the catalog already uses) ──
const U = "https://images.unsplash.com";
const Q = "?w=600&h=600&fit=crop&auto=format&q=80";
const im = (id: string) => `${U}/${id}${Q}`;
const CATEGORY_POOLS: Record<string, string[]> = {
  phones: ["photo-1511707171634-5f897ff02aa9", "photo-1605236453806-6ff36851218e", "photo-1601784551446-20c9e07cdbdb", "photo-1592750475338-74b7b21085ab", "photo-1574944985070-8f3ebc6b79d2"].map(im),
  laptops: ["photo-1496181133206-80ce9b88a853", "photo-1517336714731-489689fd1ca8", "photo-1531297484001-80022131f5a1", "photo-1593642632559-0c6d3fc62b89", "photo-1541807084-5c52b6b3adef"].map(im),
  tablets: ["photo-1544244015-0df4b3ffc6b0", "photo-1561154464-82e9adf32764", "photo-1542751110-97427bbecf20", "photo-1561972774-2dc3f1e9d65f"].map(im),
  watches: ["photo-1523275335684-37898b6baf30", "photo-1546868871-7041f2a55e12", "photo-1508685096489-7aacd43bd3b1", "photo-1524805444758-089113d48a6d"].map(im),
  audio: ["photo-1505740420928-5e560c06d30e", "photo-1545127398-14699f92334b", "photo-1484704849700-f032a568e944", "photo-1608043152269-423dbba4e7e1"].map(im),
  home: ["photo-1593305841991-05c297ba4575", "photo-1571415060716-baff5f717b0e", "photo-1556909114-f6e7ad7d3136", "photo-1461151304267-38535e780c79"].map(im),
  accessories: ["photo-1531986362435-16b427eb9c26", "photo-1606220589517-fcc9d2c97aaf", "photo-1583394838336-acd977736f90", "photo-1609091839311-d5365f9ff1c5"].map(im),
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

function gallery(name: string, category: string, slug: string, hero: string | null): string[] {
  const rule = SUBTYPE_RULES.find((r) => r.match.test(name));
  const candidates = Array.from(new Set([...(rule?.pool ?? []), ...(CATEGORY_POOLS[category] ?? CATEGORY_POOLS.accessories)]));
  const others = candidates.filter((c) => c && c !== hero);
  // rotate so different products lead with different extra shots
  const start = others.length ? hash(slug + "·g") % others.length : 0;
  const rotated = others.slice(start).concat(others.slice(0, start));
  const out = Array.from(new Set([hero ?? "", ...rotated].filter(Boolean)));
  return out.slice(0, 4); // hero + up to 3 more
}

// ─── Descriptions ───
const LEAD: Record<string, string[]> = {
  phones: ["pairs a vivid display with all-day battery so it keeps up from your first message to your last scroll.", "delivers fast 5G, a responsive screen, and cameras that make everyday shots look great.", "balances speed, battery, and a bright display for work and play alike."],
  laptops: ["combines responsive performance with a comfortable keyboard for work, study, and everything in between.", "is light enough to carry all day yet capable enough for real work.", "handles browsing, documents, and media on a crisp display with long battery life."],
  tablets: ["gives you a big, bright screen for reading, streaming, sketching, and browsing anywhere.", "is a lightweight companion for shows, notes, and video calls.", "turns downtime into screen time with a sharp display and all-day battery."],
  watches: ["tracks your heart, sleep, and workouts while keeping notifications on your wrist.", "keeps health insights, activity tracking, and alerts a glance away.", "is built to follow your day from morning runs to evening wind-down."],
  audio: ["delivers rich, balanced sound whether you're commuting, working out, or relaxing at home.", "wraps you in clear highs and deep lows with comfortable all-day wear.", "brings your music, podcasts, and calls to life with crisp detail."],
  home: ["upgrades your space with smart features that are quick to set up and easy to live with.", "brings a sharper picture, fuller sound, or smarter control to your home.", "fits right into your living room and stays out of the way until you need it."],
  accessories: ["is a dependable everyday upgrade that works the moment you plug it in.", "is built from quality materials to handle daily carry and constant use.", "solves an everyday hassle with a simple, reliable design."],
};
const FEATURE: Record<string, string[]> = {
  phones: ["Expect snappy app switching, fast charging, and a design that feels good in the hand.", "It's ready for photos, social, and long days without a recharge.", "Smooth software and a durable build round out the package."],
  laptops: ["You get fast wake, quiet operation, and ports for the gear you already own.", "Expect comfortable typing and a screen that's easy on the eyes.", "It's ready for multitasking, video calls, and a full day on a charge."],
  tablets: ["Add a case or stylus and it doubles as a sketchpad or a second screen.", "Stream, read, and browse with smooth scrolling and rich color.", "It's just as happy on the couch as at the kitchen table."],
  watches: ["Water resistance and a comfortable band make it easy to wear day and night.", "Customizable faces and quick replies keep it personal and handy.", "Battery life is tuned to get you through your routine."],
  audio: ["A secure, comfortable fit and intuitive controls make it easy to live with.", "Quick pairing and a reliable connection keep things simple.", "Battery life is tuned for long listening sessions."],
  home: ["Setup takes minutes and it plays nicely with the apps you already use.", "Thoughtful design means it looks good and works reliably.", "Controls are simple enough for the whole household."],
  accessories: ["A compact, travel-friendly design makes it easy to take anywhere.", "Sturdy construction means it keeps up with daily use.", "It's the kind of upgrade you'll wonder how you did without."],
};
const CLOSE = [
  "Every order ships fast with free 2-day delivery and 30-day returns.",
  "Backed by free delivery, easy returns, and built-in warranty coverage.",
  "In stock now with fast, free shipping and hassle-free returns.",
];

function describe(name: string, category: string): string {
  const lead = pick(LEAD[category] ?? LEAD.accessories, name + "·l");
  const feat = pick(FEATURE[category] ?? FEATURE.accessories, name + "·f");
  const close = pick(CLOSE, name + "·c");
  return `The ${name} ${lead} ${feat} ${close}`;
}

async function main() {
  const { db } = await import("../db/client");
  const { products } = await import("../db/schema");

  const rows = await db
    .select({ id: products.id, slug: products.slug, name: products.name, category: products.category, heroImage: products.heroImage })
    .from(products);

  console.log(`Enriching ${rows.length} products with descriptions + galleries…`);

  async function updateOne(r: (typeof rows)[number]): Promise<void> {
    const values = {
      description: describe(r.name, r.category),
      gallery: gallery(r.name, r.category, r.slug, r.heroImage),
      updatedAt: new Date(),
    };
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        await db.update(products).set(values).where(eq(products.id, r.id));
        return;
      } catch (e) {
        if (attempt === 4) throw e;
        await new Promise((res) => setTimeout(res, 400 * attempt));
      }
    }
  }

  const BATCH = 8;
  let done = 0;
  for (let i = 0; i < rows.length; i += BATCH) {
    const slice = rows.slice(i, i + BATCH);
    await Promise.all(slice.map(updateOne));
    done += slice.length;
    process.stdout.write(`\r  ${done}/${rows.length}…`);
  }
  console.log("\n✓ Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
