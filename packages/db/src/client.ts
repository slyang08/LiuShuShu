// packages/db/src/client.ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

export const createPrismaClient = (connectionString: string) => {
  return new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });
};
