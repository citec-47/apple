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

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "products" (
      "id" serial PRIMARY KEY NOT NULL,
      "slug" varchar(100) NOT NULL,
      "category" varchar(50) NOT NULL,
      "name" varchar(200) NOT NULL,
      "tagline" text,
      "base_price_cents" integer NOT NULL,
      "hero_image" text,
      "options" jsonb DEFAULT '{}'::jsonb NOT NULL,
      "is_active" boolean DEFAULT true NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
      CONSTRAINT "products_slug_unique" UNIQUE("slug")
    );
  `);
  console.log("✓ products table ready");

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "orders" (
      "id" serial PRIMARY KEY NOT NULL,
      "order_number" varchar(32) NOT NULL,
      "status" varchar(32) DEFAULT 'pending_payment' NOT NULL,
      "customer_email" varchar(255) NOT NULL,
      "customer_name" varchar(200) NOT NULL,
      "customer_phone" varchar(50),
      "shipping_address" jsonb NOT NULL,
      "notes" text,
      "subtotal_cents" integer NOT NULL,
      "tax_cents" integer DEFAULT 0 NOT NULL,
      "shipping_cents" integer DEFAULT 0 NOT NULL,
      "total_cents" integer NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
      CONSTRAINT "orders_order_number_unique" UNIQUE("order_number")
    );
  `);
  console.log("✓ orders table ready");

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "order_items" (
      "id" serial PRIMARY KEY NOT NULL,
      "order_id" integer NOT NULL,
      "product_slug" varchar(100) NOT NULL,
      "product_name" varchar(200) NOT NULL,
      "configuration" jsonb DEFAULT '{}'::jsonb NOT NULL,
      "unit_price_cents" integer NOT NULL,
      "quantity" integer DEFAULT 1 NOT NULL,
      CONSTRAINT "order_items_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE
    );
  `);
  console.log("✓ order_items table ready");

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "visitors" (
      "id" serial PRIMARY KEY NOT NULL,
      "ip" varchar(64),
      "country" varchar(4),
      "country_name" varchar(100),
      "city" varchar(120),
      "region" varchar(120),
      "path" varchar(500) NOT NULL,
      "user_agent" text,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL
    );
  `);
  console.log("✓ visitors table ready");

  // Track whether the admin has opened an order yet (for the "new order" badge).
  await db.execute(sql`
    ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "viewed_at" timestamp with time zone;
  `);
  console.log("✓ orders.viewed_at column ready");

  // Richer product detail: a longer description + a small image gallery.
  await db.execute(sql`
    ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "description" text;
  `);
  await db.execute(sql`
    ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "gallery" jsonb DEFAULT '[]'::jsonb NOT NULL;
  `);
  console.log("✓ products.description + products.gallery columns ready");

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "support_messages" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar(200) NOT NULL,
      "email" varchar(255) NOT NULL,
      "subject" varchar(200),
      "message" text NOT NULL,
      "status" varchar(32) DEFAULT 'new' NOT NULL,
      "admin_reply" text,
      "replied_at" timestamp with time zone,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL
    );
  `);
  console.log("✓ support_messages table ready");

  const result = await db.execute<{ n: number }>(sql`SELECT count(*)::int AS n FROM products;`);
  console.log(`✓ products currently has ${result.rows?.[0]?.n ?? 0} row(s)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
