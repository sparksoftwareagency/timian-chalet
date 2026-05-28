import type { MetadataRoute } from "next";

import { SITE_LOCALES, type SiteLocale } from "./lib/locale";
import { SITE_URL } from "./lib/seo";
import { fetchRoomSlugs } from "@/sanity/lib/queries";

const STATIC_PATHS = [
  "",
  "/about",
  "/rooms",
  "/wellness",
  "/experiences",
  "/restaurant",
  "/culinary",
  "/local-cheese",
  "/book-now",
] as const;

function buildLanguageMap(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of SITE_LOCALES) {
    languages[locale] = `${SITE_URL}/${locale}${path}`;
  }
  languages["x-default"] = `${SITE_URL}/en${path}`;
  return languages;
}

function entryFor(locale: SiteLocale, path: string): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}/${locale}${path}`,
    lastModified: new Date(),
    alternates: { languages: buildLanguageMap(path) },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of SITE_LOCALES) {
    for (const path of STATIC_PATHS) {
      entries.push(entryFor(locale, path));
    }
  }

  const slugsByLocale = await Promise.all(
    SITE_LOCALES.map(async (locale) => ({
      locale,
      slugs: await fetchRoomSlugs(locale),
    })),
  );

  for (const { locale, slugs } of slugsByLocale) {
    for (const slug of slugs) {
      entries.push(entryFor(locale, `/rooms/${slug}`));
    }
  }

  return entries;
}
