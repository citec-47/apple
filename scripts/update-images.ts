import { config } from "dotenv";
import { sql } from "drizzle-orm";

config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in .env.local");
}

// ─── Curated product photography on the Unsplash CDN ───
// All photos are licensed for commercial use under the Unsplash License.
// These pools are biased toward clean product shots (no people, neutral
// backgrounds) so a phone tile looks like a phone, a laptop like a laptop.
// If any individual URL ever 404s, the page falls back to a slug-seeded
// Picsum photo — still a real photograph, just generic.

const U = "https://images.unsplash.com";
const Q = "?w=600&h=600&fit=crop&auto=format&q=80";

const POOLS: Record<string, string[]> = {
  phones: [
    `${U}/photo-1511707171634-5f897ff02aa9${Q}`,
    `${U}/photo-1605236453806-6ff36851218e${Q}`,
    `${U}/photo-1601784551446-20c9e07cdbdb${Q}`,
    `${U}/photo-1592750475338-74b7b21085ab${Q}`,
    `${U}/photo-1574944985070-8f3ebc6b79d2${Q}`,
    `${U}/photo-1567581935884-3349723552ca${Q}`,
    `${U}/photo-1583394838336-acd977736f90${Q}`,
    `${U}/photo-1565849904461-04a58ad377e0${Q}`,
    `${U}/photo-1592899677977-9c10ca588bbd${Q}`,
    `${U}/photo-1556656793-08538906a9f8${Q}`,
    `${U}/photo-1565849904461-04a58ad377e0${Q}`,
    `${U}/photo-1546054454-aa26e2b734c7${Q}`,
    `${U}/photo-1580910051074-3eb694886505${Q}`,
    `${U}/photo-1605236453806-6ff36851218e${Q}`,
    `${U}/photo-1556782297-d51e08f56e54${Q}`,
  ],
  laptops: [
    `${U}/photo-1496181133206-80ce9b88a853${Q}`,
    `${U}/photo-1517336714731-489689fd1ca8${Q}`,
    `${U}/photo-1531297484001-80022131f5a1${Q}`,
    `${U}/photo-1593642632559-0c6d3fc62b89${Q}`,
    `${U}/photo-1541807084-5c52b6b3adef${Q}`,
    `${U}/photo-1542435503-956c469947f6${Q}`,
    `${U}/photo-1611162617474-5b21e879e113${Q}`,
    `${U}/photo-1517336714731-489689fd1ca8${Q}`,
    `${U}/photo-1611186871348-b1ce696e52c9${Q}`,
    `${U}/photo-1593642634524-b40b5baae6bb${Q}`,
    `${U}/photo-1588872657578-7efd1f1555ed${Q}`,
    `${U}/photo-1525547719571-a2d4ac8945e2${Q}`,
    `${U}/photo-1542838132-92c53300491e${Q}`,
    `${U}/photo-1496181133206-80ce9b88a853${Q}`,
  ],
  tablets: [
    `${U}/photo-1561154464-82e9adf32764${Q}`,
    `${U}/photo-1542751110-97427bbecf20${Q}`,
    `${U}/photo-1544244015-0df4b3ffc6b0${Q}`,
    `${U}/photo-1561972774-2dc3f1e9d65f${Q}`,
    `${U}/photo-1543069190-f687cf231eda${Q}`,
    `${U}/photo-1623126908029-58cb08a2b272${Q}`,
    `${U}/photo-1585789575649-3bb95daabaa1${Q}`,
    `${U}/photo-1572177812156-58036aae439c${Q}`,
    `${U}/photo-1561154464-82e9adf32764${Q}`,
    `${U}/photo-1566840630027-2dd56db95d39${Q}`,
    `${U}/photo-1542751110-97427bbecf20${Q}`,
    `${U}/photo-1591267990439-bc68829a17a1${Q}`,
  ],
  watches: [
    `${U}/photo-1523275335684-37898b6baf30${Q}`,
    `${U}/photo-1542496658-e33a6d0d50f6${Q}`,
    `${U}/photo-1546868871-7041f2a55e12${Q}`,
    `${U}/photo-1622434641406-a158123450f9${Q}`,
    `${U}/photo-1508685096489-7aacd43bd3b1${Q}`,
    `${U}/photo-1524805444758-089113d48a6d${Q}`,
    `${U}/photo-1579586337278-3befd40fd17a${Q}`,
    `${U}/photo-1639685514054-65835d49dd86${Q}`,
    `${U}/photo-1542496658-e33a6d0d50f6${Q}`,
    `${U}/photo-1622434641406-a158123450f9${Q}`,
    `${U}/photo-1565440962783-f87efdea99fd${Q}`,
    `${U}/photo-1611337449098-4d1eef9a3b5e${Q}`,
  ],
  audio: [
    `${U}/photo-1505740420928-5e560c06d30e${Q}`,
    `${U}/photo-1606220945770-b5b6c2c55bf1${Q}`,
    `${U}/photo-1546435770-a3e426bf472b${Q}`,
    `${U}/photo-1484704849700-f032a568e944${Q}`,
    `${U}/photo-1583394838336-acd977736f90${Q}`,
    `${U}/photo-1572569511254-d8f925fe2cbb${Q}`,
    `${U}/photo-1545127398-14699f92334b${Q}`,
    `${U}/photo-1593118247619-e2d6f056869e${Q}`,
    `${U}/photo-1546435770-a3e426bf472b${Q}`,
    `${U}/photo-1608043152269-423dbba4e7e1${Q}`,
    `${U}/photo-1572176680-9f1f06b8e9f8${Q}`,
    `${U}/photo-1599669454699-248893623440${Q}`,
  ],
  home: [
    `${U}/photo-1593359677879-a4bb92f829d1${Q}`,
    `${U}/photo-1571415060716-baff5f717b0e${Q}`,
    `${U}/photo-1593784991095-a205069470b6${Q}`,
    `${U}/photo-1601944179066-29786cb9d32a${Q}`,
    `${U}/photo-1593104547489-5cfb3839a3b5${Q}`,
    `${U}/photo-1565623833408-d77e39b88af6${Q}`,
    `${U}/photo-1593784992062-f0d36ed835f7${Q}`,
    `${U}/photo-1573481078814-0d39c3c2e9b1${Q}`,
    `${U}/photo-1556909114-f6e7ad7d3136${Q}`,
    `${U}/photo-1556228720-195a672e8a03${Q}`,
    `${U}/photo-1626804475297-41608ea09aeb${Q}`,
    `${U}/photo-1593784991095-a205069470b6${Q}`,
  ],
  accessories: [
    `${U}/photo-1531986362435-16b427eb9c26${Q}`,
    `${U}/photo-1547119957-637f8679db1e${Q}`,
    `${U}/photo-1605904369167-c7b9cad6cce4${Q}`,
    `${U}/photo-1606220589517-fcc9d2c97aaf${Q}`,
    `${U}/photo-1626218174358-7769486cf61f${Q}`,
    `${U}/photo-1583394838336-acd977736f90${Q}`,
    `${U}/photo-1625948515291-69613efd103f${Q}`,
    `${U}/photo-1611174693477-edb1d1f5d92e${Q}`,
    `${U}/photo-1601445638532-3c6f6c3aa1d6${Q}`,
    `${U}/photo-1572569511254-d8f925fe2cbb${Q}`,
    `${U}/photo-1505740420928-5e560c06d30e${Q}`,
    `${U}/photo-1556228994-4dee2f2b3f81${Q}`,
  ],
};

async function main() {
  const { db } = await import("../db/client");

  const before = await db.execute<{ n: number }>(
    sql`SELECT count(*)::int AS n FROM products;`
  );
  const total = before.rows?.[0]?.n ?? 0;
  console.log(`Updating hero_image for ${total} products with category-themed photos…`);

  const t0 = Date.now();
  let touched = 0;
  for (const [cat, pool] of Object.entries(POOLS)) {
    const arrLiteral = `ARRAY[${pool.map((u) => `'${u.replace(/'/g, "''")}'`).join(",")}]::text[]`;
    const r = await db.execute(sql.raw(`
      UPDATE products
      SET hero_image = (${arrLiteral})[(abs(hashtext(slug)) % ${pool.length}) + 1],
          updated_at = now()
      WHERE category = '${cat}';
    `));
    const n = (r as { rowCount?: number }).rowCount ?? 0;
    touched += n;
    console.log(`  ${cat.padEnd(12)} ${n.toString().padStart(5)} products (pool: ${pool.length})`);
  }
  const ms = Date.now() - t0;
  console.log(`\n✓ Updated ${touched} of ${total} products in ${ms}ms.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
