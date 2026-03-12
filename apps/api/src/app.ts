// apps/api/src/app.ts
import inventoryItemRoutes from "./routes/inventoryItemRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
import varietyRoutes from "./routes/varietyRoutes";

import cors from "cors";
import express, { Express } from "express";

export const app: Express = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/inventories", inventoryRoutes);
app.use("/inventory-items", inventoryItemRoutes);
app.use("/varieties", varietyRoutes);

app.get("/", (req, res) => {
  res.send("Liu Shu Shu 🌳");
});
