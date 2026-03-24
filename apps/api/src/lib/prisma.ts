// apps/api/src/lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import path from "path";
import { Pool } from "pg";

// Specify the dotenv path
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

declare global {
  var prisma: PrismaClient | undefined;
}

// PostgreSQL Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Prisma Adapter
const adapter = new PrismaPg(pool);

// Global singleton PrismaClient
export const prisma =
  global.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["warn", "error"],
  });

// Store in a global variable to avoid multiple initializations due to hot reloading
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// Attempt to connect to Prisma; catch errors if the connection fails
(async () => {
  try {
    await prisma.$connect();
    console.log("Prisma connected ✅");
  } catch (error) {
    console.error("Failed to connect to Prisma ❌", error);
    if (process.env.NODE_ENV === "production") {
      process.exit(1); // Exit the production environment directly
    }
  }
})();
