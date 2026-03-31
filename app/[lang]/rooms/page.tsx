import { notFound } from "next/navigation";

import RoomsListingClientPage from "@/app/components/RoomsListingClientPage";
import { isSiteLocale, SITE_LOCALES, type SiteLocale } from "@/app/lib/locale";
import { fetchRooms, fetchRoomsPage } from "@/sanity/lib/queries";

export function generateStaticParams() {
  return SITE_LOCALES.map((lang) => ({ lang }));
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
