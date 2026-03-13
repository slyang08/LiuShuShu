// apps/web/src/app/admin/inventories/create/page.tsx
import InventoryForm from "@/features/inventory/components/InventoryForm";

async function getVarieties() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/varieties`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function Page() {
  const varieties = await getVarieties();

  return (
    <div className="px-4 pb-6">
      <h1 className="text-xl font-bold">建立每日庫存</h1>
      <h1 className="mb-2 text-xl font-bold">Create Daily Inventory</h1>

      <InventoryForm storeId={1} varieties={varieties} />
    </div>
  );
}
