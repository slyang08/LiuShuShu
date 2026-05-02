// packages/shared/src/inventory/types.ts
import { DurianVariety } from "../variety/model";

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

export interface UseTodayInventoryReturn {
  todayInventory: InventoryItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
