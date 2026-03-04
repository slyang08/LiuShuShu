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
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Daily Inventory</h1>

      <InventoryForm storeId={1} varieties={varieties} />
    </div>
  );
}
