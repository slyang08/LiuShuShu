// apps/api/src/controllers/healthController.ts
import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

interface HealthStatus {
  server: string;
  database?: string;
}

interface HealthResponse {
  status: string;
  uptime: number;
  timestamp: string;
  services: HealthStatus;
}

export const healthCheck = async (req: Request, res: Response) => {
  const health: HealthResponse = {
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    services: {
      server: "healthy",
    },
  };

  try {
    // Prisma DB ping
    await prisma.$queryRaw`SELECT 1`;
    health.services.database = "healthy";
  } catch (error) {
    health.status = "UNHEALTHY";
    health.services.database = "unhealthy";
    console.error("DB health check failed:", error);
  }

  res.status(200).json(health);
};
