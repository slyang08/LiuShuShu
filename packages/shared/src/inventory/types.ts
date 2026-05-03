// packages/shared/src/inventory/types.ts
import { DurianVariety } from "../variety/model";

export interface InventoryItem {
  id: number;
  varietyId: number;
  quantity: number;
  price: number;
  variety: DurianVariety;
}

export interface Inventory {
  id: number;
  date: string; // "20XX-XX-XXT00:00:00.000Z"
  storeId: number;
  items: InventoryItem[];
}

export interface UseTodayInventoryReturn {
  todayInventory: InventoryItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
