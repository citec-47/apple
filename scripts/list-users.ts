import { config } from "dotenv";
import { sql } from "drizzle-orm";

config({ path: ".env.local" });

async function main() {
  const { db } = await import("../db/client");
  const result = await db.execute<{ id: number; email: string; role: string; created_at: Date }>(
    sql`SELECT id, email, role, created_at FROM users ORDER BY id;`
  );
  const rows = result.rows ?? [];
  if (rows.length === 0) {
    console.log("No users in database. Sign up at /admin/signup?token=... first.");
    return;
  }
  console.log(`Found ${rows.length} user(s):`);
  for (const u of rows) {
    console.log(`  #${u.id}  ${u.email}  (${u.role})  created ${u.created_at.toISOString()}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
