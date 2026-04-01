// apps/web/src/app/admin/(protected)/inventories/[date]/page.tsx
import { getInventoryByDate } from "@/features/inventory/api";
import InventoryEditor from "@/features/inventory/components/InventoryEditor";
import { getVarieties } from "@/features/variety/api";

interface Props {
  params: Promise<{ date: string }>;
}

export default async function Page({ params }: Props) {
  const { date } = await params;

  const dateObj = new Date(date);

  // Simultaneously obtain inventory + item list
  const [inventory, allVarieties] = await Promise.all([
    getInventoryByDate(dateObj),
    getVarieties(),
  ]);

  if (!inventory) {
    return (
      <div>
        <p>{date}的庫存還沒有建立哦</p>
        <p>Inventory not found for {date}</p>
      </div>
    );
  }

  return <InventoryEditor inventory={inventory} varieties={allVarieties} />;
}
