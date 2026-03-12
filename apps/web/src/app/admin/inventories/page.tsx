// apps/web/src/app/admin/inventories/page.tsx
import InventoryList from "@/features/inventory/components/InventoryList";

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold">庫存清單 Inventory List</h1>
      <InventoryList storeId={1} />
    </div>
  );
}
