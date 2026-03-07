// apps/web/src/app/durians/page.tsx
import { InventoryItem } from "@/features/inventory/hooks/useTodayInventory";

async function getTodayInventory(storeId: number): Promise<InventoryItem[]> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const res = await fetch(
    `${BASE_URL}/inventories/${storeId}/today`,
    { next: { revalidate: 300 } } // 5 mins ISR (means update data every 5 mins)
  );
  
  if (!res.ok) return [];
  return res.json();
}

export default async function DuriansPage() {
  const todayInventory = await getTodayInventory(1);
  
  if (!todayInventory.length) {
    return (
      <div className="p-6 text-center py-12 text-gray-500">
        <p>今日榴蓮暫無進貨或已賣光 😢</p>
        <p className="text-sm mt-2">請明天再來看看新鮮的榴蓮哦！</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8 text-center">今日榴蓮樹樹的榴蓮</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {todayInventory.map((item: InventoryItem) => (
          <div key={item.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-xl mb-2 text-green-800">
              {item.variety.name}
            </h3>
            <div className="space-y-2 text-lg">
              <p className="text-2xl font-bold text-emerald-600">
                ${Number(item.price).toFixed(2)} <span className="text-sm text-gray-500">(RM / 1000克)</span>
              </p>
              <p className="text-gray-600">
                庫存：<span className="text-3xl font-semibold">{item.quantity}</span> 顆
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
