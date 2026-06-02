"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { supportMessages } from "@/db/schema";
import { auth } from "@/lib/auth";

/** Public: a visitor submits a message from the Support page. */
export async function submitSupportMessageAction(formData: FormData): Promise<void> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    redirect("/support?sent=error#contact");
  }

  await db.insert(supportMessages).values({
    name,
    email,
    subject: subject || null,
    message,
  });

  redirect("/support?sent=1#contact");
}

/** Admin: reply to a message (stored + marked replied). */
export async function replySupportMessageAction(formData: FormData): Promise<void> {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const id = Number(formData.get("id"));
  const reply = String(formData.get("reply") ?? "").trim();
  if (!id || !reply) redirect("/admin/messages");

  await db
    .update(supportMessages)
    .set({ adminReply: reply, status: "replied", repliedAt: new Date() })
    .where(eq(supportMessages.id, id));

  redirect("/admin/messages");
}

/** Admin: change a message's status (e.g. archive / reopen). */
export async function updateSupportStatusAction(formData: FormData): Promise<void> {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const id = Number(formData.get("id"));
  const status = String(formData.get("status") ?? "");
  if (!id || !["new", "replied", "archived"].includes(status)) redirect("/admin/messages");

  await db.update(supportMessages).set({ status }).where(eq(supportMessages.id, id));
  redirect("/admin/messages");
}
