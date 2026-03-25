import { notFound } from "next/navigation";

import RestaurantClientPage from "@/app/components/RestaurantClientPage";
import { isSiteLocale, SITE_LOCALES, type SiteLocale } from "@/app/lib/locale";
import { fetchRestaurantPage } from "@/sanity/lib/queries";

export function generateStaticParams() {
  return SITE_LOCALES.map((lang) => ({ lang }));
}

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSiteLocale(lang)) {
    notFound();
  }

  const data = await fetchRestaurantPage(lang as SiteLocale);

  if (!data) {
    notFound();
  }

  return <RestaurantClientPage data={data} />;
}
