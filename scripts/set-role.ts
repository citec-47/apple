import { config } from "dotenv";
import { eq } from "drizzle-orm";
config({ path: ".env.local" });

async function main() {
  const email = process.argv[2]?.trim().toLowerCase();
  const role = process.argv[3]?.trim();
  if (!email || !["owner", "editor"].includes(role ?? "")) {
    console.error("Usage: npm run set-role -- email@example.com owner|editor");
    process.exit(1);
  }
  const { db } = await import("../db/client");
  const { users } = await import("../db/schema");
  const result = await db
    .update(users)
    .set({ role, updatedAt: new Date() })
    .where(eq(users.email, email))
    .returning({ email: users.email, role: users.role });
  if (result.length === 0) {
    console.error(`No user with email ${email}`);
    process.exit(1);
  }
  console.log(`✓ ${result[0].email} is now ${result[0].role}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
