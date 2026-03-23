// apps/web/src/app/admin/layout.tsx
"use client";

import { getMe } from "@/features/auth/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    getMe()
      .then(() => setAuthenticated(true))
      .catch(() => {
        setAuthenticated(false);
        router.replace("/admin");
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <p>Loading...</p>;
  // if (!authenticated) return null;

  // return <>{children}</>;

  return (
    <div className="flex min-h-screen overflow-hidden">
      <aside className="flex w-[33%] border-r border-blue-200 bg-linear-to-b from-blue-500 to-blue-600 px-4 py-6 shadow-lg">
        <nav className="flex flex-col space-y-10 px-2">
          <Link href="/admin/inventories">庫存 Inventory</Link>
          <Link href="/admin/inventories/create">建立庫存 Create Inventory</Link>
          <Link href="/admin/varieties">榴蓮品種 Varieties</Link>
        </nav>
      </aside>

      <main className="max-w-full flex-1 overflow-auto py-6">{children}</main>
    </div>
  );
}
