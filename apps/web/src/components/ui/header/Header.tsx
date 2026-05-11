// apps/web/src/components/ui/header/Header.tsx
import { getLocale } from "next-intl/server";

import Link from "next/link";

import { LanguageSwitcher } from "@/components/ui/language-switcher/LanguageSwitcher";

export async function Header() {
  const locale = await getLocale();
  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      {/* Left */}
      <Link href={`/${locale}`} className="font-bold">
        榴莲树树
      </Link>

      {/* Right */}
      <LanguageSwitcher />
    </header>
  );
}
