/**
 * update-images-real.ts
 * ---------------------------------------------------------------------------
 * Replaces the slug-seeded Picsum placeholders on the real retail catalog with
 * relevant, licensed product photography (Unsplash CDN, commercial-use OK).
 *
 * Why not exact per-SKU manufacturer shots? Those would have to be sourced and
 * licensed individually — they can't be scraped from retailers reliably or
 * legally. So this picks the closest *subtype-appropriate* real photo: a TV
 * tile shows a TV, headphones show headphones, a webcam shows a webcam, etc.
 * Far less generic than a category-only photo, and every URL is verified to
 * load before it's written (falling back category → Picsum so nothing breaks).
 *
 * Cloudinary note: the account in .env.local (cloud "apple-storefront-citec47")
 * is not a live Cloudinary cloud — its API rejects requests with
 * "Invalid cloud_name". Once a real cloud is provisioned and the 4 CLOUDINARY_*
 * / NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME vars are updated, these same URLs can be
 * uploaded/served through it; until then we serve the Unsplash CDN directly,
 * which is what the rest of the app already relies on.
 *
 * Only touches the 7 real-catalog categories — the hand-written Apple seed
 * keeps its curated apple.com imagery.
 *
 *   npm run db:update-images-real
 * ---------------------------------------------------------------------------
 */
import { config } from "dotenv";
import { eq, and, inArray } from "drizzle-orm";
config({ path: ".env.local" });

const U = "https://images.unsplash.com";
const Q = "?w=600&h=600&fit=crop&auto=format&q=80";
const u = (id: string) => `${U}/${id}${Q}`;

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// ─── Known-good category pools (fallback) — verified loads ───
const CATEGORY_POOLS: Record<string, string[]> = {
  phones: ["photo-1511707171634-5f897ff02aa9", "photo-1605236453806-6ff36851218e", "photo-1601784551446-20c9e07cdbdb", "photo-1592750475338-74b7b21085ab", "photo-1574944985070-8f3ebc6b79d2"].map(u),
  laptops: ["photo-1496181133206-80ce9b88a853", "photo-1517336714731-489689fd1ca8", "photo-1531297484001-80022131f5a1", "photo-1593642632559-0c6d3fc62b89", "photo-1541807084-5c52b6b3adef"].map(u),
  tablets: ["photo-1544244015-0df4b3ffc6b0", "photo-1561154464-82e9adf32764", "photo-1542751110-97427bbecf20", "photo-1561972774-2dc3f1e9d65f"].map(u),
  watches: ["photo-1523275335684-37898b6baf30", "photo-1546868871-7041f2a55e12", "photo-1508685096489-7aacd43bd3b1", "photo-1524805444758-089113d48a6d"].map(u),
  audio: ["photo-1505740420928-5e560c06d30e", "photo-1545127398-14699f92334b", "photo-1484704849700-f032a568e944"].map(u),
  home: ["photo-1593305841991-05c297ba4575", "photo-1571415060716-baff5f717b0e", "photo-1556909114-f6e7ad7d3136"].map(u),
  accessories: ["photo-1531986362435-16b427eb9c26", "photo-1606220589517-fcc9d2c97aaf", "photo-1583394838336-acd977736f90"].map(u),
};

