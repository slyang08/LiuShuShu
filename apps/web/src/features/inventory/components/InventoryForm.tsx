// apps/web/src/features/inventory/components/InventoryForm.tsx
"use client";

import { useEffect, useState } from "react";

import { Trash2 } from "lucide-react";

import { CreateInventoryDTO, CreateInventoryItemDTO } from "@liushushu/shared";

import { createInventory } from "../api";

import { Button } from "@/components/ui/button";
import { getMe } from "@/features/auth/api";
import { getVarieties } from "@/features/variety/api";

export default function InventoryForm() {
  const [storeId, setStoreId] = useState<number | null>(null);
  const [varieties, setVarieties] = useState<{ id: number; name: string }[]>([]);
  const [loadingVarieties, setLoadingVarieties] = useState(true);
  const [date, setDate] = useState("");
  const [items, setItems] = useState<CreateInventoryItemDTO[]>([]);
  const [Submitting, setSubmitting] = useState(false);

  // Fetch user and varieties on client side
  useEffect(() => {
    getMe()
      .then((user) => {
        setStoreId(user.storeId);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
      });
    getVarieties()
      .then((data) => {
        setVarieties(data);
      })
      .catch((err) => {
        console.error("Failed to fetch varieties:", err);
      })
      .finally(() => setLoadingVarieties(false));
  }, []);

  // Set default Penang date
  useEffect(() => {
    const penangDate = new Date().toLocaleDateString("sv", {
      timeZone: "Asia/Kuala_Lumpur",
    });
    setDate(penangDate);
  }, []);

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
    setItems((prev) => prev.filter((_, i) => i !== index));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!storeId) {
      alert("Admin not loaded");
      return;
    }

    if (!date) {
      alert("Please select a date");
      return;
    }

    if (items.length === 0) {
      alert("Please add at least one item");
      return;
    }

    const payload: CreateInventoryDTO = {
      date,
      items: items.filter((item) => item.quantity > 0),
    };

    try {
      setSubmitting(true);
      await createInventory(payload);
      alert("Inventory created!");
      setDate("");
      setItems([]);
    } catch (error) {
      let msg = "Failed to create inventory";
      if (error instanceof Error) msg = error.message;
      console.error("Inventory creation failed:", error);
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingVarieties) return <p>Loading varieties...</p>;

  if (varieties.length === 0) {
    return (
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
        <h2 className="mb-2 text-lg font-semibold text-yellow-800">還沒有任何榴蓮品種的資料</h2>
        <p className="mb-4 text-yellow-700">
          請先到 <strong>榴蓮品種</strong> 新增榴蓮品種
        </p>
        <a
          href="/admin/varieties"
          className="inline-flex items-center rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
        >
          前往榴蓮品種 →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="max-w-full space-y-4 overflow-hidden">
      {/* Date input */}
      <div>
        <label className="mb-2 block text-sm font-medium">📅 庫存日期（檳城時間）</label>
        <input
          type="date"
          className="border p-2"
          value={date}
          max={new Date().toLocaleDateString("sv", { timeZone: "Asia/Kuala_Lumpur" })}
          onChange={(e) => setDate(e.target.value)}
        />
        <p className="mt-1 text-xs text-gray-500">自動設定為檳城時間 {date}，可手動調整</p>
      </div>

      {/* Inventory items */}
      {items.map((item, index) => (
        <div key={index} className="flex w-full flex-col gap-2">
          <div className="flex gap-2">
            <select
              value={item.varietyId}
              onChange={(e) => updateItem(index, "varietyId", Number(e.target.value))}
              className="border px-4"
            >
              {varieties.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => removeRow(index)}
              className="ml-auto w-max min-w-0 flex-1 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-md"
            >
              <Trash2 />
            </button>
          </div>
          <div className="flex w-full max-w-full min-w-0 gap-2 overflow-hidden">
            <input
              type="number"
              placeholder="Quantity"
              className="min-w-0 flex-1 border px-3 py-2"
              value={item.quantity || ""}
              onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
              min="0"
            />
            <input
              type="number"
              placeholder="Price"
              className="min-w-0 flex-1 border px-3 py-2"
              value={item.price || ""}
              onChange={(e) => updateItem(index, "price", Number(e.target.value))}
              min="0"
              step="1"
            />
          </div>
        </div>
      ))}

      {/* Add item & submit */}
      <div className="flex flex-col gap-2">
        <Button type="button" onClick={addRow} className="px-3 py-2">
          + 新增品項 Add Item
        </Button>
        <Button type="submit" disabled={Submitting} className="bg-blue-500 px-4 py-2 text-white">
          {Submitting ? "儲存中... Saving..." : "建立庫存 Save Inventory"}
        </Button>
      </div>
    </form>
  );
}
