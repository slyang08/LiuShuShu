// packages/db/src/__tests__/db.test.ts
import "dotenv/config";
import { prisma } from "./connection.test";

console.log("DATABASE_URL =", process.env.DATABASE_URL);

async function main() {
  await prisma.$connect();
  console.log("✅ DB connected");

  const stores = await prisma.store.findMany();
  console.log("📦 stores:", stores);

  const varieties = await prisma.durianVariety.findMany();
  console.log("🍈 varieties:", varieties);

  const inventories = await prisma.inventory.findMany({
    include: {
      store: true,
      items: {
        include: {
          variety: true,
        },
      },
    },
  });

  console.log("📊 inventories (with relations):");
  console.dir(inventories, { depth: null });

  console.log("🎉 DB read test done");
}

main()
  .catch((error) => {
    console.error("❌ Error:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