// ─── Subtype rules (first match wins), keyed off the product name ───
const SUBTYPE_RULES: { match: RegExp; pool: string[] }[] = [
  // home
  { match: /\bTV\b/i, pool: ["photo-1593305841991-05c297ba4575", "photo-1461151304267-38535e780c79"].map(u) },
  { match: /soundbar/i, pool: ["photo-1545454675-3531b543be5d"].map(u) },
  // webcam must precede the security-"cam" rule below ("Webcam" contains "cam")
  { match: /webcam/i, pool: ["photo-1596742578443-7682ef5251cd"].map(u) },
  { match: /doorbell|cam\b|camera/i, pool: ["photo-1558002038-1055907df827"].map(u) },
  { match: /roomba|vacuum/i, pool: ["photo-1603532648955-039310d9ed75"].map(u) },
  { match: /echo|nest hub|smart hub|homepod|sonos/i, pool: ["photo-1512446816042-444d641267d4"].map(u) },
  // audio
  { match: /headphones/i, pool: ["photo-1505740420928-5e560c06d30e", "photo-1484704849700-f032a568e944"].map(u) },
  { match: /earbuds|buds\b/i, pool: ["photo-1606220945770-b5b6c2c55bf1", "photo-1590658268037-6bf12165a8df"].map(u) },
  { match: /speaker|boom|stormbox|wonderboom|emberton|flip|charge|go \d/i, pool: ["photo-1608043152269-423dbba4e7e1", "photo-1589003077984-894e133dabab"].map(u) },
  // accessories
  { match: /power bank/i, pool: ["photo-1609091839311-d5365f9ff1c5"].map(u) },
  { match: /charger|charging/i, pool: ["photo-1583863788434-e58a36330cf0"].map(u) },
  { match: /mouse/i, pool: ["photo-1527814050087-3793815479db"].map(u) },
  { match: /keyboard/i, pool: ["photo-1587829741301-dc798b83add3", "photo-1618384887929-16ec33fab9ef"].map(u) },
  { match: /ssd|microsd|portable storage|memory card/i, pool: ["photo-1531492746076-161ca9bcad58"].map(u) },
  { match: /tracker|tile\b/i, pool: ["photo-1558618666-fcd25c85cd64"].map(u) },
  // big device subtypes
  { match: /tablet|tab\b|fire (hd|max)|surface (pro|go)/i, pool: ["photo-1544244015-0df4b3ffc6b0", "photo-1561972774-2dc3f1e9d65f"].map(u) },
];

const FALLBACK = (slug: string) => `https://picsum.photos/seed/${encodeURIComponent(slug)}/600/600`;

const ok = new Map<string, boolean>();
async function loads(url: string): Promise<boolean> {
  if (ok.has(url)) return ok.get(url)!;
  let good = false;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(t);
    good = res.ok;
  } catch {
    good = false;
  }
  ok.set(url, good);
  return good;
}

/** Pick a deterministic, verified URL: subtype → category → picsum. */
async function pickImage(name: string, category: string, slug: string): Promise<{ url: string; kind: string }> {
  const rule = SUBTYPE_RULES.find((r) => r.match.test(name));
  const tries: { pool: string[]; kind: string }[] = [];
  if (rule) tries.push({ pool: rule.pool, kind: "subtype" });
  tries.push({ pool: CATEGORY_POOLS[category] ?? [], kind: "category" });
  for (const { pool, kind } of tries) {
    if (!pool.length) continue;
    const start = hash(slug) % pool.length;
    for (let i = 0; i < pool.length; i++) {
      const url = pool[(start + i) % pool.length];
      if (await loads(url)) return { url, kind };
    }
  }
  return { url: FALLBACK(slug), kind: "picsum" };
}

async function main() {
  const { db } = await import("../db/client");
  const { products } = await import("../db/schema");

  const cats = Object.keys(CATEGORY_POOLS);
  const rows = await db
    .select({ id: products.id, slug: products.slug, name: products.name, category: products.category })
    .from(products)
    .where(and(inArray(products.category, cats), eq(products.isActive, true)));

  console.log(`Assigning product photos to ${rows.length} listings…`);
  const tally: Record<string, number> = { subtype: 0, category: 0, picsum: 0 };
  for (const r of rows) {
    const { url, kind } = await pickImage(r.name, r.category, r.slug);
    tally[kind]++;
    await db.update(products).set({ heroImage: url, updatedAt: new Date() }).where(eq(products.id, r.id));
    process.stdout.write(`\r  ${tally.subtype + tally.category + tally.picsum}/${rows.length}…`);
  }
  console.log("");
  console.log(`\n✓ Updated ${rows.length} products.`);
  console.log(`  subtype-specific photo: ${tally.subtype}`);
  console.log(`  category photo:         ${tally.category}`);
  console.log(`  picsum fallback:        ${tally.picsum}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
