import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { isSiteLocale, localizeHref, SITE_LOCALES, type SiteLocale } from "@/app/lib/locale";
import { colors } from "@/app/theme/colors";
import { pageShell } from "@/app/theme/pageShell";
import { fetchRoom, fetchRoomSlugs, fetchRooms, fetchRoomsPage } from "@/sanity/lib/queries";

function Divider({ image }: { image: { url: string; alt: string } }) {
  return (
    <div className="relative h-32 overflow-visible sm:h-40 md:h-48">
      <div className="absolute right-6 top-1/2 -translate-y-1/2 sm:right-8 lg:right-10">
        <div className="relative mr-16 h-24 w-36 overflow-hidden rounded-lg shadow-lg sm:h-32 sm:w-48 md:h-36 md:w-56">
          <Image src={image.url} alt={image.alt} fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}

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

  const [first, second, third, fourth, fifth, sixth, seventh] = room.galleryImages;

  return (
    <main className="w-full">
      <section data-theme="dark" className="relative flex min-h-screen w-full items-center justify-center" style={{ backgroundColor: colors.textPrimary }}>
        <div className={`${pageShell} py-32 sm:py-40`}>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl shadow-2xl">
            <Image src={first.url} alt={first.alt} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em]" style={{ color: colors.cta }}>
                {roomsPage.roomLabel}
              </span>
              <h1 className="font-serif text-4xl font-light tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl">{room.title}</h1>
              <p className="mt-4 text-lg font-light italic text-white/80 sm:text-xl">{room.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      <Divider image={second ?? first} />

      <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
        <div className={`${pageShell} py-20 sm:py-28 lg:py-32`}>
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex-1">
              <h2 className="mb-3 font-serif text-3xl sm:text-4xl lg:text-5xl" style={{ color: colors.accent }}>
                {room.title}
              </h2>
              <p className="mb-6 font-serif text-lg italic sm:text-xl" style={{ color: colors.accent }}>
                {room.tagline}
              </p>
              <p className="text-base leading-relaxed sm:text-lg" style={{ color: colors.textSecondary }}>
                {room.description}
              </p>
            </div>
            <div className="flex-1">
              <div className="relative aspect-[3/4] max-h-[600px] w-full overflow-hidden rounded-lg shadow-xl">
                <Image src={second?.url ?? first.url} alt={second?.alt ?? first.alt} fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider image={third ?? first} />

      <section data-theme="light" style={{ backgroundColor: colors.secondaryBg }}>
        <div className={`${pageShell} py-20 sm:py-24`}>
          <div className="mb-12 text-center">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em]" style={{ color: colors.cta }}>
              {roomsPage.discoverSpaceLabel}
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl" style={{ color: colors.accent }}>
              {roomsPage.galleryTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 lg:gap-6">
            {[third, fourth, fifth, sixth].filter(Boolean).map((image, index) => (
              <div key={`${image?.url}-${index}`} className={index % 2 === 0 ? "md:col-span-7" : "md:col-span-5"}>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg">
                  <Image src={image!.url} alt={image!.alt} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider image={seventh ?? first} />

      <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
        <div className={`${pageShell} py-20 sm:py-24`}>
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <Link href={localizeHref(lang, `/rooms/${prev.slug}`)} className="text-sm font-medium uppercase tracking-[0.2em]" style={{ color: colors.cta }}>
              {prev.title}
            </Link>
            <Link href={localizeHref(lang, "/rooms")} className="text-sm font-medium uppercase tracking-[0.2em]" style={{ color: colors.textSecondary }}>
              {roomsPage.backToRoomsLabel}
            </Link>
            <Link href={localizeHref(lang, `/rooms/${next.slug}`)} className="text-sm font-medium uppercase tracking-[0.2em]" style={{ color: colors.cta }}>
              {next.title}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
