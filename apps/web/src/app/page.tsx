// apps/web/src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6 p-6">
      <h1 className="text-3xl font-bold">榴蓮樹樹</h1>

      <p className="text-gray-600">新鮮榴蓮每日更新中</p>

      <div className="flex gap-4">
        <Link href="/durians" className="rounded-lg border px-4 py-2">
          今日榴蓮
        </Link>

        <Link href="/map" className="rounded-lg border px-4 py-2">
          店鋪位置
        </Link>

        <Link href="/contact" className="rounded-lg border px-4 py-2">
          聯絡我們
        </Link>
      </div>
    </div>
  );
}
