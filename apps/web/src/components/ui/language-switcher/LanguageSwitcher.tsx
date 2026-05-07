// apps/web/src/components/ui/language-switcher/LanguageSwitcher.tsx
"use client";

import { useLocale } from "next-intl";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localeMeta } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const pathnameWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), "");

  const current = localeMeta.find((lang) => lang.code === locale) ?? {
    label: "Language",
    flag: "🌐",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <span>{current.flag}</span>
          <span>{current.label}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {localeMeta.map((lang) => (
          <DropdownMenuItem key={lang.code} asChild>
            <Link href={`/${lang.code}${pathnameWithoutLocale}`}>
              <span className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
