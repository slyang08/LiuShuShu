// apps/web/src/app/durians/page.tsx
import { InventoryItem } from "@/features/inventory/hooks/useTodayInventory";
import Link from "next/link";

async function getTodayInventory(storeId: number): Promise<InventoryItem[]> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const res = await fetch(`${BASE_URL}/inventories/${storeId}/today`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  const inventory = await res.json();
  return Array.isArray(inventory) ? inventory : [];
}

export default async function DuriansPage() {
  const todayInventory = await getTodayInventory(1);

  const penangDate = new Date().toLocaleDateString("sv", {
    timeZone: "Asia/Kuala_Lumpur",
  });

  if (!todayInventory.length) {
    return (
      <div className="p-6 py-12 text-center text-gray-500">
        <p>今日 {penangDate} 榴蓮暫無進貨或已賣光 😢</p>
        <p className="mt-2 text-sm">請明天再來看看新鮮的榴蓮哦！</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mt-4 text-center text-2xl font-bold">{penangDate}</h1>
      <h1 className="mb-8 text-center text-2xl font-bold">
        <Link href="/">榴蓮樹樹</Link>還有的果
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {todayInventory.map((item: InventoryItem) => (
          <div
            key={item.id}
            className="rounded-lg border px-2 py-2 transition-shadow hover:shadow-lg"
          >
            <div className="flex flex-row items-center justify-center text-lg">
              <p className="text-gray-600">
                <span className="text-3xl font-semibold">{item.quantity}</span> 粒{" "}
                {item.variety.name}
              </p>
              {/* <p className="text-xl font-bold text-green-800">{item.variety.name}</p> */}
            </div>
            <div className="flex justify-center">
              <p className="text-xl font-bold text-emerald-600 lg:text-2xl">
                RM {Number(item.price).toFixed(2)}{" "}
                <span className="text-xs text-gray-500">(RM / 1000克)</span>
              </p>
            </div>
            {/* 未來購物功能 */}
            {/* <button 
              className="mt-6 w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-all disabled:opacity-50"
              disabled={item.quantity === 0}
            >
              {item.quantity > 0 ? "立即選購" : "售罄"}
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
}
