// apps/web/src/components/ui/header/Header.tsx
import Link from "next/link";

import { LanguageSwitcher } from "@/components/ui";

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      {/* Left */}
      <Link href="/" className="font-bold">
        榴蓮樹樹
      </Link>

      {/* Right */}
      <LanguageSwitcher />
    </header>
  );
}
