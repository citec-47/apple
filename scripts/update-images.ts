import { config } from "dotenv";
import { sql } from "drizzle-orm";

config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in .env.local");
}

async function main() {
  const { db } = await import("../db/client");

  const before = await db.execute<{ n: number }>(
    sql`SELECT count(*)::int AS n FROM products;`
  );
  const total = before.rows?.[0]?.n ?? 0;
  console.log(`About to update hero_image for ${total} products…`);

  // One single UPDATE: every row gets a Picsum URL keyed off its slug.
  // Picsum serves a real, Unsplash-licensed photograph for every seed and
  // always returns a 200 with a 600x600 cropped JPEG.
  const t0 = Date.now();
  await db.execute(sql`
    UPDATE products
    SET hero_image = 'https://picsum.photos/seed/' || slug || '/600/600',
        updated_at = now();
  `);
  const ms = Date.now() - t0;
  console.log(`✓ Updated ${total} product images in ${ms}ms.`);

  const sample = await db.execute<{ name: string; hero_image: string }>(
    sql`SELECT name, hero_image FROM products ORDER BY random() LIMIT 3;`
  );
  console.log("\nSample (3 random rows):");
  for (const row of sample.rows ?? []) {
    console.log(`  ${row.name}`);
    console.log(`    ${row.hero_image}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
