// apps/web/src/app/page.tsx
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

import Link from "next/link";

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();

  console.log(".env:", process.env.API_BASE_URL);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6 p-6">
      <h1 className="text-3xl font-bold">{t("home.title")}</h1>
      <p className="text-gray-600">{t("home.subtitle")}</p>
      <div className="flex gap-4">
        <Link href={`/${locale}/durians/1`} className="rounded-lg border px-4 py-2">
          {t("home.todayDurian")}
        </Link>
        <Link href={`/${locale}/map`} className="rounded-lg border px-4 py-2">
          {t("home.location")}
        </Link>
        <Link href={`/${locale}/contact`} className="rounded-lg border px-4 py-2">
          {t("home.contact")}
        </Link>
      </div>
    </div>
  );
}
