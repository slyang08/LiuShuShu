"use client";

import { Button } from "@/components/ui/button";
import { CreateInventoryDTO, CreateInventoryItemDTO } from "@liushushu/shared";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface Props {
  inventory: {
    id: number;
    date: string; // "20XX-XX-XXT00:00:00.000Z"
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
    inventory.items.map((item) => ({
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

  const removeRow = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
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
      date: inventory.date.split("T")[0], // "20XX-XX-XX"
      items: items.filter((item) => item.quantity > 0), // Only save the items which have qualities
    };

    try {
      setLoading(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/inventories`, {
        method: "PUT",
        credentials: "include",
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
    <div className="mx-auto max-w-4xl space-y-1 p-6">
      <div className="mb-4 text-center">
        <h1 className="text-xl font-bold lg:text-2xl">編輯 {inventory.date.split("T")[0]} 庫存</h1>
        <div className="text-gray-500">店家 ID: {inventory.storeId}</div>
      </div>

      {/* ✅ Existing Items + New Item Form */}
      {items.map((item, index) => (
        <div key={index} className="flex items-center rounded-lg lg:gap-3 lg:p-3">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row space-x-2">
              <select
                value={item.varietyId}
                onChange={(e) => updateItem(index, "varietyId", Number(e.target.value))}
                className="flex-1 rounded-lg border p-3 lg:min-w-50"
              >
                {varieties.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
              {items.length > 0 && (
                <Button
                  type="button"
                  onClick={() => removeRow(index)}
                  className="ml-auto h-auto min-w-0 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-md"
                >
                  <Trash2 />
                </Button>
              )}
            </div>

            <div className="flex flex-row space-x-2">
              <input
                type="number"
                placeholder="數量"
                value={item.quantity}
                onChange={(e) => updateItem(index, "quantity", Number(e.target.value) || 0)}
                className="w-24 rounded-lg border p-3 text-center"
                min="0"
              />

              <input
                type="number"
                placeholder="價格"
                value={item.price}
                step="1"
                onChange={(e) => updateItem(index, "price", Number(e.target.value) || 0)}
                className="w-28 rounded-lg border p-3 text-center"
              />
            </div>
          </div>
        </div>
      ))}

      {/* ✅ Add item */}
      <Button
        onClick={addRow}
        className="mt-2 w-full rounded-lg bg-green-500 px-6 py-3 font-medium text-white transition-colors hover:bg-green-600"
        disabled={!varieties.length}
      >
        ➕ 新增品項
      </Button>

      {/* ✅ Save items */}
      <div className="flex flex-col gap-4 pt-6 lg:flex-row">
        <Button
          onClick={handleSubmit}
          disabled={loading || items.filter((item) => item.quantity == 0).length === 0}
          className="rounded-lg bg-blue-500 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-600 disabled:bg-gray-400 lg:flex-1"
        >
          {loading ? "儲存中..." : "💾 儲存更新"}
        </Button>
        <Button
          onClick={() => router.back()}
          className="rounded-lg border border-gray-300 px-8 py-3 font-medium hover:bg-gray-50"
          disabled={loading}
        >
          ← 返回
        </Button>
      </div>
    </div>
  );
}
