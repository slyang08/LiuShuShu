// apps/web/src/features/inventory/components/DurianList.tsx
"use client";

import { useTodayInventory } from "../hooks/useTodayInventory";

interface Props {
  storeId: number;
}

export default function DurianList({ storeId }: Props) {
  const { todayInventory, loading, error } = useTodayInventory(storeId);

  if (loading) return <div className="py-8 text-center">載入中...</div>;
  if (error) return <div className="py-8 text-center text-red-500">{error}</div>;
  if (!todayInventory.length) {
    return (
      <div className="py-12 text-center text-gray-500">
        <p>今日榴槤暫無進貨或已賣光 😢</p>
        <p className="mt-2 text-sm">請明天再來看看新鮮的榴蓮哦！</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {todayInventory.map((item) => (
        <div key={item.id} className="rounded-lg border p-6 transition-shadow hover:shadow-lg">
          <h3 className="mb-2 text-xl font-bold text-green-800">{item.variety.name}</h3>
          <div className="space-y-2 text-lg">
            <p className="text-2xl font-bold text-emerald-600">
              ${Number(item.price).toFixed(2)} (RM / 1000 克(1KG))
            </p>
            <p className="text-gray-600">庫存：{item.quantity} 顆</p>
          </div>
          {/* <button className="mt-4 w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors">
            立即選購
          </button> */}
        </div>
      ))}
    </div>
  );
}
