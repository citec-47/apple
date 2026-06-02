import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: varchar("role", { length: 32 }).notNull().default("editor"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

/* ───── Products ───── */
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  category: varchar("category", { length: 50 }).notNull(), // mac, iphone, ipad, watch, airpods, tv, vision
  name: varchar("name", { length: 200 }).notNull(),
  tagline: text("tagline"),
  basePriceCents: integer("base_price_cents").notNull(),
  heroImage: text("hero_image"),
  options: jsonb("options").$type<ProductOptions>().notNull().default({} as ProductOptions),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export interface ProductOptionChoice {
  label: string;
  priceDeltaCents?: number;
  swatch?: string;
}
export interface ProductOptions {
  chip?: ProductOptionChoice[];
  memory?: ProductOptionChoice[];
  storage?: ProductOptionChoice[];
  color?: ProductOptionChoice[];
  size?: ProductOptionChoice[];
  band?: ProductOptionChoice[];
  applecare?: ProductOptionChoice[];
}

/* ───── Orders ───── */
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("order_number", { length: 32 }).notNull().unique(),
  status: varchar("status", { length: 32 }).notNull().default("pending_payment"),
  customerEmail: varchar("customer_email", { length: 255 }).notNull(),
  customerName: varchar("customer_name", { length: 200 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 50 }),
  shippingAddress: jsonb("shipping_address").$type<ShippingAddress>().notNull(),
  notes: text("notes"),
  subtotalCents: integer("subtotal_cents").notNull(),
  taxCents: integer("tax_cents").notNull().default(0),
  shippingCents: integer("shipping_cents").notNull().default(0),
  totalCents: integer("total_cents").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

/* ───── Order Items ───── */
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productSlug: varchar("product_slug", { length: 100 }).notNull(),
  productName: varchar("product_name", { length: 200 }).notNull(),
  configuration: jsonb("configuration").$type<Record<string, string>>().notNull().default({}),
  unitPriceCents: integer("unit_price_cents").notNull(),
  quantity: integer("quantity").notNull().default(1),
});

export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;

/* ───── Support messages ───── */
export const supportMessages = pgTable("support_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 200 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 32 }).notNull().default("new"), // new | replied | archived
  adminReply: text("admin_reply"),
  repliedAt: timestamp("replied_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type SupportMessage = typeof supportMessages.$inferSelect;
export type NewSupportMessage = typeof supportMessages.$inferInsert;

/* ───── Visitors ───── */
export const visitors = pgTable("visitors", {
  id: serial("id").primaryKey(),
  ip: varchar("ip", { length: 64 }),
  country: varchar("country", { length: 4 }),
  countryName: varchar("country_name", { length: 100 }),
  city: varchar("city", { length: 120 }),
  region: varchar("region", { length: 120 }),
  path: varchar("path", { length: 500 }).notNull(),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Visitor = typeof visitors.$inferSelect;
export type NewVisitor = typeof visitors.$inferInsert;
