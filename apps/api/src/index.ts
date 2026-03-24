// apps/api/src/index.ts
import { app } from "./app";
import "dotenv/config";

const PORT = process.env.PORT || 8080;

console.log("DATABASE_URL =", process.env.DATABASE_URL);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
