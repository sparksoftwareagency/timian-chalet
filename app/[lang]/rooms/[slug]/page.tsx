import type { Metadata } from "next";
import { notFound } from "next/navigation";

import JsonLd from "@/app/components/JsonLd";
import RoomClientPage from "@/app/components/RoomClientPage";
import { isSiteLocale, SITE_LOCALES, type SiteLocale } from "@/app/lib/locale";
import { buildPageMetadata } from "@/app/lib/seo";
import { accommodationJsonLd, breadcrumbJsonLd } from "@/app/lib/structuredData";
import { fetchRoom, fetchRoomSlugs, fetchRooms, fetchRoomsPage, fetchSiteSettings } from "@/sanity/lib/queries";

export async function generateStaticParams() {
  const all = await Promise.all(
    SITE_LOCALES.map(async (lang) => {
      const slugs = await fetchRoomSlugs(lang);
      return slugs.map((slug) => ({ lang, slug }));
    })
  );

  return all.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isSiteLocale(lang)) return {};

  const [room, settings] = await Promise.all([
    fetchRoom(lang as SiteLocale, slug),
    fetchSiteSettings(lang as SiteLocale),
  ]);
  if (!room || !settings) return {};

  const title = room.seoTitle ?? `${room.title} — ${settings.siteTitle}`;
  const description =
    room.seoDescription ?? room.tagline ?? room.description ?? settings.siteDescription;
  const firstImage = room.galleryImages?.[0];

  return buildPageMetadata({
    locale: lang as SiteLocale,
    path: `/rooms/${slug}`,
    title,
    description,
    imageUrl: firstImage?.url ?? settings.ogImage?.url,
    imageAlt: firstImage?.alt ?? settings.ogImage?.alt,
  });
}

export default async function RoomPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!isSiteLocale(lang)) {
    notFound();
  }

  const [room, rooms, roomsPage] = await Promise.all([
    fetchRoom(lang as SiteLocale, slug),
    fetchRooms(lang as SiteLocale),
    fetchRoomsPage(lang as SiteLocale),
  ]);

  if (!room || !roomsPage || rooms.length === 0) {
    notFound();
  }

  const currentIndex = rooms.findIndex((entry) => entry.slug === slug);
  if (currentIndex === -1) {
    notFound();
  }

  const prev = rooms[(currentIndex - 1 + rooms.length) % rooms.length];
  const next = rooms[(currentIndex + 1) % rooms.length];

  const breadcrumbs = breadcrumbJsonLd(lang as SiteLocale, [
    { name: "Home", path: "/" },
    { name: roomsPage.heroTitle, path: "/rooms" },
    { name: room.title, path: `/rooms/${slug}` },
  ]);

  return (
    <>
      <JsonLd data={accommodationJsonLd(room, lang as SiteLocale)} />
      <JsonLd data={breadcrumbs} />
      <RoomClientPage lang={lang} room={room} roomsPage={roomsPage} prev={prev} next={next} />
    </>
  );
}
