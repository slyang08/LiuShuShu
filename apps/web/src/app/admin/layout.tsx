// apps/web/src/app/admin/layout.tsx
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-blue-400 p-4">
        <nav className="space-y-2">
          <Link href="/admin/inventories">庫存 Inventory</Link>
          <br />
          <Link href="/admin/inventories/create">建立庫存 Create Inventory</Link>
          <br />
          <Link href="/admin/varieties">榴蓮品種 Varieties</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
