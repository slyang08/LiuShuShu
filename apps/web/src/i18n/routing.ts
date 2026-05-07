// apps/web/src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh-CN", "zh-TW", "ms"] as const,
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];
