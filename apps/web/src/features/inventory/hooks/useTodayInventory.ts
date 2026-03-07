// src/features/inventory/hooks/useTodayInventory.ts
import { useCallback, useEffect, useState } from "react";
import { getTodayInventory } from "../api";
import { DurianVariety } from "@liushushu/shared";

export interface InventoryItem {
  id: number;
  quantity: number;
  price: number;
  variety: DurianVariety;
}

export interface Inventory {
  id: number;
  date: string;
  items: InventoryItem[];
}

interface UseTodayInventoryReturn {
  todayInventory: InventoryItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useTodayInventory(storeId: number): UseTodayInventoryReturn {
  const [todayInventory, setTodayInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodayInventory = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const todayInv: InventoryItem[] = await getTodayInventory(storeId);
      
      setTodayInventory(todayInv);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "載入失敗";
      setError(errorMessage);
      console.error("Fetch today inventory failed:", err);
    } finally {
      setLoading(false);
    }
  }, [storeId]);

  useEffect(() => {
    fetchTodayInventory();
  }, [fetchTodayInventory]);

  const refetch = async (): Promise<void> => {
    await fetchTodayInventory();
  };

  return {
    todayInventory,
    loading,
    error,
    refetch,
  };
}
