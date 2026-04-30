// apps/web/src/app/admin/(protected)/layout.tsx
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/ui/button/LogoutButton";
import { fetchMe } from "@/features/auth/serverApi";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) redirect("/admin/login");

  try {
    await fetchMe(token);
  } catch {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen overflow-hidden">
      <aside className="flex w-[33%] border-r border-blue-200 bg-linear-to-b from-blue-500 to-blue-600 px-4 py-6 shadow-lg">
        <nav className="flex flex-col space-y-10 px-2 font-bold">
          <Link href="/admin/inventories">庫存 Inventory</Link>
          <Link href="/admin/inventories/create">建立庫存 Create Inventory</Link>
          <Link href="/admin/varieties">榴蓮品種 Varieties</Link>
          <Link href="/admin/change-password">修改密碼 Change Password</Link>
          <Link href="/">榴蓮樹樹 Home</Link>
          <LogoutButton className="ml-auto" />
        </nav>
      </aside>

      <main className="max-w-full flex-1 overflow-auto py-6">{children}</main>
    </div>
  );
}
