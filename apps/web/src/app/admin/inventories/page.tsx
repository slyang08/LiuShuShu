// apps/web/src/app/admin/inventories/page.tsx
import InventoryList from "@/features/inventory/components/InventoryList";

export default function Page() {
  return (
    <>
      <div className="flex items-center space-y-1 px-3 pb-6">
        <h1 className="text-xl font-bold">庫存清單 Inventory List</h1>
      </div>
      <InventoryList storeId={1} />
    </>
  );
}
