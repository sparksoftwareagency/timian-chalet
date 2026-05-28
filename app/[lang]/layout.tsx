import type { Metadata } from "next";
import { notFound } from "next/navigation";

import FloatingMenu from "@/app/components/FloatingMenu";
import Footer from "@/app/components/Footer";
import { isSiteLocale, SITE_LOCALES, type SiteLocale } from "@/app/lib/locale";
import { buildPageMetadata } from "@/app/lib/seo";
import { fetchNavigation, fetchSiteSettings } from "@/sanity/lib/queries";

export function generateStaticParams() {
  return SITE_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!isSiteLocale(lang)) {
    return {};
  }

  const settings = await fetchSiteSettings(lang as SiteLocale);
  if (!settings) {
    return {};
  }

  const title = settings.seoTitle ?? settings.siteTitle;
  const description = settings.seoDescription ?? settings.siteDescription;

  return buildPageMetadata({
    locale: lang as SiteLocale,
    path: "/",
    title,
    description,
    imageUrl: settings.ogImage?.url,
    imageAlt: settings.ogImage?.alt,
  });
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  if (!isSiteLocale(lang)) {
    notFound();
  }

  const [settings, navigation] = await Promise.all([
    fetchSiteSettings(lang as SiteLocale),
    fetchNavigation(lang as SiteLocale),
  ]);

  if (!settings || !navigation) {
    notFound();
  }

  return (
    <>
      <FloatingMenu locale={lang} navigation={navigation} settings={settings} />
      {children}
      <Footer locale={lang} settings={settings} />
    </>
  );
}
