"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreateInventoryDTO, CreateInventoryItemDTO } from "@liushushu/shared";

interface Props {
  inventory: {
    id: number;
    date: string;  // "20XX-XX-XXT00:00:00.000Z"
    storeId: number;
    items: Array<{
      id: number;
      varietyId: number;
      variety: { id: number; name: string };
      quantity: number;
      price: number;
    }>;
  };
  varieties: { id: number; name: string }[];
}

export default function InventoryEditor({ inventory, varieties }: Props) {
  const [items, setItems] = useState<CreateInventoryItemDTO[]>(() =>
    inventory.items.map(item => ({
      varietyId: item.varietyId,
      quantity: item.quantity,
      price: item.price,
    }))
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addRow = () => {
    if (!varieties.length) return;
    setItems([
      ...items,
      {
        varietyId: varieties[0].id,
        quantity: 0,
        price: 0,
      },
    ]);
  };

  const updateItem = <K extends keyof CreateInventoryItemDTO>(
    index: number,
    field: K,
    value: CreateInventoryItemDTO[K]
  ) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleSubmit = async () => {
    if (items.length === 0) {
      alert("Please add at least one item");
      return;
    }

    const payload: CreateInventoryDTO = {
      storeId: inventory.storeId,
      date: inventory.date.split("T")[0],  // "20XX-XX-XX"
      items: items.filter(item => item.quantity > 0), // Only save the items which have qualities
    };

    try {
      setLoading(true);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventories`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      alert("💾 Inventory update successfully!");
      router.refresh();
      router.back();
    } catch (error) {
      let errorMessage = "Updated failed";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(errorMessage);
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">
          編輯 {inventory.date.split("T")[0]} 庫存
        </h1>
        <div className="text-gray-500">
          店家 ID: {inventory.storeId}
        </div>
      </div>

      {/* ✅ Existing Items + New Item Form */}
      {items.map((item, index) => (
        <div key={index} className="flex gap-3 items-center p-3 bg-blue-500 rounded-lg">
          <select
            value={item.varietyId}
            onChange={(e) =>
              updateItem(index, "varietyId", Number(e.target.value))
            }
            className="border p-3 rounded-lg flex-1 min-w-50"
          >
            {varieties.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="數量"
            value={item.quantity}
            onChange={(e) =>
              updateItem(index, "quantity", Number(e.target.value) || 0)
            }
            className="border p-3 w-24 rounded-lg text-center"
            min="0"
          />

          <input
            type="number"
            placeholder="價格"
            value={item.price}
            step="1"
            onChange={(e) =>
              updateItem(index, "price", Number(e.target.value) || 0)
            }
            className="border p-3 w-28 rounded-lg text-center"
          />
        </div>
      ))}

      {/* ✅ Add item */}
      <button
        onClick={addRow}
        className="w-full bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
        disabled={!varieties.length}
      >
        ➕ 新增品項
      </button>

      {/* ✅ Save items */}
      <div className="flex gap-4 pt-6">
        <button
          onClick={handleSubmit}
          disabled={loading || items.filter(item => item.quantity > 0).length === 0}
          className="flex-1 bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400 transition-colors text-lg"
        >
          {loading ? "儲存中..." : "💾 儲存更新"}
        </button>
        <button
          onClick={() => router.back()}
          className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
          disabled={loading}
        >
          ← 返回
        </button>
      </div>
    </div>
  );
}
