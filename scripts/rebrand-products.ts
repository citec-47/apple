import { config } from "dotenv";
import { eq } from "drizzle-orm";
config({ path: ".env.local" });

const RENAME: Record<string, { name: string; category: string; tagline: string }> = {
  "macbook-air": {
    name: "Nova Laptop Air",
    category: "laptops",
    tagline: "Featherweight aluminum, all-day battery, ready for serious work.",
  },
  "macbook-pro": {
    name: "Nova Laptop Pro",
    category: "laptops",
    tagline: "Studio-grade performance for video, code and 3D, in a quiet chassis.",
  },
  "iphone-17-pro": {
    name: "Nova Phone Pro",
    category: "phones",
    tagline: "Pro camera, fastest neural chip, titanium frame.",
  },
  "iphone-17": {
    name: "Nova Phone",
    category: "phones",
    tagline: "Everyday flagship with vivid colors and a brilliant display.",
  },
  "ipad-pro": {
    name: "Nova Tab Pro",
    category: "tablets",
    tagline: "Ultra-thin canvas for drawing, editing and ideas.",
  },
  "apple-watch-series-11": {
    name: "Nova Watch",
    category: "watches",
    tagline: "Heart, sleep and movement insights on your wrist 24/7.",
  },
  "airpods-pro-3": {
    name: "Nova Buds Pro",
    category: "audio",
    tagline: "Adaptive noise cancellation and lossless audio in your ears.",
  },
  "apple-tv-4k": {
    name: "Nova Cinema 4K",
    category: "home",
    tagline: "Streaming, gaming and the smart home, in a tiny box.",
  },
};

async function main() {
  const { db } = await import("../db/client");
  const { products } = await import("../db/schema");
  for (const [slug, fields] of Object.entries(RENAME)) {
    const result = await db
      .update(products)
      .set({ ...fields, updatedAt: new Date() })
      .where(eq(products.slug, slug))
      .returning({ slug: products.slug, name: products.name });
    if (result.length > 0) {
      console.log(`✓ ${result[0].slug} -> ${result[0].name}`);
    } else {
      console.log(`- skipped (not in DB): ${slug}`);
    }
  }
  console.log("\nRebrand complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
