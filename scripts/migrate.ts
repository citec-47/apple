import { config } from "dotenv";
import { sql } from "drizzle-orm";

config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in .env.local");
}

async function main() {
  const { db } = await import("../db/client");
  console.log("Applying schema to Neon…");

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "users" (
      "id" serial PRIMARY KEY NOT NULL,
      "email" varchar(255) NOT NULL,
      "password_hash" text NOT NULL,
      "role" varchar(32) DEFAULT 'editor' NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
      CONSTRAINT "users_email_unique" UNIQUE("email")
    );
  `);
  console.log("✓ users table ready");

  const result = await db.execute<{ n: number }>(sql`SELECT count(*)::int AS n FROM users;`);
  const count = result.rows?.[0]?.n ?? 0;
  console.log(`✓ users table currently has ${count} row(s)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
