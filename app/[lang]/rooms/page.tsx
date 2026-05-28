import type { Metadata } from "next";
import { notFound } from "next/navigation";

import RoomsListingClientPage from "@/app/components/RoomsListingClientPage";
import { isSiteLocale, SITE_LOCALES, type SiteLocale } from "@/app/lib/locale";
import { buildPageMetadata } from "@/app/lib/seo";
import { fetchRooms, fetchRoomsPage, fetchSiteSettings } from "@/sanity/lib/queries";

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

  const [page, settings] = await Promise.all([
    fetchRoomsPage(lang as SiteLocale),
    fetchSiteSettings(lang as SiteLocale),
  ]);
  if (!page || !settings) return {};

  const title = page.seoTitle ?? `${page.heroTitle} — ${settings.siteTitle}`;
  const description =
    page.seoDescription ?? page.heroSubtitle ?? settings.siteDescription;

  return buildPageMetadata({
    locale: lang as SiteLocale,
    path: "/rooms",
    title,
    description,
    imageUrl: page.heroImage?.url ?? settings.ogImage?.url,
    imageAlt: page.heroImage?.alt ?? settings.ogImage?.alt,
  });
}

export default async function RoomsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSiteLocale(lang)) {
    notFound();
  }

  const [page, rooms] = await Promise.all([
    fetchRoomsPage(lang as SiteLocale),
    fetchRooms(lang as SiteLocale),
  ]);

  if (!page) {
    notFound();
  }

  return (
    <RoomsListingClientPage lang={lang as SiteLocale} page={page} rooms={rooms} />
  );
}
