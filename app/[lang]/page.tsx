import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ClientPage from "@/app/components/ClientPage";
import { isSiteLocale, SITE_LOCALES, type SiteLocale } from "@/app/lib/locale";
import { buildPageMetadata } from "@/app/lib/seo";
import { fetchHomePage, fetchSiteSettings } from "@/sanity/lib/queries";

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

  const [home, settings] = await Promise.all([
    fetchHomePage(lang as SiteLocale),
    fetchSiteSettings(lang as SiteLocale),
  ]);
  if (!home || !settings) return {};

  const title = home.seoTitle ?? settings.seoTitle ?? settings.siteTitle;
  const description =
    home.seoDescription ?? settings.seoDescription ?? settings.siteDescription;

  return buildPageMetadata({
    locale: lang as SiteLocale,
    path: "/",
    title,
    description,
    imageUrl: home.heroSecondaryImage?.url ?? settings.ogImage?.url,
    imageAlt: home.heroSecondaryImage?.alt ?? settings.ogImage?.alt,
  });
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
