import { config } from "dotenv";
import { eq } from "drizzle-orm";

config({ path: ".env.local" });

async function main() {
  const { db } = await import("../db/client");
  const schemaModule = await import("../db/schema");
  const { products } = schemaModule;
  type NewProduct = typeof schemaModule.products.$inferInsert;

  const seed: NewProduct[] = [
    {
      slug: "macbook-air",
      category: "mac",
      name: "MacBook Air",
      tagline: "Thin. Fast. Powerful and portable.",
      basePriceCents: 109900,
      heroImage:
        "https://www.apple.com/v/macbook-air/z/images/overview/hero/hero_static__c9sislzzicq6_large.png",
      options: {
        chip: [
          { label: "Apple M3 chip — 8-core CPU, 8-core GPU" },
          { label: "Apple M3 chip — 8-core CPU, 10-core GPU", priceDeltaCents: 10000 },
        ],
        memory: [
          { label: "8GB unified memory" },
          { label: "16GB unified memory", priceDeltaCents: 20000 },
          { label: "24GB unified memory", priceDeltaCents: 40000 },
        ],
        storage: [
          { label: "256GB SSD" },
          { label: "512GB SSD", priceDeltaCents: 20000 },
          { label: "1TB SSD", priceDeltaCents: 40000 },
          { label: "2TB SSD", priceDeltaCents: 80000 },
        ],
        color: [
          { label: "Sky Blue", swatch: "#a4c6d8" },
          { label: "Silver", swatch: "#c8c9cc" },
          { label: "Starlight", swatch: "#e4d7c5" },
          { label: "Midnight", swatch: "#36383c" },
        ],
        applecare: [
          { label: "No AppleCare+" },
          { label: "AppleCare+ for Mac (3 years)", priceDeltaCents: 24900 },
        ],
      },
    },
    {
      slug: "macbook-pro",
      category: "mac",
      name: "MacBook Pro 14\"",
      tagline: "Mind-blowing. Head-turning.",
      basePriceCents: 199900,
      heroImage:
        "https://www.apple.com/v/macbook-pro/ax/images/overview/welcome/hero_endframe__fwev9ebh42mq_xlarge.jpg",
      options: {
        chip: [
          { label: "M3 chip — 8-core CPU, 10-core GPU" },
          { label: "M3 Pro chip — 12-core CPU, 18-core GPU", priceDeltaCents: 60000 },
          { label: "M3 Max chip — 14-core CPU, 30-core GPU", priceDeltaCents: 120000 },
        ],
        memory: [
          { label: "8GB unified memory" },
          { label: "16GB unified memory", priceDeltaCents: 20000 },
          { label: "32GB unified memory", priceDeltaCents: 60000 },
        ],
        storage: [
          { label: "512GB SSD" },
          { label: "1TB SSD", priceDeltaCents: 20000 },
          { label: "2TB SSD", priceDeltaCents: 60000 },
        ],
        color: [
          { label: "Space Black", swatch: "#1d1d1f" },
          { label: "Silver", swatch: "#c8c9cc" },
        ],
        applecare: [
          { label: "No AppleCare+" },
          { label: "AppleCare+ for Mac (3 years)", priceDeltaCents: 39900 },
        ],
      },
    },
    {
      slug: "iphone-17-pro",
      category: "iphone",
      name: "iPhone 17 Pro",
      tagline: "All out Pro.",
      basePriceCents: 109900,
      heroImage:
        "https://www.apple.com/v/home/cm/images/heroes/iphone-17-pro/hero_iphone_17_pro__bknyzxfk2agi_large.jpg",
      options: {
        storage: [
          { label: "256GB" },
          { label: "512GB", priceDeltaCents: 20000 },
          { label: "1TB", priceDeltaCents: 40000 },
        ],
        color: [
          { label: "Natural Titanium", swatch: "#9a8e7d" },
          { label: "Blue Titanium", swatch: "#3a4d5d" },
          { label: "White Titanium", swatch: "#e3e3e3" },
          { label: "Black Titanium", swatch: "#2d2c2b" },
        ],
        applecare: [
          { label: "No AppleCare+" },
          { label: "AppleCare+ (2 years)", priceDeltaCents: 19900 },
        ],
      },
    },
    {
      slug: "iphone-17",
      category: "iphone",
      name: "iPhone 17",
      tagline: "Magichromatic.",
      basePriceCents: 79900,
      heroImage:
        "https://www.apple.com/v/home/cm/images/heroes/iphone-17/hero_iphone_17__c5vvimu9a20y_large.jpg",
      options: {
        storage: [
          { label: "128GB" },
          { label: "256GB", priceDeltaCents: 10000 },
          { label: "512GB", priceDeltaCents: 20000 },
        ],
        color: [
          { label: "Pink", swatch: "#e5b4c3" },
          { label: "Blue", swatch: "#9ec9e0" },
          { label: "Yellow", swatch: "#e8d36b" },
          { label: "Black", swatch: "#1d1d1f" },
        ],
        applecare: [
          { label: "No AppleCare+" },
          { label: "AppleCare+ (2 years)", priceDeltaCents: 14900 },
        ],
      },
    },
    {
      slug: "ipad-pro",
      category: "ipad",
      name: "iPad Pro",
      tagline: "Supercharged by M4.",
      basePriceCents: 99900,
      heroImage:
        "https://www.apple.com/v/ipad-pro/aw/images/overview/hero/hero_endframe__du5kcy4qnxkm_large.jpg",
      options: {
        size: [
          { label: "11-inch Liquid Retina XDR display" },
          { label: "13-inch Liquid Retina XDR display", priceDeltaCents: 20000 },
        ],
        storage: [
          { label: "256GB" },
          { label: "512GB", priceDeltaCents: 20000 },
          { label: "1TB", priceDeltaCents: 40000 },
        ],
        color: [
          { label: "Space Black", swatch: "#1d1d1f" },
          { label: "Silver", swatch: "#c8c9cc" },
        ],
        applecare: [
          { label: "No AppleCare+" },
          { label: "AppleCare+ for iPad (2 years)", priceDeltaCents: 12900 },
        ],
      },
    },
    {
      slug: "apple-watch-series-11",
      category: "watch",
      name: "Apple Watch Series 11",
      tagline: "The ultimate way to watch your health.",
      basePriceCents: 39900,
      heroImage:
        "https://www.apple.com/v/apple-watch-series-11/c/images/overview/welcome/hero__d4bput78wzu6_xlarge.jpg",
      options: {
        size: [
          { label: "42mm case" },
          { label: "46mm case", priceDeltaCents: 3000 },
        ],
        color: [
          { label: "Space Gray", swatch: "#5a5a5a" },
          { label: "Silver", swatch: "#c8c9cc" },
          { label: "Rose Gold", swatch: "#e8b9a7" },
          { label: "Gold", swatch: "#d4b990" },
        ],
        band: [
          { label: "Sport Band" },
          { label: "Sport Loop" },
          { label: "Milanese Loop", priceDeltaCents: 5000 },
          { label: "Braided Solo Loop", priceDeltaCents: 5000 },
        ],
        applecare: [
          { label: "No AppleCare+" },
          { label: "AppleCare+ (2 years)", priceDeltaCents: 4900 },
        ],
      },
    },
    {
      slug: "airpods-pro-3",
      category: "airpods",
      name: "AirPods Pro 3",
      tagline: "Adaptive Audio. Now playing.",
      basePriceCents: 24900,
      heroImage:
        "https://www.apple.com/v/airpods/ae/images/overview/hero_endframe__calpooy4ucr6_large.jpg",
      options: {
        applecare: [
          { label: "No AppleCare+" },
          { label: "AppleCare+ for Headphones (2 years)", priceDeltaCents: 2900 },
        ],
      },
    },
    {
      slug: "apple-tv-4k",
      category: "tv",
      name: "Apple TV 4K",
      tagline: "The Apple experience. Cinematic in every sense.",
      basePriceCents: 12900,
      heroImage:
        "https://www.apple.com/v/tv-home/q/images/overview/apple_tv_4k__b30wcqp0pdle_large.jpg",
      options: {
        storage: [
          { label: "64GB (Wi-Fi)" },
          { label: "128GB (Wi-Fi + Ethernet)", priceDeltaCents: 2000 },
        ],
      },
    },
  ];

  for (const p of seed) {
    const existing = await db.query.products.findFirst({ where: eq(products.slug, p.slug) });
    if (existing) {
      console.log(`• ${p.slug} already exists, skipping`);
    } else {
      await db.insert(products).values(p);
      console.log(`✓ inserted ${p.slug}`);
    }
  }

  console.log("\nSeed complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
