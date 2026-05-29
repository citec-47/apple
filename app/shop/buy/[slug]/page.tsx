import { notFound } from "next/navigation";
import { eq, and } from "drizzle-orm";
import { db } from "@/db/client";
import { products } from "@/db/schema";
import BuyConfigurator from "@/components/BuyConfigurator";

export const dynamic = "force-dynamic";

export default async function BuyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await db.query.products.findFirst({
    where: and(eq(products.slug, slug), eq(products.isActive, true)),
  });
  if (!product) notFound();

  return <BuyConfigurator product={product} />;
}
