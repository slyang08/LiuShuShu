// apps/web/src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh-CN", "zh-TW", "ms"] as const,
  defaultLocale: "en",
});

export const localeMeta = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "zh-CN", label: "简体中文", flag: "🇨🇳" },
  { code: "zh-TW", label: "繁體中文", flag: "🇹🇼" },
  { code: "ms", label: "Malaysia", flag: "🇲🇾" },
  // { code: "ms", label: "Bahasa Melayu", flag: "🇲🇾" },
] as const;

export type Locale = (typeof routing.locales)[number];
