// apps/web/src/features/inventory/components/InventoryList.tsx
"use client";

import { DurianVariety } from "@liushushu/shared";

import { useEffect, useState } from "react";

import Link from "next/link";

import { getInventories } from "../api";

interface InventoryItem {
  id: number;
  quantity: number;
  price: number;
  variety: DurianVariety;
}

interface Inventory {
  id: number;
  date: string;
  items: InventoryItem[];
}

interface Props {
  storeId: number;
}

function DateSelector({
  selectedDate,
  setSelectedDate,
  today,
}: {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  today: string;
}) {
  return (
    <div className="mb-4 flex gap-2">
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="rounded border p-2"
      />
      <button
        onClick={() => setSelectedDate(today)}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        今天
      </button>
    </div>
  );
}

export default function InventoryList({ storeId }: Props) {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    getInventories(storeId).then(setInventories).catch(console.error);
  }, [storeId]);

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const filteredInventories = selectedDate
    ? inventories.filter((inv) => inv.date.startsWith(selectedDate))
    : inventories.filter((inv) => inv.date.startsWith(today));

  if (!filteredInventories.length) {
    return (
      <div>
        <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} today={today} />
        <p className="text-gray-500">No inventories for {selectedDate || today}.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Date Picker */}
      <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} today={today} />
      <button
        onClick={() => setSelectedDate("")}
        className="rounded bg-black px-4 py-2 hover:bg-gray-300"
      >
        清除
      </button>

      {/* Only show the inventories after filtering */}
      {filteredInventories.map((inv) => (
        <div key={inv.id} className="rounded-lg border p-4">
          <h3 className="mb-2 text-lg font-bold">{inv.date.split("T")[0]}</h3>

          <Link href={`/admin/inventories/${inv.date.split("T")[0]}`} className="text-blue-500">
            編輯 Edit
          </Link>

          <ul className="space-y-1">
            {inv.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.variety.name}</span>
                <span>
                  {item.quantity} 顆 - ${Number(item.price).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
