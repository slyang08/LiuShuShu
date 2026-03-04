"use client";
import { useEffect, useState } from "react";
import { getInventories } from "../api";
import { DurianVariety } from "@liushushu/shared";

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
    <div className="flex gap-2 mb-4">
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={() => setSelectedDate(today)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
    ? inventories.filter(inv => inv.date.startsWith(selectedDate))
    : inventories.filter(inv => inv.date.startsWith(today));

  if (!filteredInventories.length) {
    return (
      <div>
        <DateSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          today={today}
        />
        <p className="text-gray-500">No inventories for {selectedDate || today}.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Date Picker */}
      <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        today={today}
      />
      <button
        onClick={() => setSelectedDate("")}
        className="px-4 py-2 bg-black rounded hover:bg-gray-300"
      >
        清除
      </button>

      {/* Only show the inventories after filtering */}
      {filteredInventories.map(inv => (
        <div key={inv.id} className="border p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">
            {inv.date.split("T")[0]}
          </h3>
          <ul className="space-y-1">
            {inv.items.map(item => (
              <li key={item.id} className="flex justify-between">
                <span>{item.variety.name}</span>
                <span>{item.quantity} pcs - ${Number(item.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
