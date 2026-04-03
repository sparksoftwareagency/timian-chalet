import { notFound } from "next/navigation";

import RoomClientPage from "@/app/components/RoomClientPage";
import { isSiteLocale, SITE_LOCALES, type SiteLocale } from "@/app/lib/locale";
import { fetchRoom, fetchRoomSlugs, fetchRooms, fetchRoomsPage } from "@/sanity/lib/queries";

export async function generateStaticParams() {
  const all = await Promise.all(
    SITE_LOCALES.map(async (lang) => {
      const slugs = await fetchRoomSlugs(lang);
      return slugs.map((slug) => ({ lang, slug }));
    })
  );

  return all.flat();
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

  return <RoomClientPage lang={lang} room={room} roomsPage={roomsPage} prev={prev} next={next} />;
}
