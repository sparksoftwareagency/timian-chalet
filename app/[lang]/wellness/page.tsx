import type { Metadata } from "next";
import { notFound } from "next/navigation";

import WellnessClientPage from "@/app/components/WellnessClientPage";
import { isSiteLocale, SITE_LOCALES, type SiteLocale } from "@/app/lib/locale";
import { buildPageMetadata } from "@/app/lib/seo";
import { fetchSiteSettings, fetchWellnessPage } from "@/sanity/lib/queries";

export function generateStaticParams() {
  return SITE_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isSiteLocale(lang)) return {};

  const [data, settings] = await Promise.all([
    fetchWellnessPage(lang as SiteLocale),
    fetchSiteSettings(lang as SiteLocale),
  ]);
  if (!data || !settings) return {};

  const title = data.seoTitle ?? `${data.heroTitle} — ${settings.siteTitle}`;
  const description =
    data.seoDescription ?? data.heroSubtitle ?? settings.siteDescription;

  return buildPageMetadata({
    locale: lang as SiteLocale,
    path: "/wellness",
    title,
    description,
    imageUrl: data.heroImage?.url ?? settings.ogImage?.url,
    imageAlt: data.heroImage?.alt ?? settings.ogImage?.alt,
  });
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
