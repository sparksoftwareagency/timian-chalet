import { notFound } from "next/navigation";

import LocalCheeseClientPage from "@/app/components/LocalCheeseClientPage";
import { isSiteLocale, SITE_LOCALES, type SiteLocale } from "@/app/lib/locale";
import { fetchLocalCheesePage } from "@/sanity/lib/queries";

export function generateStaticParams() {
  return SITE_LOCALES.map((lang) => ({ lang }));
}

export default async function LocalCheesePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSiteLocale(lang)) {
    notFound();
  }

  const data = await fetchLocalCheesePage(lang as SiteLocale);

  if (!data) {
    notFound();
  }

  return <LocalCheeseClientPage data={data} />;
}
