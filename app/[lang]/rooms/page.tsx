import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { isSiteLocale, localizeHref, SITE_LOCALES, type SiteLocale } from "@/app/lib/locale";
import { colors } from "@/app/theme/colors";
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
    <main className="w-full">
      <section data-theme="dark" className="relative flex min-h-[70vh] w-full items-center justify-center" style={{ backgroundColor: colors.textPrimary }}>
        <div className="mx-auto w-full max-w-7xl px-6 py-32 sm:px-10 sm:py-40 lg:px-16">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl shadow-2xl">
            <Image src={page.heroImage.url} alt={page.heroImage.alt} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <h1 className="font-serif text-4xl font-light tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl">{page.heroTitle}</h1>
              <p className="mt-4 max-w-2xl text-base font-light text-white/80 sm:text-lg">{page.heroSubtitle}</p>
            </div>
          </div>
        </div>
      </section>

      <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
        <div className="mx-auto max-w-7xl px-10 py-20 sm:px-12 sm:py-28 lg:px-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {rooms.map((room) => (
              <Link key={room.slug} href={localizeHref(lang, `/rooms/${room.slug}`)} className="group block">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow-lg">
                  <Image src={room.heroImage.url} alt={room.heroImage.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="mb-1 font-serif text-2xl text-white sm:text-3xl">{room.title}</h3>
                    <p className="text-sm italic text-white/70">{room.tagline}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
