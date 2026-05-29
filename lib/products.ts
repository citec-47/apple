"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { products, type ProductOptions } from "@/db/schema";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createProductAction(formData: FormData): Promise<void> {
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const basePrice = Number(formData.get("basePrice") ?? 0);
  const heroImage = String(formData.get("heroImage") ?? "").trim();
  const optionsJson = String(formData.get("options") ?? "{}");

  if (!name || !category) return;
  const slug = String(formData.get("slug") ?? "").trim() || slugify(name);

  let options: ProductOptions = {};
  try {
    options = JSON.parse(optionsJson);
  } catch {
    options = {};
  }

  await db.insert(products).values({
    slug,
    category,
    name,
    tagline: tagline || null,
    basePriceCents: Math.round(basePrice * 100),
    heroImage: heroImage || null,
    options,
    isActive: true,
  });

  redirect("/admin/products");
}

export async function deleteProductAction(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  if (!id) return;
  await db.delete(products).where(eq(products.id, id));
  redirect("/admin/products");
}

export async function toggleProductActiveAction(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  const isActive = formData.get("isActive") === "true";
  if (!id) return;
  await db.update(products).set({ isActive: !isActive, updatedAt: new Date() }).where(eq(products.id, id));
  redirect("/admin/products");
}
