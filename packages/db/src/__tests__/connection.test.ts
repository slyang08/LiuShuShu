// packages/db/src/__test__/connection.test.ts
import "dotenv/config";
import { createPrismaClient } from "../client";

export const prisma = createPrismaClient(process.env.DATABASE_URL!);
