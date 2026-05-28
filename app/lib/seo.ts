import type { Metadata } from "next";

import { SITE_LOCALES, type SiteLocale } from "./locale";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://timian.ro";

const OG_LOCALE: Record<SiteLocale, string> = {
  en: "en_US",
  ro: "ro_RO",
  hu: "hu_HU",
};

type PageMetadataInput = {
  locale: SiteLocale;
  path: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  type?: "website" | "article";
};

function normalizePath(path: string): string {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

function localizedUrl(locale: SiteLocale, path: string): string {
  return `/${locale}${normalizePath(path)}`;
}

export function buildLanguageAlternates(path: string): Record<string, string> {
  const normalized = normalizePath(path);
  const languages: Record<string, string> = {};
  for (const locale of SITE_LOCALES) {
    languages[locale] = `/${locale}${normalized}`;
  }
  languages["x-default"] = `/en${normalized}`;
  return languages;
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  imageUrl,
  imageAlt,
  type = "website",
}: PageMetadataInput): Metadata {
  const canonical = localizedUrl(locale, path);
  const images = imageUrl
    ? [{ url: imageUrl, alt: imageAlt ?? title }]
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      type,
      url: canonical,
      title,
      description,
      siteName: "Timian Chalet",
      locale: OG_LOCALE[locale],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
