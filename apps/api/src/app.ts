import cors from "cors";
import express, { Express } from "express";

import varietyRoutes from "./routes/varietyRoutes";

export const app: Express = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.use("/varieties", varietyRoutes);

app.get("/", (req, res) => {
  res.send("Liu Shu Shu 🌳");
});
