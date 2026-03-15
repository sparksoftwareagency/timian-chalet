import { notFound } from "next/navigation";

import ClientPage from "@/app/components/ClientPage";
import { isSiteLocale, SITE_LOCALES, type SiteLocale } from "@/app/lib/locale";
import { fetchHomePage, fetchSiteSettings } from "@/sanity/lib/queries";

export function generateStaticParams() {
  return SITE_LOCALES.map((lang) => ({ lang }));
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSiteLocale(lang)) {
    notFound();
  }

  const [home, settings] = await Promise.all([
    fetchHomePage(lang as SiteLocale),
    fetchSiteSettings(lang as SiteLocale),
  ]);

  if (!home || !settings) {
    notFound();
  }

  return (
    <ClientPage
      locale={lang}
      data={home}
      loadingBrand={settings.loadingBrand}
      loadingText={settings.loadingText}
    />
  );
}
