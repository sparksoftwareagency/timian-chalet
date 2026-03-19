import { notFound } from "next/navigation";

import AboutClientPage from "@/app/components/AboutClientPage";
import { isSiteLocale, SITE_LOCALES, type SiteLocale } from "@/app/lib/locale";
import { fetchAboutPage } from "@/sanity/lib/queries";

export function generateStaticParams() {
  return SITE_LOCALES.map((lang) => ({ lang }));
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSiteLocale(lang)) {
    notFound();
  }

  const data = await fetchAboutPage(lang as SiteLocale);

  if (!data) {
    notFound();
  }

  return <AboutClientPage lang={lang as SiteLocale} data={data} />;
}
