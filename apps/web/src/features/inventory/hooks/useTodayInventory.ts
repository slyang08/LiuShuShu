// src/features/inventory/hooks/useTodayInventory.ts
import { useCallback, useEffect, useState } from "react";

import { InventoryItem, UseTodayInventoryReturn } from "@liushushu/shared/inventory/types";

import { getAdminTodayInventory } from "../api";

export function useTodayInventory(): UseTodayInventoryReturn {
  const [todayInventory, setTodayInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodayInventory = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const todayInv: InventoryItem[] = await getAdminTodayInventory();

      setTodayInventory(todayInv);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "載入失敗";
      setError(errorMessage);
      console.error("Fetch today inventory failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchTodayInventory();
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
