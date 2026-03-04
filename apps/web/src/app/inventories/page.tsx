import InventoryList from "@/features/inventory/components/InventoryList";

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Inventory List</h1>
      <InventoryList storeId={1} />
    </div>
  );
}
