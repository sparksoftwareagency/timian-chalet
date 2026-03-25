import { notFound } from "next/navigation";

import ExperiencesClientPage from "@/app/components/ExperiencesClientPage";
import { isSiteLocale, SITE_LOCALES, type SiteLocale } from "@/app/lib/locale";
import { fetchExperiencesPage } from "@/sanity/lib/queries";

export function generateStaticParams() {
  return SITE_LOCALES.map((lang) => ({ lang }));
}

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSiteLocale(lang)) {
    notFound();
  }

  const data = await fetchExperiencesPage(lang as SiteLocale);

  if (!data) {
    notFound();
  }

  return <ExperiencesClientPage data={data} />;
}
