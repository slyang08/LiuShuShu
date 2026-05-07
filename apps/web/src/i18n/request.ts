// apps/web/src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";

import { loaders } from "./loader";
import { routing, type Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const raw = await requestLocale;

  const locale: Locale = routing.locales.includes(raw as Locale)
    ? (raw as Locale)
    : routing.defaultLocale;

  const messages = await loaders[locale]();

  return {
    locale,
    messages,
  };
});
