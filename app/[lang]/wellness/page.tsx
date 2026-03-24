import { notFound } from "next/navigation";

import WellnessClientPage from "@/app/components/WellnessClientPage";
import { isSiteLocale, SITE_LOCALES, type SiteLocale } from "@/app/lib/locale";
import { fetchWellnessPage } from "@/sanity/lib/queries";

export function generateStaticParams() {
  return SITE_LOCALES.map((lang) => ({ lang }));
}

export default async function WellnessPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSiteLocale(lang)) {
    notFound();
  }

  const data = await fetchWellnessPage(lang as SiteLocale);

  if (!data) {
    notFound();
  }

  return <WellnessClientPage data={data} />;
}
