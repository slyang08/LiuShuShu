// packages/db/src/testClient.ts
import "dotenv/config";
import { createPrismaClient } from "./client";

export const prisma = createPrismaClient(process.env.DATABASE_URL!);
