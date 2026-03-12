"use client";

import { CreateInventoryDTO, CreateInventoryItemDTO } from "@liushushu/shared";

import { useEffect, useState } from "react";

import { createInventory } from "../api";

interface Props {
  storeId: number;
  varieties: { id: number; name: string }[];
}

export default function InventoryForm({ storeId, varieties }: Props) {
  const [date, setDate] = useState("");
  const [items, setItems] = useState<CreateInventoryItemDTO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const penangDate = new Date().toLocaleDateString("sv", {
      timeZone: "Asia/Kuala_Lumpur",
    });
    setDate(penangDate); // set up as the newest date by default
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
    if (!date) {
      alert("Please select a date");
      return;
    }

    if (items.length === 0) {
      alert("Please add at least one item");
      return;
    }

    const payload: CreateInventoryDTO = {
      storeId,
      date,
      items: items.filter((item) => item.quantity > 0), // Filter out invalid items
    };

    try {
      setLoading(true);
      await createInventory(payload);
      alert("Inventory created!");

      setDate("");
      setItems([]);
    } catch (error) {
      let errorMessage = "Failed to create inventory";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = (error as { message?: string }).message || errorMessage;
      }

      console.error("Inventory creation failed:", error);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* ✅ Display the date of Penang and changeable manually */}
      <div>
        <label className="mb-2 block text-sm font-medium">庫存日期（檳城時間）</label>
        <input
          type="date"
          className="border p-2"
          value={date}
          max={new Date().toLocaleDateString("sv", { timeZone: "Asia/Kuala_Lumpur" })}
          onChange={(e) => setDate(e.target.value)}
        />
        <p className="mt-1 text-xs text-gray-500">自動設定為檳城時間 {date}，可手動調整</p>
      </div>

      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <select
            value={item.varietyId}
            onChange={(e) => updateItem(index, "varietyId", Number(e.target.value))}
            className="border p-2"
          >
            {varieties.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantity"
            className="border p-2"
            onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
          />

          <input
            type="number"
            placeholder="Price"
            className="border p-2"
            step="0.01"
            onChange={(e) => updateItem(index, "price", Number(e.target.value))}
          />
        </div>
      ))}

      <button onClick={addRow} className="bg-black-200 px-4 py-2">
        + 新增品項 Add Item
      </button>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-500 px-4 py-2 text-white"
      >
        {loading ? "儲存中... Saving..." : "建立庫存 Save Inventory"}
      </button>
    </div>
  );
}
