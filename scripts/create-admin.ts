import { config } from "dotenv";
import { eq, sql } from "drizzle-orm";

config({ path: ".env.local" });

async function main() {
  const email = process.argv[2]?.trim().toLowerCase();
  const password = process.argv[3];

  if (!email || !password) {
    console.error("Usage: npm run create-admin -- you@example.com your-password");
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }
  if (!email.includes("@")) {
    console.error("That doesn't look like a valid email.");
    process.exit(1);
  }

  const { db } = await import("../db/client");
  const { users } = await import("../db/schema");
  const { hashPassword } = await import("../lib/password");

  const existing = await db.query.users.findFirst({ where: eq(users.email, email) });

  const passwordHash = await hashPassword(password);

  if (existing) {
    await db
      .update(users)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(users.email, email));
    console.log(`✓ Password updated for existing user ${email}`);
  } else {
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(users);
    const role = count === 0 ? "owner" : "editor";
    await db.insert(users).values({ email, passwordHash, role });
    console.log(`✓ Created ${role} account for ${email}`);
  }

  console.log("\nYou can now sign in at /admin/login with:");
  console.log(`  Email:    ${email}`);
  console.log(`  Password: ${password}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
