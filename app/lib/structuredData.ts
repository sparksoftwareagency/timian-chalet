import type { SiteLocale } from "./locale";
import { SITE_URL } from "./seo";
import type { RoomPageData, SiteSettingsData } from "@/sanity/lib/queries";

export function lodgingBusinessJsonLd(
  settings: SiteSettingsData,
  locale: SiteLocale,
) {
  const sameAs = (settings.socialLinks ?? [])
    .map((link) => link.href)
    .filter((href) => href && /^https?:\/\//.test(href));

  const [streetLine, ...rest] = settings.addressLines ?? [];
  const locality = rest[0];
  const region = rest[1];

  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${SITE_URL}/#lodging`,
    name: settings.siteTitle,
    description: settings.seoDescription ?? settings.siteDescription,
    url: `${SITE_URL}/${locale}`,
    telephone: settings.phone,
    email: settings.email,
    image: settings.ogImage?.url ?? settings.logoLightUrl,
    logo: settings.logoLightUrl,
    address: streetLine
      ? {
          "@type": "PostalAddress",
          streetAddress: streetLine,
          addressLocality: locality,
          addressRegion: region,
          addressCountry: "RO",
        }
      : undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };
}

export function accommodationJsonLd(
  room: RoomPageData,
  locale: SiteLocale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Accommodation",
    name: room.title,
    description: room.seoDescription ?? room.tagline ?? room.description,
    url: `${SITE_URL}/${locale}/rooms/${room.slug}`,
    image: room.galleryImages?.map((image) => image.url).filter(Boolean),
  };
}

type BreadcrumbItem = { name: string; path: string };

export function breadcrumbJsonLd(locale: SiteLocale, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
