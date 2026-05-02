// packages/db/src/client.ts
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

export const createPrismaClient = (connectionString: string) => {
  const pool = new Pool({ connectionString }); // 👈 Build Pool First
  const adapter = new PrismaPg(pool); // 👈 Pass pool in

  return new PrismaClient({ adapter });
};

export { PrismaClient };
