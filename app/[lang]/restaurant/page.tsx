import type { Metadata } from "next";
import { notFound } from "next/navigation";

import RestaurantClientPage from "@/app/components/RestaurantClientPage";
import { isSiteLocale, SITE_LOCALES, type SiteLocale } from "@/app/lib/locale";
import { buildPageMetadata } from "@/app/lib/seo";
import { fetchRestaurantPage, fetchSiteSettings } from "@/sanity/lib/queries";

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
    fetchRestaurantPage(lang as SiteLocale),
    fetchSiteSettings(lang as SiteLocale),
  ]);
  if (!data || !settings) return {};

  const title = data.seoTitle ?? `${data.heroTitle} — ${settings.siteTitle}`;
  const description =
    data.seoDescription ?? data.heroSubtitle ?? settings.siteDescription;

  return buildPageMetadata({
    locale: lang as SiteLocale,
    path: "/restaurant",
    title,
    description,
    imageUrl: data.heroImage?.url ?? settings.ogImage?.url,
    imageAlt: data.heroImage?.alt ?? settings.ogImage?.alt,
  });
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
