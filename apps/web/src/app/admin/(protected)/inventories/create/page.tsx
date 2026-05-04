// apps/web/src/app/admin/inventories/create/page.tsx
import InventoryForm from "@/features/inventory/components/InventoryForm";

export default function Page() {
  return (
    <div className="px-4 pb-6">
      <h1 className="text-xl font-bold">建立每日庫存</h1>
      <h1 className="mb-2 text-xl font-bold">Create Daily Inventory</h1>

      <InventoryForm />
    </div>
  );
}
