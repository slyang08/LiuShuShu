// apps/web/src/app/admin/inventories/create/page.tsx
import InventoryForm from "@/features/inventory/components/InventoryForm";
import Link from "next/link";

async function getVarieties() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/varieties`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch varieties");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching varieties:", error);
    return [];
  }
}

export default async function Page() {
  const varieties = await getVarieties();

  if (varieties.length === 0) {
    return (
      <div className="space-y-4 px-4 pb-6">
        <h1 className="text-xl font-bold">建立每日庫存</h1>
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
          <h2 className="mb-2 text-lg font-semibold text-yellow-800">還沒有任何榴蓮品種的資料</h2>
          <p className="mb-4 text-yellow-700">
            請先到 <strong>榴蓮品種</strong> 新增榴蓮品種
          </p>
          <Link
            href="/admin/varieties"
            className="inline-flex items-center rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
          >
            前往榴蓮品種 →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-6">
      <h1 className="text-xl font-bold">建立每日庫存</h1>
      <h1 className="mb-2 text-xl font-bold">Create Daily Inventory</h1>

      <InventoryForm storeId={1} varieties={varieties} />
    </div>
  );
}
