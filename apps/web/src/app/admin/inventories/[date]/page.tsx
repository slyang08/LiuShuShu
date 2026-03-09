// apps/web/src/app/admin/inventories/[date]/page.tsx
import { getInventoryByDate } from "@/features/inventory/api";
import InventoryEditor from "@/features/inventory/components/InventoryEditor";

interface Props {
  params: Promise<{ date: string }>;
}

async function getAllVarieties() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/varieties`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      console.warn("❌ Varieties API 404:", res.url, res.status);
      return [];  // ✅ Returns an empty array, and the page displays normally
    }
    return await res.json();
  } catch (error) {
    console.error("❌ Varieties fetch failed:", error);
    return [];  // ✅ No matter any error returns an empty array
  }
}


export default async function Page({ params }: Props) {
  const { date } = await params;  

  const dateObj = new Date(date);
  
  // Simultaneously obtain inventory + item list
  const [inventory, allVarieties] = await Promise.all([
    getInventoryByDate(1, dateObj),
    getAllVarieties()
  ]);
  
  if (!inventory) {
    return (
      <div>
        <p>{date}的庫存還沒有建立哦</p>
        <p>Inventory not found for {date}</p>
      </div>
    );
  }

  return (
    <InventoryEditor 
      inventory={inventory}
      varieties={allVarieties}
    />
  );
}
