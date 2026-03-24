// apps/api/src/app.ts
import authRoutes from "./routes/authRoutes";
import inventoryItemRoutes from "./routes/inventoryItemRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
import storeRoutes from "./routes/storeRoutes";
import varietyRoutes from "./routes/varietyRoutes";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";

export const app: Express = express();

app.use(cookieParser()); // 1️⃣ Read the cookie first
app.use(express.json()); // 2️⃣ Parse JSON later
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/admin/auth", authRoutes);
app.use("/admin/inventories", inventoryRoutes);
app.use("/inventory-items", inventoryItemRoutes);
app.use("/admin/stores", storeRoutes);
app.use("/admin/varieties", varietyRoutes);

app.get("/", (req, res) => {
  res.send("Liu Shu Shu 🌳");
});
