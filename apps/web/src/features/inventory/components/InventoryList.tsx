// apps/web/src/features/inventory/components/InventoryList.tsx
"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Inventory } from "@liushushu/shared/inventory/types";

import { getInventories, getInventoryByDate } from "../api";

import { Button } from "@/components/ui/button";

const today = new Date().toLocaleDateString("sv", {
  timeZone: "Asia/Kuala_Lumpur",
}); // YYYY-MM-DD

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
        max={today}
        className="rounded border p-2"
      />
      <Button
        onClick={() => setSelectedDate(today)}
        className="h-auto rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        檳城時間
      </Button>
    </div>
  );
}

export default function InventoryList() {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    if (selectedDate) {
      getInventoryByDate(new Date(selectedDate))
        // Get data and put into list by the date
        .then((inv) => setInventories([inv]))
        .catch((err) => {
          console.error("Failed to fetch inventory for date:", err);
          // No date on the date, then make it empty
          setInventories([]);
        });
    } else {
      getInventories().then(setInventories).catch(console.error);
    }
  }, [selectedDate]);

  const filteredInventories = selectedDate
    ? inventories.filter((inv) => inv.date.startsWith(selectedDate))
    : inventories.filter((inv) => inv.date.startsWith(today));

  if (!filteredInventories.length) {
    return (
      <div className="flex flex-col items-center">
        <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} today={today} />
        <p className="text-gray-500">No inventories for {selectedDate || today}.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Date Picker */}
      <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} today={today} />
      <Button
        onClick={() => setSelectedDate("")}
        className="rounded-lg bg-black px-4 py-2 hover:bg-gray-300"
      >
        清除
      </Button>

      {/* Only show the inventories after filtering */}
      {filteredInventories.map((inv) => (
        <div key={inv.id} className="px-2 py-4">
          <div className="mb-1 flex flex-row items-center justify-between">
            <h3 className="text-lg font-bold">{inv.date.split("T")[0]}</h3>

            <Link href={`/admin/inventories/${inv.date.split("T")[0]}`} className="text-blue-500">
              編輯 Edit
            </Link>
          </div>

          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-300 bg-gray-50 px-4 py-2 text-left text-sm font-semibold">
                  品種
                </th>
                <th className="border-b-2 border-gray-300 bg-gray-50 px-4 py-2 text-left text-sm font-semibold">
                  數量
                </th>
                <th className="border-b-2 border-gray-300 bg-gray-50 px-4 py-2 text-left text-sm font-semibold">
                  價格(RM)
                </th>
              </tr>
            </thead>
            <tbody>
              {inv.items.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-gray-50/50">
                  <td className="border-b border-gray-200 px-4 py-3 text-sm">
                    {item.variety.name}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-3 text-sm font-medium">
                    {item.quantity}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-3 text-sm font-semibold text-green-600">
                    $ {Number(item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
